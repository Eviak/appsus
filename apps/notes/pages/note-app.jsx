
import { NoteAddInput } from "../cmps/note-add-input.jsx"
import { NoteList } from "../cmps/note-list.jsx"
import { NoteModal } from "../cmps/note-modal.jsx"
import { noteService } from "../services/note-service.js"

export class NoteApp extends React.Component {
   state = {
        notes: [],
        newNote: {
            title: '',
            txt: '',
        },
   }

   componentDidMount() { 
       this.loadNotes()
    }

    loadNotes = () => {
        noteService.query()
            .then(notes => this.setState({ notes }))
    }

    onAdd = (ev) => {
        ev.preventDefault()
        noteService.addNewNote(this.state.newNote)
        this.loadNotes()
    }

    handleChange = ({ target }) => {
        const value = target.value
        const field = target.name
        this.setState((prevState) => ({ newNote: { ...prevState.newNote, [field]: value } }))
    }


   render() {
       const { handleChange, onAdd} = this
       const { notes } = this.state
       if (!notes) return <div>loading...</div>

        if (!notes) return <React.Fragment></React.Fragment>
        return <section className="note-app flex-col align-center">
            <NoteAddInput  onAdd={onAdd} handleChange={handleChange} />
            <NoteList notes={notes} />
            <NoteModal notes={notes} />
        </section>
   }
}