import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getProfiles } from '../../actions/profileActions';
import Spinner from '../common/Spinner';
class Profiles extends Component {
	componentDidMount() {
		this.props.getProfiles();
	}
	render() {
		const { profile, loading } = this.props.profile;
		let profileItems;
		if (profile === null || loading) {
			profileItems = <Spinner />;
		} else {
			if (profile.length > 0) {
        profileItems = <h1>profile here</h1>
			} else {
				profileItems = <h4>No profiles found...</h4>;
			}
		}
		return (
			<div className="profiles">
				<div className="container">
					<div className="row">
						<div className="col-md-12">
							<h1 className="display-4 text-center">
								Develop profiles
							</h1>
							<p className="lead text-center">
								Browser and connect with developers
							</p>
              {profileItems}
						</div>
					</div>
				</div>
			</div>
		);
	}
}

const mapStateToProps = (state) => ({
	profile: state.profile
});

export default connect(
	mapStateToProps,
	{ getProfiles }
)(Profiles);
