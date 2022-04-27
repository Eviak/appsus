import { NoteContent } from "./note-content.jsx"


export function NotePreview({ note }) {

    const NOTE_TYPES = ['note-txt', 'note-img', 'note-video', 'note-todos']


    return NOTE_TYPES.map(noteType => {
        if (noteType === note.type) {
        return <div key={note.id} className={`note-preview ${noteType}`}>
        <h2>{note.info.title}</h2>
        <NoteContent note={note} />
      </div>
        }
    })

}