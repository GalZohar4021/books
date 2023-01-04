const { Link, NavLink } = ReactRouterDOM

export function AppHeader() {

    function toggleMenu() {
        document.body.classList.toggle('menu-open')
    }

    return <header className="app-header full main-layout flex-row">
        <div className="main-screen" onClick={() => toggleMenu()}></div>
        <div className="header-box flex-row">
            <div><h1 className="app-logo">Books App</h1></div>
            <button className="menu-toggle-btn" onClick={() => toggleMenu()}>☰</button>
            <nav onClick={() => toggleMenu()} className="app-nav flex-row">
                <NavLink to="/">Home</NavLink>
                <NavLink to="/book">Books</NavLink>
                <NavLink to="/about">About us</NavLink>
            </nav>
        </div>
    </header>
}