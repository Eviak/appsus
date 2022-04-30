import { noteService } from "../services/note-service.js"

export class TodoNote extends React.Component {
  state = {
    title: "",
    todos: [],
    selectedTodoIdx: 0,
    txtColor: "#000",
    bgClr: "#FFF",
  }

  newTodoNote = {
    type: "note-todos",
    isPinned: false,
    title: "",
    txt: null,
    txtColor: "#000",
    bgClr: "#FFF",
    todos: [],
  }

  componentDidMount() {
    if (this.state.todos.length === 0) {
      const newTodo = noteService.createTodo()
      this.setState({ todos: [newTodo] })
    }
  }

  handleTodoChange = ({ target }) => {
    const field = target.name
    const value = target.value

    if (field === "todo-item") {
      let todosCopy = this.state.todos
      todosCopy[this.state.selectedTodoIdx].txt = value
      this.setState({ todos: todosCopy })
    } else {
      this.setState({ [field]: value })
    }
  }

  handleTodoFocus = (todoId) => {
    const selectedTodoIdx = this.state.todos.findIndex(
      (todo) => todo.todoId === todoId
    )
    this.setState({ selectedTodoIdx })
  }

  addTodo = (ev) => {
    ev.preventDefault()
    let todosCopy = this.state.todos
    const newTodo = noteService.createTodo()
    todosCopy.push(newTodo)
    this.setState({ todos: todosCopy })
  }

  removeTodo = (ev, todoId) => {
    ev.preventDefault()
    let todosCopy = this.state.todos
    const selectedTodoIdx = this.state.todos.findIndex(
      (todo) => todo.todoId === todoId
    )
    todosCopy.splice(selectedTodoIdx, 1)
    this.setState({ todos: todosCopy })
  }

  saveTodo = (ev) => {
    ev.preventDefault()

    this.newTodoNote.title = this.state.title
    this.newTodoNote.todos = this.state.todos
    this.newTodoNote.bgClr = this.state.bgClr
    this.newTodoNote.txtColor = this.state.txtColor
    noteService.addNewNote(this.newTodoNote)

    this.resetData()
    this.props.loadNotes()
  }

  resetData() {
    const newTodo = noteService.createTodo()

    this.newTodoNote = {
      type: "note-todos",
      isPinned: false,
      title: "",
      txt: null,
      txtColor: "#000",
      bgClr: "#FFF",
      todos: [],
    }

    this.setState({
      bgClr: "#FFF",
      txtColor: "#000",
      title: "",
      todos: [newTodo],
      selectedTodoIdx: 0,
    })
  }

  render() {
    const { handleTodoChange, handleTodoFocus, addTodo, removeTodo, saveTodo } =
      this
    const { title, todos } = this.state

    const todoStyle = {
      color: this.state.txtColor,
      backgroundColor: this.state.bgClr,
    }

    return (
      <React.Fragment>
        <form className="flex space-between">
        <div className="form-details flex-col">
          <button onClick={addTodo}>Add todo</button>
          <button onClick={saveTodo}>Save note</button>

          <textarea
            name="title"
            onChange={handleTodoChange}
            value={title}
            placeholder="Title"
            style={todoStyle}
          ></textarea>

          <h4>Text color:</h4>
          <input name="txtColor" type="color" onChange={handleTodoChange} />
          <h4>Background color:</h4>
          <input name="bgClr" type="color" onChange={handleTodoChange} />

          {todos.map((todo) => {
            return (
              <React.Fragment key={`rf${todo.todoId}`}>
                <textarea
                  key={`ti${todo.todoId}`}
                  name="todo-item"
                  onChange={(ev) => handleTodoChange(ev, todo.todoId)}
                  onFocus={() => handleTodoFocus(todo.todoId)}
                  value={todo.txt}
                  placeholder="Todo item"
                  style={todoStyle}
                ></textarea>
                <button
                  key={`rb${todo.todoId}`}
                  onClick={(ev) => removeTodo(ev, todo.todoId)}
                >
                  X
                </button>

              </React.Fragment>
            )
          })}

          </div>
          <div className="form-types flex-col justify-center">
          <img //Icon buttons
            onClick={() => this.props.onIconBtnClick("Img")}
            src="apps/notes/img/icons/image.png"
            alt="Add image note"
          />
          <img
            onClick={() => this.props.onIconBtnClick("Vid")}
            src="apps/notes/img/icons/video.png"
            alt="Add Youtube note"
          />
          <img
            onClick={() => this.props.onIconBtnClick("List")}
            src="apps/notes/img/icons/list.png"
            alt="Add list note"
          />
          </div>
        </form>
      </React.Fragment>
    )
  }
}
