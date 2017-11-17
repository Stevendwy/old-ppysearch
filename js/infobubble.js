import React, {Component} from 'react'
import PropTypes from 'prop-types'

export default class InfoBubble extends Component {
	
	render() {
		let _showBubble = this.props.showBubble
		let _content = this.props.content
		return (
			<div style={{display: _showBubble}} className="InfoBubbleContainer">
				<div className="InfoBubbleContent"
					data-name="bubbleContent">
					{_content}
				</div>
			</div>
		)
	}
}

InfoBubble.propTypes = {
	showBubble: PropTypes.string.isRequired,
	content: PropTypes.string.isRequired
}
