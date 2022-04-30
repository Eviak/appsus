import { NoteAddInput } from "../cmps/note-add-input.jsx"
import { NoteList } from "../cmps/note-list.jsx"
import { NoteEditModal } from "../cmps/note-edit-modal.jsx"
import { noteService } from "../services/note-service.js"
import { NoteFilter } from "../cmps/note-filter.jsx"

export class NoteApp extends React.Component {
  state = {
    notes: [],
    editedNote: null,
    isNoteModalShown: false,
    filterBy: null,
  }

  componentDidMount() {
    this.loadNotes()
  }

  loadNotes = () => {
    noteService.query()
        .then((notes) => this.setState({ notes }))
  }

  onSetFilter = (filterBy) => {
    this.setState({filterBy}, this.loadNotes)

    const urlSrcPrm = new URLSearchParams(filterBy)
    const searchStr = urlSrcPrm.toString()
    this.props.history.push(`/note?${searchStr}`)
  }

  onNoteDelete = (noteId) => {
    noteService.removeNote(noteId)
    this.loadNotes()
  }

  onColorChange = (noteId, newColor) => {
    const noteIdx = noteService.getNoteIdx(noteId)
    noteService.setNewColor(noteIdx, newColor)
    this.loadNotes()
  }

  showHideModal = (isShown) => {
    this.setState({ isNoteModalShown: isShown })
    this.loadNotes()
  }

  get statusToFilter() {
    const { notes } = this.state
    const urlSrcPrm = new URLSearchParams(this.props.location.search)
    const status = urlSrcPrm.get('status')
    if (!status) return notes
    return notes.filter(note => {
        return status === note.type
    })
}

  render() {
    const {
      onNoteDelete,
      onColorChange,
      showHideModal,
      loadNotes,
      statusToFilter
    } = this
    const { notes, isNoteModalShown } = this.state

    if (!notes) return <div>loading...</div>

    if (!notes) return <React.Fragment></React.Fragment>
    return (
      <section className="note-app flex-col align-center">
        <NoteAddInput  
        loadNotes={loadNotes} />

        <NoteFilter />

        <NoteList
          notes={statusToFilter}
          onNoteDelete={onNoteDelete}
          onColorChange={onColorChange}
          showHideModal={showHideModal}
        />

        <NoteEditModal
          loadNotes={loadNotes}
          isShown={isNoteModalShown}
          showHideModal={showHideModal}
        />
      </section>
    )
  }
}
