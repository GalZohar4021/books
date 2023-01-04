import { App } from './root-cmp.jsx'
import { bookService } from './services/book.service.js'

const elContainer = document.getElementById('app-root')
const root = ReactDOM.createRoot(elContainer)
root.render(<App />)