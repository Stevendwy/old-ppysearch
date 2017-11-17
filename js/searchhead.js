import React, {
	Component
} from 'react'
export default class SearchHead extends Component {
	constructor(props) {
		super(props)
		this.state = {
			choose: false,
			indexTemp: -1
		}
		this.indexTemp = 0
	}
	componentDidMount() {

	}

	choose(item, index) {
		this.setState({
			indexTemp: index
		})
		this.props.changeArr(item)
	}


	render() {
		var _code = this.props.arr.label
		var _count = this.props.arr.data.length
		var _codeArr = this.props.arr.titls
			//		let _isShow = this.props.arr.titls.length==1 ? "none":"block" 
		let _src = ""
		_src = this.state.indexTemp == -1 ? "/img/choose.png" : "/img/unchoose.png"
		let _isShow = _codeArr.length < 2 ? "none" : "inline-block"

		return (
			<div className="SearchHead">
				<div>
					找到相关结果共<span>{_count}</span>个
					<div style={{display: _isShow}}>
					<div className="BrandChoose">
						<div className="BrandItem" onClick={this.choose.bind(this,"all","-1")}>
							<img src={_src}/>
							<span>全部</span>
						</div>
						{
							_codeArr.map((item,index)=>{
								let _src = ""
								_src = index==this.state.indexTemp ? "/img/choose.png":"/img/unchoose.png"
								return(
									<div key={index} className="BrandItem" onClick={this.choose.bind(this,item,index)}>
										<img src={_src}/>
										<span>{item}</span>
									</div>
								)
							})
						}
					</div>
				</div>
				</div>
				<div>
					<span>{_code}</span>
				</div>
			</div>
		)
	}
}