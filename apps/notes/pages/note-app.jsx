
import { NoteAddInput } from "../cmps/note-add-input.jsx"
import { NoteList } from "../cmps/note-list.jsx"
import { noteService } from "../services/note-service.js"

export class NoteApp extends React.Component {
   state = {
        notes: [],
   }

   componentDidMount() { 
       this.loadNotes()
    }

    loadNotes = () => {
        noteService.query()
            .then(notes => this.setState({ notes }))
    }


   render() {
        
        const { notes } = this.state
        if (!notes) return <React.Fragment></React.Fragment>
        return <section className="note-index flex-col align-center">
            <NoteAddInput />
            <NoteList notes={notes} />
        </section>
   }
}