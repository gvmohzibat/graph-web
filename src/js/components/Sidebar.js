import React from 'react';
import NodesList from './NodesList';
import {Button} from 'react-bootstrap';

export default class Sidebar extends React.Component {
	/*static propTypes = {
		name: React.PropTypes.string,
	};*/

	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div>
				<h3>مشخصات</h3>
				<NodesList ref={(_self)=>{this.NodesList = _self}} />
				<Button id="show-graph-button" bsStyle="primary" block onClick={this.handleShowGraphClick}>نمایش گراف</Button>
			</div>
		);
	}

	handleShowGraphClick = (e) => {
		const {handleShowGraphClick} = this.props;
		handleShowGraphClick(e, this.NodesList.getNodes());
	}
}