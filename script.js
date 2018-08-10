"use strict"

var formElement = document.getElementById("parking-form")
var inputFields = document.getElementsByTagName("input")
var inputDivs = document.getElementsByClassName("input-field")
var fieldValidations = {
    "name": [checkNotBlank],
    "car-year": [checkNotBlank, checkIsNumber, checkYearAfter1900, checkYearNotFuture],
    "car-make": [checkNotBlank],
    "car-model": [checkNotBlank],
    "start-date": [checkNotBlank, checkDateInFuture],
    "days": [checkNotBlank, checkIsNumber, checkDaysBetween1And30],
    "credit-card": [checkNotBlank],
    "cvv": [checkNotBlank, check3DigitNumber],
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
    for (var childElement of htmlElement.children) {
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
    for (var validationMethod of fieldValidations[inputElement.id]) {
        var response = validationMethod(inputElement)
        var errorClass = inputElement.id + "-" + response.errorType
        var errorMessageDiv = findError(findParentInputDiv(inputElement), errorClass)
        if (response.errorFound) {
            if (!errorMessageDiv) {
                var newErrorDiv = document.createElement("div")
                newErrorDiv.classList.add(errorClass)
                newErrorDiv.classList.add("error_message")
                newErrorDiv.innerText = response.errorMessage
                findParentInputDiv(inputElement).appendChild(newErrorDiv)
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
        response.errorMessage = inputElement.id + " is required"
    }
    return response
}

function checkIsNumber(inputElement) {
    var response = {
        errorFound: false,
        errorType: "notNumber",
        errorMessage: ""
    }
    if (isNaN(parseInt(inputElement.value.trim()))) {
        response.errorFound = true
        response.errorMessage = inputElement.id + " must be a number"
    }
    return response
}

function checkYearAfter1900(inputElement) {
    var response = {
        errorFound: false,
        errorType: "notAfter1900",
        errorMessage: ""
    }
    if (!(parseInt(inputElement.value.trim()) > 1900)) {
        response.errorFound = true
        response.errorMessage = inputElement.id + " must be after 1900"
    }
    return response
}

function checkYearNotFuture(inputElement) {
    var response = {
        errorFound: false,
        errorType: "futureYear",
        errorMessage: ""
    }
    if (parseInt(inputElement.value.trim()) > new Date().getFullYear()) {
        response.errorFound = true
        response.errorMessage = inputElement.id + " may not be in future"
    }
    return response
}

function checkDateInFuture(inputElement) {
    var response = {
        errorFound: false,
        errorType: "pastDate",
        errorMessage: ""
    }
    var dateNow = new Date()
    if (inputElement.valueAsDate < dateNow.setHours(0,0,0,0)) {
        response.errorFound = true
        response.errorMessage = inputElement.id + " must be in the future"
    }
    return response
}

function checkDaysBetween1And30(inputElement) {
    var response = {
        errorFound: false,
        errorType: "notBetween1And30",
        errorMessage: ""
    }
    var value = parseInt(inputElement.value.trim())
    if (value > 30 || value < 1) {
        response.errorFound = true
        response.errorMessage = inputElement.id + " must be between 1 and 30"
    }
    return response
}

function check3DigitNumber(inputElement) {
    var response = {
        errorFound: false,
        errorType: "not3DigitNumber",
        errorMessage: ""
    }
    var value = parseInt(inputElement.value.trim())
    if (isNaN(value) || inputElement.value.trim().length != 3) {
        response.errorFound = true
        response.errorMessage = inputElement.id + " must be a three digit number"
    }
    return response
}

function submitClicked(event) {
    event.preventDefault()
    for (var inputField of inputFields) {
        validate(inputField)
    }
}

formElement.addEventListener("submit", submitClicked)