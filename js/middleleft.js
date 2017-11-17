import React, {
	Component
} from 'react'
import MiddleLeftTop from './middlelefttop'
import MiddleLeftMiddle from './middleleftmiddle'
import MiddleLeftBottom from './middleleftbottom'
import PropTypes from 'prop-types'

export default class MiddleLeft extends Component {

	render() {
		let _nodata = "initial"
		let _vins = this.props.vins
		if (this.props.imgUrl.length > 0) _nodata = "none"
		let _remind = this.props.remind
		let _detail = this.props.imgClick
		return (
			<div className="MiddleLeftContainer">
				<div className="MiddleLeftTopContainer">
					<MiddleLeftTop title={"车型参考图片"} />
				</div>
				<div className="MiddleLeftMiddleContainer">
					<MiddleLeftMiddle imgUrl={this.props.imgUrl}  remind={_remind}/>
					<div style={{display: _nodata}} className="MiddleLeftMiddleWaitingContainer">
						<img src={cdnHost+"/img/veryhuo.com_gif.gif"} />
					</div>
				</div>
				<div className="MiddleLeftBottomContainer">
					<MiddleLeftBottom />
				</div>
			</div>
		)
	}
}

MiddleLeft.propTypes = {
	imgUrl: PropTypes.string.isRequired
}