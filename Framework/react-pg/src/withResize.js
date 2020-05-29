import React, { Component } from 'react';

// throttle

const addResizeListener = (handleResize)=>{
    if (typeof ResizeObserver === 'function') {
        let resizeObserver = new ResizeObserver( handleResize)
        resizeObserver.observe(document.body)

        return () => {
            if (!resizeObserver) {
                return
            }

            resizeObserver.disconnect()
            resizeObserver = null
        }
    } else {
        // Browser support, remove freely
        window.addEventListener('resize', handleResize)
        return () => {
            window.removeEventListener('resize', handleResize)
        }
    }
}
export const withResize = (Component)=>(
    class withResizeComponent extends React.Component{
        state={
            width:0,
            height:0,
            removeResize: null
        }
        componentDidMount(){
            const{innerWidth, innerHeight}= window;
            this.setState({
                width: innerWidth,
                height: innerHeight,
                removeResize: addResizeListener(()=>this.handleResize())
            })
        }
        componentWillUnmount(){
            // window.removeEventListener('resize', ()=>this.handleResize());
            this.state.removeResize()
        }
        handleResize() {
            const { innerWidth, innerHeight } = window;
            this.setState({
                width: innerWidth,
                height: innerHeight
            })
        }
        render(){
            const {width, height} = this.state;
            return <Component width={width} height={height}/>
        }
    }
)