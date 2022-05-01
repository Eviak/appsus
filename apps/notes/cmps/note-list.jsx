import { NotePreview } from "./note-preview.jsx"

export function NoteList({ notes, onColorChange, showHideModal}) {
  return (
    <section className="note-list">
      {notes.map((note) => (
        <NotePreview 
        key={note.id}
        notes={notes} 
        note={note}
        onColorChange={onColorChange}
        showHideModal={showHideModal} />
      ))}
    </section>
  )
}
