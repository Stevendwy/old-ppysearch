import React, {Component} from 'react'
import InquireVIN from './inquirevin'
import InquireCar from './inquirecar'
import InquirePart from './inquirepart'
import InquireCenter from './inquirecenter'

export default class Middle extends Component {
	
	constructor(props) {
		super(props)
		this.vinType = "vin"
		this.carType = "car"
		this.partType = "part"
		this.centerType = "center"
	}
	
	renderContent(inquireType = this.vinType) {
		if (inquireType=="part") {isPart=true}
			else{isPart=false}
		if (inquireType=="car") {isCar=true}
			else{isCar=false}		
		let _content
		switch(inquireType) {
			case this.vinType:
				_content = <InquireVIN />
			break
			case this.carType:
				_content = <InquireCar />
			break
			case this.partType:
				_content = <InquirePart />
			break
			case this.centerType:
				_content = <InquireCenter />
			break
			default:
				_content = <InquireVIN />
			break
		}
		return _content
	}
	
	render() {
		let _inquireType = this.props.inquireType
		let _content = this.renderContent(_inquireType)
		let _height = "auto"
		// if (_inquireType == this.partType) _height = "calc(100% - 166px)"
		return (
			<div className="MiddleContainer">
				{_content}
			</div>
		)
	}
}