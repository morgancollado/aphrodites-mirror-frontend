class Review {
    constructor(review){ 
        
        this.makeup_id = review.makeup_id
        this.comment = review.comment
        this.stars = review.stars
        this.id = review.id
    }

    static createReview(e){
        e.preventDefault()
    
        const commentInput = e.target.children[1].value
        const starInput = parseInt(e.target.children[3].value)
        const makeupId = parseInt(e.target.parentElement.dataset.id)
        const reviewList = e.target.nextElementSibling
        
        

        Review.submitReview(commentInput, starInput, makeupId, reviewList)
        e.target.reset()
    }

    renderReview(reviewList){
        const commentLi = document.createElement('li')
        commentLi.dataset.id = this.makeup_id
        commentLi.innerText = this.comment
        const starLi = document.createElement("li")
        starLi.dataset.id = this.makeup_id
        starLi.innerText = this.stars

        commentLi.appendChild(starLi)
        reviewList.appendChild(commentLi)
    }

    static submitReview(comment, stars, makeupId, reviewList){
        
        const configObj = {
            method: "POST",
            headers: {
                "content-type": "application/json",
                "accept": "application/json"
            },
            body: JSON.stringify({
                comment: comment,
                stars: stars,
                makeup_id: makeupId
            })
        }
        
        fetch(reviewEndPoint, configObj)
        .then(r => r.json())
        .then(review => {
            
            let newReview = new Review(review.data.attributes)
            newReview.renderReview(reviewList)
        })
    }

}