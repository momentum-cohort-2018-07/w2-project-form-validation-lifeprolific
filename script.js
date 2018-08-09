var formElement = document.getElementById("parking-form")
var inputFields = document.getElementsByTagName("input")
var groupedIDs = ["car-year", "car-make", "car-model"]
var alerts = {}

// set up alerts object
for (inputField of inputFields) {
    alerts[inputField.id]=[]
}

function submitClicked(event) {
    event.preventDefault()

    for (inputField of inputFields) {
        flagBlank(inputField)
    }


}

function flagBlank() {
    if (inputField.value.trim() === '') {
        alerts[inputField.id].push(inputField.id + " cannot be blank")
    }
}




formElement.addEventListener("submit", submitClicked)