import React, {Component} from 'react'
import InfoBubble from './infobubble'
import PropTypes from 'prop-types'

export default class MiddleRightSelector extends Component {
	
	constructor(props) {
		super(props)
		this.state ={
			selectorIndex: 0,
			showBubbleIndex: -1
		}
	}
	
	itemClick(index, e) {
		let _selectorIndex = index
//		console.log(typeof(_selectorIndex))
		let _unables = this.props.unables
				
		if (_unables.indexOf(_selectorIndex) >= 0 ) {//点击了未激活的直接返回
			return
		}
		
		this.props.selectorClick(_selectorIndex)
		this.setState({
			selectorIndex: _selectorIndex
		})
	}
	
	mouseEvent(index, e) {
		let _eIndex = index
		let _unables = this.props.unables
		let _selectorIndex = this.state.selectorIndex
		
		if (e.type == "mouseover") {
			//处理气泡
			if (_unables.indexOf(_eIndex) >= 0) {
				this.setState({
					showBubbleIndex: _eIndex
				})
			} else if(_eIndex != _selectorIndex){//处理hover
//				console.log(e.target.getAttribute("data-name"))
				if (e.target.getAttribute("data-name") != "bubbleContent") {//气泡事件影响
					e.target.style.color = "#45C0FF"
				}
			}
		}else {
			this.setState({
				showBubbleIndex: -1
			})
			if(_unables.indexOf(_eIndex) < 0 && _eIndex != _selectorIndex){
				e.target.style.color = "#333"
			}
		}
	}
	
	render() {
		let _selectorIndex = this.state.selectorIndex
		let _unables = this.props.unables
		let _showBubble = "none"
		let _showBubbleIndex = this.state.showBubbleIndex
		let _itemColor = "#333"
		let _className = "MiddleRightSelectorItem"
		let _cursor = "pointer"
		let _items = this.props.titles.map((title, index) => {
			//选中处理
			if(index == _selectorIndex) {
				_className = "MiddleRightSelectorItem"
				_itemColor = "#333"
			} else {
				_className = "MiddleRightSelectorItem"
				_itemColor = "#333"
			}
			//未激活处理
			if(_unables.indexOf(index) >= 0) {
				_itemColor = "#999"
				_cursor = "auto"
			}
			//气泡显示处理
			if(index == _showBubbleIndex) {
				_showBubble = "initial"
			} else {
				_showBubble = "none"
			}
			return (
				<div key={index} className={_className}
					onClick={this.itemClick.bind(this, index)}
					onMouseOver={this.mouseEvent.bind(this, index)}
					onMouseLeave={this.mouseEvent.bind(this, index)}
					style={{color: _itemColor, cursor: _cursor}}>
					{title}
					<InfoBubble showBubble={_showBubble} content="汽车厂商未提供此数据" />
				</div>
			)
		})
		return (
			<div className="MiddleRightSelectorContainer">
				{_items}
			</div>
		)
	}
}

MiddleRightSelector.propTypes = {
	titles: PropTypes.array.isRequired,
	selectorClick: PropTypes.func.isRequired
}
