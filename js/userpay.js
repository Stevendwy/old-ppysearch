import React, {Component} from 'react'
export default class UserPay extends Component {
	constructor(props){
		super(props)
		this.state={
			chooseIndex:1,
			time:this.getNowFormatDate(1)
		}
		this.price=2000
	}
	
	getNowFormatDate(type) {
	    var seperator1 = "-";
	    var date = new Date();
	    var year = date.getFullYear();
	    var month = date.getMonth() + 1;
	    var strDate = date.getDate();
	    if(type==0){
	    		strDate++
	    }else{
	    		year++
	    }
	    
	    if (month >= 1 && month <= 9) {
	        month = "0" + month;
	    }
	    if (strDate >= 0 && strDate <= 9) {
	        strDate = "0" + strDate;
	    }
	    var currentdate = year + seperator1 + month + seperator1 + strDate;
	    return currentdate;
	}
	

	
	OnPay(){
		this.props.onClick(this.state.chooseIndex+1)	
	}
	
	changePrice(index){
		this.setState({
			chooseIndex:index,
			time:this.getNowFormatDate(index)
		})
	}
	
	render(){
		let _time = this.state.time
		let _price = this.price
		let _imglocal0 = this.state.chooseIndex == 0 ?  "-10px -50px" : "-10px -10px"
		let _imglocal1 = this.state.chooseIndex == 1 ?   "-10px -130px":"-10px -90px"
		
		return(
			<div className="UserPay">
				<div	 className="PayTop">
					<div className="ChoosePayContainer">
						<div className="DayCard" onClick={this.changePrice.bind(this,0)}>
							<div className="GreenBackGround">
								<span className="FristSpan">试用</span>
								<span className="SecondSpan">&yen;10</span>
								<span className="LastSpan">使用期限一天</span>
							</div>
							<div className="IconDay" style={{"backgroundPosition":_imglocal0}}>
							</div>	
						</div>
						<div className="YearCard" onClick={this.changePrice.bind(this,1)}>
							<div className="BlueBackground">
								<span className="FristSpan">年卡</span>
								<span className="SecondSpan">&yen;2000</span>
								<span className="LastSpan">使用期限一年</span>
							</div>
							<div className="IconYear" style={{"backgroundPosition":_imglocal1}}>
							</div>
						</div>
					</div>
				</div>
				<div className="PayBody">
					<div className="CenterMsg">
						<b>确认订单信息</b>
						<span>零零汽年卡</span>
						<div>
							<ol>
								<li>不可取消</li>
								<li>不含税</li>
							</ol>
						</div>
						<div>
							有效期至:{_time}
						</div>
					</div>
					<div className="toPayContainer">
						<div className="NeedPrice">
							实付款: <span>&yen;{_price}</span>
						</div>
						<div className="toNewPayContainer">
							<div onClick={this.OnPay.bind(this)}>确认付款</div>
						</div>
					</div>
				</div>
			</div>
		)
	
	}
	
	
	
	
}