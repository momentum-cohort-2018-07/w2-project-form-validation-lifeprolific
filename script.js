var formElement = document.getElementById("parking-form")
var inputFields = document.getElementsByTagName("input")
var specialIDs = ["car-year", "car-make", "car-model"]

function submitClicked(event) {
    event.preventDefault()
    flagBlanks()
}

function flagBlanks() {
    for (inputField of inputFields) {
        if (inputField.value.trim() === '') {
            if (specialIDs.includes(inputField.id)) {
                inputField.parentElement.parentElement.classList.add("input-invalid")
            }
            else {
                inputField.parentElement.classList.add("input-invalid")
            }
        }
    }
}

formElement.addEventListener("submit", submitClicked)