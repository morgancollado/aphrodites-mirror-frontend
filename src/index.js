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
    const product_name = document.querySelector("#product_name").value
    const product_type = document.querySelector("#product_type").value
    const skin_type = document.querySelector("#skin_type").value
    const skin_tone = document.querySelector("#skin_tone").value
    const brand = document.querySelector("#brand").value 
    const shade = document.querySelector("#shade").value
    postMakeup(product_name, product_type, skin_type, skin_tone, brand, shade)

}

function postMakeup(product_name, product_type, skin_type, skin_tone, brand, shade) {
    let bodyData = {product_name, product_type, skin_type, skin_tone, brand, shade}
    let configObj = {
        method: "POST",
        headers: {
            "content-type":"application/json",
            "accept":"application/json"
        },
        body: JSON.stringify(bodyData)
    }

    fetch(endPoint, configObj)
    .then(r => r.json())
    .then(makeup => {
        const makeupMarkup =`
        <div data-id=${makeup.id}>
        <h2>${makeup.product_name}</h2>
        <h3>${makeup.brand}</h3>
        <p>${makeup.product_type}</p>
        <p>${makeup.shade}</p>
        <p>${makeup.skin_tone}</p>
        <p>${makeup.skin_type}</p>
        </div>
        <br><br>`

        document.querySelector("#makeup_container").innerHTML += makeupMarkup
    })
}