const endPoint = "http://localhost:3000/makeups"
const createMakeupForm = document.getElementById("create-makeup-form")
const makeupContainer = document.getElementById("makeup_container")

getMakeups()

function getMakeups(){
    fetch(endPoint)
    .then(r => r.json())
    .then(makeups => {
        makeups.data.forEach(makeup => {
            const makeupDiv = document.createElement("div")
            makeupDiv.dataset.id = makeup.id 
            const makeupMarkup = `
        
              <h2>${makeup.attributes.product_name}</h2>
              <h3>${makeup.attributes.brand}</h3>
              <p>${makeup.attributes.product_type}</p>
              <p>${makeup.attributes.shade}</p>
              <p>${makeup.attributes.skin_tone}</p>
              <p>${makeup.attributes.skin_type}</p>
              ${makeup.attributes.reviews.forEach(review => {
                  
                  return `<p>${review.comment}</p>
                  <p>${review.stars}</p>`
              })}
            <br><br>`;

            makeupContainer.innerHTML += makeupMarkup
        })
    })
}

createMakeupForm.addEventListener("submit", (e) => createFormHandler(e))



function createReviewFromHandler(e){
    e.preventDefault()
    console.log("reviewed")
}

function createFormHandler(e){
    e.preventDefault()
    const product_name = document.querySelector("#product_name").value
    const product_type = document.querySelector("#product_type").value
    const skin_type = document.querySelector("#skin_type").value
    const skin_tone = document.querySelector("#skin_tone").value
    const brand = document.querySelector("#brand").value 
    const shade = document.querySelector("#shade").value
    postMakeup(product_name, product_type, skin_type, skin_tone, brand, shade)

    product_name.innerText = ""

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


{/* <h4>Leave a Review</h4>
<form id="create-review-form">
  <label for="comment">Comment</label>
  <input id="review-comment" name="comment">
  <label for="stars">Stars</label>
  <select id="stars" name="stars">
      <option value="1">1</option>
      <option value="2">2</option>
      <option value="3">3</option>
      <option value="4">4</option>
      <option value="5">5</option>
  </select>
<input id='create-review' type="submit" name="submit" value="Create Review"
</form> */}