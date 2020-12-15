class Review {
    constructor(review){ 
        this.makeup_id = review.makeup_id
        this.comment = review.comment
        this.stars = review.stars
    }

    static createReview(e){
        e.preventDefault()
        const commentInput = e.target.children[0].value
        const starInput = e.target.children[1].value
        const makeupId = e.target.parentElement.dataset.id

        Review.submitReview(commentInput, starInput, makeupId)
        e.target.reset()
    }

}