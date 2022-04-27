import { NotePreview } from "./note-preview.jsx"


export function NoteList({ notes }) {
  return (
    <section className="note-list flex-col">
        {notes.map(note => <NotePreview key={note.id} note={note} />)}
    </section>
  )
}
