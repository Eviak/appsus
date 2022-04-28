export class NoteAddInput extends React.Component{

    state = {
        selected: false,
        isImgInputShown: false,
        isVidInputShown: false,
        isListInputShown: false,
        newNote: null,
    }

    onIconBtnClick= (keyType) => {
        const key = `is${keyType}InputShown`
        this.setState({ [key]: !this.state[key] })
    }

    render() {
        const { onNoteAdd, handleChange } = this.props
        const { isImgInputShown, isVidInputShown, isListInputShown, newNote } = this.state

        return <section className="note-add-input flex align-center" style={{height: '45px'}}>
     
        <form onSubmit={() => onNoteAdd(newNote)}>
        <input type="text" placeholder="title" name="title" onChange={handleChange} />
        <textarea placeholder="What's on your mind?" name="txt" onChange={handleChange} style={{lineHeight: '1.3333em'}} />

        {isImgInputShown && <textarea 
        placeholder="Enter image URL here" 
        name="url" 
        onChange={handleChange} 
        style={{lineHeight: '1.3333em'}} />}

        {isVidInputShown && <textarea 
        placeholder="Enter Youtube URL here" 
        name="url" 
        onChange={handleChange} 
        style={{lineHeight: '1.3333em'}} />}

        {isListInputShown && <textarea 
        placeholder="Enter List URL here" 
        name="url" 
        onChange={handleChange} 
        style={{lineHeight: '1.3333em'}} />}

        <img onClick={() => this.onIconBtnClick('Img')} src="apps/notes/img/icons/image.png" alt="Add image note" />
        <img onClick={() => this.onIconBtnClick('Vid')} src="apps/notes/img/icons/video.png" alt="Add Youtube note" />
        <img onClick={() => this.onIconBtnClick('List')} src="apps/notes/img/icons/list.png" alt="Add list note" />
        <button>Create</button>
        </form>
    </section>
    }
}