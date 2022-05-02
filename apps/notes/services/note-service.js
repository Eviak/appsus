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
        "id": "n3MtYmO",
        "isPinned": false,
        "type": "note-txt",
        "info": {
            "title": "Have a good day :)",
            "txt": "Have a very nice day lad! 🌷",
            "txtColor": "#202124",
            "url": null,
            "bgClr": "#CBF0F8",
            "ytVidId": null,
            "todos": {
                "todoId": null,
                "txt": null,
                "doneAt": null
            }
        }
    },
    {
        "id": "nf2Ffbs",
        "isPinned": false,
        "type": "note-vid",
        "info": {
            "title": "Jethro Tull - Bouree",
            "txt": "",
            "txtColor": "#202124",
            "url": "https://www.youtube.com/watch?v=2u0XXpVGUwk&list=PLqFzArYPEdSicEBi13TZYZH9hQjaCafrF&index=44",
            "bgClr": "#D7AEFB",
            "ytVidId": "2u0XXpVGUwk",
            "todos": {
                "todoId": null,
                "txt": null,
                "doneAt": null
            }
        }
    },
    {
        "id": "nrQBpaM",
        "isPinned": false,
        "type": "note-vid",
        "info": {
            "title": "Ninush",
            "txt": "",
            "txtColor": "#202124",
            "url": "https://www.youtube.com/watch?v=BNMKGYiJpvg&list=PLqFzArYPEdSicEBi13TZYZH9hQjaCafrF&index=48",
            "bgClr": "#D7AEFB",
            "ytVidId": "BNMKGYiJpvg",
            "todos": {
                "todoId": null,
                "txt": null,
                "doneAt": null
            }
        }
    },
    {
        "id": "nkFzMzO",
        "isPinned": false,
        "type": "note-txt",
        "info": {
            "title": "My email password",
            "txt": "Tomatoes11",
            "txtColor": "#202124",
            "url": null,
            "bgClr": "#F28B82",
            "ytVidId": null,
            "todos": {
                "todoId": null,
                "txt": null,
                "doneAt": null
            }
        }
    },
    {
        "id": "nbNEesM",
        "isPinned": false,
        "type": "note-todos",
        "info": {
            "title": "Todos",
            "txt": null,
            "txtColor": "#000",
            "url": null,
            "bgClr": "#FFF",
            "ytVidId": null,
            "todos": [{
                    "todoId": "fOxZVt",
                    "txt": "Feed Rex + take on a walk",
                    "doneAt": null
                },
                {
                    "todoId": "aPsrMV",
                    "txt": "Practice React",
                    "doneAt": null
                },
                {
                    "todoId": "chA2Ut",
                    "txt": "Make food",
                    "doneAt": null
                },
                {
                    "todoId": "yqCOBL",
                    "txt": "Practice React",
                    "doneAt": null
                },
                {
                    "todoId": "ongZhI",
                    "txt": "Practice React",
                    "doneAt": null
                },
                {
                    "todoId": "paRePC",
                    "txt": "Go buy groceries",
                    "doneAt": null
                }
            ]
        }
    },
    {
        "id": "nrlZIgV",
        "isPinned": false,
        "type": "note-vid",
        "info": {
            "title": "נתתי לה חיי",
            "txt": "",
            "txtColor": "#202124",
            "url": "https://www.youtube.com/watch?v=orkXG-xXO-k&list=PLqFzArYPEdSicEBi13TZYZH9hQjaCafrF&index=30",
            "ytVidId": "orkXG-xXO-k",
            "todos": {
                "todoId": null,
                "txt": null,
                "doneAt": null
            },
            "bgClr": "#FBBC04"
        }
    },
    {
        "id": "nplB4kU",
        "isPinned": false,
        "type": "note-todos",
        "info": {
            "title": "Grocery list",
            "txt": null,
            "txtColor": "#000",
            "url": null,
            "bgClr": "#AECBFA",
            "ytVidId": null,
            "todos": [{
                    "todoId": "nqiSqn",
                    "txt": "Tomatoes",
                    "doneAt": null
                },
                {
                    "todoId": "771Rz3",
                    "txt": "Cucumbers",
                    "doneAt": null
                },
                {
                    "todoId": "rl1Ern",
                    "txt": "Carrots",
                    "doneAt": null
                },
                {
                    "todoId": "niYviH",
                    "txt": "Meat",
                    "doneAt": null
                },
                {
                    "todoId": "P5Aw4y",
                    "txt": "Toilet paper",
                    "doneAt": null
                },
                {
                    "todoId": "4SorKc",
                    "txt": "Soap",
                    "doneAt": null
                },
                {
                    "todoId": "14mHO8",
                    "txt": "More meat",
                    "doneAt": null
                },
                {
                    "todoId": "RVjR48",
                    "txt": "Toothbrush",
                    "doneAt": null
                },
                {
                    "todoId": "DiE4XO",
                    "txt": "Spoons",
                    "doneAt": null
                }
            ]
        }
    },
    {
        "id": "nAaLp5y",
        "isPinned": false,
        "type": "note-vid",
        "info": {
            "title": "Html tutorial",
            "txt": "",
            "txtColor": "#202124",
            "url": "https://www.youtube.com/watch?v=bWPMSSsVdPk",
            "bgClr": "#AECBFA",
            "ytVidId": "bWPMSSsVdPk",
            "todos": {
                "todoId": null,
                "txt": null,
                "doneAt": null
            }
        }
    },
    {
        "id": "nWJTHKU",
        "isPinned": false,
        "type": "note-vid",
        "info": {
            "title": "camel",
            "txt": "",
            "txtColor": "#202124",
            "url": "https://www.youtube.com/watch?v=8f-nQPoi3aY&ab_channel=ClassicRock",
            "ytVidId": "8f-nQPoi3aY",
            "todos": {
                "todoId": null,
                "txt": null,
                "doneAt": null
            },
            "bgClr": "#FFF475"
        }
    },
    {
        "id": "nEhI1gH",
        "isPinned": false,
        "type": "note-txt",
        "info": {
            "title": "Grandma's number",
            "txt": "057-3466868",
            "txtColor": "#202124",
            "url": null,
            "ytVidId": null,
            "todos": {
                "todoId": null,
                "txt": null,
                "doneAt": null
            },
            "bgClr": "#FDCFE8"
        }
    },
    {
        "id": "noOmLlq",
        "isPinned": false,
        "type": "note-img",
        "info": {
            "title": "My trip to the moon",
            "txt": "Here you can see me casually drinkning beer on the moon.",
            "txtColor": "#202124",
            "url": "https://m.media-amazon.com/images/I/81zm9tKLsxL._AC_SX679_.jpg",
            "ytVidId": null,
            "todos": {
                "todoId": null,
                "txt": null,
                "doneAt": null
            }
        }
    }
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