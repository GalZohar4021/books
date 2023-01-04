const { useState, useEffect, useRef } = React
const { useParams, Link, useNavigate } = ReactRouterDOM

import { reviewService } from "../services/review.service.js"
import { ReviewEdit } from "./review-edit.jsx"
import { ReviewList } from "./review-list.jsx"

export function Reviews({ id }) {
    const [reviews, setReviews] = useState(reviewService.getEmptyReviews(id).reviews)
    useEffect(() => {
        getReviews()
    }
        , [])

    function getReviews() {
        reviewService.find(id).then((reviews) => {
            console.log(reviews)
            if (reviews === -1) reviewService.add(id)
            else setReviews(reviews.reviews)
        })

    }

    function onReviewSubmit(review) {
        console.log(review)
        const newReviews = [...reviews, review]
        reviewService.save({ id, reviews: newReviews})
        setReviews(newReviews)
    }

    return <section className="reviews">
        <h1 className="review-header">Add Review</h1>
        <ReviewEdit onReviewSubmit={onReviewSubmit} />

        <h1 className="review-header">Reviews</h1>
        <ReviewList reviews={reviews} />
    </section>
}