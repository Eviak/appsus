
import { NoteAddInput } from "../cmps/note-add-input.jsx"
import { NoteList } from "../cmps/note-list.jsx"
import { NoteEditModal } from "../cmps/note-edit-modal.jsx"
import { noteService } from "../services/note-service.js"

export class NoteApp extends React.Component {
   state = {
        notes: [],
        newNote: {
            title: '',
            txt: '',
            txtColor: '#00c0ff',
        },
        editedNote: null,
        isNoteModalShown: false,
   }

   componentDidMount() { 
       this.loadNotes()
    }

    loadNotes = () => {
        noteService.query()
            .then(notes => this.setState({ notes }))
    }

    onNoteAdd = (ev) => {
        ev.preventDefault()
        noteService.addNewNote(this.state.newNote)
        this.loadNotes()
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

    handleChange = ({ target }) => {
        const value = target.value
        const field = target.name
        this.setState((prevState) => ({ newNote: { ...prevState.newNote, [field]: value } }))
    }

    showHideModal = (isShown) => {
        this.setState({isNoteModalShown: isShown})
        this.loadNotes()
    }


   render() {
       const { handleChange, onNoteAdd, onNoteDelete, onColorChange, showHideModal: showHideModal, loadNotes} = this
       const { notes,isNoteModalShown } = this.state

       if (!notes) return <div>loading...</div>

        if (!notes) return <React.Fragment></React.Fragment>
        return <section className="note-app flex-col align-center">
            <NoteAddInput  onNoteAdd={onNoteAdd} handleChange={handleChange} />
            <NoteList 
            notes={notes}
            onNoteDelete={onNoteDelete} 
            onColorChange={onColorChange}
            showHideModal={showHideModal} />
            <NoteEditModal 
            loadNotes={loadNotes} 
            isShown={isNoteModalShown}
            showHideModal={showHideModal} />
        </section>
   }
}