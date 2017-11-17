import React, {
	Component
} from 'react'
import {
	sendEvent,
	catchEvent,
	middleEvents
} from './eventmodel'
import PropTypes from 'prop-types'

export default class Top extends Component {
	constructor(props) {
		super(props)
		this.state = {
			inid:"",          //message inid
			okMessage: "",
			okshow: "none",
			showLogout: "none",
			showNumber: "--",
			selectIndex: params.type ? (params.type == "vin" ? 1 : (params.type == "part" ? 3 : 2)) : 1,
			hasMessages: false, //是否有新消息
			isPartner: false //是否为第三方嵌入页面
		}
		this.types = params.binds
		this.vinType = "vin"
		this.carType = "car"
		this.partType = "part"
		this.centerType = "center" //添加新页面
		this.chooseType = params.type ? params.type : "vin" //记录上次点击记录，防止多次点击相同清空内容
	}

	componentDidMount() {
		catchEvent(middleEvents.source, e => {
			this.setState({
				isPartner: true
			})
		})
		
		let _ajaxtype = {
			"size":1,
			"page":1,
			"message_type":"popup",
			"unread":1
		}
		getAjax("/user/msglocal", _ajaxtype, responses => {
			//判断是否过期弹框 目前默认none
			// console.log(responses)
			let _datalist = []
			let _datainid = []
			let _resdata =responses.data 
			if (_resdata.length >=1 ) {
				for (var i =0; i<_resdata.length; i++) {
					// if ((_resdata[i].message_type == "popup") && (_resdata[i].status==1)) {
						_datalist.push(_resdata[i].msg_text)
						_datainid.push(_resdata[i].inid)
					// }
				}
				if (_datalist.length>=1) {
					this.setState({
						inid:_datainid[0],
						okMessage: _datalist[0],
						okshow: "block"
					})
				}
			}
		})

		getAjax("/usersinfos", {}, response => {
			//判断是否过期弹框 目前默认none
			// if ((response.data.left_dates <= 7) && (this.types == "home")) {
			// 	this.setState({
			// 		okMessage: "请往个人中心查看",
			// 		okshow: "none"
			// 	})
			// }
			this.setState({
				showNumber: response.data.users
			})
		})

		this.pollTimer = setInterval(() => {
			this.poll()
		}, 900000)

		this.poll()
	}

	//轮询获取消息状态
	poll() {
		getAjax("/user/msglocalunread", {}, res => {
			 // console.log(res)
			let _hasMessages = false
			if (res.data.total_counts > 0) _hasMessages = true
			this.setState({
				hasMessages: _hasMessages
			})
		})
	}

	showLogout(e) {
		let _showLogout = "none"
		if (e.type == "mouseover") {
			_showLogout = "initial"
		}
		if (e.type == "click") {
			let _stateshowLogout = this.state.showLogout == "initial" ? "none" : "initial"
			_showLogout = _stateshowLogout
		}
		this.setState({
			showLogout: _showLogout
		})
	}

	chooseInquire(inquireType = "vin", index) {
		this.setState({
			selectIndex: index
		})
		if (inquireType == this.chooseType) {
			sendEvent(middleEvents.topItemClick, {
				type: inquireType
			})
		}
		this.props.chooseInquire(inquireType)
		this.chooseType = inquireType
	}
	

	redmessage(type){
		let _urlread = "/user/msglocalread"
		let _data = {
			"inid":this.state.inid
		}
		getAjax(_urlread, _data, res => {
			console.log("readmes")
		})
		if (type=="messages") {
			location.href = "/user/profile?binds=search&type=messages"
		}
		this.setState({
			okshow:"none"
		})
	}

	render() {
		let _selectIndex = this.state.selectIndex
		let _chooseInquire = this.chooseInquire.bind(this)

		let _okshow = this.state.okshow
		let _hasMessages = this.state.hasMessages
		let _isPartner = this.state.isPartner

		return (
			<div className='TopContainer'>
				<div className="TopBackground"></div>
				<div className="TopRightContainer">
					<div className="TopRightSelectersContainer">
						<img className="TopLogo" style={{display: _isPartner ? "none" : "block"}} src={cdnHost +'/img/p_logonew.png'} onClick={() => location.href = "/"}/>
						<span className="TopRightSelector" style={{color:_selectIndex==1?"#d8d8d8":"#fff"}} onClick={() => _chooseInquire(this.vinType,1)}>车架号查询</span>
						<span className="TopRightSelector" style={{color:_selectIndex==2?"#d8d8d8":"#fff"}} onClick={() => _chooseInquire(this.carType,2)}>车型查询</span>
						<span className="TopRightSelector" style={{color:_selectIndex==3?"#d8d8d8":"#fff"}} onClick={() => _chooseInquire(this.partType,3)}>零件号查询</span>
					</div>
					<div className="TopRightAccountContainer"
						style={{display: _isPartner ? "none" : "block"}}
						onClick={this.showLogout.bind(this)}
						onMouseOver={this.showLogout.bind(this)}
						onMouseLeave={this.showLogout.bind(this)}>
						<div className="TopRightAccount">
							{this.state.showNumber}
							<div className="RedPoint" style={{display: _hasMessages ? "block" : "none"}}></div>
							<span><img src={cdnHost+"/img/icon_xiala.png"} /></span>
						</div>
						<div className="Logout" style={{display: this.state.showLogout}} >
							<div className="LogoutItem" onClick={() => location.href = "/user/profile?binds=search&type=messages"}>
								<img src={cdnHost+"/img/icon_mess.png"}/>
								<span>消息中心</span>
								<div className="RedPoint" style={{display: _hasMessages ? "block" : "none"}}></div>
							</div>
							<div className="LogoutItem" onClick={() => location.href = "/user/profile?binds=search"}>
								<img src={cdnHost+ "/img/user_icon.png"}/>
								<span>个人中心</span>
							</div>
							<div className="LogoutItem" onClick={() => location.href = "/logout"}>
								<img src={cdnHost+"/img/icon_exit.png"}/>
								<span>退出</span>
							</div>
						</div>
					</div>
				</div>
				<div className="okFatherSearch" style={{display:_okshow}}>
					<div className="okContentMoveSearch" 
						style={{ position: "absolute",top: 0,right: 0,bottom: 0,left: 0,margin: "auto"}}>
						<div className="okMessageClose" onClick={this.redmessage.bind(this,"none")}></div>
						<div className="okMessageSearch">{this.state.okMessage}</div>
						<div className="okFooterLeftSearch" onClick={this.redmessage.bind(this,"none")}>取消</div>
						<div className="okFooterRightSearch"  onClick={this.redmessage.bind(this,"messages")}>查看详情</div>
					</div>
				</div>
			</div>
		)
	}
}

Top.propTypes = {
	chooseInquire: PropTypes.func.isRequired
}