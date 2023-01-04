const { useState, useEffect, useRef } = React
const { Link } = ReactRouterDOM


import { bookService } from "../services/book.service.js"

export function BookFilter({ onSetFilter }) {
    const elFormRef = useRef(null)
    const [filterByToEdit, setFilterByToEdit] = useState(bookService.getDefaultFilter())

    function onSubmitFilter(ev) {
        ev.preventDefault()
        onSetFilter(filterByToEdit)
    }

    function handleChange({ target }) {
        let { value, name: field, type } = target
        value = (type === 'number') ? +value : value
        console.log(value, field)
        setFilterByToEdit((prevFilter) => ({ ...prevFilter, [field]: value }))
    }

    function onClearFilter() {
        setFilterByToEdit(bookService.getDefaultFilter())
        onSetFilter(bookService.getDefaultFilter())
    }

    function toggleFiltersBox() {
        elFormRef.current.classList.toggle('show')
    }

    return <section className="book-tools">
        <a className="filters-button" onClick={toggleFiltersBox} ><i className="fa-solid fa-filter"></i></a>
        <Link to={`/book/edit`}><i className="fa-regular fa-square-plus"></i></Link>
        <div className="form-box" ref={elFormRef}>
            <h2>Filter</h2>
            <form className="form-filter grid">

                <label htmlFor="title">Title</label>
                <input type="text"
                    id="title"
                    name="title"
                    placeholder="By title"
                    value={filterByToEdit.title}
                    onChange={handleChange}
                />



                <label htmlFor="category">Category</label>
                <input type="text"
                    id="category"
                    name="category"
                    placeholder="By category"
                    value={filterByToEdit.category}
                    onChange={handleChange}
                />

                <label htmlFor="subtitle">Subtitle</label>
                <input type="text"
                    id="subtitle"
                    name="subtitle"
                    placeholder="By subtitle"
                    value={filterByToEdit.subtitle}
                    onChange={handleChange}
                />

                <label htmlFor="published-at">Publish year</label>
                <input type="number"
                    id="published-date"
                    name="publishedDate"
                    placeholder="By publish year"
                    value={filterByToEdit.publishedDate}
                    onChange={handleChange}
                />


                <label htmlFor="author">Author</label>
                <input type="text"
                    id="author"
                    name="author"
                    placeholder="By author"
                    value={filterByToEdit.author}
                    onChange={handleChange}
                />

                
                <label htmlFor="maxPagesCount">Max pages count</label>
                <input type="number"
                    id="maxPagesCount"
                    name="pageCount"
                    placeholder="By max pages count"
                    value={filterByToEdit.pageCount}
                    onChange={handleChange}
                />


            </form>
            <div className="filter-actions">
                <button onClick={onSubmitFilter}>Update filter</button>
                <button onClick={onClearFilter}>Clear</button>
            </div>
        </div>
    </section>
}