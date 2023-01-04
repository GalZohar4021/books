const { useState , useEffect } = React
import { BookPreview } from "./book-preview.jsx";

export function BookList({ books, onRemoveBook }) {
    
    return <ul className="book-list flex-row">
        {
            books.map(book => <li key={book.id}>
                <BookPreview book={book} onRemoveBook={onRemoveBook} />
            </li>)
        }
    </ul>
}