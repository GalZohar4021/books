
import { utilService } from "../services/util.service.js"
export function Home() {
    return <div className="home-message-box">
        <h1 className="welcome-hdr">Welcome to BooksApp!</h1>
        <p className="welcome-msg">{utilService.makeLorem(50)}</p>
        <p className="welcome-msg">We invite you to view our books on Books page and read about is on About page.</p>
    </div>
}