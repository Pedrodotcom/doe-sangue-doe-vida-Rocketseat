document
    .querySelector('header button')
    .addEventListener("click", function() {
        document
            .querySelector('.form')
            .classList.toggle('hide')
    })

function checkFields(event) {
    const valuesToCheck = [
        "name",
        "email",
        "bloodtype"
    ]

    const isEmpty = valuesToCheck.find(function(fields) {

        const checkIfIsString = typeof event.target[fields].value === "string"
        const checkIfIsEmpty = !event.target[fields].value.trim()

        if (checkIfIsString && checkIfIsEmpty) {
            return true
        }
    })

    if (isEmpty) {
        event.preventDefault()
        alert("Por favor, preencha todos os campos.")
    }
}