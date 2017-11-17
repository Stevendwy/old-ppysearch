import React, {
	Component
} from "react"
export default class PartList extends Component {
	constructor(props) {
		super(props)
		this.state = {
			bodylist: <div />
		}
		this.title = ['零件号', '名称', "参考价格", '说明', " "]
		this.res = {
			"data": [{
				"pid": "11127578077", // 零件号
				"label": "螺栓用于气缸盖", // 零件名
				"prices": "¥430.0", // 价格
				"remark": "", // 说明
				"has_replace": 0, // 有替换件
				"has_compt": 1, // 有组件
				"brand": "audi" // 品牌
			}, {
				"pid": "N10614801", // 零件号
				"label": "卡箍", // 零件名
				"prices": "¥10.0", // 价格
				"remark": "34X10X0,8", // 说明
				"has_replace": 1, // 有替换件
				"has_compt": 1, // 有组件
				"brand": "audi" // 品牌
			}, {
				"pid": "N10614801", // 零件号
				"label": "无此零件数据", // 零件名
				"prices": "¥10.0", // 价格
				"remark": "34X10X0,8", // 说明
				"has_replace": 1, // 有替换件
				"has_compt": 1, // 有组件
				"brand": "audi" // 品牌
			}, {
				"pid": "N10614801", // 零件号
				"label": "卡箍", // 零件名
				"prices": "¥10.0", // 价格
				"remark": "34X10X0,8", // 说明
				"has_replace": 1, // 有替换件
				"has_compt": 1, // 有组件
				"brand": "audi" // 品牌
			}]
		}
		this.width = ["14%", "50%", "15%", "14%", "7%"]

	}
	toDetail(partCode, isnext, index) {
		if (isnext) {
			this.props.toDetail(partCode, index)
		}
	}


	render() {
		// let bodylist = this.state.bodylist
		let isShow = this.props.isShow ? "block" : "none"
		let headlist = <div className="list-head">
			{
				this.title.map((item, index) => {
					return (

						<div className="listitem" key={index} style={{width:this.width[index]}}>
							{item}
						</div>

					)
				})
			}

		</div>
		let actIndex = 1
		let bodylist = <div className="list-body">{
			this.props.data.map((item, index) => {
				let _isMsg = ""
				let _cobyindex = 0
				let _toSee = "查看"
				let _imgIcon = ""
				let _msgDetail = ""
				let _isRed = "listitems"
				let _isBuble = "listitem"
				if (item.has_replace == 1) {
					_isMsg = "R"
					_msgDetail = "含替换件"
				}
				if (item.has_compt == 1) {
					_isMsg = "S"
					_msgDetail = "含组件"
				}
				if (item.has_replace == 1 && item.has_compt == 1) {
					_isMsg = "R、S"
					_msgDetail = "含替换件、组件"
				}
				if (item.status == 0) {
					_toSee = ""
					_isRed = "listitems red"
					_cobyindex = --actIndex
				}
				if (_isMsg != "") {
					_isBuble = "listitem isBuble"
					_imgIcon = <img src={cdnHost + "/img/icon_more.png"} alt="详情"/>
				}
				_cobyindex = actIndex++
				return (
						<div className={_isRed} key={index} style={{cursor: item.status?"pointer":"default"}} onClick={this.toDetail.bind(this,item.pid,item.status,_cobyindex)}>
							<div className="listitem" style={{width:this.width[0]}}>
								<div className="listitem-content">
									{item.pid}
								</div>
							</div>
							<div className="listitem" style={{width:this.width[1]}}>
								<div className="listitem-content">
									{item.label}
								</div>
							</div>
							<div className="listitem" style={{width:this.width[2]}}>
								<div className="listitem-content">
									{item.prices}
								</div>
							</div>
							<div className={_isBuble} style={{width:this.width[3]}}>
							<div className="listitem-content" style={{coursor:_isMsg?"pointer":"default",textDecoration:"underline"}}>
									{_isMsg}
								</div>
								<div className="hasMore">
									{_imgIcon}
								</div>
								<div className="ControlBubble">
									<p>
										{_msgDetail}
									</p>
								</div>
							</div>
							<div className="listitem" style={{width:this.width[4]}}>
							<div className="listitem-content toSee" style={{textDecoration:"underline"}}>
									{_toSee}
								</div>
							</div>
						</div>
				)
			})
		}
		</div>
		let _brandImg = <div/>
		if (this.props.image != "") {
			_brandImg = <img className="brand-img" src={this.props.image} alt="品牌" />
		}
		return (
			<div className="container-list" style={{display:isShow}}>
				<div className="brand-show">
					{_brandImg}
				</div>
				<div className="list-container">
					{headlist}
					{bodylist}
				</div>

			</div>
		)

	}


}