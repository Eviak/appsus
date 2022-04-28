export function NotePreview({ note }) {
  const NOTE_TYPES = ["note-txt", "note-img", "note-video", "note-todos"]

  

  return NOTE_TYPES.map((noteType) => {
    if (noteType === note.type) {
      return (
        <div key={note.id} className={`note-preview ${noteType} flex-col`}>
          <DynamicCmp note={note} />
        </div>
      )
    }
  })
}


const DynamicCmp = (note) => {
  const { type, info } = note.note

  switch (type) {
    case "note-txt":
      return (
        <React.Fragment>
          <h2>{info.title}</h2>
          <p>{info.txt}</p>
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
