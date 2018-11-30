import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import ProfileHeader from './ProfileHeader';
import ProfileAbout from './ProfileAbout';
import ProfileCreads from './ProfileCreads';
import ProfileGithub from './ProfileGithub';
import Spinner from '../common/Spinner';

import { getProfileByHandle } from '../../actions/profileActions';

class Profile extends Component {
	componentDidMount() {
		if (this.props.match.params.handle) {
			this.props.getProfileByHandle(this.props.match.params.handle);
		}
	}
	render() {
		return (
			<div>
				<ProfileHeader />
				<ProfileAbout />
				<ProfileCreads />
				<ProfileGithub />
			</div>
		);
	}
}
const mapStateToProps = (state) => ({
	profile: state.profile
});
export default connect(
	mapStateToProps,
	{ getProfileByHandle }
)(Profile);
