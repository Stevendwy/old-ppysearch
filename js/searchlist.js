import React,{Component} from 'react'
import SearchTitle from './searchtitle.js'
export default class SearchList extends Component{
	constructor(){
		super()
		this.width=["7%","16%","22%","10%","30%","15%"]
	}
	render(){	
		return(
			<div className="SearchList">
				<SearchTitle width={this.width}/>			
				<SearchLists 
					width={this.width}
					arr2={this.props.arr}
				/>
			</div>
			
		)
		
	}
	
}

class SearchLists extends Component{
	constructor(props){
		super(props)
	}
	locationParts(code){
		location.href=code
	}
	
	render(){
		var _arr = this.props.arr2
		var _width = this.props.width
		return(
			<div className="SearchLists">
				{
					_arr.map((item,index)=>{
						return(
							<div className="ListItem" key={index} onClick={this.locationParts.bind(this,item[5])}>
								<div style={{width:_width[0]}}>{index+1}</div>
								<div style={{width:_width[1]}}>{item[0]}</div>
								<div style={{width:_width[2]}}>{item[1]}</div>
								<div style={{width:_width[3]}}>{item[2]}</div>
								<div style={{width:_width[4]}}>{item[3]}</div>
								<div style={{width:_width[5]}}>{item[4]}</div>
							</div>
						)
					})					
				}
			</div>
		)
	}
}
	

