export function Navbar() {
    return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="collapse navbar-collapse" id="navbarText">
                <ul className="navbar-nav mr-auto">
                    <li className="nav-item">
                        <a className={`nav-link ${window.location.pathname === '/' ? "active" : ""}`} href="/">Book catalog</a>
                    </li>
                    <li className="nav-item">
                        <a className={`nav-link ${window.location.pathname === '/readers' ? "active" : ""}`} href="/readers">Readers</a>
                    </li>
                    <li className="nav-item">
                        <a className={`nav-link ${window.location.pathname === '/borrows' ? "active" : ""}`} href="/borrows">Borrows</a>
                    </li>

                </ul>
            </div>
        </nav>
    )
}