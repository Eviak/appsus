import { storageService } from "../../../services/storage.service.js";
import { utilService } from "../../../services/util.service.js";


export const noteService = {
    query,
    addNewNote,
    removeNote,
    getNoteIdx,
    setNewColor,
    editNoteById,
    createTodo,
    duplicateNote,
}

const KEY = 'notesDB'

const gNotes = [{
        id: "n101",
        type: "note-txt",
        isPinned: true,
        info: {
            txt: "Grandma phone number",
            title: "059-4571356",
        }
    },
    {
        id: "n102",
        type: "note-img",
        isPinned: true,
        info: {
            txt: "My trip to the moon",
            title: "Here you can see me casually drinking a beer on the moon.",
            url: 'https://m.media-amazon.com/images/I/81zm9tKLsxL._AC_SX679_.jpg'
        }
    },
    {
        id: "n103",
        type: "note-todo",
        isPinned: true,
        info: {
            txt: "",
            title: "Grocery list",
            todos: [
                {
                    txt: 'Tomatoes',
                    
                }
            ]
        }
    },
    
]

function query(filterBy) {
    let notes = _loadFromStorage()
    if (!notes) {
        notes = gNotes
        _saveToStorage(notes)
    }

    if (filterBy) {
        let { type } = filterBy

    }

    return Promise.resolve(notes)
}

function addNewNote(newNote) {
    let notes = _loadFromStorage()
    const note = _createNote(newNote)
    notes = [note, ...notes]
    _saveToStorage(notes)
    return Promise.resolve()
}

function removeNote(noteId) {
    let notes = _loadFromStorage()
    notes = notes.filter(note => note.id !== noteId)
    _saveToStorage(notes)
    return Promise.resolve()
}

function getNoteIdx(noteId) {
    const notes = _loadFromStorage()
    return notes.findIndex(note => note.id === noteId)
}

function setNewColor(noteIdx, newColor) {
    let notes = _loadFromStorage()
    notes[noteIdx].info.txtColor = newColor
    _saveToStorage(notes)
    return Promise.resolve()
}

function editNoteById(noteId, note) {
    let notes = _loadFromStorage()
    const noteIdx = getNoteIdx(noteId)
    notes.splice(noteIdx, 1, note)
    _saveToStorage(notes)
    return Promise.resolve()
}

function createTodo(txt) {
    const id = utilService.makeId()
    return {
        todoId: id,
        txt,
        doneAt: null,
    }
}

function duplicateNote(note) {
    let notes = _loadFromStorage()
    const noteIdx = noteService.getNoteIdx(note.id)
    let newNote = note
    newNote.id = utilService.makeId()
    notes.splice(noteIdx, 0, newNote)
    _saveToStorage(notes)
    return Promise.resolve()  
}

function _createNote({ type, title, txt, txtColor = 'red', url = null, bgClr, isPinned = false, ytVidId = null, todos }) {
    const id = utilService.makeId()
    return {
        id: 'n' + id,
        isPinned,
        type,
        info: {
            title,
            txt,
            txtColor,
            url,
            bgClr,
            ytVidId,
            todos
        },
    }
}

function _saveToStorage(notes) {
    storageService.saveToStorage(KEY, notes)
}

function _loadFromStorage() {
    return storageService.loadFromStorage(KEY)
}