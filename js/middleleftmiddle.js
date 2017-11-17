import React, {
	Component
} from 'react'
import PropTypes from 'prop-types'

export default class MiddleLeftMiddle extends Component {
	constructor() {
		super()
		this.state = {
			error: false
		}
		this.timer = ""
	}

	changeStatus() {

		this.timer = setTimeout(() => {
			this.refs.middleleftmiddleremind.style.display = "block"
		}, 1000)
	}

	componentWillReceiveProps(props) {
		if (this.props.imgUrl != props.imgUrl) {
			//			this.temp = false
			this.setState({
				error: false
			})
		}
	}

	imgerror() {

		this.setState({
			error: true
		})

		//		$(".MiddleLeftMiddleContainer").html("");

	}
	render() {
		let _remind = this.props.remind
		let _detail = this.props.imgClick
		let _textContainer = <div className='textimgErrorMsg'>暂无此车型图片</div>
		let _container = this.state.error ? _textContainer : <img className="MiddleLeftMiddleImg" onError={this.imgerror.bind(this)} src={this.props.imgUrl || cdnHost+"/img/icon_kong.png"}
					onMouseEnter={this.changeStatus.bind(this)}
					onMouseLeave={() => {this.refs.middleleftmiddleremind.style.display = "none",clearInterval(this.timer)}}
					/>
			//		this.state.error = false
		return (
			<div className="MiddleLeftMiddleImgContainer">
				{_container}
				<div ref="middleleftmiddleremind" className="MiddleLeftMiddleRemind">车型图片</div>
			</div>
		)
	}
}

MiddleLeftMiddle.propTypes = {
	imgUrl: PropTypes.string.isRequired
}