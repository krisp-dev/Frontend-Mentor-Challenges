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
// calculate single tip
const calcTip = function (tip) {
   return bill.value * (tip / 100);
};

// calculate tip per person & display it
const tipPerPerson = function (percent) {
   const calcTipPerPerson = calcTip(percent) / noOfPeople.value;
   tipAmount.textContent = `$${Number(calcTipPerPerson.toFixed(2))}`;
};

// calculate total per person & display it
const totalPerPerson = function (percent) {
   const totalBill = Number(bill.value) + Number(calcTip(percent));
   totalAmount.textContent = `$${(totalBill / noOfPeople.value).toFixed(2)}`;
};

// calculate custom tip using above functions
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
let current = document.getElementsByClassName("active");
// get tip value by clicking on each button and attach event listeners
tips.forEach(function (i) {
   i.addEventListener("click", () => {
      // add 'active' class to current tip% clicked
      if (current[0]) {
         current[0].className = current[0].className.replace(" active", "");
      }
      i.className += " active";

      // remove % symbol and calculate totals
      tipNumber = i.textContent.slice(0, -1);
      customTip.value = "";
      resetBtn.removeAttribute("disabled");
      calcTotals(tipNumber);

      // calculate custom tip
      customTip.addEventListener("keyup", () => {
         i.classList.remove("active");
         calcTotals(customTip);
      });
   });
});

// Number of People event listener
noOfPeople.addEventListener("keyup", () => {
   // check if number of people is empty or 0 and display error msg
   if (noOfPeople.value === "" || noOfPeople.value < 1) {
      error.classList.add("error-active");
      noOfPeople.classList.add("error-border");
      resetTotals();
   } else {
      resetBtn.removeAttribute("disabled");
      error.classList.remove("error-active");
      noOfPeople.classList.remove("error-border");
      calcTotals(tipNumber);
   }
});

// Bill input event listener
bill.addEventListener("keyup", () => {
   //fix for when noOfPeople is <1 and bill is changed it displays $Infinity
   if (noOfPeople.value < 1) {
      resetTotals();
   } else {
      calcTotals(tipNumber);
   }
});

// Reset everything after button click
resetBtn.addEventListener("click", () => {
   bill.value = "";
   noOfPeople.value = "";
   customTip.value = "";
   tipAmount.textContent = "$0.00";
   totalAmount.textContent = "$0.00";
   error.classList.remove("error-active");
   noOfPeople.classList.remove("error-border");
   tipNumber = 0;
   // remove active class from tip% button
   if (current[0]) {
      current[0].className = current[0].className.replace(" active", "");
   }
   resetBtn.toggleAttribute("disabled");
});
