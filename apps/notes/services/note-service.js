export const noteService = {
    query,
}

const gNotes = [
    {
        id: "n101",
        type: "note-txt",
        isPinned: true,
        info: { 
            txt: "Fullstack Me Baby!",
            title: "Fullstack text note",
        }
    },
    {
        id: "n101",
        type: "note-txt",
        isPinned: true,
        info: { 
            txt: "Fullstack Me Baby!",
            title: "Fullstack text note",
        }
    },
    {
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
            url: "https://cdn.webshopapp.com/shops/77844/files/349917232/image.jpg",
            title: "Bobi and Me",
            txt: "My image text BLah my image text BLah my image text BLah my image text BLah my image text BLah my image text BLah my image text BLah "
        },
        style: { backgroundColor: "#00d" }
    },
    {
        id: "n102",
        type: "note-img",
        info: {
            url: "https://cdn.webshopapp.com/shops/77844/files/349917232/image.jpg",
            title: "Bobi and Me",
            txt: "My image text BLah my image text BLah my image text BLah my image text BLah my image text BLah my image text BLah my image text BLah "
        },
        style: { backgroundColor: "#00d" }
    },
    {
        id: "n102",
        type: "note-img",
        info: {
            url: "https://cdn.webshopapp.com/shops/77844/files/349917232/image.jpg",
            title: "Bobi and Me",
            txt: "My image text BLah my image text BLah my image text BLah my image text BLah my image text BLah my image text BLah my image text BLah "
        },
        style: { backgroundColor: "#00d" }
    },
    {
        id: "n102",
        type: "note-img",
        info: {
            url: "https://cdn.webshopapp.com/shops/77844/files/349917232/image.jpg",
            title: "Bobi and Me",
            txt: "My image text BLah my image text BLah my image text BLah my image text BLah my image text BLah my image text BLah my image text BLah "
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