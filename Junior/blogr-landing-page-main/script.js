// Get all menu items from document
document.querySelectorAll(".nav-toggle").forEach(dropDownFunc);

// Burger icon opening menu
const navToggle = function () {
   const burger = document.querySelector(".hero__nav--burger");
   const nav = document.querySelector(".nav");

   burger.addEventListener("click", function () {
      // Toggle the nav bar
      nav.classList.toggle("nav--active");

      // Toggle burger close icon
      burger.classList.toggle("hero__nav--burger-active");
   });
};

// Dropdown menu Open and Close function
function dropDownFunc(dropDown) {
   if (dropDown.classList.contains("click-dropdown") === true) {
      dropDown.addEventListener("click", function (event) {
         event.preventDefault();

         if (
            this.nextElementSibling.classList.contains("dropdown-active") ===
            true
         ) {
            // Close the clicked dropdown
            this.parentElement.classList.remove("dropdown-open");
            this.nextElementSibling.classList.remove("dropdown-active");
         } else {
            // Close the opened dropdown
            closeDropdown();

            // Add the open and active class (Opening the dropdown)
            this.parentElement.classList.add("dropdown-open");
            this.nextElementSibling.classList.add("dropdown-active");
         }
      });
   }
}

// Listen to the doc click
window.addEventListener("click", function (event) {
   // Close the dropdown menu if click happens outside dropdown
   if (event.target.closest(".nav-container") === null) {
      // Close the opened dropdown
      closeDropdown();
   }
});

// Close the opened dropdowns
const closeDropdown = function () {
   // Remove the open and active class from other opened Dropdowns
   document.querySelectorAll(".nav-container").forEach(function (container) {
      container.classList.remove("dropdown-open");
   });

   document.querySelectorAll(".dropdown-menu").forEach(function (menu) {
      menu.classList.remove("dropdown-active");
   });
};

navToggle();
