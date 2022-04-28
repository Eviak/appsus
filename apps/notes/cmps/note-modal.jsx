export class NoteModal extends React.Component {
  state = {
    isShown: false,
  }
  render() {
    const { isShown } = this.state
    if (!isShown) return <React.Fragment></React.Fragment>
    {
      switch (this.props.note.type) {
        case "note-txt":
          return <section className="note-modal">NOTE MODAL</section>
      }
    }

    //    return <section className="note-modal">
    //        NOTE MODAL
    //    </section>
  }
}
