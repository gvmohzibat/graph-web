import React from 'react';
import GraphViewer from './GraphViewer';
import Sidebar from './Sidebar';

export default class Layout extends React.Component {
	render() {
		return (
			<div className="row">
				<div className="col-sm-4">
					<Sidebar handleShowGraphClick={this.handleShowGraphClick} />
				</div>
				<div className="col-sm-8">
					<GraphViewer ref={(_self)=>{this.GraphViewer = _self}} />
				</div>
			</div>
		);
	}

	handleShowGraphClick = (e, nodes) => {
		this.GraphViewer.viewGraph(nodes);
	}
}