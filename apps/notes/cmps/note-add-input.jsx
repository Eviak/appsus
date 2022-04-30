import { noteService } from "../services/note-service.js"
import { TodoNote } from "./todo-note.jsx"

export class NoteAddInput extends React.Component {
  state = {
    selected: false,
    isImgInputShown: false,
    isVidInputShown: false,
    isListInputShown: false,
    txtColor: "#00c0ff",
    bgClr: "#FFF",
  }

  newNote = {
    type: "note-txt",
    title: "",
    txt: "",
    txtColor: "#00c0ff",
    bgClor: "#fff",
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
    switch (key) {
      case "isImgInputShown":
        console.log("did it")
        newNote.type = "note-img"
        break

      case "isVidInputShown":
        newNote.type = "note-vid"
        newNote.ytVidId = this.getVidId(newNote.url)
        break

      case "isListInputShown":
        newNote.type = "note-todos"
        break
    }
    noteService.addNewNote(newNote).then(this.props.loadNotes())
  }

  getVidId = (url) => {
    const relativeStartIdx = url.indexOf("watch?v=")
    const relativeEndIdx = url.indexOf("&") === -1 ? null : url.indexOf("&")
    const vidId = url.slice(relativeStartIdx + 8, relativeEndIdx)
    return vidId
  }

  changeTxtClr = ({ target }) => {
    this.newNote.txtColor = target.value
    this.setState({ txtColor: target.value })
  }

  changeBgClr = ({ target }) => {
    this.newNote.bgClr = target.value
    this.setState({ bgClr: target.value })
  }

  render() {
    const inputStyle = {
      color: this.state.txtColor,
      backgroundColor: this.state.bgClr,
    }

    const {
      isImgInputShown,
      isVidInputShown,
      isListInputShown,
      txtColor,
      bgClr,
    } = this.state

    const { handleChange, onNoteAdd, newNote, changeTxtClr, changeBgClr, onIconBtnClick } = this

    return (
      <section
        className="note-add-input flex align-center"
        style={inputStyle}
      >
        {!isListInputShown && (
          <form className="flex space-between" onSubmit={(ev) => onNoteAdd(ev, newNote)}>
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
            <div className="txt=clr">
            <h4>Text and Title Color:</h4>
            <input type="color" name="txtClr" onChange={changeTxtClr} />
            </div>
            <div className="bg-clr">
            <h4>Background Color:</h4>
            <input type="color" name="bgClr" onChange={changeBgClr} />
            </div>
            <button name="create-btn">Create</button>

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

        {isListInputShown && <TodoNote onIconBtnClick={onIconBtnClick} loadNotes={this.props.loadNotes} />}

        {/* <img //Icon buttons
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
        /> */}
      </section>
    )
  }
}
