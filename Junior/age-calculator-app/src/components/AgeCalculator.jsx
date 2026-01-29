import arrowIcon from "../assets/images/icon-arrow.svg";

export default function AgeCalculator() {
   return (
      <div className="age-card">
         <form className="age-form" noValidate>
            <fieldset className="age-fields">
               <legend className="visually-hidden">
                  Enter your date of birth
               </legend>

               <div className="field">
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
                  />
                  <p
                     className="field__error"
                     id="day-error"
                     aria-live="polite"
                  ></p>
               </div>

               <div className="field">
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
                  />
                  <p
                     className="field__error"
                     id="month-error"
                     aria-live="polite"
                  ></p>
               </div>

               <div className="field">
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
                  />
                  <p
                     className="field__error"
                     id="year-error"
                     aria-live="polite"
                  ></p>
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
               <span className="result__value">--</span> years
            </p>
            <p className="result__line">
               <span className="result__value">--</span> months
            </p>
            <p className="result__line">
               <span className="result__value">--</span> days
            </p>
         </div>
      </div>
   );
}
