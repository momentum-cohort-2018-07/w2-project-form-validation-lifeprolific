var formElement = document.getElementById("parking-form")
var inputFields = document.getElementsByTagName("input")
var inputDivs = document.getElementsByClassName("input-field")

function findParentInputDiv (htmlElement) {
    if (htmlElement.parentElement.classList[0] === "input-field") {
        return htmlElement.parentElement
    }
    else {
        return findParentInputDiv(htmlElement.parentElement)
    }
}

function checkNotBlank(inputElement) {
    var response = {
        errorFound: false,
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
        if (checkNotBlank(inputField).errorFound) {
            console.log(checkNotBlank(inputField).errorMessage)
        }
    }
}

formElement.addEventListener("submit", submitClicked)