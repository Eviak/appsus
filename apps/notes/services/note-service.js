import { storageService } from "../../../services/storage.service.js";
import { utilService } from "../../../services/util.service.js";


export const noteService = {
    query,
    addNewNote,
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
    console.log(notes);
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

function _createNote({title, txt}) {
    const id = utilService.makeId()
    return {
        id: 'n'+id,
        type: 'note-txt',
        info: {title, txt},
    }
}

function _saveToStorage(notes) {
    storageService.saveToStorage(KEY, notes)
}

function _loadFromStorage() {
    return storageService.loadFromStorage(KEY)
}