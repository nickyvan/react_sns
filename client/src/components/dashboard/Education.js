import React, { Component } from 'react';
import { connect } from 'react-redux';
import Moment from 'react-moment';
import { deleteEducation } from '../../actions/profileActions';
class Education extends Component {
	onDeleteClick = (id) => {
		this.props.deleteEducation(id);
	}
	render() {
		const education = this.props.education.map((edu) => (
			<tr key={edu._id}>
				<td>{edu.school}</td>
        <td>{edu.fieldofstudy}</td>
				<td>{edu.degree}</td>
				<td>
					<Moment format="YYYY/MM/DD">{edu.from}</Moment>-
					{edu.to === null ? (
						'Now'
					) : (
						<Moment format="YYYY/MM/DD">{edu.to}</Moment>
					)}
				</td>
				<td>
					<button onClick={()=>this.onDeleteClick(edu._id)} className="btn btn-danger">Delete</button>
				</td>
			</tr>
		));
		return (
			<div>
				<h4 className="mb-4">Education</h4>
				<table className="table">
					<thead>
						<tr>
							<th>School</th>
              <th>Field of study</th>
							<th>Degree</th>
							<th>Years</th>
							<th />
						</tr>
						{education}
					</thead>
				</table>
			</div>
		);
	}
}

export default connect(
	null,
	{ deleteEducation }
)(Education);