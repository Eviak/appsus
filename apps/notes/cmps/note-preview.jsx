import { eventBusService } from "../../../services/event-bus.service.js"
import { noteService } from "../services/note-service.js"

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

  getVidId = (url) => {
    console.log(url)
    const relativeStartIdx = url.indexOf("watch?v=")
    const relativeEndIdx = url.indexOf("&")
    console.log(url.slice(relativeStartIdx + 8, relativeEndIdx))
    const vidId = url.slice(relativeStartIdx + 8, relativeEndIdx)
    return vidId
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
  const { note, onNoteDelete, onColorChange, getVidId } = prms
  const { type, info } = note

  switch (type) {
    case "note-txt":
      return (
        <React.Fragment>
          <h2 style={{ color: info.txtColor }}>{info.title}</h2>
          <p style={{ color: info.txtColor }}>{info.txt}</p>
          <button onClick={() => onNoteDelete(note.id)}>Delete</button>
          <input
            onInput={(ev) => onColorChange(note.id, ev.target.value)}
            type="color"
          />
        </React.Fragment>
      )

    case "note-img":
      return (
        <React.Fragment>
          <img src={info.url} alt="Note image" />
          <h2>{info.title}</h2>
          <p>{info.txt}</p>
        </React.Fragment>
      )

    case "note-vid":
      const vidId = getVidId(info.url)
      console.log(vidId)
      return (
        <React.Fragment>
          <h2>{info.title}</h2>
          <iframe
            width="240"
            height="180"
            src={`https://www.youtube.com/embed/${vidId}`}
          ></iframe>
          <button onClick={() => onNoteDelete(note.id)}>Delete</button>
          <input
            onInput={(ev) => onColorChange(note.id, ev.target.value)}
            type="color"
          />
        </React.Fragment>
      )

    case "note-todos":
      return (
        <React.Fragment>
          <h2>{info.title}</h2>
          <ul className="todo-content">
            {info.todos.map((todo) => {
              return <li key={todo.todoId}>{todo.txt}</li>
            })}
          </ul>
        </React.Fragment>
      )
  }
}
