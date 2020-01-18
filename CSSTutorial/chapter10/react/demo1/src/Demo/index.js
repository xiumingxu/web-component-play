import React, { PureComponent } from 'react';
import styles from './index.css';
import styled from 'styled-components';

const Div = styled.div`color: red;`;

class Demo extends PureComponent {
	constructor (props) {
		super(props);
		this.state = {};
	}

	componentDidMount () {}

	render () {
		console.log('style', styles);
		return <Div className={styles.container}>Demo</Div>;
	}
}

Demo.propTypes = {};

export default Demo;
