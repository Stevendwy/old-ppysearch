import React, {Component} from 'react'
import SearchHead from './searchhead.js'
import SearchList from './searchlist.js'
export default class InquirePartResult extends Component{
	constructor(isShow){
		super(isShow)
		this.state={
			data : []
		}
		
	}
	changeArr(item){
		var arrTemp = this.props.arr.data
		if(item!="all"){
			arrTemp=[]
	    	   	let arr = JSON.parse(JSON.stringify(this.props.arr));
			arr.data.map((items,index)=>{
				if(item==items[0]){
					arrTemp.push(items)
				}
			})
//			console.log(arrTemp)
			//this.arr = this.state.arr;
			this.setState({
				data:arrTemp
			})
		}else{
			this.setState({
				data:arrTemp
			})
		}
		
	}
	
	render(){
		let _arr = [];
		_arr = (this.state.data.length==0 ? this.props.arr.data : this.state.data);
		return(
			<div className="InquirePartResult">
				<SearchHead 
					code={this.state.code}
					count = {this.state.count}
					codeArr = {this.state.codeArr}
					arr = {this.props.arr}
					changeArr = {this.changeArr.bind(this)}
				/>
				<SearchList
					arr = {_arr}
				/>
			</div>
		)
	}
}