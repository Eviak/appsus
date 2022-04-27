
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
       return <section className="note-index">
           <input type="text" />
    
           <NoteList notes={notes} />
       </section>
   }
}