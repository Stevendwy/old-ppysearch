import React, {Component} from 'react'
export default class FixedDiv extends Component{
	constructor(props){
		super(props)
		this.state={
			isShow : true,
			clickIndex : -1
		}
		this.falg = -1
	}
	
//	foldContainer(){
//		this.setState({
//			isShow : !this.state.isShow
//		})
//	}
//	
//	changeIndex(index){
//		console.log(index)
//		this.setState({
//			clickIndex : index
//		})
//	}
//	componentWillReceiveProps(props) {
//		console.log("runing")
//		if(this.falg !== this.props.activeIndex){
//			this.setState({
//				clickIndex : this.props.activeIndex
//			})
//			this.falg = this.props.activeIndex
//		}
//	}
	render(){
//		let _activeIndex = this.state.clickIndex
//		let _elevatorList =  this.props.elevatorList
//		   for(var i = 0 ;i<_elevatorList.length;i++){
//		   			
//		             if(_elevatorList[i] == "")
//		             {
//		                      _elevatorList.splice(i,1);
//		                      i= i-1;
//		                  
//		             }
//		   }
		let _isShow = this.state.isShow ? "block" : "none"
		return(
			<div className="FixedContainer" style={{display:this.props.isShow}}>
				{
//					<div className="EleMainItem" style={{display:_isShow}}>
//					{
//						_elevatorList.map((item,index)=>{
//							let _toWhere = "#to"+index
//							return(
//								<a href={_toWhere} key={index}>
//									<div className="ElevatorItem" 
//									style={{backgroundColor:index==_activeIndex?"#1AA0F3":"#FFFFFF",color:index==_activeIndex?"#FFFFFF":"#666666"}}
//									onClick={this.changeIndex.bind(this,index)}>{item}</div>
//								</a>
//							)
//						})
//					}
//				</div>
					
				}
				
				<a href="#top">
					<div className="ToTopItem">

					</div>
				</a>
			</div>
			
		)
	}
	
}