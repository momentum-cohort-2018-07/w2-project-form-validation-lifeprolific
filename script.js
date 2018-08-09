var formElement = document.getElementById("parking-form")
var inputFields = document.getElementsByTagName("input")
var groupedIDs = ["car-year", "car-make", "car-model"]

function submitClicked(event) {
    event.preventDefault()
    flagBlanks()
}

function flagBlanks() {
    for (inputField of inputFields) {
        if (inputField.value.trim() === '') {
            if (groupedIDs.includes(inputField.id)) {
                if (!inputField.parentElement.parentElement.classList.contains("input-invalid")) {
                    var alertDiv = document.createElement("div")
                    alertDiv.classList.add("alert")
                    alertDiv.innerText = inputField.id + " is EXTREMELY required"
                    inputField.parentElement.parentElement.classList.add("input-invalid")
                    inputField.parentElement.parentElement.append(alertDiv)
                }
            }
            else {
                if (!inputField.parentElement.classList.contains("input-invalid")) {
                    var alertDiv = document.createElement("div")
                    alertDiv.classList.add("alert")
                    alertDiv.innerText = inputField.id + " is EXTREMELY required"
                    inputField.parentElement.classList.add("input-invalid")
                    inputField.parentElement.append(alertDiv)
                }
            }
        }
    }
}

formElement.addEventListener("submit", submitClicked)