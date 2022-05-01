import { noteService } from "../services/note-service.js"
import { NoteColorPicker } from "./note-color-picker.jsx"
import { TodoNote } from "./todo-note.jsx"

export class NoteAddInput extends React.Component {
  state = {
    selected: false,
    isImgInputShown: false,
    isVidInputShown: false,
    isListInputShown: false,
    txtColor: "#202124",
    bgClr: "#FFF",
  }

  newNote = {
    type: "note-txt",
    title: "",
    txt: "",
    txtColor: "#202124",
    bgColor: "#fff",
    url: null,
    ytVidId: null,
    todos: {
      todoId: null,
      txt: null,
      doneAt: null,
    },
  }

  onIconBtnClick = (keyType) => {
    const newKey = `is${keyType}InputShown`
    const stateKeys = Object.keys(this.state)
    const prevKey = stateKeys.find((stateKey) => this.state[stateKey])
    if (prevKey !== newKey) this.setState({ [prevKey]: false, [newKey]: true })
    else this.setState({ [newKey]: !this.state[newKey] })
  }

  handleChange = ({ target }) => {
    const value = target.value
    const field = target.name
    this.newNote[field] = value
  }

  onNoteAdd = (ev) => {
    ev.preventDefault()
    const { newNote } = this
    const stateKeys = Object.keys(this.state)
    const key = stateKeys.find((stateKey) => this.state[stateKey])
    console.log('key:(note-vid)', key);
    switch (key) {
      case "isImgInputShown":
        console.log("did it")
        newNote.type = "note-img"
        break

      case "isVidInputShown":
        newNote.type = "note-vid"
        newNote.ytVidId = this.getVidId(newNote.url)
        console.log('newNote.ytVidId:',newNote.ytVidId);
        break

      case "isListInputShown":
        newNote.type = "note-todos"
        break
    }

    this.newNote = {
      type: "note-txt",
      title: "",
      txt: "",
      txtColor: "#202124",
      bgColor: "#fff",
      url: null,
      ytVidId: null,
      todos: {
        todoId: null,
        txt: null,
        doneAt: null,
      },
    }

    this.setState({
      selected: false,
      isImgInputShown: false,
      isVidInputShown: false,
      isListInputShown: false,
      txtColor: "#202124",
      bgClr: "#FFF",
    })
    noteService.addNewNote(newNote).then(this.props.loadNotes())
  }

  getVidId = (url) => {
    const relativeStartIdx = url.indexOf("watch?v=")
    const relativeEndIdx = url.indexOf("&") === -1 ? url.length : url.indexOf("&")
    const vidId = url.slice(relativeStartIdx + 8, relativeEndIdx)
    console.log('vidId',vidId);
    return vidId
  }

  changeTxtClr = (color) => {
    this.newNote.txtColor = color
    this.setState({ txtColor: color })
  }

  changeBgClr = (color) => {
    this.newNote.bgClr = color
    this.setState({ bgClr: color })
  }

  render() {
    const inputStyle = {
      color: this.state.txtColor,
      backgroundColor: this.state.bgClr,
    }

    const { isImgInputShown, isVidInputShown, isListInputShown } = this.state

    const { handleChange, onNoteAdd, newNote, changeBgClr, onIconBtnClick } =
      this

    return (
      <section className="note-add-input flex align-center" style={inputStyle}>
        {!isListInputShown && (
          <form
            className="flex space-between"
            onSubmit={(ev) => onNoteAdd(ev, newNote)}
          >
            <div className="form-details flex-col">
              <input //Note title input
                type="text"
                placeholder="title"
                name="title"
                onChange={handleChange}
                style={inputStyle}
              />

              {!isVidInputShown && (
                <textarea
                  placeholder="What's on your mind?" //Note body input
                  name="txt"
                  onChange={handleChange}
                  style={inputStyle}
                />
              )}

              {isImgInputShown && (
                <textarea //Note image input
                  placeholder="Enter image URL here"
                  name="url"
                  onChange={handleChange}
                  style={{ lineHeight: "1.3333em" }}
                />
              )}

              {isVidInputShown && (
                <textarea //Note Youtube input
                  placeholder="Enter Youtube URL here"
                  name="url"
                  onChange={handleChange}
                  style={{ lineHeight: "1.3333em" }}
                />
              )}
              <div className="bg-clr-container flex align-center">
                <h4>Background Color:</h4>

                <NoteColorPicker changeBgClr={changeBgClr} />
              </div>
              <button type="submit" name="create-btn">
                Create
              </button>
            </div>
            <div className="form-types flex-col justify-center">
              <img //Icon buttons
                onClick={() => this.onIconBtnClick("Img")}
                src="apps/notes/img/icons/image.png"
                alt="Add image note"
              />
              <img
                onClick={() => this.onIconBtnClick("Vid")}
                src="apps/notes/img/icons/video.png"
                alt="Add Youtube note"
              />
              <img
                onClick={() => this.onIconBtnClick("List")}
                src="apps/notes/img/icons/list.png"
                alt="Add list note"
              />
            </div>
          </form>
        )}

        {isListInputShown && (
          <TodoNote
            onIconBtnClick={onIconBtnClick}
            loadNotes={this.props.loadNotes}
            changeBgClr={changeBgClr}
          />
        )}
      </section>
    )
  }
}
