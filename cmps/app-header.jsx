import { MailFilter } from "../apps/mail/cmps/mail-filter.jsx"

const { NavLink, withRouter } = ReactRouterDOM
function _AppHeader(props) {
    return <header className="app-header">
        <h3 className="logo"><span>M</span>.B.<span>N</span></h3>

        {props.location.pathname.includes('/mail') && <MailFilter />}

        <nav>
            <NavLink to="/" exact>Home</NavLink>
            <NavLink to="/about">About</NavLink>
        </nav>
    </header>
}

export const AppHeader = withRouter(_AppHeader)