import React, {
	Component
} from 'react'
import {
	render
} from 'react-dom'
import MiddleRightOne from './middlerightmess'
import MiddleRightTwo from './middlerightcenter'
import VerificationWindows from './verificationwindows'
import {
	dataShowImg
} from './datetest'

import {
	middleEvents,
	sendEvent
} from './eventmodel'
import UserPay from './userpay'
export default class InquireCenter extends Component {
	constructor() {
		super()
		this.state = {
			newshow: <MiddleRightOne BtnShow={this.BtnShow.bind(this)}/>,
			nmiddleLeftListClick: [1, 0, 0], //选择显示组件状态
			FloatIndexOneShow: "none", //未购买弹框
			BtnChangeShow: false, //修改密码弹框
			newdata: {},
			isShow: "none",
			orderCode: "",
			paySrc: "#",
			time: "",
			msgShow: "none",
			msg: "",
			timeCount: 3
		}
		this.callback = ""
		this.type = ""
		this.registRequest = ""
	}
	chooseClick(indexnum) {
		let _newshow = <div></div>
		let _nmiddleLeftListClick = [0, 0, 0]
		switch (indexnum) {
			case 0:
				_newshow = <MiddleRightOne BtnShow={this.BtnShow.bind(this)}/>
				_nmiddleLeftListClick[0] = 1
				break;
			case 1:
				_newshow = <MiddleRightTwo />
				_nmiddleLeftListClick[1] = 1
				break;
			case 2:
				_newshow = <UserPay onClick={this.toPayClick.bind(this)}/>
				_nmiddleLeftListClick[2] = 1
				break;
			default:
				_newshow = <MiddleRightOne BtnShow={this.BtnShow.bind(this)}/>
				_nmiddleLeftListClick[0] = 1
				break;
		}
		this.setState({
			newshow: _newshow,
			nmiddleLeftListClick: _nmiddleLeftListClick
		})
	}
	BtnShow(mess) {
		this.setState({
			BtnChangeShow: mess
		})
	}
	toPayClick(type) {
		//		this.msgShowToHide("支付成功");
		let _url = "/pays/wx"
		this.type = type
		let _obj = {
			"type": type
		}

		let _time = this.getNowFormatDate(type)
		postAjax(_url, _obj, response => {
			this.setState({
				isShow: "block",
				orderCode: response.data.orderid,
				paySrc: response.data.img,
				time: _time
			}, () => {
				this.payCallBack()
			})
		})
	}


	msgShowToHide(msg) {
		this.setState({
			msg: msg,
			msgShow: "flex",
			timeCount: 3
		}, () => {
			var timers = setInterval(() => {
				if (this.state.timeCount == 0) {
					//			          				return
					clearInterval(timers)
					this.setState({
						msgShow: "none",
						timeCount: 3
					})
				} else {
					this.setState({
						timeCount: --this.state.timeCount
					})
				}
			}, 1000)
		})
	}

	payCallBack() {
		getAjax("/pays/check", "", response => {
			switch (response.code) {
				case 405:
					//成功
					this.msgShowToHide("支付成功");
					break;
				case 408:
					//未付款，再请求
					setTimeout(this.payCallBack(), 2e3);
					break;
				case 404:
					//验证码失效，刷新验证码
					this.toPayClick(this.type)
					break;
			}
		})

	}
	getNowFormatDate(type) {
		var seperator1 = "-";
		var date = new Date();
		var year = date.getFullYear();
		var month = date.getMonth() + 1;
		var strDate = date.getDate();
		if (type == 1) {
			strDate++
		} else {
			year++
		}

		if (month >= 1 && month <= 9) {
			month = "0" + month;
		}
		if (strDate >= 0 && strDate <= 9) {
			strDate = "0" + strDate;
		}
		var currentdate = year + seperator1 + month + seperator1 + strDate;
		//	            + " " + date.getHours() + seperator2 + date.getMinutes();
		//	            + seperator2 + date.getSeconds();
		return currentdate;
	}
	componentDidMount() {
		getAjax("/user/profile", "", response => {
			console.log(response)
		})
		this.setState({
			newshow: <MiddleRightOne BtnShow={this.BtnShow.bind(this)}/>,
			nmiddleLeftListClick: [1, 0, 0],
			FloatIndexOneShow: "none",
			newdata: dataShowImg
		})
	}
	render() {
		let _orderCode = this.state.orderCode
		let _paymoney = 2000
		let _msgShow = this.state.msgShow
		let _isShow = this.state.isShow
		let _paySrc = this.state.paySrc
		let _time = this.state.time
		let _msg = this.state.msg
		let _timeCount = this.state.timeCount


		let _bgimgpostionOne = this.state.nmiddleLeftListClick[0] == 1 ? "-40px" : "0"
		let _bgimgpostionTwo = this.state.nmiddleLeftListClick[1] == 1 ? "-120px" : "-80px"
		let _bgimgpostionThree = this.state.nmiddleLeftListClick[2] == 1 ? "-200px" : "-160px"

		let _bgwordOne = this.state.nmiddleLeftListClick[0] == 1 ? "#1AA0F3" : "#999999"
		let _bgwordTwo = this.state.nmiddleLeftListClick[1] == 1 ? "#1AA0F3" : "#999999"
		let _bgwordThree = this.state.nmiddleLeftListClick[2] == 1 ? "#1AA0F3" : "#999999"
		let _FloatIndexOne = this.state.FloatIndexOneShow //whether show
		let _BtnChangeShow = this.state.BtnChangeShow //修改密码弹框
		let _middle = this.state.newshow

		let _id = this.state.newdata.userid
		let _endtime = this.state.newdata.endtime == "" ? "（ 未购买 ）" : this.state.newdata.endtime
		return (
			<div className="Nmiddlecontent">
					<div className="FloatIndexOne" style={{display:_FloatIndexOne}}
						onClick={()=>{this.setState({FloatIndexOneShow:"none"})}}>
						<div className="FloatIndexOneMess">
							<div className="bgDelete"></div>
							您的账号即将到期，请续费
						</div>
					</div>
					<VerificationWindows show={_BtnChangeShow} registRequest={this.registRequest} />
					<div className="NmiddleTitle">
						<span className="NmiddleTitleCenter">用户ID：</span>
						<span>{_id}</span>
						<span className="middleTitleCenter">到期日期：</span>
						<span>{_endtime}</span>
					</div>
					<div className="Nmiddlecontents">
						<div className="NmiddleLeft">
							<div className="NmiddleLeftList" onClick={this.chooseClick.bind(this,0)}>
								<div className="NmiddleLeftListImg NmiddleLeftListImgOne"
								style={{backgroundPositionY:_bgimgpostionOne}}></div>
								<span style={{color:_bgwordOne}}>基本资料</span>
							</div>
							<div className="NmiddleLeftList" onClick={this.chooseClick.bind(this,1)}>
								<div className="NmiddleLeftListImg NmiddleLeftListImgTwo" 
								style={{backgroundPositionY:_bgimgpostionTwo}}></div>
								<span style={{color:_bgwordTwo}}>使用说明</span>
							</div>
							<div className="NmiddleLeftList" onClick={this.chooseClick.bind(this,2)}>
								<div className="NmiddleLeftListImg NmiddleLeftListImgThree" 
								style={{backgroundPositionY:_bgimgpostionThree}}></div>
								<span style={{color:_bgwordThree}}>购买</span>
							</div>
						</div>
						<div className="NmiddleRight">
							{_middle}
						</div>
						<div className="UserPayment" style={{display:_isShow}}>
							<div className="PaymentHead">
									订单提交成功，请您尽快付款！ 订单号：{_orderCode}  <br/>
									请您 <span>立即完成支付</span>，否则订单会被自动取消。
							</div>
							<div className="PaymentBody">
								<div className="PaymentBodyHead">
										<div>微信支付</div>
										<span>微信扫一扫付款</span>
								</div>
								<div className="PaymentBodyMain">
									<p>应付金额:<span>&yen;{_paymoney}</span></p>
									<div className="Dcode">
										<img src={_paySrc} alt='二维码'/>
									</div>
									<b>订单信息</b>
									<span>零零汽年卡</span>
									<div>
										<ol>
											<li>不可取消</li>
											<li>不含税</li>
										</ol>
									</div>
									<div className="EndTime">
										有效期至:{_time}
									</div>
								</div>
							</div>
						</div>
					</div>
					<div className="msgModal" style={{display:_msgShow}}>
						<p>{_msg}</p>
						<span>{_timeCount}</span>
					</div>
					
				</div>

		)
	}
}