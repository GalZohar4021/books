const { useState, useEffect, useRef } = React
const { useParams, Link, useNavigate } = ReactRouterDOM

import { reviewService } from "../services/review.service.js"
import { RangeInput } from "./input-range.jsx"

export function ReviewEdit({ onReviewSubmit }) {
    const [review, setReview] = useState(reviewService.getEmptyReview())


    function handleChange({ target }) {
        let { value, type, name: field } = target
        if (field === 'text') {
            value = target.value
        }
        else value = type === 'range' ? +value : value
        setReview((prevReview) => ({ ...prevReview, [field]: value }))
    }

    function getRangeChange(val) {
        setReview((prevReview) => ({ ...prevReview, rank: val }))
    }

    function onSubmit() {
        if(review.name.length && review.text.length && review.rank) onReviewSubmit(review)
    }

    return <section className="review-edit grid">
        <div className="review-line grid">
            <label htmlFor='review-name'>Your name</label>
            <input type='text' name='name' id='review-name' placeholder="Enter your name" onChange={handleChange} value={review.name} />
        </div>

        <div className="review-line grid">
            <label htmlFor='review-rank'>Rank</label>
            <RangeInput name='review-rank' getChange={getRangeChange} min={0} max={5} step={1} />
        </div>

        <div className="review-line grid">
            <label htmlFor='review-text'>Your text</label>
            <textarea name='text' id='review-text' placeholder="Enter your review" onChange={handleChange} value={review.text} maxLength={50} />
        </div>



        <button onClick={() => { onSubmit() }}>Submit</button>

    </section>
}