import React from 'react';

const withMouse = (Component) =>{
    class Mouse extends React.Component{
        
        constructor(props){
            super(props);
            this.state = {
                x: 0,
                y: 0
            }
        }
        handleMouseOver = (event)=>{
            console.log("handlemouse", event)
            this.setState({
                x: event.clientX,
                y: event.clientY
            })
        }
        render(){
            return <div onMouseMove={this.handleMouseOver} >
                     <Component {...this.props} mouse={this.state} />
            </div> 
        }
    }
    return Mouse;
}
class Inner extends React.Component{
    render(){
        const {x, y} = this.props.mouse;
        return  <p style={{"height": 500, "background": "#eee"}}> here is the  mouse {x}  hover{y}ber</p>
    }
}
export default withMouse(Inner)