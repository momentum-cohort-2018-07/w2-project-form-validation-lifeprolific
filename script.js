var formElement = document.getElementById("parking-form")

function submitClicked(event) {
    event.preventDefault()
    console.log("submit click detected")
}

formElement.addEventListener("submit", submitClicked)