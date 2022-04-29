import { noteService } from "../services/note-service.js"

export class NoteAddInput extends React.Component {
  state = {
    selected: false,
    isImgInputShown: false,
    isVidInputShown: false,
    isListInputShown: false,
  }

  newNote = {
    type: "note-txt",
    title: "",
    txt: "",
    txtColor: "#00c0ff",
    url: null,
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

  onNoteAdd = (ev, newNote) => {
    ev.preventDefault()
    const stateKeys = Object.keys(this.state)
    const key = stateKeys.find((stateKey) => this.state[stateKey])
    console.log(key)
    switch (key) {
      case "isImgInputShown":
        console.log("did it")
        this.newNote.type = "note-img"
        break

      case "isVidInputShown":
        this.newNote.type = "note-vid"
        break

      case "isListInputShown":
        this.newNote.type = "note-todos"
        break
    }
    noteService.addNewNote(newNote).then(this.props.loadNotes())
  }

  render() {
    const { isImgInputShown, isVidInputShown, isListInputShown } = this.state
    const { handleChange, onNoteAdd, newNote } = this

    return (
      <section
        className="note-add-input flex align-center"
        style={{ height: "45px" }}
      >
        <form onSubmit={(ev) => onNoteAdd(ev, newNote)}>
          <input //Note title input
            type="text"
            placeholder="title"
            name="title"
            onChange={handleChange}
          />

          <textarea
            placeholder="What's on your mind?" //Note body input
            name="txt"
            onChange={handleChange}
            style={{ lineHeight: "1.3333em" }}
          />

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

          {isListInputShown && (
            <textarea //Note List
              placeholder="Enter List URL here"
              name="url"
              onChange={handleChange}
              style={{ lineHeight: "1.3333em" }}
            />
          )}
          <h4>Text Color:</h4>
          <input type="color" name="txtClr" />
          <h4>Background Color:</h4>
          <input type="color" name="bgClr" />

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
          <button>Create</button>
        </form>
      </section>
    )
  }
}
