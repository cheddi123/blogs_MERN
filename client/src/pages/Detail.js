import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Col, Row, Container } from '../components/Grid';
// import Jumbotron from '../components/Jumbotron';
import API from '../utils/API';
import { TextArea, FormBtn } from '../components/Form';
import moment from 'moment';
// import DeleteBtn from "../components/DeleteBtn";
// import { List, ListItem, } from "../components/List";
// const db = require("../../../models/blog");

class Detail extends Component {
	state = {
		responses: '',
		blog: [],
		loadresponse: [],
		time: '',
	};
	// When this component mounts, grab the book with the _id of this.props.match.params.id
	// e.g. localhost:3000/books/599dcb67f0f16317844583fc
	componentDidMount() {
		this.loadBlog();
	}

	loadBlog = () => {
		API.getBlog(this.props.match.params.id)
			.then(res => {
				console.log('DATA: ', res.data);
				console.log('responses: ', res.data.responses);
				console.log(res.data.responses[2]);
				let time = moment(res.data.date).format('LLL');

				console.log(time);

				// res.data.date.toDateString()
				// console.log(date)
				this.setState({
					blog: res.data,
					loadresponse: res.data.responses.slice(1),
					time: moment(res.data.date).format('LLL'),
				});
			})
			.catch(err => console.log(err));
	};

	handleResponseChange = event => {
		const { name, value } = event.target;
		this.setState({
			[name]: value,
			responses: value,
		});
	};

	Submitresponse = event => {
		event.preventDefault();
		console.log('submit!!!!');
		console.log(this.state.blog._id);
		console.log(this.state.responses);
		let responses = this.state.responses;
		const id = this.state.blog._id;
		//   let  responses: [{ response_body: this.state.responses }],
		console.log(id);
		if (this.state.blog._id) {
			API.updateBlogResponse({
				id,
				responses,
			})

				.then(res => {
					console.log(res.data);
					console.log('I ma trying');
					this.setState({
						responses: '',
					});
					this.loadBlog();
				})

				.catch(err => console.log(err));
		}
	};

	render() {
		const userdata = this.state.blog;

		const { topic, author, synopsis } = userdata;
		
		return (
			<div style={{ height: '100%' }}>
				<Container fluid>
					<Row>
						<Col size="md-12">
							<h1>
								{topic} by {author} created at <span className="text-success"> {this.state.time}</span>
							</h1>
						</Col>
					</Row>

					<Row>
						<Col size="md-10 md-offset-1">
							<article>
								<h1>Synopsis</h1>
								<h3>{synopsis}</h3>
							</article>
						</Col>
					</Row>
					<form>
						<TextArea
							value={this.state.responses}
							onChange={this.handleResponseChange}
							name="response"
							placeholder="Enter your response"
						/>
						<FormBtn onClick={this.Submitresponse}>Submit response</FormBtn>
					</form>

					<Row>
						<Col size="md-2">
							<Link to="/">← Back to Bloggers</Link>
						</Col>
					</Row>
				</Container>
				<ul>
					{this.state.loadresponse.map((item, i) => (

						<li key={i} className="m-4">
							{item}
						</li>
					))}{' '}
				</ul>
			</div>
		);
	}
}

export default Detail;
///
