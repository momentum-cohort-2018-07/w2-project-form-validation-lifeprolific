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

function submitClicked(event) {
    event.preventDefault()
    for (inputField of inputFields) {
        // validate field
    }
}

formElement.addEventListener("submit", submitClicked)