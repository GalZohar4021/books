const { useState, useEffect } = React
const { useNavigate, useParams, Link } = ReactRouterDOM

import { func } from "prop-types"
import { bookService } from "../services/book.service.js"
import { eventBusService, showSuccessMsg } from "../services/event-bus.service.js"

export function BookEdit() {
    const [bookToEdit, setBookToEdit] = useState(bookService.getEmptyBook())
    const navigate = useNavigate()
    const { bookId } = useParams()
    let countAuthors = -1
    let countCategories = -1

    useEffect(() => {
        if (!bookId) return
        loadBook()
    }, [])

    function loadBook() {
        bookService.get(bookId)
            .then((book) => setBookToEdit(book))
            .catch((err) => {
                console.log('Had issues in book details', err)
                navigate('/book')
            })
    }

    function handleChange({ target }) {
        let { value, type, name: field } = target
        value = type === 'number' ? +value : value
        if (field === 'authors') {
            let idx = target.dataset.idx
            const authors = [...bookToEdit.authors]
            authors[idx] = value
            value = authors
        }
        else if (field === 'categories') {
            let idx = target.dataset.idx
            const categories = [...bookToEdit.categories]
            categories[idx] = value
            value = categories
        }
        else if (field === 'currency') {
            return setBookToEdit((prevBook) => ({ ...prevBook, listPrice: { ...prevBook.listPrice, currencyCode: value } }))
        }
        else if (field === 'price') {
            return setBookToEdit((prevBook) => ({ ...prevBook, listPrice: { ...prevBook.listPrice, amount: value } }))
        }
        else if (field === 'for-sale') {
            console.log(target.checked)
            return setBookToEdit((prevBook) => ({ ...prevBook, listPrice: { ...prevBook.listPrice, isOnSale: target.checked } }))
        }
        setBookToEdit((prevBook) => ({ ...prevBook, [field]: value }))
    }

    function onBookSave(ev) {
        ev.preventDefault()

        let emptyAuthor = bookToEdit.authors.findIndex(author => !author.length)
        while (emptyAuthor !== -1) {
            bookToEdit.authors.splice(emptyAuthor, 1)
            emptyAuthor = bookToEdit.authors.findIndex(author => !author.length)
        }

        let emptyCategories = bookToEdit.categories.findIndex(category => !category.length)
        while (emptyCategories !== -1) {
            bookToEdit.categories.splice(emptyCategories, 1)
            emptyCategories = bookToEdit.categories.findIndex(category => !category.length)
        }


        bookService.save(bookToEdit).then((book) => {
            console.log('book saved', book);
            showSuccessMsg('Book saved!')
            navigate(`/book/${book.id}`)
        })
    }


    function addAuthor() {
        bookToEdit.authors.push('')
        setBookToEdit((prevBook) => ({ ...bookToEdit, authors: bookToEdit.authors }))
    }


    function addCategory() {
        bookToEdit.categories.push('')
        setBookToEdit((prevBook) => ({ ...bookToEdit, categories: bookToEdit.categories }))
    }


    function removeCategory(idx) {
        console.log(idx)
        bookToEdit.categories.splice(idx, 1)
        setBookToEdit((prevBook) => ({ ...bookToEdit, categories: bookToEdit.categories }))
    }


    function removeAuthor(idx) {
        console.log(idx)
        bookToEdit.authors.splice(idx, 1)
        setBookToEdit((prevBook) => ({ ...bookToEdit, authors: bookToEdit.authors }))
    }

    return <section className="book-edit">
        <h2 className="editor-header">{bookId ? 'Edit this book' : 'Add a new book'}</h2>

        <form onSubmit={onBookSave} className='edit-form flex-col'>
            <label htmlFor="title">Title</label>
            <input type="text"
                name="title"
                id="title"
                placeholder="Enter title..."
                value={bookToEdit.title}
                onChange={handleChange}
            />
            <label htmlFor="subtitle">Subtitle</label>
            <input type="text"
                name="subtitle"
                id="subtitle"
                placeholder="Enter subtitle..."
                value={bookToEdit.subtitle}
                onChange={handleChange}
            />

            <label htmlFor="subtitle">Description</label>
            <textarea
                name="description"
                id="description"
                placeholder="Enter description..."
                value={bookToEdit.description}
                onChange={handleChange}


            />

            <label htmlFor="thumbnail">Thumbnail</label>
            <input type="text"
                name="thumbnail"
                id="thumbnail"
                placeholder="Enter thumbnail..."
                value={bookToEdit.thumbnail}
                onChange={handleChange}
            />

            <img className="thumb" src={bookToEdit.thumbnail} />

            <label htmlFor="page-count">Pages Count</label>
            <input type="number"
                name="pageCount"
                id="page-count"
                placeholder="Enter page count..."
                value={bookToEdit.pageCount}
                onChange={handleChange}
            />


            <label htmlFor="price">Price</label>
            <input type="number"
                name="price"
                id="price"
                placeholder="Enter price..."
                value={bookToEdit.listPrice.amount}
                onChange={handleChange}
            />

            <label htmlFor="price-currency">Currency</label>
            <input type="text"
                name="currency"
                id="price-currency"
                placeholder="Enter currency..."
                value={bookToEdit.listPrice.currencyCode}
                onChange={handleChange}
            />

            <label htmlFor="for-sale">For sale?</label>
            <input type="checkbox"
                name="for-sale"
                id="for-sale"
                checked={bookToEdit.listPrice.isOnSale}
                onChange={handleChange}
            />

            <label htmlFor="published-at">Published at</label>
            <input type="number"
                name="publishedDate"
                id="published-at"
                placeholder="What year book where published?"
                value={bookToEdit.publishedDate}
                onChange={handleChange}
            />
            <div className="data-arr-editors flex-row" style={{ justifyContent: 'space-around' }}>
                <div className="authors-edit flex-col">
                    <label htmlFor="author">Authors</label>
                    {
                        bookToEdit.authors.map(author => {
                            countAuthors++
                            return <div className="author-line">
                                <input type="text"
                                    name="authors"
                                    id={'author-' + countAuthors}
                                    placeholder="Enter author"
                                    value={author}
                                    onChange={handleChange}
                                    data-idx={countAuthors}
                                />
                                <button type='button' className="remove-author" onClick={() => removeAuthor(countAuthors)}>x</button>
                            </div>
                        })

                    }
                    <button type='button' className="add-author" onClick={addAuthor}>Add author</button>
                </div>

                <div className="categories-edit flex-col">
                    <label htmlFor="categories">Categories</label>
                    {
                        bookToEdit.categories.map(category => {
                            countCategories++
                            return <div className="category-line">
                                <input type="text"
                                    name="categories"
                                    id={'category-' + countCategories}
                                    placeholder="Enter author"
                                    value={category}
                                    onChange={handleChange}
                                    data-idx={countCategories}
                                />
                                <button type='button' className="remove-author" onClick={() => removeCategory(countCategories)}>x</button>
                            </div>
                        })

                    }
                    <button type='button' className="add-author" onClick={addCategory}>Add Category</button>
                </div>
            </div>
            <div className="editor-tools flex-row">
                <button type='submit'>{bookId ? 'Save' : 'Add'}</button>
                <Link to="/book">Cancel</Link>
            </div>

        </form>
    </section>
}