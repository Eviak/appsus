export class NoteColorPicker extends React.Component {
  state = {
    isShown: false,
  }

  colorPickerToggle = () => {
    this.setState({ isShown: !this.state.isShown })
  }

  render() {
    const clrs = [
      "#FFF",
      "#F28B82",
      "#FBBC04",
      "#FFF475",
      "#CCFF90",
      "#CBF0F8",
      "#AECBFA",
      "#D7AEFB",
      "#FDCFE8",
    ]
    const { colorPickerToggle } = this
    const { changeBgClr } = this.props

    return (
      <div className="note-color-picker flex">
        <img
          className="color-picker-btn"
          src="apps/notes/img/icons/color-picker.png"
          alt="Color picker"
          onClick={colorPickerToggle}
        />
        {this.state.isShown && (
          <div className="color-picker-colors flex">
            {clrs.map((clr) => {
              return (
                <div
                  key={clr}
                  className="add-bg-color"
                  style={{ backgroundColor: clr }}
                  onClick={() => changeBgClr(clr)}
                ></div>
              )
            })}
          </div>
        )}
      </div>
    )
  }
}
