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

  render() {
    const NOTE_TYPES = ["note-txt", "note-img", "note-vid", "note-todos"]
    const { note, onColorChange } = this.props
    const { getVidId } = this
    const previewStyle = {
        backgroundColor: note.info.bgClr,
    }

    return NOTE_TYPES.map((noteType) => {
      if (noteType === note.type) {
        return (
          <div
            style={previewStyle}
            onClick={() => this.toNoteEdit(note.id)}
            key={note.id}
            className={`note-preview ${noteType} flex-col`}
          >
            <DynamicCmp
              prms={{ note, onColorChange, getVidId }}
            />
          </div>
        )
      }
    })
  }
}

const DynamicCmp = ({ prms }) => {
  const { note } = prms
  const { type, info } = note

  const dynPreviewStyle = {
    color: info.txtColor,
    backgroundColor: info.bgClr,
  }

  switch (type) {
    case "note-txt":
      return (
        <React.Fragment>
          <h2 style={dynPreviewStyle}>{info.title}</h2>
          <p style={dynPreviewStyle}>{info.txt}</p>
        </React.Fragment>
      )

    case "note-img":
      return (
        <React.Fragment>
          <img src={info.url} alt="Note image" />
          <h2 style={dynPreviewStyle}>{info.title}</h2>
          <p style={dynPreviewStyle}>{info.txt}</p>
        </React.Fragment>
      )

    case "note-vid":
      return (
        <React.Fragment>
          <h2 style={dynPreviewStyle}>{info.title}</h2>
          <iframe
            width="240"
            height="180"
            src={`https://www.youtube.com/embed/${info.ytVidId}`}
          ></iframe>
        </React.Fragment>
      )

    case "note-todos":
      return (
        <React.Fragment>
          <h2 style={dynPreviewStyle}>{info.title}</h2>
          <ul>
            {info.todos.map((todo) => (
              <li style={dynPreviewStyle} key={todo.todoId}>
                {todo.txt}
              </li>
            ))}
          </ul>
        </React.Fragment>
      )
  }
}
