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
    "credit-card": [checkNotBlank, checkValidCCNumber],
    "cvv": [checkNotBlank, check3DigitNumber],
    "expiration": [checkNotBlank, checkMMYYDateFuture]
}

function findParentInputDiv(htmlElement) {
    if (htmlElement.parentElement.classList[0] === "input-field") {
        return htmlElement.parentElement
    }
    else {
        return findParentInputDiv(htmlElement.parentElement)
    }
}

function findErrors(htmlElement, errorClass) {
    var errorArray = []
    function recursiveLoop (htmlInput, classInput) {
        for (var childElement of htmlInput.children) {
            if (childElement.classList.contains(classInput)) {
                errorArray.push(childElement)
            }
            else {
                recursiveLoop(childElement, classInput)
            }
        }
    }
    recursiveLoop(htmlElement, errorClass)
    if (errorArray.length === 0) {
        return false
    }
    else {
        return errorArray
    }
}

function validate(inputElement) {
    for (var validationMethod of fieldValidations[inputElement.id]) {
        var response = validationMethod(inputElement)
        var errorClass = inputElement.id + "-" + response.errorType
        var errorMessageDivs = findErrors(findParentInputDiv(inputElement), errorClass)
        if (response.errorFound) {
            if (!errorMessageDivs) {
                var newErrorDiv = document.createElement("div")
                newErrorDiv.classList.add(errorClass)
                newErrorDiv.classList.add("error_message")
                newErrorDiv.innerText = response.errorMessage
                findParentInputDiv(inputElement).appendChild(newErrorDiv)
            }
        }
        else if (errorMessageDivs) {
            for (var errorMessageDiv of errorMessageDivs) {
                errorMessageDiv.remove()
            }
        }
    }
    var parentInputDiv = findParentInputDiv(inputElement)
    if (findErrors(parentInputDiv, "error_message")) {
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
    if (inputElement.valueAsDate < dateNow.setHours(0, 0, 0, 0)) {
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

function checkValidCCNumber(inputElement) {
    function validateCardNumber(number) {
        var regex = new RegExp("^[0-9]{16}$");
        if (!regex.test(number))
            return false;
    
        return luhnCheck(number);
    }
    
    function luhnCheck(val) {
        var sum = 0;
        for (var i = 0; i < val.length; i++) {
            var intVal = parseInt(val.substr(i, 1));
            if (i % 2 == 0) {
                intVal *= 2;
                if (intVal > 9) {
                    intVal = 1 + (intVal % 10);
                }
            }
            sum += intVal;
        }
        return (sum % 10) == 0;
    }

    var response = {
        errorFound: false,
        errorType: "invalidCCNumber",
        errorMessage: ""
    }
    if (!validateCardNumber(inputElement.value.trim())) {
        response.errorFound = true
        response.errorMessage = inputElement.id + " must be a valid credit card number"
    }
    return response
}

function checkMMYYDateFuture (inputElement) {
    var response = {
        errorFound: false,
        errorType: "MMYYNotFuture",
        errorMessage: ""
    }
    var dateNow = new Date()
    var dateFuture = false
    var inputYY = inputElement.value.trim().slice(3,5)
    var inputMM = inputElement.value.trim().slice(0,2)
    var currentYY = dateNow.getFullYear() - 2000
    var currentMM = dateNow.getMonth() + 1
    if (inputYY > currentYY) {
        dateFuture = true
    }
    else if (inputYY == currentYY && inputMM > currentMM) {
        dateFuture = true
    }
    if (!dateFuture) {
        response.errorFound = true
        response.errorMessage = inputElement.id + " must be in future"
    }
    return response
}

function calculateTotal(startDate, days) {
    var thisDay = startDate
    var prices = [7, 5, 5, 5, 5, 5, 7]
    var total = 0
    for (var index = 0; index < days; index++ , thisDay.setDate(thisDay.getDate() + 1)) {
        total += prices[thisDay.getDay()]
    }
    return total
}

function updateTotal() {
    if (findErrors(formElement, "error_message")) {
        document.getElementById("total").innerText = ""
    }
    else {
        var total = calculateTotal(document.getElementById("start-date").valueAsDate, document.getElementById("days").value)
        document.getElementById("total").innerText = "$" + total + ".00"
    }
}

function submitClicked(event) {
    event.preventDefault()
    for (var inputField of inputFields) {
        validate(inputField)
    }
    updateTotal()
}

formElement.addEventListener("submit", submitClicked)