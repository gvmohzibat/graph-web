import React from 'react';
import Draggable from 'react-draggable';
import classNames from 'classnames';
import update from 'immutability-helper';
import is_color_dark from '../utils';

export default class GraphNode extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			x: 40,
			y: 40,
			r: 40,
			connectedToNodes: [],
			isDragging: false,
		}
	}

	render() {
		const {color, name, isActive, index, containerWidth} = this.props;
		let {isDragging, x, y, r} = this.state;

		let invert = is_color_dark(color);
		
		let nodeClass = classNames({
			'graph-node': true,
			'text-center': true,
			'is-dragging': isDragging,
			'is-active': isActive,
			'inverted-color': invert,
		});

		const activeNodeStroke = (isActive) ? {strokeDasharray:"8, 4", strokeWidth:"3", stroke:"black"} : {};

		return (
			<Draggable
				bounds={{left: r, top: r, right: containerWidth - (r), bottom: containerWidth - (r)}}
				onStart={this.handleDragStart}
				onDrag={this.handleDrag}
				onStop={this.handleDragStop}>
				<g class={nodeClass} id={"graph-node-"+index} style={{transform:"none !important"}} cursor="move">
					<circle cx={x} cy={y} r={r} fill={color} {...activeNodeStroke} />
					<text x={x} y={y} dy=".3em" textAnchor="middle">{name}</text>
				</g>
				{/*name*/}
			</Draggable>
			);
	}
	componentWillUnmount() {
		const {handleUnMount, index} = this.props;
		const {connectedToNodes} = this.state;
		handleUnMount(index, connectedToNodes);
	}
	handleDragStart = (e) => {
		this.handleClickOnNode(e);

		this.setState({
			isDragging: true,
		});
	}
	handleDrag = (e, data) => {
		const {handleDrag, index} = this.props;
		const {connectedToNodes} = this.state;

		this.setXandY(data);

		handleDrag(index, connectedToNodes, data.x, data.y);
	}
	setXandY = (data) => {
		this.setState({
			x: data.x,
			y: data.y,
		});
	}
	getX = () => {
		return this.state.x;
	}
	getY = () => {
		return this.state.y;
	}
	handleDragStop = (e) => {
		this.setState({
			isDragging: false,
		});
	}
	handleClickOnNode = (e) => {
		if (e.shiftKey) {
			this.handleShiftClick(e);
		} else if (e.ctrlKey) {
			this.handleCtrlClick(e);
		} else {
			const {activateNode, index} = this.props;
			activateNode(e, index);
		}
	}
	handleCtrlClick = (e) => {
		const {disconnectActiveFromMe, index} = this.props;
		disconnectActiveFromMe(e, index);
	}
	handleShiftClick = (e) => {
		const {connectActiveToMe, index} = this.props;
		connectActiveToMe(e, index);
	}
	getConnectedNodesIndex = () => {
		return this.state.connectedToNodes;
	}
	connectToNode = (node) => {
		if (this.isConnectedTo(node))
			return false;
		
		this.setState(update(this.state, {connectedToNodes: {$push: [node]}}));
		return true;
	}
	disconnectNode = (node) => {
		if (!this.isConnectedTo(node))
			return false;

		let nodeIndex = this.state.connectedToNodes.indexOf(node);

		this.setState(update(this.state, {connectedToNodes: {$unset: [nodeIndex]}}));
		return true;
	}
	isConnectedTo = (node) => {
		return this.state.connectedToNodes.includes(node);
	}
}
