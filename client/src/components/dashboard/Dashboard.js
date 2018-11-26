import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { getCurrentProfile } from '../../actions/profileActions';
import Spinner from '../common/Spinner';
class Dashboard extends Component {
	componentDidMount() {
		this.props.getCurrentProfile();
	}
	render() {
		const { user } = this.props.auth;
		const { profile, loading } = this.props.profile;
		let dashboardContent;
		if (profile === null || loading) {
			dashboardContent = (
				<h4>
					<Spinner />
				</h4>
			);
		} else {
			if (Object.keys(profile).length > 0) {
				dashboardContent = <p>Todo:Show Profile</p>;
			} else {
				dashboardContent = (
					<div>
						<p className="lead text-muted">Welcome {user.name}</p>
						<p>You have not yet setup a profile,please add some info</p>
						<Link
							to="/create-profile"
							className="btn btn-lg btn-info">
							Create Profile
						</Link>
					</div>
				);
			}
		}
		return (
			<div className="dashboard">
				<div className="container">
					<div className="row">
						<div className="col-md-12">
							<h1 className="display-4">Dashboard</h1>
							{dashboardContent}
						</div>
					</div>
				</div>
			</div>
		);
	}
}
Dashboard.PropTypes = {
	getCurrentProfile: PropTypes.func.isRequire,
	profile: PropTypes.object.isRequire,
	auth: PropTypes.object.isRequire
};
const mapStateToProps = (state) => ({
	profile: state.profile,
	auth: state.auth
});
export default connect(
	mapStateToProps,
	{ getCurrentProfile }
)(Dashboard);
