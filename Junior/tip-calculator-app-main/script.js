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

//////////////////////////////////////
///// FUNCTIONS
const calcTip = function (tip) {
   return bill.value * (tip / 100);
};

const tipPerPerson = function (percent) {
   // calculate tip of bill per person
   const calcTipPerPerson = calcTip(percent) / noOfPeople.value;
   // display tip amount
   tipAmount.textContent = `$${Number(calcTipPerPerson.toFixed(2))}`;
};

const totalPerPerson = function (percent) {
   // add bill + tip
   const totalBill = Number(bill.value) + Number(calcTip(percent));
   // calculate & display total per person amount
   totalAmount.textContent = `$${(totalBill / noOfPeople.value).toFixed(2)}`;
};

// calculate custom tip & total per person using above functions parsing in customTip.value
const calcCustomTip = function () {
   tipPerPerson(customTip.value);
   totalPerPerson(customTip.value);
};

// calculate totals based on user input
const calcTotals = function (percent) {
   if (
      bill.value &&
      noOfPeople.value &&
      percent.textContent &&
      !customTip.value
   ) {
      tipPerPerson(percent.textContent);
      totalPerPerson(percent.textContent);
   } else if (bill.value && noOfPeople.value && customTip.value) {
      calcCustomTip();
   } else {
      resetTotals();
   }
};

const resetTotals = function () {
   // set totals to 0
   tipAmount.textContent = "$0.00";
   totalAmount.textContent = "$0.00";
};

//////////////////////////////////////
///// EVENT LISTENERS
// get tip value by clicking on each button and attach event listeners
tips.forEach(function (i) {
   i.addEventListener("click", () => {
      // clear custom tip value and calculate totals on tip click
      customTip.value = "";
      calcTotals(i);

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
            calcTotals(i);
         }
      });

      bill.addEventListener("keyup", () => {
         calcTotals(i);
      });

      customTip.addEventListener("keyup", () => {
         calcTotals(customTip);
      });
   });
});
