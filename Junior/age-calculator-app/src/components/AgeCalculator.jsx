import { useState } from "react";
import { useCountUpAnim } from "../hooks/useCountUpAnim";
import arrowIcon from "../assets/images/icon-arrow.svg";

export default function AgeCalculator() {
   // State and event handlers
   const [values, setValues] = useState({ day: "", month: "", year: "" });
   const [errors, setErrors] = useState({ day: "", month: "", year: "" });
   const [result, setResult] = useState({
      years: "--",
      months: "--",
      days: "--",
   });

   const animatedYears = useCountUpAnim(result.years, 500);
   const animatedMonths = useCountUpAnim(result.months, 500);
   const animatedDays = useCountUpAnim(result.days, 500);

   function validate(v) {
      const newErrors = { day: "", month: "", year: "" };

      const day = v.day.trim();
      const month = v.month.trim();
      const year = v.year.trim();

      // 1) Required validation
      if (!day) newErrors.day = "This field is required";
      if (!month) newErrors.month = "This field is required";
      if (!year) newErrors.year = "This field is required";

      // If any required errors exist, stop early
      if (newErrors.day || newErrors.month || newErrors.year) {
         return newErrors;
      }

      // Convert to numbers for further validation
      const dayNum = Number(day);
      const monthNum = Number(month);
      const yearNum = Number(year);

      // 2) Range validation
      if (!Number.isInteger(dayNum) || dayNum < 1 || dayNum > 31) {
         newErrors.day = "Must be a valid day";
      }

      if (!Number.isInteger(monthNum) || monthNum < 1 || monthNum > 12) {
         newErrors.month = "Must be a valid month";
      }

      const currentYear = new Date().getFullYear();
      if (
         !Number.isInteger(yearNum) ||
         yearNum < 1900 ||
         yearNum > currentYear
      ) {
         newErrors.year = "Must be in the past";
      }

      // If basic range errors exist, stop early
      if (newErrors.day || newErrors.month || newErrors.year) {
         return newErrors;
      }

      // 3) Check for valid date
      const constructedDate = new Date(yearNum, monthNum - 1, dayNum);

      const isValidDate =
         constructedDate.getFullYear() === yearNum &&
         constructedDate.getMonth() === monthNum - 1 &&
         constructedDate.getDate() === dayNum;

      if (!isValidDate) {
         newErrors.day = "Must be a valid date";
         return newErrors;
      }

      // 4) Future date validation
      const today = new Date();
      // Compare using start of day for stability
      const inputDate = new Date(yearNum, monthNum - 1, dayNum);
      const startOfToday = new Date(
         today.getFullYear(),
         today.getMonth(),
         today.getDate(),
      );

      if (inputDate > startOfToday) {
         newErrors.year = "Must be in the past";
      }

      return newErrors;
   }

   function daysInMonth(year, monthIndex) {
      // monthIndex is 0-11
      return new Date(year, monthIndex + 1, 0).getDate();
   }

   function calculateAge(dayNum, monthNum, yearNum) {
      const today = new Date();
      const tYear = today.getFullYear();
      const tMonthIndex = today.getMonth();
      const tDay = today.getDate();

      const birthMonthIndex = monthNum - 1;

      let years = tYear - yearNum;
      let months = tMonthIndex - birthMonthIndex;
      let days = tDay - dayNum;

      // Adjust days if negative
      if (days < 0) {
         months -= 1;

         const prevMonthIndex = (tMonthIndex - 1 + 12) % 12;
         const prevMonthYear = prevMonthIndex === 11 ? tYear - 1 : tYear;
         days += daysInMonth(prevMonthYear, prevMonthIndex);
      }

      // Adjust months if negative
      if (months < 0) {
         years -= 1;
         months += 12;
      }

      return { years, months, days };
   }

   function handleChange(e) {
      const { name, value } = e.target;

      const digitsOnly = value.replace(/\D/g, "");
      const maxLengthByField = { day: 2, month: 2, year: 4 };
      const trimmed = digitsOnly.slice(0, maxLengthByField[name]);

      setValues((prevValues) => ({ ...prevValues, [name]: trimmed }));
      setErrors((prevErrors) => ({ ...prevErrors, [name]: "" }));
   }

   function handleSubmit(e) {
      e.preventDefault();
      console.log(values);
      // Validate inputs
      const newErrors = validate(values);
      setErrors(newErrors);

      const hasErrors = Object.values(newErrors).some((msg) => msg.length > 0);
      if (hasErrors) {
         setResult({ years: "--", months: "--", days: "--" });
         return;
      }

      const dayNum = Number(values.day);
      const monthNum = Number(values.month);
      const yearNum = Number(values.year);

      const age = calculateAge(dayNum, monthNum, yearNum);
      setResult(age);

      console.log("Valid input:", values);
   }

   return (
      <div className="age-card">
         <form className="age-form" noValidate onSubmit={handleSubmit}>
            <fieldset className="age-fields">
               <legend className="visually-hidden">
                  Enter your date of birth
               </legend>

               <div className={`field ${errors.day ? "field--error" : ""}`}>
                  <label className="field__label" htmlFor="day">
                     Day
                  </label>
                  <input
                     className="field__input"
                     id="day"
                     name="day"
                     type="text"
                     inputMode="numeric"
                     placeholder="DD"
                     maxLength="2"
                     aria-describedby="day-error"
                     value={values.day}
                     onChange={handleChange}
                  />
                  <p className="field__error" id="day-error" aria-live="polite">
                     {errors.day}
                  </p>
               </div>

               <div className={`field ${errors.month ? "field--error" : ""}`}>
                  <label className="field__label" htmlFor="month">
                     Month
                  </label>
                  <input
                     className="field__input"
                     id="month"
                     name="month"
                     type="text"
                     inputMode="numeric"
                     placeholder="MM"
                     maxLength="2"
                     aria-describedby="month-error"
                     value={values.month}
                     onChange={handleChange}
                  />
                  <p
                     className="field__error"
                     id="month-error"
                     aria-live="polite"
                  >
                     {errors.month}
                  </p>
               </div>

               <div className={`field ${errors.year ? "field--error" : ""}`}>
                  <label className="field__label" htmlFor="year">
                     Year
                  </label>
                  <input
                     className="field__input"
                     id="year"
                     name="year"
                     type="text"
                     inputMode="numeric"
                     placeholder="YYYY"
                     maxLength="4"
                     aria-describedby="year-error"
                     value={values.year}
                     onChange={handleChange}
                  />
                  <p
                     className="field__error"
                     id="year-error"
                     aria-live="polite"
                  >
                     {errors.year}
                  </p>
               </div>
            </fieldset>

            <button
               className="submit"
               type="submit"
               aria-label="Calculate my age"
            >
               <img
                  className="submit__icon"
                  src={arrowIcon}
                  alt="Calculate my age"
               />
            </button>
         </form>

         <div className="result" aria-live="polite">
            <p className="result__line">
               <span className="result__value">{animatedYears ?? "--"}</span>{" "}
               years
            </p>
            <p className="result__line">
               <span className="result__value">{animatedMonths ?? "--"}</span>{" "}
               months
            </p>
            <p className="result__line">
               <span className="result__value">{animatedDays ?? "--"}</span>{" "}
               days
            </p>
         </div>
      </div>
   );
}
