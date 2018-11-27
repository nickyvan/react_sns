import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { createProfile, getCurrentProfile } from '../../actions/profileActions';
import TextFieldGroup from '../common/TextFieldGroup';
import TextAreaFieldGroup from '../common/TextAreaFieldGroup';
import SelectListGroup from '../common/SelectListGroup';
import InputGroup from '../common/InputGroup';
import isEmpty from '../../validation/isEmpty';
class EditProfile extends Component {
	constructor(props) {
		super(props);
		this.state = {
			displaySocialInputs: false,
			handle: '',
			company: '',
			website: '',
			location: '',
			status: '',
			skills: '',
			githubusername: '',
			bio: '',
			twitter: '',
			facebook: '',
			linkedin: '',
			youtube: '',
			instagram: '',
			errors: {}
		};
	}
	componentDidMount() {
		this.props.getCurrentProfile();
	}
	componentWillReceiveProps(nextProps) {
		if (nextProps.errors) {
			this.setState({ errors: nextProps.errors });
		}

		if (nextProps.profile.profile) {
      
			const profile = nextProps.profile.profile;

			const skillsCSV = profile.skills.join(',');

			profile.company = !isEmpty(profile.company) ? profile.company : '';
			profile.website = !isEmpty(profile.website) ? profile.website : '';
			profile.location = !isEmpty(profile.location)
				? profile.location
				: '';
			profile.githubusername = !isEmpty(profile.githubusername)
				? profile.githubusername
				: '';
			profile.bio = !isEmpty(profile.bio) ? profile.bio : '';
			profile.social = !isEmpty(profile.social) ? profile.social : {};
			profile.twitter = !isEmpty(profile.social.twitter)
				? profile.social.twitter
				: '';
			profile.facebook = !isEmpty(profile.social.facebook)
				? profile.social.facebook
				: '';
			profile.linkedin = !isEmpty(profile.social.linkedin)
				? profile.social.linkedin
				: '';
			profile.youtube = !isEmpty(profile.social.youtube)
				? profile.social.youtube
				: '';
			profile.instagram = !isEmpty(profile.social.instagram)
				? profile.social.instagram
				: '';

			this.setState({
				handle: profile.handle,
				company: profile.company,
				website: profile.website,
				location: profile.location,
				status: profile.status,
				skills: skillsCSV,
				githubusername: profile.githubusername,
				bio: profile.bio,
				twitter: profile.twitter,
				facebook: profile.facebook,
				linkedin: profile.linkedin,
				youtube: profile.youtube,
				instagram: profile.instagram
			});
		}
	}
	onChange = (e) => {
		this.setState({ [e.target.name]: e.target.value });
	};
	onSubmit = (e) => {
		e.preventDefault();
		const profileData = {
			handle: this.state.handle,
			company: this.state.company,
			website: this.state.website,
			location: this.state.location,
			status: this.state.status,
			skills: this.state.skills,
			githubusername: this.state.githubusername,
			bio: this.state.bio,
			twitter: this.state.twitter,
			facebook: this.state.facebook,
			linkedin: this.state.linkedin,
			youtube: this.state.youtube,
			instagram: this.state.instagram
		};
		this.props.createProfile(profileData, this.props.history);
	};
	render() {
		const { errors, displaySocialInputs } = this.state;
		let SocialInputs;
		if (displaySocialInputs) {
			SocialInputs = (
				<div>
					<InputGroup
						placeholder="Twitter URL"
						name="twitter"
						icon="fab fa-twitter"
						value={this.state.twitter}
						onChange={this.onChange}
						error={errors.twitter}
					/>
					<InputGroup
						placeholder="Facebook URL"
						name="facebook"
						icon="fab fa-facebook"
						value={this.state.facebook}
						onChange={this.onChange}
						error={errors.facebook}
					/>
					<InputGroup
						placeholder="Linkedin URL"
						name="linkedin"
						icon="fab fa-linkedin"
						value={this.state.linkedin}
						onChange={this.onChange}
						error={errors.linkedin}
					/>
					<InputGroup
						placeholder="Youtube URL"
						name="youtube"
						icon="fab fa-youtube"
						value={this.state.youtube}
						onChange={this.onChange}
						error={errors.youtube}
					/>
					<InputGroup
						placeholder="Instagram URL"
						name="instagram"
						icon="fab fa-instagram"
						value={this.state.instagram}
						onChange={this.onChange}
						error={errors.instagram}
					/>
				</div>
			);
		} else {
		}

		const options = [
			{ label: '* Select Professional Status', value: 0 },
			{ label: 'Developer', value: 'Developer' },
			{ label: 'Junior Developer', value: 'Junior Developer' },
			{ label: 'Senior Developer', value: 'Senior Developer' },
			{ label: 'Manager', value: 'Manager' },
			{ label: 'Intern', value: 'Intern' },
			{ label: 'Student', value: 'Student' },
			{ label: 'Teacher', value: 'Teacher' },
			{ label: 'Other', value: 'Other' }
		];
		return (
			<div className="create-profile">
				<div className="container">
					<div className="row">
						<div className="col-md-8 m-auto">
							<h1 className="display-4 text-center">
								Edit Your Profile
							</h1>
							<p className="lead text-center">
								Add some your informations
							</p>
							<small className="d-block pb-3">
								* = required field
							</small>
							<form onSubmit={this.onSubmit}>
								<TextFieldGroup
									placeholder="* Profile Handle"
									name="handle"
									value={this.state.handle}
									onChange={this.onChange}
									error={errors.handle}
									info="This is unique handle for your profile URL"
								/>
								<SelectListGroup
									placeholder="Status"
									name="status"
									value={this.state.status}
									onChange={this.onChange}
									error={errors.status}
									options={options}
									info="Your present position"
								/>
								<TextFieldGroup
									placeholder="Company"
									name="company"
									value={this.state.company}
									onChange={this.onChange}
									error={errors.company}
									info="Your present company"
								/>
								<TextFieldGroup
									placeholder="Website"
									name="website"
									value={this.state.website}
									onChange={this.onChange}
									error={errors.website}
									info="Your owned website"
								/>
								<TextFieldGroup
									placeholder="Location"
									name="location"
									value={this.state.location}
									onChange={this.onChange}
									error={errors.location}
									info="Your place"
								/>
								<TextFieldGroup
									placeholder="* Skills html,javascript,css"
									name="skills"
									value={this.state.skills}
									onChange={this.onChange}
									error={errors.skills}
									info="Please use comma to seperate your skills (eg. HTML,JS,CSS,PHP)"
								/>
								<TextFieldGroup
									placeholder="Github username"
									name="githubusername"
									value={this.state.githubusername}
									onChange={this.onChange}
									error={errors.githubusername}
									info="Your github username"
								/>
								<TextAreaFieldGroup
									placeholder="About you"
									name="bio"
									value={this.state.bio}
									onChange={this.onChange}
									error={errors.bio}
									info="Tell everybody about you"
								/>
								<div className="mb-3">
									<button
										type="button"
										onClick={() => {
											this.setState((prevState) => ({
												displaySocialInputs: !prevState.displaySocialInputs
											}));
										}}
										className="btn btn-light">
										Add SNS Links
									</button>
									<span className="text-muted">Optional</span>
									{SocialInputs}
									<input
										type="submit"
										value="Submit"
										className="btn btn-info btn-block mt-4"
									/>
								</div>
							</form>
						</div>
					</div>
				</div>
			</div>
		);
	}
}
const mapStateToProps = (state) => ({
	profile: state.profile,
	errors: state.errors
});
export default connect(
	mapStateToProps,
	{ createProfile, getCurrentProfile }
)(withRouter(EditProfile));