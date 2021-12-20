const toggleSwitch = document.getElementById("checkbox");
const darkTheme = "dark";
const iconTheme = "bx-toggle-right";

// Previously selected theme
const selectedTheme = localStorage.getItem("selected-theme");

// Get current theme by validating the dark-theme class
const getCurrentTheme = () =>
   document.body.classList.contains(darkTheme) ? "dark" : "light";

// Check if theme has been already selected
if (selectedTheme) {
   // Check if theme was activated or de-activated
   document.body.classList[selectedTheme === "dark" ? "add" : "remove"](
      darkTheme
   );
}

// Toggle & save the theme
toggleSwitch.addEventListener("click", () => {
   document.body.classList.toggle(darkTheme);
   localStorage.setItem("selected-theme", getCurrentTheme());
});
