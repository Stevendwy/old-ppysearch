'use strict';

import React, {
	Component
} from "react";
import FixedDiv from './fixeddiv'
import Listdetailrepace from './partdetailreplace'
import {
	Headermes,
	listHead,
	listOne,
	listTwo,
	listThree,
	listFour,
	listFive,
	listSix,
	datapartcars,
	newmessage
} from './datetest'

export default class PartDetail extends Component {
	constructor(props) {
		super(props);

		this.state = {
			headmessage: [],
			btnindex: -1, //当前为几个零件
			isLast: 0,
			logosrc: "",
			hreflist: [], //锚点新数组
			datatest: [
				[],
				[],
				[],
				[],
				[],
				[]
			], //数据组
			dataHead: [], //导航包含内容
			dataBrand: "", //品牌
			partNum: "", //零件号
			partName: "", //零件名
			showNav: "none", //导航显示
			btnfirst: false, //上一按钮
			btnlast: false, //下一按钮
			btnshow: "none", //按钮组显示
			detailShow: "none", //详情整体显示
			seconddata: {
				"data": []
			}
		};


		this.addpage = 0
		this.storeFiveData = {}
		this.hrefname = ["headtoview", "pricetoview", "repacetoview", "parttoview", "messagetoview", "carstoview"]
		this.titleStore = ["基础信息", "渠道价格", "替换件", "组件", "技术信息", "适用车型"]
		this.urllist = [
			"不用该参数",
			"ppys/partprices",
			"/ppys/searchreplace",
			"ppys/partcompt",
			"不用该参数",
			"ppys/partcars"
		]

	}

	componentWillReceiveProps(props) {
		this.dataTest(props)
	}

	handleScroll(e) {
		if (isPart == false) {
			return
		}
		let scrolltop = document.body.scrollTop
		let _show = scrolltop > 80 ? "block" : "none"
		this.setState({
			showNav: _show
		})
	}

	componentDidMount() {
		this.dataTest(this.props)
		window.addEventListener('scroll', this.handleScroll.bind(this));
	}

	dataTest(props) {
		let _data = props.date
		let _obj = props.obj
		this.dataGet(_data, _obj)
		let _btnshow = "inline-block"
		if (_obj.length == "undefined" || _obj.length == 1) {
			_btnshow = "none"
		}
		let _firstbtn = _obj.whitch != 1
		let _lastbtn = _obj.whitch != _obj.length
		this.setState({
			btnindex: _obj.whitch,
			partNum: _data.data[0].pid,
			partName: _data.data[0].label,
			headmessage: _data.partdetail,
			btnfirst: _firstbtn,
			btnlast: _lastbtn,
			btnshow: _btnshow,
			dataHead: _data.headname,
			dataBrand: _obj.brand,
			detailShow: _obj.detailshow,
			logosrc: _data.img
		})
	}

	dataGet(date, obj) {
		let _datatest = [
			[],
			[],
			[],
			[],
			[],
			[]
		]
		let _seconddata = {
			data: []
		}
		let _datalist = [
			[],
			[],
			[],
			[],
			[],
			[]
		]
		_datalist[0] = listHead.data
		_datalist[1] = listOne.data
		_datalist[2] = listThree.data
		_datalist[3] = listFour.main_info
		_datalist[4] = listFive.data
		_datalist[5] = datapartcars.data
		let _data = date.headname
		let _titlelist = this.titleStore
		let _hreflist = []
		let _indexconsole = []
		for (let o = 0; o < _data.length; o++) {
			let _haveindex = $.inArray(_data[o], _titlelist)
			if (_haveindex != -1) {
				// _datatest[o] = _datalist[o]
				_hreflist.push(this.hrefname[_haveindex])
				_indexconsole.push(_haveindex)
				let objs = {
					"url": this.urllist[_haveindex],
					"part": obj.part,
					"brand": obj.brand
				}
				if (_haveindex == 0) {
					_datatest[0] = date.data
				} else if (_haveindex == 4) {
					_datatest[4] = date.showmessage
				} else {
					// _datatest[_haveindex] = _datalist[_haveindex]
					Model.listData(objs, res => {

						if (_haveindex == 5) {
							this.setState({
								isLast: res.last
							})

						}
						_datatest[_haveindex] = res.data
						this.setState({
							datatest: _datatest
						})
					})
				}
			}
		}
		this.setState({
			hreflist: _hreflist,
			seconddata: _seconddata,
			datatest: _datatest,
			datalist: _datalist
		})
	}

	addDataFive(page) {

		let _brands = this.state.dataBrand
		let _parts = this.state.partNum
		let _n = this.addpage + 1
		this.addpage = _n
		let obj = {
			"page": _n,
			"brands": _brands,
			"part": _parts,
			"url": "/ppys/partcars"
		}
		let _datatest = JSON.parse(JSON.stringify(this.state.datatest))
		let _adddatsnew = JSON.parse(JSON.stringify(_datatest))
		Model.addData(obj, res => {
			let _nextadd = res.data
			_datatest[5] = _adddatsnew[5].concat(_nextadd)

			this.setState({
				isLast: res.last,
				datatest: _datatest
			})
		})

	}

	btnClick(type, wetherclick) {
		if (wetherclick == "noclick") {
			return
		}
		let _index = this.state.btnindex
		this.props.changePage(type, _index)
	}

	hrefScroll(whitch) {
			document.getElementById(whitch).scrollIntoView();
		}
		// <Listdetailrepace whitchIs={"0"} nexmess={_listpart}/>
		// <Listrepace getrepace={_listrepace} />
	render() {
		// let _listhead = this.state.datatest[0]
		let _listhead = []
		let _listprice = this.state.datatest[1]
		let _listrepace = this.state.datatest[2]
		let _listpart = this.state.datatest[3]
		let _listmessage = this.state.datatest[4]
		let _listcars = this.state.datatest[5]

		// 新车辆信息
		let _headmes = this.state.headmessage

		let _brand = this.state.dataBrand //车型
		let _detailShow = this.state.detailShow //总体显示
		let _btnshow = this.state.btnshow //按钮显示
		let _firstbtnclick = this.state.btnfirst ? "btn" : "noclick"
		let _lastbtnclick = this.state.btnlast ? "btn" : "noclick"
		let _logosrc = this.state.logosrc
		let _partNum = this.state.partNum
		let _partName = this.state.partName
		let _headlist = this.state.dataHead
		let _showNav = this.state.showNav
		let _hreflist = this.state.hreflist

		let _isLast = this.state.isLast
		let _titleListshow = _headlist.length < 1 ? "none" : "block"
		let _titleList = _headlist.map((elem, index) => {
			let _whitchhref = _hreflist[index]
			return (
				<div key={index} className="title-list-click" 
						onClick={this.hrefScroll.bind(this,_whitchhref)}>
					{elem}
				</div>
			)
		})
		return (
			<div className="part-detail-content" style={{display:_detailShow}}>
				<div className="navposition" style={{display:_showNav}}>
					<div className="navshow">
						<span>零件号：{_partNum}</span>
						<span>名称：{_partName}</span>
					</div>
				</div>
				<div className="part-detail-head">
					<div className="pagebtn">
						<div className="pagebtn-btn" style={{display:_btnshow}}>
							<div className="btn" onClick={this.props.tohide.bind(this)}>&lt; 返回</div>
							<div className={_firstbtnclick} onClick={this.btnClick.bind(this,"pre",_firstbtnclick)}>上一个</div>
							<div className={_lastbtnclick}  onClick={this.btnClick.bind(this,"next",_lastbtnclick)}>下一个</div>
						</div>
						<img className="pagebtn-img"
							 src={_logosrc} alt="loading"/>
						<div className="pagetitle">
							<span>零件号: </span>
							<span>{_partNum}</span>
						</div>
					</div>
					<Headermessage getmessage={_headmes} />
					<div className="titlelist" style={{display:_titleListshow}}>
						<div className="title-list-click">目录</div>
						{_titleList}
					</div>
				</div>
				<Listhead gethead={_listhead} />
				<Listprice getprice={_listprice} />
				<Listdetailrepace whitchIs={"2"} newbrand={_brand} nexmess={_listrepace}/>
				<Listpart getpart={_listpart} />
				<Listmessage getmessage={_listmessage} />
				<ListPartCars getcars={_listcars} pages={_isLast} addDataFive={this.addDataFive.bind(this)} />
				<div className="elevator" style={{display:_showNav}}>
					{_titleList}
					<FixedDiv isShow={_showNav}/>
				</div>
			</div>
		)
	}
}


class Model {
	static listData(objs, callback) {
		let url = objs.url
		let obj = {
			"part": objs.part,
			"brand": objs.brand
		}

		getAjax(url, obj, res => {
			callback(res)
		}, true)
	}
	static addData(objsadd, callback) {
		let url = objsadd.url
		let obj = {
			"part": objsadd.part,
			"brand": objsadd.brands,
			"page": objsadd.page
		}


		getAjax(url, obj, res => {
			callback(res)
		}, true)
	}
}

class Headermessage extends Component {
	constructor(props) {
		super(props);
		this.state = {};
	}
	render() {
		// 生成列表
		let _show = this.props.getmessage.length > 0 ? "block" : "none"
		let _datatitle = <div></div>
		let _bgline = <div></div>
		let _bgstore = []
		if (this.props.getmessage.length != 0) {
			_bgstore = []
			for (var i = 0; i < 20; i++) {
				_bgstore.push(i)
			}
			_bgline = _bgstore.map((its, indexline) => {
				let _topheight = (indexline + 1) * 40 + "px"
				return (
					<div key={indexline} className="bgline-color" style={{top:_topheight}}></div>
				)
			})
			_datatitle = this.props.getmessage.map((item, index) => {
				let itemkey = item.key
				let itemvalue = item.value
				return (
					<div className="listmessage-list" key={index}>
							<span className="listmessage-left" dangerouslySetInnerHTML={{__html: itemkey}} ></span>
							<span className="listmessage-right" dangerouslySetInnerHTML={{__html: itemvalue}}></span>
						</div>
				)
			})
		}
		return (
			<div className="headermessage"  style={{display:_show}}>
				<div className="headermessage-list">
					{_bgline}
					{_datatitle}
				</div>
			</div>
		)
	}
}



class Listhead extends Component {
	constructor(props) {
		super(props);

		this.state = {};
		this.head = "基础信息"
		this.title = ["零件号", "名称", "件数", "型号", "参考价格"]
		this.datatitle = ["pid", "label", "num", "model", "prices"]
	}
	render() {
		//生成头部
		let _title = this.title.map((im, ix) => {
				return (
					<div key={ix} className="title-background">{im}</div>
				)
			})
			// 生成列表
		let _show = this.props.gethead.length > 0 ? "block" : "none"
		let _datatitle = <div></div>
		if (this.props.gethead.length != 0) {
			_datatitle = this.props.gethead.map((item, index) => {
				let _childlist = this.datatitle.map((it, ins) => {
					let _keys = this.datatitle[ins]
					return (
						<div key={ins} className="listhead-listchild" dangerouslySetInnerHTML={{__html: item[_keys]}}></div>
					)
				})
				return (
					<div key={index} className="listhead-list">
							{_childlist}
						</div>
				)
			})
		}

		return (
			<div className="listhead" id="headtoview" style={{display:_show}}>
				<div className="title-href">
					<div className="title-black"></div>
					<div>{this.head}</div>
				</div>
				<div className="listhead-father">
					<div className="listhead-title">{_title}</div>
					{_datatitle}
				</div>
			</div>
		)
	}
}


class Listrepace extends Component {
	constructor(props) {
		super(props);

		this.state = {};
		this.head = "替换件"
		this.title = ["零件号", "车型", "件数", "型号", "参考价格"]
		this.datatitle = ["pid", "ptype", "num", "is_last", "prices"]
	}
	render() {
		//生成头部
		let _title = this.title.map((im, ix) => {
				return (
					<div key={ix} className="title-background">{im}</div>
				)
			})
			// 生成列表		
		let _show = this.props.getrepace.length > 0 ? "block" : "none"
		let _datatitle = <div></div>
		if (this.props.getrepace.length != 0) {
			_datatitle = this.props.getrepace.map((item, index) => {
				let _childlist = this.datatitle.map((it, ins) => {
					let _keys = this.datatitle[ins]
					let _content = <div></div>
					if (ins == 1) {
						_content = <div className="listchild-float-show">Normal</div>
					}
					return (
						<div key={ins} className="listhead-listchild">
							{item[_keys]}
							{_content}
						</div>
					)
				})
				return (
					<div key={index} className="listhead-list">
						{_childlist}
					</div>
				)
			})
		}

		return (
			<div className="listrepace" id="repacetoview" style={{display:_show}}>
				<div className="title-href">
					<div className="title-black"></div>
					<div>{this.head}</div>
				</div>
				<div className="listhead-father">
					<div className="listhead-title">{_title}</div>
					{_datatitle}
				</div>
			</div>
		)
	}
}

class Listpart extends Component {
	constructor(props) {
		super(props);

		this.state = {};
		this.head = "组件"
		this.title = ["位置", "零件号", "名称", "型号", "备注", "件数"]
		this.datatitle = ["id", "pid", "label", "remark", "advise", "num"]
	}
	newFloatwindow(item, type, e) {
		if (type == "false") {
			return
		}
		let _urls = "/ppy?type=part&binds=group&replacecode=" + item
		window.open(_urls)
		e.stopPropagation()
	}
	render() {
		//生成头部
		let _title = this.title.map((im, ix) => {
				return (
					<div key={ix} className="title-background">{im}</div>
				)
			})
			// 生成列表
		let _show = this.props.getpart.length > 0 ? "block" : "none"
		let _datatitle = <div></div>
		if (this.props.getpart.length != 0) {
			_datatitle = this.props.getpart.map((item, index) => {
				let _pid = item.pid
				let _childlist = this.datatitle.map((it, ins) => {
					let _keys = this.datatitle[ins]
					return (
						<div key={ins} className="listhead-listchild" dangerouslySetInnerHTML={{__html: item[_keys]}}></div>
					)
				})
				return (
					<div key={index} className="listhead-list" onClick={this.newFloatwindow.bind(this,_pid,"true")}>
						{_childlist}
					</div>
				)
			})
		}

		return (
			<div className="listpart" id="parttoview" style={{display:_show}}>
				<div className="title-href">
					<div className="title-black"></div>
					<div>{this.head}</div>
				</div>
				<div className="listhead-father">
					<div className="listhead-title">{_title}</div>
					{_datatitle}
				</div>
			</div>
		)
	}
}
class Listmessage extends Component {
	constructor(props) {
		super(props);

		this.state = {};
		this.head = "技术信息"
	}
	render() {
		// 生成列表
		let _show = this.props.getmessage.length > 0 ? "block" : "none"
		let _datatitle = <div></div>
		if (this.props.getmessage.length != 0) {
			_datatitle = this.props.getmessage.map((item, index) => {
				let itemarr = item.split(":")
				let itemfirst = itemarr[0] == "" ? "" : itemarr[0] + ":"
				return (
					<div className="listmessage-list" key={index}>
							<div className="listmessage-left" >{itemfirst}</div>
							<div className="listmessage-right" dangerouslySetInnerHTML={{__html: itemarr[1]}}></div>
						</div>
				)
			})
		}
		return (
			<div className="listmessage" id="messagetoview" style={{display:_show}}>
				<div className="title-href">
					<div className="title-black"></div>
					<div>{this.head}</div>
				</div>
				<div className="listmessage-list-content">
					{_datatitle}
				</div>
			</div>
		)
	}
}
class Listprice extends Component {
	constructor(props) {
		super(props);

		this.state = {};
		this.head = "渠道价格"
		this.title = ["零件类型", "厂家", "产地", "零件号", "备注", "参考价格"]
		this.datatitle = ["parttype", "mill", "remark", "pid", "remark", "prices"]
	}
	render() {
		//生成头部
		let _title = this.title.map((im, ix) => {
				return (
					<div key={ix} className="title-background">{im}</div>
				)
			})
			// 生成列表
		let _show = this.props.getprice.length > 0 ? "block" : "none"
		let _datatitle = <div></div>
		if (this.props.getprice.length != 0) {
			_datatitle = this.props.getprice.map((item, index) => {
				let _childlist = this.datatitle.map((it, ins) => {
					let _keys = this.datatitle[ins]
					return (
						<div key={ins} className="listhead-listchild">{item[_keys]}</div>
					)
				})
				return (
					<div key={index} className="listhead-list">
							{_childlist}
						</div>
				)
			})
		}

		return (
			<div className="listprice" id="pricetoview" style={{display:_show}}>
				<div className="title-href">
					<div className="title-black"></div>
					<div>{this.head}</div>
				</div>
				<div className="listhead-father">
					<div className="listhead-title">{_title}</div>
					{_datatitle}
				</div>
			</div>
		)
	}
}
class ListPartCars extends Component {
	constructor(props) {
		super(props);
		this.state = {};
		this.head = "适用车型"
		this.title = [" ", "车型", "市场", "年份", "零件组", ""]
		this.datatitle = ["", "cars_model", "market", "year", "group_name", "url"]
	}

	loadMore() {

	}

	location(url) {
		if (url) {
			window.open(url)
		}

	}

	render() {
		//生成头部
		let _title = this.title.map((im, ix) => {
				return (
					<div key={ix} className="title-background">{im}</div>
				)
			})
			// 生成列表
		let _show = this.props.getcars.length > 0 ? "block" : "none"
		let _datatitle = <div></div>
		let isShow = true
		if (this.props.getcars.length != 0) {
			_datatitle = this.props.getcars.map((item, index) => {
				let _childlist = item.map((it, ins) => {
					if (ins > 0) {
						isShow = false
					} else {
						isShow = true
					}
					return (
						<div key={ins} className="listhead-item" style={{display:isShow ? "flex" : "none"}}>
						{
							this.datatitle.map((value,key)=>{
								let itvalue = ""
								let classNames = "listhead-listchild"
								let onClicks = ""
								if(ins==0 && key==0 && item.length>1){
									classNames = "plus"
								}
								itvalue = it[value]
								if(value=="url"){
									onClicks = itvalue
									itvalue = "查看"
								}
								return(
									<div className={classNames} key={key} onClick={this.location.bind(this,onClicks)} dangerouslySetInnerHTML={{__html: itvalue}} />
								)
							})
						}</div>
					)
				})
				return (
					<div key={index} className="listhead-list">
						{_childlist}
					</div>
				)
			})
		}
		let _pages = this.props.pages
		let _footshow = this.props.pages == 0 ? "none" : "block"
		return (
			<div className="listpartcars" id="carstoview" style={{display:_show}}>
				<div className="title-href">
					<div className="title-black"></div>
					<div>{this.head}</div>
				</div>
				<div className="listhead-title">{_title}</div>
				<div className="listhead-body">
					{_datatitle}
					<div className="list-more" style={{display:_footshow}} onClick={this.props.addDataFive.bind(this,_pages)}>加载更多</div>
				</div>
			</div>
		)
	}
}