const { useState, useEffect, useRef } = React
const { useParams, Link, useNavigate } = ReactRouterDOM

import { bookService } from '../services/book.service.js'
import { Reviews } from './reviews.jsx'

export function BookDetails() {
    const [book, setBook] = useState(null)
    const defaultUrl = '../assets/img/default.jpg'
    let bookThumbnailRef = useRef()
    let bookAuthorsRef = useRef()
    let bookCategoriesRef = useRef()
    let elPriceRef = useRef()
    let priceColorRef = useRef()
    let readingTextRef = useRef()
    let oldRef = useRef()
    const { bookId } = useParams()
    const navigate = useNavigate()




    useEffect(() => {
        if (!bookId) return
        loadBook()

    }, [])

    useEffect(() => {
        if (priceColorRef.current && elPriceRef.current) elPriceRef.current.style.color = priceColorRef.current

    }, [book])



    function loadBook() {
        bookService.get(bookId)
            .then((BookDetails) => {
                bookThumbnailRef.current = BookDetails.thumbnail ? BookDetails.thumbnail : defaultUrl
                bookAuthorsRef.current = new Intl.ListFormat('en', { style: 'long', type: 'conjunction' }).format(BookDetails.authors)
                bookCategoriesRef.current = new Intl.ListFormat('en', { style: 'long', type: 'conjunction' }).format(BookDetails.categories)

                if (BookDetails.listPrice.amount > 150) priceColorRef.current = '#f53c3cb0'
                else if (BookDetails.listPrice.amount < 20) priceColorRef.current = '#28ae47b0'

                if (BookDetails.pageCount < 100) readingTextRef.current = 'Light Reading'
                else if (BookDetails.pageCount < 200) readingTextRef.current = 'Descent Reading'
                else if (BookDetails.pageCount > 500) readingTextRef.current = 'Serious Reading'

                const date = new Date().getFullYear()


                if (date - BookDetails.publishedDate >= 10) oldRef.current = 'Vintage'
                else oldRef.current = 'New'

                setBook(BookDetails)
            })
            .catch((err) => {
                console.log('Had issues with loading book details', err)
                navigate('/book')
            })
    }

    function onRemoveBook(bookId) {
        bookService.remove(bookId)
            .then(() => {
                console.log('removing...', bookId)
                navigate('/book')

            })
    }

    return <section className='book-details'>
        {book && <article className="book-box flex-col">
            <div className="details-box flex-col">
                {book.listPrice.isOnSale && <span className="for-sale for-sale-details">For sale!</span>}
                <div className='details-text flex-row'>
                    {readingTextRef.current && <span className="reading-text">{readingTextRef.current}</span>}
                    {oldRef.current && <span className="reading-text">{oldRef.current}</span>}
                </div>
                <img src={bookThumbnailRef.current} />
                <h4 ref={elPriceRef} className='price'>{book.listPrice.amount.toFixed(2)} {book.listPrice.currencyCode}</h4>
                <h2 className='title'>{book.title} <span className='authors'>(by {bookAuthorsRef.current})</span></h2>
                <h3 className='subtitle'>{book.subtitle}</h3>
                <pre className='desc'>{book.description}</pre>
                <div className='more-details flex-col'>
                    <span className='details-label'>Published: <span className='details-val'>{book.publishedDate}</span></span>
                    <span className='details-label'>Pages: <span className='details-val'>{book.pageCount}</span></span>
                    <span className='details-label'>Categories: <span className='details-val'>{bookCategoriesRef.current}</span></span>
                </div>
                <div className="book-actions flex-row">
                    <Link to={`/book/edit/${book.id}`}> Edit</Link>
                    <button className="book-remove" onClick={() => onRemoveBook(book.id)}>Remove</button>
                </div>
            </div>
        </article>}
        {book && <Reviews id={book.id} />}
    </section>
}