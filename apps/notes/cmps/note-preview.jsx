import { eventBusService } from "../../../services/event-bus.service.js"
import { noteService } from "../services/note-service.js"
import { TodoNote } from "./todo-note.jsx"

export class NotePreview extends React.Component {
  state = {
    editedNote: null,
  }

  toNoteEdit = (noteId) => {
    const noteIdx = noteService.getNoteIdx(noteId)
    const editedNote = this.props.notes[noteIdx]
    this.props.showHideModal(true)
    eventBusService.emit("open-note-modal", { editedNote })
  }

  render() {
    const NOTE_TYPES = ["note-txt", "note-img", "note-vid", "note-todos"]
    const { note, onNoteDelete, onColorChange } = this.props
    const { getVidId } = this

    return NOTE_TYPES.map((noteType) => {
      if (noteType === note.type) {
        return (
          <div
            onClick={() => this.toNoteEdit(note.id)}
            key={note.id}
            className={`note-preview ${noteType} flex-col`}
          >
            <DynamicCmp
              prms={{ note, onNoteDelete, onColorChange, getVidId }}
            />
          </div>
        )
      }
    })
  }
}

const DynamicCmp = ({ prms }) => {
  const { note, onNoteDelete } = prms
  const { type, info } = note

  const previewStyle = {
    color: info.txtColor,
    backgroundColor: info.bgClr,
  }

  switch (type) {
    case "note-txt":
      return (
        <React.Fragment>
          <h2 style={previewStyle}>{info.title}</h2>
          <p style={previewStyle}>{info.txt}</p>
          <button onClick={() => onNoteDelete(note.id)}>Delete</button>
        </React.Fragment>
      )

    case "note-img":
      return (
        <React.Fragment>
          <img src={info.url} alt="Note image" />
          <h2 style={previewStyle}>{info.title}</h2>
          <p style={previewStyle}>{info.txt}</p>
          <button onClick={() => onNoteDelete(note.id)}>Delete</button>
        </React.Fragment>
      )

    case "note-vid":
      return (
        <React.Fragment>
          <h2 style={previewStyle}>{info.title}</h2>
          <iframe
            width="240"
            height="180"
            src={`https://www.youtube.com/embed/${info.ytVidId}`}
          ></iframe>
          <button onClick={() => onNoteDelete(note.id)}>Delete</button>
        </React.Fragment>
      )

    case "note-todos":
      return (
        <React.Fragment>
          <h2 style={previewStyle}>{info.title}</h2>
          <ul>
            {info.todos.map((todo) => (
              <li style={previewStyle} key={todo.todoId}>
                {todo.txt}
              </li>
            ))}
          </ul>
          <button onClick={() => onNoteDelete(note.id)}>Delete</button>
        </React.Fragment>
      )
  }
}
