const navToggle = function () {
   const burger = document.querySelector(".nav__menu-burger");
   const navList = document.querySelector(".nav__menu-list");

   burger.addEventListener("click", function () {
      //Toggle the nav bar
      navList.classList.toggle("nav__menu-list--active");

      //Toggle the burger animation
      burger.classList.toggle("active");
   });
};

//Call the function
navToggle();
