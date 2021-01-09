class Review {
    constructor(review){ 
        
        this.makeup_id = review.makeup_id
        this.comment = review.comment
        this.stars = review.stars
        this.id = review.id
    }

    static createReview(e){
        e.preventDefault()
    
        const commentInput = e.target.children[2].value
        const starInput = parseInt(e.target.children[4].value)
        const makeupId = parseInt(e.target.parentElement.dataset.id)
        const reviewList = e.target.nextElementSibling

        // go through all the make up to find the object you want, find the make up, push this review onto the makeup review list 
        // const makeup = 
        

        const review = Review.submitReview(commentInput, starInput, makeupId, reviewList)

        


        e.target.reset()
    }

    renderReview(reviewList){
        const commentLi = document.createElement('li')
        const outerstarDiv = document.createElement("div")
        const innerstarDiv = document.createElement("div")
        outerstarDiv.classList.add("stars-outer")
        outerstarDiv.classList.add("text-right")
        innerstarDiv.classList.add("stars-inner")
        outerstarDiv.appendChild(innerstarDiv)
        commentLi.dataset.id = this.makeup_id
        outerstarDiv.dataset.id = this.makeup_id
        commentLi.classList.add('list-group-item')
        commentLi.innerText = `${this.comment} - Star rating below`
        outerstarDiv.innerText = `${this.stars}`
        reviewList.append(commentLi, outerstarDiv)
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
            

            const makeup = Makeup.allMakeup.find(m => parseInt(m.id) === newReview.makeup_id)
            
            
            
            

            makeup.reviews.push(newReview)
            makeup.updateRating()
            
        })
    }

}