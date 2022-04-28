import { NotePreview } from "./note-preview.jsx"


export function NoteList({ notes }) {
  return (
    <section className="note-list flex-col" style={{height: '1000px'}}>
        {notes.map(note => <NotePreview key={note.id} note={note} />)}
    </section>
  )
}
