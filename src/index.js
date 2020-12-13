console.log("here")

const endPoint = "http://localhost:3000/makeups"
const createMakeupForm = document.getElementById("create-makeup-form")

document.addEventListener("DOMContentLoaded", () => {
    getMakeups()
})

function getMakeups(){
    fetch(endPoint)
    .then(r => r.json())
    .then(makeups => {
        makeups.data.forEach(makeup => {
            
            const makeupMarkup = `
            <div data-id=${makeup.id}>
              <h2>${makeup.attributes.product_name}</h2>
              <h3>${makeup.attributes.brand}</h3>
              <p>${makeup.attributes.product_type}</p>
              <p>${makeup.attributes.shade}</p>
              <p>${makeup.attributes.skin_tone}</p>
              <p>${makeup.attributes.skin_type}</p>
              <p>${makeup.attributes.reviews}</p>
    
            </div>
            <br><br>`;
            const makeupContainer = document.getElementById("makeup_container")

            makeupContainer.innerHTML += makeupMarkup
        })
    })
}

createMakeupForm.addEventListener("submit", (e) => createFormHandler(e))

function createFormHandler(e){
    e.preventDefault()
    const productName = document.querySelector("#product_name").value
    const productType = document.querySelector("#product_type").value
    const skinType = document.querySelector("#skin_type").value
    const skinTone = document.querySelector("#skin_tone").value
    const brand = document.querySelector("#brand").value 
    const shade = document.querySelector("#shade").value
    postMakeup(productName, productType, skinType, skinTone, brand, shade)

}

function postMakeup(productName, productType, skinType, skinTone, brand, shade) {
    console.log(productName, productType, skinType, skinTone, brand, shade)
}