import React, {Component} from 'react'
import {render} from 'react-dom'
import {dataShowImg} from './datetest'

import {middleEvents, sendEvent} from './eventmodel'
export default class MiddleRightOne extends Component {
	constructor(props) {
		super(props)
		this.state = {
			newdata:{"messlist":[]}
		}
		this.listtitle=["登录帐号：","登录密码：","用户姓名：","公司名称：","所在城市：","公司类型："]
	}
	NmiddleRightChangeBtnClick(){
		this.props.BtnShow(true)
	}
		componentDidMount() {
//		getAjax("/user/profile", {}, response => {
//			console.log(response)
////			this.setState({
////				showNumber: response.data.users
////			})
//		})
		this.setState({
			newdata:dataShowImg
		})
	}
	
	render() {
			let _content = this.state.newdata.messlist.map((item,i)=>{
			let _inputshow = i==1?"inline-block":"none"
			let _passWordName = i==1?"NmiddleRightMessListRight NmiddleRightMessListRightPwd":"NmiddleRightMessListRight"
			return (
				<div key={i} className="NmiddleRightMessList">
					<div className="NmiddleRightMessListLeft">{this.listtitle[i]}</div>
					<div className={_passWordName}>{item}</div>
					<div className="NmiddleRightChangeBtn" 
					onClick={this.NmiddleRightChangeBtnClick.bind(this)}
					style={{display:_inputshow}}>修改</div>
				</div>
			)
		})
		
		return (
				<div className="NmiddleLeftListImgOnehas">
					{_content}
				</div>
			
		)
	}
}
