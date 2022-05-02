import { MailFilter } from "../apps/mail/cmps/mail-filter.jsx"
import { AppMenu } from "./app-menu.jsx"

const { NavLink, withRouter } = ReactRouterDOM

class _AppHeader extends React.Component {
  render() {
    console.log(this.props)
    return (
      <header className="app-header">
        <h3 className="logo">
          <span>M</span>.<span className="red">B</span>.<span>N</span>.
        </h3>

        {this.props.location.pathname.includes("/mail") && <MailFilter />}

        <nav>
          <AppMenu />
        </nav>
      </header>
    )
  }
}

export const AppHeader = withRouter(_AppHeader)
