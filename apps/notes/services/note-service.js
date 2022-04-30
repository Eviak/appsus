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
}

const KEY = 'notesDB'

const gNotes = [{
        id: "n101",
        type: "note-txt",
        isPinned: true,
        info: {
            txt: "Fullstack Me Baby!",
            title: "Fullstack text note",
        }
    },
    {
        id: "n102",
        type: "note-txt",
        isPinned: true,
        info: {
            txt: "Fullstack Me Baby!",
            title: "Fullstack text note",
        }
    },
    {
        id: "n103",
        type: "note-txt",
        isPinned: true,
        info: {
            txt: "Fullstack Me Baby!",
            title: "Fullstack text note",
        }
    },
    {
        id: "n104",
        type: "note-img",
        info: {
            url: "https://cdn.webshopapp.com/shops/77844/files/349917232/image.jpg",
            title: "Bobi and Me",
            txt: "My image text BLah my image text BLah my image text BLah my image text BLah my image text BLah my image text BLah my image text BLah "
        },
        style: { backgroundColor: "#00d" }
    },
    {
        id: "n105",
        type: "note-img",
        info: {
            url: "https://cdn.webshopapp.com/shops/77844/files/349917232/image.jpg",
            title: "Bobi and Me",
            txt: "My image text BLah my image text BLah my image text BLah my image text BLah my image text BLah my image text BLah my image text BLah "
        },
        style: { backgroundColor: "#00d" }
    },
    {
        id: "n106",
        type: "note-img",
        info: {
            url: "https://cdn.webshopapp.com/shops/77844/files/349917232/image.jpg",
            title: "Bobi and Me",
            txt: "My image text BLah my image text BLah my image text BLah my image text BLah my image text BLah my image text BLah my image text BLah "
        },
        style: { backgroundColor: "#00d" }
    },
    {
        id: "n107",
        type: "note-img",
        info: {
            url: "https://cdn.webshopapp.com/shops/77844/files/349917232/image.jpg",
            title: "Bobi and Me",
            txt: "My image text BLah my image text BLah my image text BLah my image text BLah my image text BLah my image text BLah my image text BLah "
        },
        style: { backgroundColor: "#00d" }
    },
    {
        id: "n108",
        type: "note-txt",
        isPinned: true,
        info: {
            txt: "Fullstack Me Baby!",
            title: "Fullstack text note",
        }
    },
    {
        id: "n109",
        type: "note-txt",
        isPinned: true,
        info: {
            txt: "Fullstack Me Baby!",
            title: "Fullstack text note",
        }
    },
    {
        id: "n110",
        type: "note-txt",
        isPinned: true,
        info: {
            txt: "Fullstack Me Baby!",
            title: "Fullstack text note",
        }
    },
    {
        id: "n111",
        type: "note-img",
        info: {
            url: "https://cdn.webshopapp.com/shops/77844/files/349917232/image.jpg",
            title: "Bobi and Me",
            txt: "My image text BLah my image text BLah my image text BLah my image text BLah my image text BLah my image text BLah my image text BLah "
        },
        style: { backgroundColor: "#00d" }
    },
    {
        id: "n112",
        type: "note-img",
        info: {
            url: "https://cdn.webshopapp.com/shops/77844/files/349917232/image.jpg",
            title: "Bobi and Me",
            txt: "My image text BLah my image text BLah my image text BLah my image text BLah my image text BLah my image text BLah my image text BLah "
        },
        style: { backgroundColor: "#00d" }
    },
    {
        id: "n113",
        type: "note-img",
        info: {
            url: "https://cdn.webshopapp.com/shops/77844/files/349917232/image.jpg",
            title: "Bobi and Me",
            txt: "My image text BLah my image text BLah my image text BLah my image text BLah my image text BLah my image text BLah my image text BLah "
        },
        style: { backgroundColor: "#00d" }
    },
    {
        id: "n114",
        type: "note-img",
        info: {
            url: "https://cdn.webshopapp.com/shops/77844/files/349917232/image.jpg",
            title: "Bobi and Me",
            txt: "My image text BLah my image text BLah my image text BLah my image text BLah my image text BLah my image text BLah my image text BLah "
        },
        style: { backgroundColor: "#00d" }
    },
    {
        id: "n115",
        type: "note-todos",
        info: {
            title: "Todos:",
            label: "Get my stuff together",
            todos: [{
                txt: "Driving liscence",
                doneAt: null,
                todoId: 1,
            }, {
                txt: "Coding power",
                doneAt: 187111111,
                todoId: 2,
            }]
        }
    }
]

function query() {
    let notes = _loadFromStorage()
    if (!notes) {
        notes = gNotes
        _saveToStorage(notes)
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

function _createRndTextNote() {
    const title = utilService.makeId()
    const txt = utilService.makeId()
    const note = {
        title,
        txt,
        txtColor: 'blue'
    }

    console.log(note);
    addNewNote(note)
}

function _saveToStorage(notes) {
    storageService.saveToStorage(KEY, notes)
}

function _loadFromStorage() {
    return storageService.loadFromStorage(KEY)
}