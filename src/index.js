const endPoint = "http://localhost:3000/makeups"
const reviewEndPoint = "http://localhost:3000/reviews"
const createMakeupForm = document.getElementById("create-makeup-form")
const makeupContainer = document.getElementById("makeup_container")

Makeup.fetchMakeup()


createMakeupForm.addEventListener("submit", Makeup.formHandler)

