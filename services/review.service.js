import { storageService } from './async-storage.service.js'
import { utilService } from './util.service.js'

const DB_KEY = 'reviewsDB'


export const reviewService = {
    get,
    remove,
    save,
    query,
    add,
    find,
    getEmptyReviews,
    getEmptyReview
}

function find(bookId) {
    return storageService.find(DB_KEY, bookId)
}

function get(bookId) {
    return storageService.get(DB_KEY, bookId)
}

function remove(bookId, idx) {
    return storageService.remove(DB_KEY, bookId)
}

function add(bookId) {
    return storageService.post(DB_KEY, getEmptyReviews(bookId))
}

function save(review) {
    return storageService.put(DB_KEY, review)
}

function query() {
    return storageService.query(DB_KEY)
        .then(reviews => {
            return reviews
        })
}


function getEmptyReviews(bookId) {
    return {
        "id": bookId,
        "reviews": [

        ]
    }
}

function getEmptyReview() {
    return {
        "name": "",
        "text": "",
        "rank" : 0
    }
}



