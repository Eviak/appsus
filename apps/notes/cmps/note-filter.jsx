const { NavLink } = ReactRouterDOM

export class NoteFilter extends React.Component {
  state = {
    filterActive: false,
  }

  render() {

    return (
      <section className="note-filter flex">
        <h4>Filter by:</h4>
        <NavLink to="notes?status=">All</NavLink>
        <NavLink to="notes?status=note-txt">Texts</NavLink>
        <NavLink to="notes?status=note-img">Images</NavLink>
        <NavLink to="notes?status=note-vid">Videos</NavLink>
        <NavLink to="notes?status=note-todos">Lists</NavLink>
      </section>
    )
  }
}
