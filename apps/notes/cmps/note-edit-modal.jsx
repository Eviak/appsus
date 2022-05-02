import { eventBusService } from "../../../services/event-bus.service.js"
import { noteService } from "../services/note-service.js"
import { NoteColorPicker } from "./note-color-picker.jsx"

export class NoteEditModal extends React.Component {
  state = {
    note: null,
    render: 0,
    textRowsCount: null,
    isVidLinkShown: false,
  }

  componentDidMount() {
    this.setTextRowsCount()
  }

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

  setTextRowsCount = (ev) => {
    oninput =
      'this.style.height = "";this.style.height = this.scrollHeight + "px"'
  }

  toggleVidLink = () => {
    this.setState({ isVidLinkShown: !this.state.isVidLinkShown })
  }

  render() {
    const { isShown, showHideModal, onNoteDelete } = this.props
    const {
      onChange,
      duplicateNote,
      removeTodo,
      addTodo,
      changeBgClr,
      toggleVidLink,
    } = this
    const { note, textRowsCount, isVidLinkShown } = this.state

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
          <React.Fragment>
            <div
              className="modal-shadowed-screen"
              onClick={() => showHideModal(false)}
            ></div>
            <form
              style={bgClrStyle}
              onSubmit={this.onNoteEditSave}
              className="note-edit-modal flex-col"
            >
              <textarea
                style={txtInputStyle}
                value={note.info.title}
                name="title"
                rows={textRowsCount}
                // oninput={{this.style.height = "";this.style.height = this.scrollHeight + "px"}}
                onChange={(ev) => onChange(ev)}
              ></textarea>
              <textarea
                style={txtInputStyle}
                value={note.info.txt}
                name="txt"
                onChange={(ev) => onChange(ev)}
              ></textarea>

              <div className="edit-color-picker flex align-center">
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
          </React.Fragment>
        )

      case "note-img":
        return (
          <React.Fragment>
            <div
              className="modal-shadowed-screen"
              onClick={() => showHideModal(false)}
            ></div>

            <form
              style={bgClrStyle}
              onSubmit={this.onNoteEditSave}
              className="note-edit-modal img-modal flex-col"
            >

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
          </React.Fragment>
        )

      case "note-vid":
        return (
          <React.Fragment>
            <div
              className="modal-shadowed-screen"
              onClick={() => showHideModal(false)}
            ></div>
            <form
              style={bgClrStyle}
              onSubmit={this.onNoteEditSave}
              className="note-edit-modal video-modal flex-col"
            >

              <textarea
                style={txtInputStyle}
                value={note.info.title}
                name="title"
                onChange={(ev) => onChange(ev)}
              ></textarea>
              <input
                onClick={toggleVidLink}
                className="edit-vid-link-btn"
                type="image"
                src="apps/notes/img/icons/link.png"
                alt="Video link"
              />
              {isVidLinkShown && (
                <textarea
                  style={txtInputStyle}
                  value={note.info.url}
                  name="url"
                  onChange={(ev) => onChange(ev)}
                ></textarea>
              )}
              <iframe
                width="370"
                height="277.5"
                src={`https://www.youtube.com/embed/${note.info.ytVidId}`}
              ></iframe>

              <div className="edit-color-picker flex align-center">
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
          </React.Fragment>
        )

      case "note-todos":
        return (
          <React.Fragment>
            <div
              className="modal-shadowed-screen"
              onClick={() => showHideModal(false)}
            ></div>
            <form
              style={bgClrStyle}
              onSubmit={this.onNoteEditSave}
              className="note-edit-modal flex-col"
            >
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
          </React.Fragment>
        )
    }
  }
}
