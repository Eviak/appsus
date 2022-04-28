import { eventBusService } from "../../../services/event-bus.service.js"
import { noteService } from "../services/note-service.js"

export class NoteEditModal extends React.Component {
  state = {
    note: null,
    newNote: null,
  }

  componentWillUnmount() {
    clearModalBus()
  }

  onNoteEditSave = (ev) => {
    ev.preventDefault()
    // const txt = newNote
    const noteId = this.state.note.editedNote.id
    // noteService.editNoteById(noteId, txt)
  }

  onTxtInput = ({ target }) => {
    console.log(target);
    this.setState({newNote: {txt: target.value}})
    console.log(this.state.newNote);
  }
  
  render() {
    const { isShown } = this.props
    
    if (!isShown) return <React.Fragment></React.Fragment>
    
    const clearModalBus = eventBusService.on("open-note-modal", (note) => {
      this.setState({ note })
    })
    
    if (!this.state.note) return <h1>LOADING..</h1>
    
    const { editedNote } = this.state.note

    switch (editedNote.type) {
      case "note-txt":
        return <form onSubmit={this.onNoteEditSave} className="note-edit-modal">
          <h2>{editedNote.info.title}</h2>
          <textarea onInput={(ev) => this.onTxtInput(ev)} value={editedNote.info.txt} id="" cols="30" rows="10"></textarea>
          <button>Save</button>
          </form>
    }
  }
}
