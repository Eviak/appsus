import { NotePreview } from "./note-preview.jsx"

export function NoteList({ notes, onNoteDelete, onColorChange, showHideModal}) {
  return (
    <section className="note-list flex-col" style={{ height: "1000px" }}>
      {notes.map((note) => (
        <NotePreview 
        key={note.id}
        notes={notes} 
        note={note}
        onNoteDelete={onNoteDelete}
        onColorChange={onColorChange}
        showHideModal={showHideModal} />
      ))}
    </section>
  )
}
