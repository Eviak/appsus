import { eventBusService } from "../../../services/event-bus.service.js"
import { noteService } from "../services/note-service.js"

export class NoteEditModal extends React.Component {
  state = {
    note: null,
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
    console.log(target.value)
    // this.setState({...note, id: 'np7DaLZ'})
    this.state = {
      someProperty: {
         someOtherProperty: {
             anotherProperty: {
                flag: true
             }
         }
      }
   }
    var x = this.state.note
    console.log(x);

  }

  render() {
    const { isShown } = this.props

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
            <h2>{note.info.title}</h2>
            <textarea
              onChange={(ev) => this.onTxtInput(ev)}
              value={note.info.txt}
              cols="30"
              rows="10"
            ></textarea>
            <button>Save</button>
          </form>
        )
    }
  }
}
