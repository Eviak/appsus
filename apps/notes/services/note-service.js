export const noteService = {
    query,
}

const NOTE_TYPES = ['note-txt', 'note-img', 'note-video', 'note-todos']

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
        type: "note-img",
        info: {
            url: "http://some-img/me",
            title: "Bobi and Me",
        },
        style: { backgroundColor: "#00d" }
    },
    {
        id: "n103",
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
    let notes = gNotes
    return Promise.resolve(notes)
}