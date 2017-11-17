import React, {
	Component
} from 'react'

export default class InquireVINPullBrands extends Component {
	constructor(props) {
		super(props)
		this.state = {
			brand: "选择品牌",
			list: []
		}
	}

	componentWillReceiveProps(props) {
		this.itemClick(props.name)
	}

	componentDidMount() {
		let _url = "/brandlist"
		let _obj = {}
		getAjax(_url, _obj, response => {
			this.setState({
				list: response.data
			})
		})
	}

	hiddenList() {
		this.props.listHeaderClick()
	}

	itemClick(brandName, brand) {
		//		console.log(brandName + brand)
		if (brandName == "选择品牌") return
		this.setState({
			brand: brandName
		})
		if (brand) this.props.brandSelected(brandName, brand)
	}

	render() {
		//		let _brand = this.state.brand
		let _brand = this.props.name
		let _itemClick = this.itemClick
		let _color = this.props.color
		let _list = this.state.list.map((item, index) => {
			return (
				<div key={index} className="InquireVINPullBrandsListItem" onClick={_itemClick.bind(this, item.name, item.brand)}>{item.name}</div>
			)
		})
		let _hiddenList = this.hiddenList.bind(this)
		let _show = this.props.listShow
		return (
			<div className="InquireVINPullBrandsContainer" onClick={_hiddenList}>
				<div className="InquireVINPullBrandsTitle" style={{color:_color}}>
					{_brand}
					<img className="InquireVINPullBrandsTitleImg" src={cdnHost + "/img/icon_down.png"} alt="img" />
				</div>
				<div className="InquireVINPullBrandsList" style={{display: _show}}>
					{_list ? _list : <div></div>}
				</div>
			</div>
		)
	}
}