import React,{Component} from 'react'
export default class SearchTitle extends Component{
	constructor(props){
		super(props)
		this.arr=["编号","品牌","车型","年份","零件组","备注"]
	}
	render(){	
		var _arr = this.arr;
		var _width = this.props.width;
		return(
			<div className="SearchTitle">
				{
					_arr.map((item,index)=>{
						return(
							<div key={index} style={{width:_width[index]}}>
								{item}
							</div>
						)
					})
				}
			</div>
		)
	}
}