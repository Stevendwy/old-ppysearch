import React, {
	Component
} from 'react'
import FloatWindow from './floatwindow'
import UserAgreement from './useragreement'
import {
	middleEvents,
	catchEvent
} from './eventmodel'

export default class Bottom extends Component {
	constructor() {
		super()
		this.state = {
			showUserAgreement: 'none'
		}
	}

	componentDidMount() {
		catchEvent(middleEvents.source, e => {
			this.setState({
				isPartner: true
			})
		})
	}

	userAgreementClick() {
		this.setState({
			showUserAgreement: 'block'
		})
	}

	render() {
		let _showUserAgreement = this.state.showUserAgreement
		let _userAgreementClick = this.userAgreementClick.bind(this)
		let _isPartner = this.state.isPartner

		return (
			<div className="BottomContainer" style={{display: _isPartner ? "none" : "block"}}>
					<FloatWindow 
						title='用户协议'
						img= '/img/icon_san.png'
						show={_showUserAgreement}
						hiddenEvent={() => {
							this.setState({
								showUserAgreement: 'none'
							})
						}}
						content={<UserAgreement />}
					/>
				    <div className="BottomContentContainer">
				     <span onClick={()=>{window.open( "http://www.peipeiyun.com/")}} style={{cursor: 'pointer'}}>关于我们</span>
				     <span onClick={_userAgreementClick} style={{cursor: 'pointer'}}>用户协议</span>
				     <div>
				      © 2016-2017 007vin.com  <span onClick={()=>{window.open("http://www.miitbeian.gov.cn/")}} style={{cursor: 'pointer'}}> 版权所有 ICP证：浙17026959号-2</span> 
				     </div>
				    </div>
			</div>
		)
	}
}