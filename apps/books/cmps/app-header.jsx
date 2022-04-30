import { NavSearch } from "./nav-search.jsx"

const { NavLink, withRouter } = ReactRouterDOM

function _AppHeader() {
    return <section className="app-header">
        <div className="main-header">
        <h1 className="logo">Bookers.</h1>
        <NavSearch />
        <nav className="nav-icons">
            <button className="icon-container"><img src="../assets/img/Heart.png"/></button>
            <button className="icon-container"><img src="../assets/img/Account.png"/></button>
            <button className="icon-container"><img src="../assets/img/Basket.png"/></button>
        </nav>
        </div>
        <div className="sub-header">
        <nav className="navbar">
            <NavLink to="/" exact>Home</NavLink>
            <NavLink to="/books">Browse</NavLink>
            <NavLink to="/about">About</NavLink>
        </nav>
        </div>
    </section>
} 

export const AppHeader = withRouter(_AppHeader)