import React from 'react';

export default class Edge extends React.Component {
	constructor(props) {
		super(props);
		// const {sstart, send, sx_start, sy_start, sx_end, sy_end} = this.props;
		this.state = {
			start: props.start,
			end: props.end,
			x_start: props.x_start,
			y_start: props.y_start,
			x_end: props.x_end,
			y_end: props.y_end,
			index: props.index,
		}
	}

	render() {
		const {start, end, x_start, y_start, x_end, y_end} = this.state;

		return (
			<line x1={x_start} y1={y_start} x2={x_end} y2={y_end} style={{stroke: '#000', strokeWidth:2}} />
			);
	}
	move = (node, x, y) => {
		if (node == 'start') {
			this.setState({
				x_start: x,
				y_start: y,
			});
		} else {
			this.setState({
				x_end: x,
				y_end: y,
			});
		}
	}
	getIndex = () => {
		return this.state.index;
	}
}
