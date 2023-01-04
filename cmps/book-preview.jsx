const { Link } = ReactRouterDOM

import { bookService } from "../services/book.service.js"

export function BookPreview({ book, onRemoveBook }) {
    const defaultUrl = '../assets/img/default.jpg'
    const bookThumbnail = book.thumbnail ? book.thumbnail : defaultUrl
    const bookDesc = (book.description.length > 120) ? book.description.substring(0,120) + '...' : book.description


    return <article className="book-preview flex-row">
        <div className="flex-col">
            {book.listPrice.isOnSale &&<span className="for-sale">For sale!</span>}
            <h2>{book.title}</h2>
            <h3>{bookDesc}</h3>
            <div className="book-actions flex-row">
                <Link to={`/book/${book.id}`}>Details</Link>
                <Link to={`/book/edit/${book.id}`}> Edit</Link>
                <button className="book-remove" onClick={() => onRemoveBook(book.id)}>Remove</button>
            </div>
        </div>
        <img src={bookThumbnail} />
    </article>
}