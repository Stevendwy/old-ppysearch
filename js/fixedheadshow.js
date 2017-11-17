import React, {Component} from 'react'
export default class FixedHeadShow extends Component{
	constructor(props){
		super(props)
		
	}
	render(){
		return (
			<div className="TitleListChangeShow" 
			style={{display:this.props.whetherShow}}>
				{this.props.showMessage}
			</div>
		)
	}
}
