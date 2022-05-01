const { Link } = ReactRouterDOM

export class AppMenu extends React.Component {
  state = {
    isShown: false,
  }

  toggleAppMenu = () => {
      this.setState({isShown: !this.state.isShown})
  }

  render() {
    return (
      <div className="app-menu">
        <input
            onClick={this.toggleAppMenu}
          className="app-menu-icon"
          type="image"
          src="./assets/img/apps-menu.png"
        />

        {this.state.isShown && <div className="app-menu-modal">
          <Link to="mail?status=inbox">
            <input
              type="image"
              src="./assets/img/mail-icon.png"
              alt="Mail app"
            />
          </Link>
          <Link to="books">
            <input
              type="image"
              src="./assets/img/books-icon.png"
              alt="Books app"
            />
          </Link>
          <Link to="notes">
            <input
              type="image"
              src="./assets/img/notes-icon.png"
              alt="Notes app"
            />
          </Link>
        </div>}
      </div>
    )
  }
}
