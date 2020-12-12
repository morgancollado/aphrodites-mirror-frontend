console.log("here")

const endPoint = "http://localhost:3000/makeups"

document.addEventListener("DOMContentLoaded", () => {
    getMakeups()
})

function getMakeups(){
    fetch(endPoint)
    .then(r => r.json())
    .then(makeups => {
        makeups.data.forEach(makeup => {
            debugger
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