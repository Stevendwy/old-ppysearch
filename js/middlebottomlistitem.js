import React, {
	Component
} from 'react'
import PropTypes from 'prop-types'

export default class MiddleBottomListItem extends Component {
	constructor(props) {
		super(props)
		this.state = {
			imgError: ""
		}
	}
	click(uri, index) {
		location.href = uri + "&index=" + index
	}
	notFind() {
		this.setState({
			imgError: "/img/img_kong.png"
		})
	}

	render() {

		let _imgError = this.state.imgError
		if (_imgError == "") {
			var _imgUrl = this.props.imgUrl
		} else {
			_imgUrl = _imgError

		}

		let _title = this.props.title
		let _auth = this.props.auth
		let _uri = this.props.uri
		let _index = this.props.index
		let _content = isNoPic ? <div></div> : <img className="MiddleBottomListItemImg" onError={this.notFind.bind(this)} src={_imgUrl || cdnHost+"/img/img_kong.png"} onClick={this.click.bind(this, _uri, _index)}/>
		let _className = isNoPic ? "MiddleBottomListItemImgContainer isNoPic" : "MiddleBottomListItemImgContainer"
		return (
			<div className={_className}>
				{_content}
				<div className="MiddleBottomListItemContainers">
					<div className="MiddleBottomListItemTitle" onClick={this.click.bind(this, _uri, _index)}>{_title || ""}</div>
				</div>
			</div>
		)
	}
}

MiddleBottomListItem.propTypes = {
	imgUrl: PropTypes.string.isRequired,
	title: PropTypes.string.isRequired
}