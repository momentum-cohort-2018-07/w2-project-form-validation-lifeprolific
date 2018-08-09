var formElement = document.getElementById("parking-form")
var inputFields = document.getElementsByTagName("input")
var inputDivs = document.getElementsByClassName("input-field")
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
    for (inputDiv of inputDivs) {
        updateAlerts(inputDiv)
    }
}

function flagBlank() {
    if (inputField.value.trim() === '') {
        alerts[inputField.id].push(inputField.id + " cannot be blank")
    }
}

function gatherAlerts(inputElement) {
    var elementAlerts = []
    for (htmlElement of inputElement.children) {
        if (alerts[htmlElement.id] != undefined) {
            elementAlerts = elementAlerts.concat(alerts[htmlElement.id])
        }
        else {
            elementAlerts = elementAlerts.concat(gatherAlerts(htmlElement))
        }
    }
    return elementAlerts
}

function updateAlerts(inputDiv) {
    var elementAlerts = gatherAlerts(inputDiv)
    var alertsDivExists = 1
    if (elementAlerts.length > 0) {
        var alertsDiv = document.createElement("div")
        alertsDiv.classList.add("alerts")
        alertsDiv.innerText = elementAlerts
        inputDiv.appendChild(alertsDiv)
    }
}

formElement.addEventListener("submit", submitClicked)