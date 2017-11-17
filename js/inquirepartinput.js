import React, {
	Component
} from 'react'
import PartHistoryList from './parthistorylist'
export default class InquirePart extends Component {
	constructor(props) {
		super(props)
		this.state = {
			isShow: false,
			inputValue: params.part ? params.part : "",
			arr: {},
			clearShow: params.part ? true : false,
			backgroundButton: "#0d6fb8"
		}
		this.arr = {}
	}

	componentDidMount() {
		this.refs.focusInput.focus();
		this.setState({
			isShow: false
		})
	}

	componentWillReceiveProps(props) {

		if (this.props.reserve) {
			this.refs.focusInput.focus()
			this.setState({
				inputValue: ""
			})
		}
	}

	getHistory() {

		if (this.refs.focusInput.value.length > 1) return
			//		if(this.state.inputValue > 1 ) return;
		this.props.errorHide()
		getAjax("/search/parts", {}, (response) => {
			this.setState({
				isShow: response.data.length == 0 ? false : true,
				arr: response.data
			})
			this.arr = JSON.parse(JSON.stringify(response))
		})
	}
	chooseItem(item) { //选择零件号码   input显示  list隐藏
		this.setState({
			inputValue: item,
			isShow: false,
			clearShow: true
		})
		this.props.search(item)
	}

	searchButton() {
		this.setState({
			isShow: false
		})
		if (this.refs.focusInput.value == "") return
		this.props.search(this.refs.focusInput.value)
	}

	deleItem(index, item) { //删除一项items
		this.arr.data.splice(index, 1)

		this.setState({
			arr: this.arr.data
		})

		if (this.state.arr.length == 6) {
			this.getHistory()
		}

		getAjax("/search/partoff", {
			part: item,
			off: "false"
		}, res => {})
	}

	inputChange(e) { //输入框变化
		//2017-06-01，修改表达式规则
		let inputValue = e.target.value
		let value = inputValue.replace(/\W/g, "").toUpperCase()
		getAjax("/search/parts", {
			"part": value
		}, (response) => {
			this.setState({
				isShow: response.data.length == 0 ? false : true,
				arr: response.data
			})
			this.arr = JSON.parse(JSON.stringify(response))
		})
		this.setState({
			inputValue: value,
			clearShow: value == "" ? false : true
		})
	}
	clearInput() {
		this.props.changeButtonColor(0)
		this.props.errorHide()
		this.setState({
			inputValue: "",
			clearShow: false
		})

		getAjax("/search/parts", {}, (response) => {
			this.setState({
				isShow: response.data.length == 0 ? false : true,
				arr: response.data
			})
			this.arr = JSON.parse(JSON.stringify(response))
		})
	}


	closeHistory() { //关闭下拉
		this.setState({
			isShow: false
		})
	}


	render() {
		let _issearch = this.searchButton.bind(this)
		let _value = this.props.reserve ? "" : this.state.inputValue;
		if (this.props.reserve) this.refs.focusInput.focus();
		let _clearShow = this.state.clearShow ? "block" : "none"
		let _backgroundButton = this.state.backgroundButton
			//		let _value = this.state.inputValue;
		let _link = "/histroy/parts"
		let _list = !this.state.isShow ? <div></div> : <PartHistoryList
						arr = {this.state.arr}
						chooseItem = {this.chooseItem.bind(this)}
						deleItem = {this.deleItem.bind(this)}
						isShow={this.state.isShow}
						closeHistory={this.closeHistory.bind(this)}
						linkType={_link}
					/>
		return (
			<div className="InquireUserCmd">
				<div className="SearchContainer">
					<input placeholder = "输入零件号"
						ref="focusInput"
						onClick = {this.getHistory.bind(this)}
						value = {_value}
						onChange = {this.inputChange.bind(this)}
						onKeyPress={e => {
							let _keyCode = e.which || e.keyCode
							if (_keyCode == 13 && isPart==true) _issearch()
						}}
					/>
					<div className="clearInput" onClick={this.clearInput.bind(this)} style={{display:_clearShow}}>
						<img src={cdnHost + "/img/icon_shancu.png"}/>
					</div>
					{_list}
				</div>
				<div className="SearchButton" onClick={_issearch}
						style={{background:_backgroundButton}}
						onMouseDown={()=>{
							this.setState({
								backgroundButton:"#0D6FB8"
							})}
						}
						onMouseEnter={()=>{
							this.setState({
								backgroundButton:"#2687D0"
							})
						}}
						onMouseUp={()=>{
							this.setState({
								backgroundButton:"#2687D0"
							})
						}}
						onMouseLeave={()=>{
							this.setState({
								backgroundButton:"#0D6FB8"
							})
						}}
				>
					零件号查询
				</div> < /div>
		)
	}
}