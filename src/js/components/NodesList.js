import React from 'react';
import update from 'immutability-helper';
import {Table} from 'react-bootstrap';
import NodeRow from './NodeRow';

export default class NodesList extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			nodes: [
				{name: "name", color: "#000000"}
			]
		}
	}

	render() {
		const {nodes, form} = this.state;

		let nodesComp = nodes.map((item, index) => {
			return (
				<NodeRow {...item} key={index} index={index} updateNode={this.updateNode} removeNode={this.removeNode} />
				);
			});

		return (
			<div>
				<Table striped bordered condensed hover id="nodes-list">
					<thead>
						<tr>
							<th>#</th>
							<th><span class="glyphicon glyphicon-plus add-node-button" aria-hidden="true" onClick={this.handleClickAddNodeButton}></span></th>
							<th>نام رأس</th>
							<th>رنگ</th>
						</tr>
					</thead>
					<tbody>
						{nodesComp}
					</tbody>
				</Table>
			</div>
		);
	}
	getNodes = () => {
		return this.state.nodes;
	}
	addNode = (data) => {
		this.setState(update(this.state, {nodes: {$push: [{...data}]}}));
	}
	handleClickAddNodeButton = (e) => {
		this.addNode({name: "name", color: "#000000"});
	}
	updateNode = (index, fieldName, fieldValue) => {
		const {nodes} = this.state;
		nodes[index][fieldName] = fieldValue;
		
		this.setState({
			nodes
		});
	}
	removeNode = (index) => {
		this.setState(update(this.state, {nodes: {$unset: [index]}}));
	}
}