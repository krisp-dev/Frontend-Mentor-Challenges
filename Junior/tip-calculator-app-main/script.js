"use strict";

//////////////////////////////////////
///// DOM ELEMENTS
const bill = document.querySelector(".inputs__bill-input");
const tips = document.querySelectorAll(".inputs__tips-item");
const customTip = document.querySelector(".inputs__tips-input");
const noOfPeople = document.querySelector(".inputs__people-input");
const tipAmount = document.getElementById("tipAmount");
const totalAmount = document.getElementById("totalAmount");
const resetBtn = document.querySelector(".btn");
const error = document.querySelector(".error");

let tipNumber;

//////////////////////////////////////
///// FUNCTIONS
const calcTip = function (tip) {
   return bill.value * (tip / 100);
};

const tipPerPerson = function (percent) {
   const calcTipPerPerson = calcTip(percent) / noOfPeople.value;
   tipAmount.textContent = `$${Number(calcTipPerPerson.toFixed(2))}`;
};

const totalPerPerson = function (percent) {
   const totalBill = Number(bill.value) + Number(calcTip(percent));
   totalAmount.textContent = `$${(totalBill / noOfPeople.value).toFixed(2)}`;
};

const calcCustomTip = function () {
   tipPerPerson(customTip.value);
   totalPerPerson(customTip.value);
};

// calculate totals based on user input
const calcTotals = function (percent) {
   if (bill.value && noOfPeople.value && percent && !customTip.value) {
      tipPerPerson(percent);
      totalPerPerson(percent);
   } else if (bill.value && noOfPeople.value && customTip.value) {
      calcCustomTip();
   } else {
      resetTotals();
   }
};

// reset tip amount per person & total per person
const resetTotals = function () {
   tipAmount.textContent = "$0.00";
   totalAmount.textContent = "$0.00";
};

//////////////////////////////////////
///// EVENT LISTENERS

// get tip value by clicking on each button and attach event listeners
tips.forEach(function (i) {
   i.addEventListener("click", () => {
      /* let current = document.getElementsByClassName("active");
      current.className = i.className.replace(" active", "");
      console.log(i.className);
      this.className += " active"; */

      tipNumber = i.textContent.slice(0, -1);

      //fix for when noOfPeople is <1 and tip is clicked it displays $Infinity
      if (noOfPeople.value < 1) {
         calcTotals(tipNumber);
         resetTotals();
      } else {
         // clear custom tip value and calculate totals on tip click
         customTip.value = "";
         calcTotals(tipNumber);
      }

      // add event listeners for each of the input fields
      noOfPeople.addEventListener("keyup", () => {
         // check if number of people is empty or 0 and display error msg
         if (noOfPeople.value === "" || noOfPeople.value < 1) {
            error.classList.add("error-active");
            noOfPeople.classList.add("error-border");
            resetTotals();
         } else {
            error.classList.remove("error-active");
            noOfPeople.classList.remove("error-border");
            calcTotals(tipNumber);
         }
      });

      bill.addEventListener("keyup", () => {
         //fix for when noOfPeople is <1 and bill is changed it displays $Infinity
         if (noOfPeople.value < 1) {
            resetTotals();
         } else {
            calcTotals(tipNumber);
         }
      });

      customTip.addEventListener("keyup", () => {
         calcTotals(customTip);
      });
   });
});

// reset everything after button click
resetBtn.addEventListener("click", () => {
   bill.value = "";
   noOfPeople.value = "";
   customTip.value = "";
   tipAmount.textContent = "$0.00";
   totalAmount.textContent = "$0.00";
   error.classList.remove("error-active");
   noOfPeople.classList.remove("error-border");
   tipNumber = 0;
});
