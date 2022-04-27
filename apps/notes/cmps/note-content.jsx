export function NoteContent({ note }) {

    if (note.type === 'note-txt') {
        return <p>Text note Contento</p>
    } else if (note.type === 'note-img') {
        return <p>Note Contento</p>
    } else if (note.type === 'note-video') {
        return <p>Note Contento</p>
    } else {
        return <ul className="todo-content">
            {note.info.todos.map(todo => {
                return <li key={todo.todoId}>{todo.txt}</li>
            })}
            {/* {console.log(note.info.todos.map(todo => {
                return `<li>${todo.txt}</li>`
            }).join("")
            )} */}
        </ul>
    }
}