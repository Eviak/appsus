import { eventBusService } from "../../../services/event-bus.service.js"
import { noteService } from "../services/note-service.js"

export class NoteEditModal extends React.Component {
  state = {
    note: null,
  }

  componentWillUnmount() {
    clearModalBus()
  }

  loadModal = () => {
    this.setState({ note: this.state.note })
  }

  onNoteEditSave = (ev) => {
    ev.preventDefault()
    const editedNote = this.state.note
    const noteId = this.state.note.id
    noteService
      .editNoteById(noteId, editedNote)
      .then(() => this.props.loadNotes())
  }

  onChange = ({ target }) => {
    const value = target.value
    const field = target.name

    this.setState((prevState) => ({
      ...prevState,
      note: {
        ...prevState.note,
        info: {
          ...prevState.note.info,
          [field]: value,
        },
      },
    }))
  }

  render() {
    const { isShown, showHideModal } = this.props

    if (!isShown) return <React.Fragment></React.Fragment>

    const clearModalBus = eventBusService.on("open-note-modal", (note) => {
      this.setState({ note: note.editedNote })
    })

    if (!this.state.note) return <h1>LOADING..</h1>

    const { note } = this.state

    switch (note.type) {
      case "note-txt":
        return (
          <form onSubmit={this.onNoteEditSave} className="note-edit-modal">
            <textarea
              value={note.info.title}
              name="title"
              onChange={(ev) => this.onChange(ev)}
            ></textarea>
            <textarea
              value={note.info.txt}
              name="txt"
              onChange={(ev) => this.onChange(ev)}
            ></textarea>
            <button type="submit">Save</button>
            <button type="button" onClick={() => showHideModal(false)}>
              Exit modal
            </button>
          </form>
        )
    }
  }
}
