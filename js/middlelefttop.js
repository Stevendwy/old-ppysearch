import React, {Component} from 'react'
import PropTypes from 'prop-types'

export default class MiddleLeftTop extends Component {
	
	render() {
		let _title = this.props.title
		return (
			<div className="MiddleLeftTopTitleContainer">
				<div className="MiddleLeftTopTitle">
					{_title}
				</div>
			</div>
		)
	}
}

MiddleLeftTop.propTypes = {
	title: PropTypes.string.isRequired
}
