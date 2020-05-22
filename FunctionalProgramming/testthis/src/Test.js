import React, { Component } from 'react';

class Test extends Component {
    handleThis () {
        console.log(this);
    }
    render () {
        return <div onClick={() => this.handleThis()}>THIS</div>;
    }
}

export default Test;
