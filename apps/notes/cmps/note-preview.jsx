import { eventBusService } from "../../../services/event-bus.service.js"
import { noteService } from "../services/note-service.js";

export class NotePreview extends React.Component {

  state = {
    editedNote: null,
  }
  
  toNoteEdit = (noteId) => {
    const noteIdx = noteService.getNoteIdx(noteId)
    const editedNote = this.props.notes[noteIdx]
    // console.log(this.props.notes[noteIdx]);
    this.props.toggleNoteModalShown(true)
    eventBusService.emit('open-note-modal', {editedNote})
    
  }
  
  
  render() {
    const NOTE_TYPES = ["note-txt", "note-img", "note-video", "note-todos"]
    const { note, onNoteDelete, onColorChange } = this.props

    return NOTE_TYPES.map((noteType) => {
      if (noteType === note.type) {
        return (
          <div onClick={() => this.toNoteEdit(note.id)} key={note.id} className={`note-preview ${noteType} flex-col`}>
          <DynamicCmp prms={{note, onNoteDelete, onColorChange}} />
        </div>
      )
    }
  })
}
}


const DynamicCmp = ({prms}) => {
  const { note, onNoteDelete, onColorChange } = prms
  const { type, info } = note
  
  switch (type) {
    case "note-txt":
      return (
        <React.Fragment>
          <h2 style={{color:info.txtColor}}>{info.title}</h2>
          <p style={{color:info.txtColor}}>{info.txt}</p>
          <button onClick={() => onNoteDelete(note.id)}>Delete</button>
          {/* <button onClick={() => {onEditText(note.id)}}>Edit text</button> */}
          <input onInput={(ev) => onColorChange(note.id, ev.target.value)} type="color" />
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

    case "note-video":
      return <React.Fragment>Video note Contento</React.Fragment>

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
