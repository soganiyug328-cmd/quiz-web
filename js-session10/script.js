// script.js
const themeButton = document.getElementById("themeButton");
themeButton.addEventListener("click", function () {
    document.body.classList.toggle("dark");
    themeButton.textContent = document.body.classList.contains("dark") ? "Light Mode" : "Dark Mode";
});
