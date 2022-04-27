const { NavLink, withRouter } = ReactRouterDOM
export function AppHeader(props) {

    return <header className="app-header">
        <h3>Header</h3>

        <nav>
            <NavLink to="/" exact>Home</NavLink>
            <NavLink to="/about">About</NavLink>
        </nav>
    </header>
}