import React, {Component} from 'react'
import {render} from 'react-dom'
import FastClick from './fastclick' 
import Top from './top'
import Middle from './middle'
import Bottom from './bottom'
import {middleEvents, sendEvent} from './eventmodel'

class Page extends Component {
	constructor() {
		super()
		this.state = {
			inquireType: params.type || "vin",
			clicknum: 0,
			isPartner: false //是否嵌入在第三方
		}
		this.icons = ["img/rectangle.png", "img/circle.png", "img/arrow.png", "img/text.png", "img/reset.png", "img/cancle.png", "img/checkout.png", ]
		this.selectedIcons = ["img/rectangle_selected.png", "img/circle_selected.png", "img/arrow_selected.png", "img/text_selected.png", "img/reset.png", "img/cancle.png", "img/checkout.png", ]
	}
	
	componentDidMount() {
		FastClick.attach(document.body)//苹果点击延时处理

		getAjax("/open/authsource", {}, res => {
			if(res.data === "xa") {
				sendEvent(middleEvents.source, {source: res.data})
			}
		})
	}
	
	chooseInquire(type = "vin") {
		this.setState({clicknum: 1}, () => {
			this.setState({
				inquireType: type,
				clicknum: type == "car" ? 0 : 1 
			})
		})
	}
	
	render() {
		let _chooseInquire = this.chooseInquire.bind(this)
		let _inquireType = this.state.inquireType
		let _clicknum = this.state.clicknum
		let _middle
		let _icons = this.icons
		let _selectedIcons = this.selectedIcons
		if(_clicknum = 0) _middle = <div></div>
		else _middle = <Middle inquireType={_inquireType}/>
		let _isPartner = this.state.isPartner
		
		return (
			<div className="PageContainer" onClick={() => sendEvent(middleEvents.pageClick)}>
				<Top
					chooseInquire={_chooseInquire}/>
				{_middle}
				<Bottom />
			</div>
			
		)
	}
}

render(<Page />, document.getElementById("root"))
