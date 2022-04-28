export class NoteAddInput extends React.Component{

    state = {
        selected: false,
    }


    render() {
        const { onNoteAdd, handleChange } = this.props
        return <section className="note-add-input flex align-center" style={{height: '45px'}}>
        <form onSubmit={onNoteAdd}>
        <input type="text" placeholder="title" name="title" onChange={handleChange} />
        <textarea wrap="soft" placeholder="What's on your mind?" name="txt" onChange={handleChange} style={{lineHeight: '1.3333em'}} />
        <img src="apps/notes/img/icons/image.png" alt="" />
        <img src="apps/notes/img/icons/video.png" alt="" />
        <img src="apps/notes/img/icons/list.png" alt="" />
        <button>Create</button>
        </form>
    </section>
    }
}