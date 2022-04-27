export function NoteContent({ note }) {
  return (
    <div className="note-content">
      <DynamicCmp note={note} />
    </div>
  )
}

const DynamicCmp = (note) => {
  const { type, info } = note.note

  switch (type) {
    case "note-txt":
      return (
        <div className="txt-content">
          <h2>{info.title}</h2>
          {info.txt}
        </div>
      )

    case "note-img":
      return (
        <div className="img-content">
          <img src={info.url} alt="Note image" />
          <h2>{info.title}</h2>
          <p>{info.txt}</p>
        </div>
      )

    case "note-video":
      return <p>Video note Contento</p>
      
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
