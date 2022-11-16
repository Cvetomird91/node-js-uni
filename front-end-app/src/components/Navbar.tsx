export function Navbar() {
    return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="collapse navbar-collapse" id="navbarText">
                <ul className="navbar-nav mr-auto">
                    <li className="nav-item">
                        <a className="nav-link active" href="/">Book catalog</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="/readers">Readers</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="/borrows">Borrows</a>
                    </li>

                </ul>
            </div>
        </nav>
    )
}