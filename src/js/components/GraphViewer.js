import React from 'react';
import update from 'immutability-helper';
import GraphNode from './GraphNode';
import {Button} from 'react-bootstrap';
import Edge from './Edge';
import saveRefs from 'react-save-refs';

export default class GraphViewer extends React.Component {
	_nodes = new Map();
	_edges = new Map();

	constructor(props) {
		super(props);
		this.state = {
			containerWidth: 800,
			nodes: [],
			edges: [],
			activeNodeIndex: 0,
		}
	}

	render() {
		const {nodes, edges, activeNodeIndex, containerWidth} = this.state;

		let nodesComp = nodes.map((node, index) => {
			let isActive = (index === activeNodeIndex) ? true : false;
			return <GraphNode
						key={index} index={index}
						color={node.color}
						name={node.name}
						isActive={isActive}
						ref={saveRefs(this._nodes, index)}
						activateNode={this.setActiveNode}
						handleDrag={this.dragNodesAndConnectedEdges}
						handleUnMount={this.disconnectNode}
						connectActiveToMe={this.connectActiveToNode}
						disconnectActiveFromMe={this.disconnectActiveFromNode}
						containerWidth={containerWidth} />
		});

		let edgesComp = edges.map((edge, index) => {
			return <Edge
						key={index} index={index}
						x_start={edge.x_start} y_start={edge.y_start} x_end={edge.x_end} y_end={edge.y_end}
						start={edge.start} end={edge.end}
						ref={saveRefs(this._edges, edge.start + '-' + edge.end)}
						containerWidth={containerWidth} />
		});

		return (
			<div id="graph-viewer" ref={(_self)=>{this.graphContainer = _self}}>
				<h3 style={{height: "36px"}}>نمایش</h3>
				<ol>
					<li>برای وصل کردن یال بین دو رأس، اول روی یک رأس کلیک کرده و روی رأس دوم Shift+Click کنید.</li>
					<li>برای حذف یک یال، روی یک رأس کلیک کرده و روی رأس دوم Ctrl+Click کنید.</li>
				</ol>
				<svg id="graph-container" width={containerWidth+"px"} height={containerWidth+"px"}>
					{edgesComp}
					{nodesComp}
				</svg>
				<Button id="graph-output-json" bsStyle="info" onClick={this.handleClickOnOutputButton}>خروجی</Button>
			</div>
		);
	}

	// react component functions
	componentDidMount() {
		this.updateContainerWidth();
		window.addEventListener("resize", this.updateContainerWidth);
	}
    componentWillUnmount() {
        window.removeEventListener("resize", this.updateContainerWidth);
    }

    // methods
    updateContainerWidth = () => {
    	this.setState({
			containerWidth: this.graphContainer.offsetWidth,
		});
    }
	viewGraph = (nodes) => {
		this.setState(update(this.state, {nodes: {$set: nodes}}));
	}
	setActiveNode = (e, nodeIndex) => {
		this.setState({ activeNodeIndex: nodeIndex });
	}
	connectActiveToNode = (e, destNode) => {
		const {activeNodeIndex: activeNode} = this.state;
		if (activeNode == destNode)
			return;

		const activeNodeComp = this._nodes.get(activeNode);
		const destNodeComp = this._nodes.get(destNode);

		activeNodeComp.connectToNode(destNode);
		let connected = destNodeComp.connectToNode(activeNode);
		
		if (connected)
			this.addEdge(activeNode, destNode, activeNodeComp.getX(), activeNodeComp.getY(), destNodeComp.getX(), destNodeComp.getY());
	}
	disconnectActiveFromNode = (e, destNode) => {
		const {activeNodeIndex: activeNode} = this.state;
		if (activeNode == destNode)
			return;

		const activeNodeComp = this._nodes.get(activeNode);
		const destNodeComp = this._nodes.get(destNode);

		activeNodeComp.disconnectNode(destNode);
		let disconnected = destNodeComp.disconnectNode(activeNode);

		if (disconnected)
			this.removeEdge(activeNode, destNode);
	}
	outputAllNodesConnectedNodesJson = (e) => {
		const {nodes} = this.state;

		let output = "{";

		nodes.forEach((node, i) => {
			let connectedNodesIndex = this._nodes.get(i).getConnectedNodesIndex();

			let connectedNodesJson = "";
			connectedNodesIndex.forEach((nodeIndex) => {
				connectedNodesJson += nodes[nodeIndex].name + ",";
			})
			
			connectedNodesJson = connectedNodesJson.slice(0,-1);

			output += node.name + ":" + "{" + connectedNodesJson + "}" + ", ";
		})
		if (nodes.length)
			output = output.slice(0, -2);
		output += "}";
		console.log(output);
	}
	addEdge = (start, end, x_start, y_start, x_end, y_end) => {
		if (start == end)
			return;
		if (start > end) {
			[start, end, x_start, y_start, x_end, y_end] = [end, start, x_end, y_end, x_start, y_start]; //swap values
		}
		let edge = {start, end, x_start, y_start, x_end, y_end};
		this.setState(update(this.state, {edges: {$push: [edge]}}));

		return this.state.edges.length - 1; // index of the added edge
	}
	removeEdge = (nodeIndex, node, returnIndex = false) => {
		let index = 0;
		if (nodeIndex > node) {
			index = this._edges.get(node+'-'+nodeIndex).getIndex();
		} else {
			index = this._edges.get(nodeIndex+'-'+node).getIndex();
		}
		if (returnIndex)
			return index;
		else
			this.setState(update(this.state, {edges: {$unset: [index]}}));
	}
	dragNodesAndConnectedEdges = (nodeIndex, connectedNodes, x, y) => {
		connectedNodes.forEach((node) => {
			if (nodeIndex > node) {
				this._edges.get(node+'-'+nodeIndex).move('end',x,y);
			} else {
				this._edges.get(nodeIndex+'-'+node).move('start',x,y);
			}
		});
	}
	disconnectNode = (nodeIndex, connectedNodes) => {
		let removeIndexes = [];
		connectedNodes.forEach((node) => {
			let index = this.removeEdge(nodeIndex, node, true);
			removeIndexes.push(index);
		});
		this.setState(update(this.state, {edges: {$unset: removeIndexes}}));
	}

	// handlers
	handleClickOnOutputButton = (e) => {
		this.outputAllNodesConnectedNodesJson(e);
	}
}
