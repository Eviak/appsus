import { eventBusService } from "../../../services/event-bus.service.js"
import { noteService } from "../services/note-service.js"

export class NoteEditModal extends React.Component {
  state = {
    note: null,
    render: 0,
  }

  componentDidMount() { 

   }

  componentWillUnmount() {
    clearModalBus()
  }

  onNoteEditSave = (ev) => {
    ev.preventDefault()
    const editedNote = this.state.note
    const noteId = this.state.note.id
    noteService
      .editNoteById(noteId, editedNote)
      .then(() => this.props.loadNotes())
  }

  onChange = ({ target }, todoId) => {
    let value = target.value
    const field = target.name

    if (field === "todos") {
      const todoIdx = this.state.note.info.todos.findIndex(
        (todo) => todo.todoId === todoId
      )
      const todosCopy = this.state.note.info.todos
      todosCopy[todoIdx].txt = value
      value = todosCopy
    }

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

  duplicateNote(note) {
    noteService.duplicateNote(note)
      .then(this.props.loadNotes())
  }



  render() {
    const { isShown, showHideModal } = this.props
    const { onChange, duplicateNote } = this
    const { note } = this.state

    if (!isShown) return <React.Fragment></React.Fragment>

    const clearModalBus = eventBusService.on("open-note-modal", (note) => {
      this.setState({ note: note.editedNote })
    })

    if (!this.state.note) return <h1>LOADING..</h1>

    const modalStyle = {
      color: note.info.txtColor,
      backgroundColor: note.info.bgClr,
    }

    switch (note.type) {
      case "note-txt":
        return (
          <form onSubmit={this.onNoteEditSave} className="note-edit-modal">
            <textarea
              style={modalStyle}
              value={note.info.title}
              name="title"
              onChange={(ev) => onChange(ev)}
            ></textarea>
            <textarea
              style={modalStyle}
              value={note.info.txt}
              name="txt"
              onChange={(ev) => onChange(ev)}
            ></textarea>

            <h4>Text color:</h4>
            <input name="txtColor" type="color" onChange={onChange} />
            <h4>Background color:</h4>
            <input name="bgClr" type="color" onChange={onChange} />
            <button onClick={() => duplicateNote(note)}>Duplicate</button>
            <button type="submit">Save</button>
            <button type="button" onClick={() => showHideModal(false)}>
              Exit modal
            </button>
          </form>
        )

        case "note-img":
        return (
          <form onSubmit={this.onNoteEditSave} className="note-edit-modal">
            <img src={note.info.url} alt="Note image" />
            <textarea
              style={modalStyle}
              value={note.info.title}
              name="title"
              onChange={(ev) => onChange(ev)}
            ></textarea>
            <textarea
              style={modalStyle}
              value={note.info.txt}
              name="txt"
              onChange={(ev) => onChange(ev)}
            ></textarea>
            <button onClick={() => duplicateNote(note)}>Duplicate</button>
            <h4>Title and Text color:</h4>
            <input name="txtColor" type="color" onChange={onChange} />
            <h4>Background color:</h4>
            <input name="bgClr" type="color" onChange={onChange} />
            <button type="submit">Save</button>
            <button type="button" onClick={() => showHideModal(false)}>
              Exit modal
            </button>
          </form>
        )
        
        case "note-vid":
          return (
          <form onSubmit={this.onNoteEditSave} className="note-edit-modal">
            <h3>Title:</h3>
            <textarea
              style={modalStyle}
              value={note.info.title}
              name="title"
              onChange={(ev) => onChange(ev)}
            ></textarea>
            <h3>Url:</h3>
            <textarea
              value={note.info.url}
              name="url"
              onChange={(ev) => onChange(ev)}
            ></textarea>
            <iframe
              width="240"
              height="180"
              src={`https://www.youtube.com/embed/${note.info.ytVidId}`}
            ></iframe>
              <button onClick={() => duplicateNote(note)}>Duplicate</button>
            <h4>Text color:</h4>
            <input name="txtColor" type="color" onChange={onChange} />
            <h4>Background color:</h4>
            <input name="bgClr" type="color" onChange={onChange} />
            <button type="submit">Save</button>
            <button type="button" onClick={() => showHideModal(false)}>
              Exit modal
            </button>
          </form>
        )

      case "note-todos":
        return (
          <form onSubmit={this.onNoteEditSave} className="note-edit-modal">
            <h3>Title:</h3>
            <textarea
              style={modalStyle}
              value={note.info.title}
              name="title"
              onChange={(ev) => onChange(ev)}
            ></textarea>

            {note.info.todos.map((todo) => {
              return (
                <textarea
                style={modalStyle}
                name="todos"
                key={todo.todoId}
                value={todo.txt}
                onChange={(ev) => onChange(ev, todo.todoId)}
                ></textarea>
                )
              })}
              <button onClick={() => duplicateNote(note)}>Duplicate</button>
            <h4>Text color:</h4>
            <input name="txtColor" type="color" onChange={onChange} />
            <h4>Background color:</h4>
            <input name="bgClr" type="color" onChange={onChange} />
            <button type="submit">Save</button>
            <button type="button" onClick={() => showHideModal(false)}>
              Exit modal
            </button>
          </form>
        )
    }
  }
}
