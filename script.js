var formElement = document.getElementById("parking-form")
var inputFields = document.getElementsByTagName("input")
var inputDivs = document.getElementsByClassName("input-field")
var fieldValidations = {
    "name": [checkNotBlank],
    "car-year": [checkNotBlank],
    "car-make": [checkNotBlank],
    "car-model": [checkNotBlank],
    "start-date": [checkNotBlank],
    "days": [checkNotBlank],
    "credit-card": [checkNotBlank],
    "cvv": [checkNotBlank],
    "expiration": [checkNotBlank]
}

function findParentInputDiv(htmlElement) {
    if (htmlElement.parentElement.classList[0] === "input-field") {
        return htmlElement.parentElement
    }
    else {
        return findParentInputDiv(htmlElement.parentElement)
    }
}

function findError(htmlElement, errorClass) {
    for (childElement of htmlElement.children) {
        if (childElement.classList.contains(errorClass)) {
            return childElement
        }
        else {
            findError(childElement)
        }
    }
    return false
}

function validate(inputElement) {
    for (validationMethod of fieldValidations[inputElement.id]) {
        var response = validationMethod(inputElement)
        var errorClass = inputElement.id + "-" + response.errorType
        var errorMessageDiv = findError(findParentInputDiv(inputElement), errorClass)
        if (response.errorFound) {
            if (!errorMessageDiv) {
                var newErrorDiv = document.createElement("div")
                newErrorDiv.classList.add(errorClass)
                newErrorDiv.classList.add("error_message")
                newErrorDiv.innerText = response.errorMessage
                findParentInputDiv(inputField).appendChild(newErrorDiv)
            }
        }
        else if (errorMessageDiv) {
            errorMessageDiv.remove()
        }
    }
    var parentInputDiv = findParentInputDiv(inputElement)
    if(findError(parentInputDiv, "error_message")) {
        parentInputDiv.classList.add("input-invalid")
        parentInputDiv.classList.remove("input-valid")
    }
    else {
        parentInputDiv.classList.add("input-valid")
        parentInputDiv.classList.remove("input-invalid")
    }
}

function checkNotBlank(inputElement) {
    var response = {
        errorFound: false,
        errorType: "blank",
        errorMessage: ""
    }
    if (inputElement.value.trim() === "") {
        response.errorFound = true
        response.errorMessage = inputElement.id + " cannot be blank"
    }
    return response
}

function submitClicked(event) {
    event.preventDefault()
    for (inputField of inputFields) {
        validate(inputField)
    }
}

formElement.addEventListener("submit", submitClicked)