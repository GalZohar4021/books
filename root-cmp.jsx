const Router = ReactRouterDOM.HashRouter
const { Route, Routes } = ReactRouterDOM

import { Home } from './views/home.jsx'
import { About } from './views/about.jsx'
import { AppHeader } from './cmps/app-header.jsx'
import { AppFooter } from './cmps/app-footer.jsx'
import { BookIndex } from './views/book-index.jsx'
import { BookDetails } from './cmps/book-details.jsx'
import { BookEdit } from './views/book-edit.jsx'

export function App() {
    return <Router>
        <section className="main-layout app flex-col">
            <AppHeader />
            <main className="full main-layout flex-row">
                <Routes>
                    <Route element={<Home />} path="/" />
                    <Route element={<About />} path="/about" />
                    <Route element={<BookIndex />} path="/book" />
                    <Route element={<BookDetails />} path="/book/:bookId" />
                    <Route element={<BookEdit />} path="/book/edit" />
                    <Route element={<BookEdit />} path="/book/edit/:bookId" />
                </Routes>
            </main>
            <AppFooter />
        </section>
    </Router>
}