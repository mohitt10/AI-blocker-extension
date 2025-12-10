// Contains the code for popup
const checkbox = document.getElementById("check");
const onText = document.getElementById("ontext");
const offText = document.getElementById("offtext");

checkbox.addEventListener("change", () => {
    if (checkbox.checked) {
        onText.classList.add("hidden");
        offText.classList.remove("hidden");
    } else {
        onText.classList.remove("hidden");
        offText.classList.add("hidden");
    }
});