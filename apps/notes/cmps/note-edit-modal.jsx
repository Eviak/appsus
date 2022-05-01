import { eventBusService } from "../../../services/event-bus.service.js"
import { noteService } from "../services/note-service.js"
import { NoteColorPicker } from "./note-color-picker.jsx"

export class NoteEditModal extends React.Component {
  state = {
    note: null,
    render: 0,
  }

  componentDidMount() {}

  componentWillUnmount() {}

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

  changeBgClr = (color) => {
    this.setState((prevState) => ({
      ...prevState,
      note: {
        ...prevState.note,
        info: {
          ...prevState.note.info,
          bgClr: color,
        },
      },
    }))
  }

  duplicateNote(note) {
    noteService.duplicateNote(note).then(this.props.loadNotes())
  }

  removeTodo = (ev, todoId) => {
    ev.preventDefault()
    let todosCopy = this.state.note.info.todos
    const selectedTodoIdx = this.state.note.info.todos.findIndex(
      (todo) => todo.todoId === todoId
    )
    todosCopy.splice(selectedTodoIdx, 1)

    this.setState((prevState) => ({
      ...prevState,
      note: {
        ...prevState.note,
        info: {
          ...prevState.note.info,
          todos: todosCopy,
        },
      },
    }))
  }

  addTodo = (ev) => {
    ev.preventDefault()
    let todosCopy = this.state.note.info.todos
    const newTodo = noteService.createTodo()
    todosCopy.push(newTodo)
    this.setState((prevState) => ({
      ...prevState,
      note: {
        ...prevState.note,
        info: {
          ...prevState.note.info,
          todos: todosCopy,
        },
      },
    }))
  }

  render() {
    const { isShown, showHideModal, onNoteDelete } = this.props
    const { onChange, duplicateNote, removeTodo, addTodo, changeBgClr } = this
    const { note } = this.state

    if (!isShown) return <React.Fragment></React.Fragment>

    const clearModalBus = eventBusService.on("open-note-modal", (note) => {
      this.setState({ note: note.editedNote })
    })

    if (!this.state.note) return <h1>LOADING..</h1>

    const bgClrStyle = {
      backgroundColor: note.info.bgClr,
    }

    const txtInputStyle = {
      color: note.info.txtColor,
      backgroundColor: note.info.bgClr,
    }

    switch (note.type) {
      case "note-txt":
        return (
          <form
            style={bgClrStyle}
            onSubmit={this.onNoteEditSave}
            className="note-edit-modal flex-col"
          >
            <input
              className="exit-modal-btn"
              type="image"
              src="apps/notes/img/icons/exit.png"
              alt="Exit"
              onClick={() => showHideModal(false)}
            />
            <textarea
              style={txtInputStyle}
              value={note.info.title}
              name="title"
              onChange={(ev) => onChange(ev)}
            ></textarea>
            <textarea
              style={txtInputStyle}
              value={note.info.txt}
              name="txt"
              onChange={(ev) => onChange(ev)}
            ></textarea>

            <div className="edit-color-picker flex align-center">
              <h4>Background color:</h4>
              <NoteColorPicker changeBgClr={changeBgClr} />
            </div>

            <div className="modal-icons flex justify-center">
              <input
                type="image"
                src="apps/notes/img/icons/duplicate.png"
                alt="Duplicate"
                onClick={() => duplicateNote(note)}
              />
              <input
                type="image"
                src="apps/notes/img/icons/add.png"
                alt="Add"
                onClick={addTodo}
              />
              <input
                type="image"
                src="apps/notes/img/icons/save.png"
                alt="Submit"
              />
              <input
                type="image"
                src="apps/notes/img/icons/delete.png"
                alt="Delete"
                onClick={() => onNoteDelete(note.id)}
              />
            </div>
          </form>
        )

      case "note-img":
        return (
          <form
            style={bgClrStyle}
            onSubmit={this.onNoteEditSave}
            className="note-edit-modal img-modal flex-col"
          >
            <input
              className="exit-modal-btn"
              type="image"
              src="apps/notes/img/icons/exit.png"
              alt="Exit"
              onClick={() => showHideModal(false)}
            />

            <img src={note.info.url} alt="Note image" class="modal-img" />

            <div className="img-modal-content flex-col">
              <textarea
                style={txtInputStyle}
                value={note.info.title}
                name="title"
                onChange={(ev) => onChange(ev)}
              ></textarea>
              <textarea
                style={txtInputStyle}
                value={note.info.txt}
                name="txt"
                onChange={(ev) => onChange(ev)}
              ></textarea>

              <h4>Background color:</h4>
              <NoteColorPicker changeBgClr={changeBgClr} />

              <div className="modal-icons flex justify-center">
                <input
                  type="image"
                  src="apps/notes/img/icons/duplicate.png"
                  alt="Duplicate"
                  onClick={() => duplicateNote(note)}
                />
                <input
                  type="image"
                  src="apps/notes/img/icons/add.png"
                  alt="Add"
                  onClick={addTodo}
                />
                <input
                  type="image"
                  src="apps/notes/img/icons/save.png"
                  alt="Submit"
                />
                <input
                  type="image"
                  src="apps/notes/img/icons/delete.png"
                  alt="Delete"
                  onClick={() => onNoteDelete(note.id)}
                />
              </div>
            </div>
          </form>
        )

      case "note-vid":
        return (
          <form
            style={bgClrStyle}
            onSubmit={this.onNoteEditSave}
            className="note-edit-modal video-modal flex-col"
          >
            <input
              className="exit-modal-btn"
              type="image"
              src="apps/notes/img/icons/exit.png"
              alt="Exit"
              onClick={() => showHideModal(false)}
            />
            <textarea
              style={txtInputStyle}
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
              width="370"
              height="277.5"
              src={`https://www.youtube.com/embed/${note.info.ytVidId}`}
            ></iframe>

            <div className="edit-color-picker flex align-center">
              <h4>Background color:</h4>
              <NoteColorPicker changeBgClr={changeBgClr} />
            </div>

            <div className="modal-icons flex justify-center">
              <input
                type="image"
                src="apps/notes/img/icons/duplicate.png"
                alt="Duplicate"
                onClick={() => duplicateNote(note)}
              />
              <input
                type="image"
                src="apps/notes/img/icons/add.png"
                alt="Add"
                onClick={addTodo}
              />
              <input
                type="image"
                src="apps/notes/img/icons/save.png"
                alt="Submit"
              />
              <input
                type="image"
                src="apps/notes/img/icons/delete.png"
                alt="Delete"
                onClick={() => onNoteDelete(note.id)}
              />
            </div>
          </form>
        )

      case "note-todos":
        return (
          <form
            style={bgClrStyle}
            onSubmit={this.onNoteEditSave}
            className="note-edit-modal flex-col"
          >
            <input
              className="exit-modal-btn"
              type="image"
              src="apps/notes/img/icons/exit.png"
              alt="Exit"
              onClick={() => showHideModal(false)}
            />
            <textarea
              style={txtInputStyle}
              value={note.info.title}
              name="title"
              onChange={(ev) => onChange(ev)}
            ></textarea>

            {note.info.todos.map((todo) => {
              return (
                <div
                  className="modal-todo flex align-center space-between"
                  key={`d${todo.todoId}`}
                >
                  <textarea
                    style={txtInputStyle}
                    name="todos"
                    key={`ti${todo.todoId}`}
                    value={todo.txt}
                    onChange={(ev) => onChange(ev, todo.todoId)}
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

            <div className="edit-color-picker flex align-center">
              <h4>Background color:</h4>
              <NoteColorPicker changeBgClr={changeBgClr} />
            </div>

            <div className="modal-icons flex justify-center">
              <input
                type="image"
                src="apps/notes/img/icons/duplicate.png"
                alt="Duplicate"
                onClick={() => duplicateNote(note)}
              />
              <input
                type="image"
                src="apps/notes/img/icons/add.png"
                alt="Add"
                onClick={addTodo}
              />
              <input
                type="image"
                src="apps/notes/img/icons/save.png"
                alt="Submit"
              />
              <input
                type="image"
                src="apps/notes/img/icons/delete.png"
                alt="Delete"
                onClick={() => onNoteDelete(note.id)}
              />
            </div>
          </form>
        )
    }
  }
}
