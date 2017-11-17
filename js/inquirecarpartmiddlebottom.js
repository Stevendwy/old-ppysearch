import React, {Component} from 'react'
import MiddleLeftTop from './middlelefttop'
import MiddleBottomList from './inquirecarpartmiddlebottomlist'
import PropTypes from 'prop-types'

export default class MiddleBottom extends Component {
	
	constructor(props) {
		super(props)
	}
	changePlace(){
		let href=encodeURI("/engine/index?carinfo="+this.props.inputVinNew+"&cid="+this.props.cid+"&brandName="+this.props.brandName)
		window.open(href)
	}
	render() {
		let _value =""
		let _showSearch = this.props.brandName=="bmw" ? "none":"none"
		let _listData = this.props.listData
		return (
			<div className="MiddleBottomContainernew">
				<div className="MiddleBottomTopContainer">
					<MiddleLeftTop title="选择主组" />
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
