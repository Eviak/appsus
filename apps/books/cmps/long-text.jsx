export class LongText extends React.Component{
    state = {isLong : false, isShown : false}
    
    componentDidMount(){
        this.setIsLong()
    }

    setIsLong(){
        if(this.props.desc.length >= 100) this.setState({isLong: true})
    }
    
    toggleDesc= () => {
        this.setState((prevState) => ({isShown: (prevState.isShown? false : true)}))
    }

   render(){
       const {desc} = this.props
       const {isLong,isShown} = this.state
       const displayText = !isShown ? desc.slice(0,99) : desc
       return <section className="long-text">
           <p>{displayText}</p>
           <div className="expand">{this.state.isLong && !isShown && <span onClick={this.toggleDesc}>READ MORE</span>}{this.state.isLong && isShown && <span onClick={this.toggleDesc}>READ LESS</span>}</div>
           </section>
   } 
}