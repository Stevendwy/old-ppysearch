import React, {
	Component
} from 'react'
import FixedHeadShow from './fixedheadshow'
import CarContentBody from './inquirecarpartcontentbody'
import InquireContentVIN from './inquirecarpartcontentbodyvin'

import {
	sendEvent,
	catchEvent,
	removeEvent,
	middleEvents
} from './eventmodel'

export default class InquireCar extends Component {
	constructor(props) {
		super(props)
		this.state={
			messagenew:"",
			messagenewshow:"",
			showwhether:"none",
			whetherajax:"true",
			showinquirecontent:"none",
			showinquirecontentcodes:"",
			showinquirecontentauth:"",
			showinquirecontentkeys:""
		}
		this.showinquirecontentold="none"
		this.showinquirecontentold=""
		this.showinquirecontentcodesold=""
		this.showinquirecontentauthold=""
		this.showinquirecontentkeysold=""
	}
	handleClickInquireContentVin(show,codes,auth,_keys,_message,_whetherajax){
		this.setState({
			showinquirecontent:show,
			showinquirecontentcodes:codes,
			showinquirecontentauth:auth,
			showinquirecontentkeys:_keys,
			messagenewshow:_message,
			whetherajax:_whetherajax
		})
	}
//	handleClickInquireContentVin(show){
//		this.showinquirecontentold=show
//		this.setState({
//			showinquirecontent:this.showinquirecontentold
//		})
//	}
	handleChange(message,show,wajax){
        this.setState({
        		messagenew: message,
        		showwhether:show,
        		whetherajax:wajax
        })
    }
	render() {
		let _showwhether = this.state.showwhether
		let _inquireShow = this.state.showinquirecontent
		let _inquireCode = this.state.showinquirecontentcodes
		let _inquireAuth = this.state.showinquirecontentauth
		let _inquireKeys = this.state.showinquirecontentkeys
		let _messagenew = this.state.messagenewshow
		let _whetherajax = this.state.whetherajax
		return (
			<div className="carpartbody">
				<div className="toBlackBorder" style={{display:_showwhether}}>
					<FixedHeadShow showMessage={this.state.messagenew} whetherShow={this.state.showwhether}/>
				</div>
				<CarContentBody 
				handleChange={this.handleChange.bind(this)}
				handleClickInquireContentVin={this.handleClickInquireContentVin.bind(this)}
				/>
				<div className="MiddleContentContainerNewcontent" style={{display:this.state.showinquirecontent}}>
					<InquireContentVIN 
					inquireShow={_inquireShow}
					inquireCode={_inquireCode}
					inquireAuth={_inquireAuth}
					inquireKeys={_inquireKeys}
					inquireMessage = {_messagenew}
					inquireWhetherAjax = {_whetherajax}
					/>
				</div>
			</div>
		)
	}
}