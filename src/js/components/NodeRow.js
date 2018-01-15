import React from 'react';
import {FormControl} from 'react-bootstrap';

export default class NodeRow extends React.Component {
	render() {
		const {color, name, index} = this.props;

		return (
			<tr>
				<td>
					<span>{index}</span>
				</td>
				<td>
					<span id={"remove-node-"+index} onClick={this.removeNodeButton} class="glyphicon glyphicon-remove remove-node-button" aria-hidden="true"></span>
				</td>
				<td id={"node-item-"+index} style={{color: color}}>
					<FormControl type="text" name="name" bsClass="" value={name} onChange={this.handleFormInputChange} />
				</td>
				<td>
					<FormControl type="color" name="color" bsClass="" value={color} onChange={this.handleFormInputChange} />
					<FormControl class="color-text-input" type="text" name="color" bsClass="" value={color} onChange={this.handleFormInputChange} />
				</td>
			</tr>
			);
	}
	handleFormInputChange = (e) => {
		const target = e.target;
	    const value = target.value;
	    const name = target.name;
		
		const {updateNode, index} = this.props;
	    updateNode(index, name, value);
	}
	removeNodeButton = (e) => {
		const {removeNode, index} = this.props;
		removeNode(index);
	}
}
