import React from 'react';
import update from 'immutability-helper';

export default class GraphViewer extends React.Component {
	/*static propTypes = {
		name: React.PropTypes.string,
	};*/

	constructor(props) {
		super(props);
		this.state = {
			nodes: [],
		}
	}

	render() {
		const {nodes} = this.state;
		let nodesComp = nodes.map((node, index) => <div class="graph-node text-center" style={{background: node.color}}>{node.name}</div>)

		return (
			<div id="graph-viewer">
				<h3>نمایش</h3>
				<div id="graph-container">
					{nodesComp}
				</div>
			</div>
		);
	}
	viewGraph = (nodes) => {
		this.setState(update(this.state, {nodes: {$set: nodes}}));
	}
}