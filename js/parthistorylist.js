import React, {
	Component
} from 'react'
import {
	sendEvent,
	catchEvent,
	middleEvents,
	removeEvent
} from './eventmodel'

export default class PartHistoryList extends Component {
	constructor(props) {
		super(props)
		this._closeHistory = this.closeHistory.bind(this)
	}

	componentDidMount() {
		catchEvent(middleEvents.pageClick, this._closeHistory)
	}

	componentWillUnmount() {
		removeEvent(middleEvents.pageClick, this._closeHistory)
	}

	chooseHistory(item, name = "") { //选择历史条目
		this.props.chooseItem(item, name)
	}

	closeHistory() { //关闭历史记录
		this.props.closeHistory()
	}

	moreHistory() {
		location.href = this.props.linkType
	}

	closeItem(index, item) { //删除一个历史条目记录
		this.props.deleItem(index, item)
	}

	render() {
		var _arr = []
		_arr = this.props.arr
			//		console.log(_arr)
		return (
			<div className="PartHistoryList" style = {{display: this.props.isShow ? "block" : "none"}}>
				{
					_arr.map((item,index)=>{
						if(index>4)return
						return(
							<div key={index} className="HistoryItem">
								<div  onClick={this.chooseHistory.bind(this,item[0], item[1])}>{item[0]+" - "+item[item.length - 1]}</div>
							</div>
						)
					})
				}
				<div className="toHistory">
					<div className="moreHistory" onClick={this.moreHistory.bind(this)}>
						<img className="searchIcon" src={cdnHost + "/img/history.png"}/>
						查看更多历史
					</div>
					<div className="closeItem" onClick={this.closeHistory.bind(this)}>
						关闭
					</div>
				</div>
			</div>
		)
	}
}