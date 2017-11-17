import React, {Component} from 'react'

export default class OkO extends Component  {
	constructor(props){
		super(props)
		this.state={
			okmessage:["取消","确定"],
			okcontent:props.sentMessage,
			whoUseMe:props.sentWho,
			okBackShow:"block",
			okback:"false",
			okfathershow:"none"		
		}
		this.backwho = props.sentWho
		this.backshow = "none"
		this.backfather = "none"
	}
	//传入：改变的内容、谁触发、弹框显示
	//返回：谁进来、返回的状态
	//上层传入
	componentWillReceiveProps(props){
		let _sentWho = props.sentWho
		let _sentMessage = props.sentMessage
		let _sentShow = props.sentShow
		this.setState({
			okcontent:_sentMessage,
			okfathershow:_sentShow,
			whoUseMe:_sentWho
		})
		this.backwho = _sentWho
	}
	exitClick(){
		//点击退出
		this.setState({
			okfathershow:"none",
			okBackShow:"none"
		})
		
		//给上层传参数，是否显示导航及导航内容 返回的状态、
		this.props.backmessage(this.backshow,this.backwho,"none")
	}
	falseClick(){
		//点击取消
		this.setState({
			okback:"false",
			okfathershow:"none",
			okBackShow:"none"
		})
		this.backshow = "false"
		this.props.backmessage(this.backshow,this.backwho,"none")
	}
	trueClick(){
		//点击确定
		this.setState({
			okback:"true",
			okfathershow:"none",
			okBackShow:"none"
		})
		this.backshow = "true"
		//给上层传参数，是否显示导航及导航内容 返回的状态、
		this.props.backmessage(this.backshow,this.backwho,"none")
	}
	render(){
			let _okMessage=this.state.okcontent
			let _okFooterLeft=this.state.okmessage[0]
			let _okFooterRight=this.state.okmessage[1]
			let _okexitClick = this.state.okfathershow
		return(
			<div className="okFather" 
			style={{display:_okexitClick}}>
				<div className="okContentMove">
					<div className="okMessage">{_okMessage}</div>
					<div className="okFooterLeft" onClick={this.falseClick.bind(this)}>{_okFooterLeft}</div>
					<div className="okFooterRight" onClick={this.trueClick.bind(this)}>{_okFooterRight}</div>
				</div>
			</div>
		)
	}
	
}