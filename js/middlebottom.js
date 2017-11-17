import React, {Component} from 'react'
import {sendEvent, catchEvent, middleEvents} from './eventmodel'
import MiddleLeftTop from './middlelefttop'
import MiddleBottomList from './middlebottomlist'
import PropTypes from 'prop-types'

export default class MiddleBottom extends Component {
	
	constructor(props) {
		super(props)
		this.state = {
			isPartner: false
		}
	}

	componentDidMount() {
		catchEvent(middleEvents.source, e => {
			this.setState({
				isPartner: true
			})
		})
	}

	changePlace(){
		let href=encodeURI("/engine/index?vin="+this.props.vin+"&cid="+this.props.cid+"&brandName="+this.props.brandName+"&vins="+this.props.vins)
//		let href=encodeURI("/engine/index")
		window.open(href)
	}
	
	render() {
		let _value =""
		let _showSearch = this.props.brandName=="bmw" ? "block":"none"
//		console.log(this.props.brandName)
		if(this.state.isPartner) _showSearch = "none"
		let _listData = this.props.listData
		return (
			<div className="MiddleBottomContainer">
				<div className="MiddleBottomTopContainer">
					<MiddleLeftTop title="选择主组"/>
					<div className="toEnginInput" style={{display:_showSearch}} onClick={this.changePlace.bind(this)}>
						<input className="input" autoFocus placeholder="输入零件关键词" 
                            value={_value}
                        />
					    <div className="inputIcon">
                        </div>
					</div>
				</div>
				<div className="MiddleBottomBottomContainer">
					<MiddleBottomList listData={_listData} />
				</div>
			</div>
		)
	}
}

MiddleBottom.propTypes = {
	listData: PropTypes.array.isRequired
}
