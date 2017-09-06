import React from 'react';
import GraphViewer from './GraphViewer';
import Sidebar from './Sidebar';

export default class Layout extends React.Component {
	/*static propTypes = {
		name: React.PropTypes.string,
	};*/

	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div>
				<div className="col-sm-3">
					<Sidebar handleShowGraphClick={this.handleShowGraphClick} />
				</div>
				<div className="col-sm-9">
					<GraphViewer ref={(_self)=>{this.GraphViewer = _self}} />
				</div>
			</div>
		);
	}

	handleShowGraphClick = (e, nodes) => {
		this.GraphViewer.viewGraph(nodes);
	}
}