import React, {
	Component
} from 'react'
export default class SearchError extends Component {
	constructor(props) {
		super(props)
	}

	reSearchClick() {
		this.props.reSearch()
	}

	toBaiduPluClick() {
		$('.FeedBackButton').click()
	}

	toSearch(vins) {
		// console.log(vins)
		this.props.toSearch(vins)
	}
	render() {
		let _code = this.props.code
			// console.log(_code)
			// console.dir(_code)

		let _islike = this.props.likenessVin ? <span onClick={this.toSearch.bind(this,this.props.likenessVin)}>查询&gt;&gt;</span> : <div/>
		let _height = this.props.height
		let _continaer = <p  style={{display:"block"}}>
			<span style={{cursor:"pointer"}}  onClick={this.reSearchClick.bind(this)} >重新输入&gt;&gt;</span> 
		</p>
		if (this.props.netError) {
			_continaer = <div>
					<p>建议您:</p>
					<p>
						<span style={{cursor:"pointer"}}  onClick={this.toSearch.bind(this,"")} >重新查询&gt;&gt;</span> 
					</p>
			</div>
		}
		return (
			<div className="bigSearchModal1" style={{display:this.props.serachIsShow,height:_height}}>
				<div className="errorMainText">
					<p
					 dangerouslySetInnerHTML={{__html: _code}}/>
					 {_islike}
					{_continaer}
				</div>
			</div>
		)
	}
}