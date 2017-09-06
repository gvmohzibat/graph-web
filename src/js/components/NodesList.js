import React from 'react';
import update from 'immutability-helper';
import {Form, FormControl, FormGroup} from 'react-bootstrap';

export default class NodesList extends React.Component {
	/*static propTypes = {
		name: React.PropTypes.string,
	};*/

	constructor(props) {
		super(props);
		this.state = {
			nodes: [
				{name: "vahid", color: "#f90"}
			],
			form: {
				name: null,
				color: null,
			}
		}
	}

	render() {
		const {nodes} = this.state;
		let nodesComp = nodes.map((item, index) => 
			<tr>
				<td>{index}</td>
				<td>x</td>
				<td id={"node-item-"+index} style={{color: item.color}}>{item.name}</td>
				<td>item.color</td>
			</tr>
		);
		return (
			<div>
				<table id="nodes-list">
					<thead>
						<tr>
							<th>#</th>
							<th>+</th>
							<th>نام رأس</th>
							<th>رنگ</th>
						</tr>
					</thead>
					<tbody>
						{nodesComp}
					</tbody>
				</table>
				<Form inline id="new-node-input" onSubmit={this.handleInputKeyPress}>
						<FormControl type="text" name="name" bsClass="col-xs-4" placeholder="name" onChange={this.handleFormInputChange} />
						<FormControl type="text" name="color" bsClass="col-xs-4" placeholder="color" onChange={this.handleFormInputChange} />
						<FormControl type="submit" value="submit" bsClass="col-xs-4" />
				</Form>
			</div>
		);
	}
	handleFormInputChange = (e) => {
		const target = e.target;
	    const value = target.value;
	    const name = target.name;

	    const {form} = this.state;
	    form[name] = value;
		this.setState({form});
	}
	handleInputKeyPress = (e) => {
		const {name,color} = this.state.form;
		
		this.setState(update(this.state, {nodes: {$push: [{name, color}]}}));

		e.preventDefault();
	}
	getNodes = () => {
		return this.state.nodes;
	}
}