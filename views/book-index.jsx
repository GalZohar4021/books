const { useState, useEffect } = React
const { Link } = ReactRouterDOM

import { bookService } from '../services/book.service.js'

import { BookList } from '../cmps/book-list.jsx'
import { BookFilter } from '../cmps/book-filter.jsx'

export function BookIndex() {
    const [books, setBooks] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const [filterBy, setFilterBy] = useState(bookService.getDefaultFilter())

    useEffect(() => {
        loadBooks()
    }, [filterBy])



    function onSetFilter(filterBy) {
        setFilterBy(filterBy)
    }

    function loadBooks() {
        setIsLoading(true)
        bookService.query(filterBy)
            .then((books) => {
                setBooks(books)
                setIsLoading(false)
            })
    }

    function onRemoveBook(bookId) {
        bookService.remove(bookId)
        .then(() => {
            console.log('removing...', bookId)
            const updatedBooks = books.filter(book => book.id !== bookId)
            setBooks(updatedBooks)

        })
    }

    return <section className="book-index main-layout">
        <BookFilter onSetFilter={onSetFilter} />
        <div>
            {!isLoading && <BookList books={books} onRemoveBook={onRemoveBook} />}
        </div>
    </section>

}