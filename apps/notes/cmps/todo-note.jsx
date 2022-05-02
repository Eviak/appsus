import { noteService } from "../services/note-service.js"
import { NoteColorPicker } from "./note-color-picker.jsx"

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
    }

    return (
      <React.Fragment>
        <form className="todo-note flex space-between">
          <div className="form-details flex-col">

            <textarea
              name="title"
              onChange={handleTodoChange}
              value={title}
              placeholder="Title"
              style={todoStyle}
            ></textarea>


            <div className="list-ctrl-icons flex align-center">
              <input
                className="add-todo-btn"
                type="image"
                src="/apps/notes/img/icons/add.png"
                alt="Add"
                onClick={addTodo}
              />
              <input
                className="add-todo-btn"
                type="image"
                src="/apps/notes/img/icons/save.png"
                alt="Save"
                onClick={saveTodo}
              />
            <div className="todo-edit-color-picker flex align-center">
              <NoteColorPicker changeBgClr={this.props.changeBgClr} />
            </div>
            </div>

            {todos.map((todo) => {
              return (
                <div
                  className="todo-item-container flex"
                  key={`rf${todo.todoId}`}
                >
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
                </div>
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
