class Makeup {

    static allMakeup = []

    constructor(makeup){
        this.id = makeup.id
        this.product_name = makeup.attributes.product_name
        this.brand = makeup.attributes.brand
        this.product_type = makeup.attributes.product_type
        this.shade = makeup.attributes.shade
        this.skin_tone = makeup.attributes.skin_tone
        this.skin_type = makeup.attributes.skin_type
        this.reviews = makeup.attributes.reviews
        Makeup.allMakeup.push(this)
    }

static renderMakeups(){
    for(let makeup of this.allMakeup){
        makeup.renderMakeup()
    }
}

static fetchMakeup(){
    fetch(endPoint)
    .then(r => r.json())
    .then(makeups => {
        makeups.data.forEach(makeup => {
            let newList = new Makeup(makeup)
        })
        this.renderMakeups()
    })
}

renderMakeup(){
    const makeupDiv = document.createElement("div")
    makeupDiv.dataset.id = this.id

    const productName = document.createElement("h2")
    productName.innerText = this.product_name

    const brand = document.createElement("h3")
    brand.innerText = this.brand

    const productType = document.createElement("p")
    productType.innerText = this.product_type

    const shade = document.createElement("p")
    shade.innerText = this.shade

    const skinTone = document.createElement("p")
    skinTone.innerText = this.skin_tone

    const skinType = document.createElement("p")
    skinType.innerText = this.skin_type

    const reviewForm = document.createElement('form')
    reviewForm.innerHTML += `
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
  <input id='create-review' type="submit" name="submit" value="Create Review">`

  reviewForm.addEventListener("submit", Review.createReview)

//   const reviewList = document.createElement("ul")
//   this.reviews.forEach(review => {
//       let reviewObj = new Review(review)
//       reviewObj.renderReview(reviewList)
//   })
  makeupDiv.append(productName, brand, productType, shade, skinTone, skinType, reviewForm)

  makeupContainer.appendChild(makeupDiv)

  createMakeupForm.reset()
}

static formHandler(e){
    e.preventDefault()
    const product_name = document.querySelector("#product_name").value
    const product_type = document.querySelector("#product_type").value
    const skin_type = document.querySelector("#skin_type").value
    const skin_tone = document.querySelector("#skin_tone").value
    const brand = document.querySelector("#brand").value 
    const shade = document.querySelector("#shade").value
    postMakeup(product_name, product_type, skin_type, skin_tone, brand, shade)
}

static postMakeup(product_name, product_type, skin_type, skin_tone, brand, shade){
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
        let newMakeup = new Makeup(makeup.data)
        newMakeup.renderMakeup()
    })
}

}
