import React, {
	Component
} from 'react'
import InquireVINPullBrands from './inquirevinpullbrands'
import MiddleLeft from './middleleft'
import MiddleRight from './inquirecarpartmiddleright'
import MiddleBottom from './inquirecarpartmiddlebottom'
import PartHistoryList from './parthistorylist'
import {
	Toast
} from './dialog'
import SearchError from './searchError.js'
import FixedHeadShow from './fixedheadshow'
import FixedDiv from './fixeddiv'
import {
	sendEvent,
	catchEvent,
	middleEvents
} from './eventmodel'
export default class InquireContentVIN extends Component {
	constructor() {
		super()
		this.state = {
			remind: "",
			length: params.vin ? params.vin.length : 0,
			infoData: {
				mains: [],
				sub: [],
				formats: []
			},
			imgUrl: "",
			vins: "车型图片",
			show: false, //中间查询内容是否显示
			historys: [],
			isShow: false, //历史记录是否显示
			inputValue: params.vin ? params.vin : "",
			name: "选择品牌",
			imgname: "",
			toastShow: "none",
			brandName: "",
			toastMessage: "",
			cid: "",
			backgroundColor: "#0D6FB8",
			inputVin: "",
			listShow: "none", //品牌列表是否显示
			imgsData: {
				data: []
			},
			titlelistchangeshow: "none",
			floatheadtitlelist: "",
			searchShow: "none",
			inquireKeyschange: ""
		}
		this.inquireBrand = ""
		this.historyVIN = ""
		this.canInquire = true
		this.inputVinNew = ""
	}
	handleScroll(e) {
		if (this.state.show) {
			let scrolltop = document.body.scrollTop
			if (scrolltop > 200) {
				this.setState({
					titlelistchangeshow: "block",
					floatheadtitlelist: this.state.inputVin + this.state.vins.slice(0, -3)
				})
			} else {
				this.setState({
					titlelistchangeshow: "none"
				})
			}
		}
	}

	componentDidMount() {
		window.addEventListener('scroll', this.handleScroll.bind(this));
		this.handleValue(true)
		$(this.refs.showzonesearchinput).focus()
		catchEvent(middleEvents.topItemClick, e => {
			if (e.info.type == "vin") {
				this.reSet()
			}
		})
	}

	disableInquire() {
		this.setState({
			backgroundColor: "#999"
		}, () => this.canInquire = false)
	}

	enableInquire() {
		this.setState({
			backgroundColor: "#0D6FB8"
		}, () => this.canInquire = true)
	}

	change() { //input内容变化
		let reg = /^[A-Za-z0-9]*$/
		if (this.inputLock || !reg.test(this.refs.showzonesearchinput.value)) return
		this.handleValue()
	}

	handleValue(isInitial = false) { //isInitial判断是不是初始化，input内容处理
		let _value = this.refs.showzonesearchinput.value.toLocaleUpperCase()
		let _length = _value.length
		if (!this.canInquire) this.enableInquire()

		let _search = this.search.bind(this)
		let _getHistory = this.getHistory.bind(this)
		let _inquire = this.inquire.bind(this)
		let _remind = this.state.remind
		let _closeHistory = this.closeHistory.bind(this)

		if (_length == 17) {
			if (isInitial) _inquire()
			_closeHistory()
		}
		if (_length == 1 || _length == 2 || _length == 3 || _length == 4 || _length == 10 || _length == 17) {
			if (_length != 17) _getHistory()
			_search()
		} else if (_length == 9) _search()
		else if (_length < 1) {
			_remind = ""
			this.inquireBrand = ""
			this.setState({
				name: "选择品牌"
			})
			if (!isInitial) _getHistory()
		} else if (_length > 17) {
			setTimeout(() => {
					this.refs.showzonesearchinput.value = _value.substr(0, 17)
					this.handleValue()
				}, 20) //动效
		}
		this.setState({
			remind: _remind,
			length: _length > 17 ? 17 : _length,
			inputValue: _value
		})
	}

	getHistory() { //获取历史记录
			this.setState({
				toastShow: "none"
			})
			let _url = "/search/vins"
			let _vin = this.refs.showzonesearchinput.value
			let _obj = {
				vin: _vin ? _vin : ""
			}
			$('#searching').show();
			getAjax(_url, _obj, response => {
				//			console.dir(response)
				this.setState({
					historys: response.data,
					isShow: response.data.length > 0 ? true : false

				})
				$('#searching').hide();
			})
		}
		//上层传入
	componentWillReceiveProps(props) {
		let _inquire = this.inquire.bind(this)
		let _inquireKeyschange = props.inquireKeys
		let _inquireMessage = props.inquireMessage
		let _inquireWhetherAjax = props.inquireWhetherAjax
		this.inputVinNew = _inquireMessage
		if (props.inquireShow == "block" && _inquireWhetherAjax == "true") {
			this.inquire(_inquireKeyschange);
		}
	}
	search() { //自动搜索，蓝色文字内容
		let _vin = this.refs.showzonesearchinput.value
		let _url = "/parse/vins"
		let _obj = {
			vin: _vin
		}
		let _name = this.state.name
		$('#searching').show();
		getAjax(_url, _obj, response => {
			//			console.dir(response)
			this.inquireBrand = response.brand || ""
			this.setState({
				remind: response.data,
				name: response.brandname.length > 0 ? response.brandname : "选择品牌"
			})
			$('#searching').hide();
		})
	}

	brandSelected(brandname, brand) { //品牌列表点击
		if (this.inquireBrand == brand) return
		this.state.name = brandname
		this.inquireBrand = brand
		this.historyVIN = "" //改变品牌，这里修改保存的vin用来避免当做已查询处理
		this.enableInquire()
		this.setState({
			inputVin: this.refs.showzonesearchinput.value
		})
	}

	inquire(item) { //VIN查询
		let _this = this
		let _inquireKeys = item
		$('#searching').show()

		let _url = "/ppycars/carsinfos" + "?" + _inquireKeys
		getAjax(_url, null, data => {
			if (data.code === 4001) {
				_this.setState({
					listShow: "block",
					toastShow: "none"
				})
			} else if (data.code === 1) {
				//					console.log("返回数据" + JSON.stringify(data))
				_this.setState({
					imgUrl: data.imglogo,
					vins: data.vins,
					infoData: data,
					name: data.name,
					show: true,
					cid: data.cid,
					imgname: data.imgname,
					toastShow: "none"
				})
				if (data.brand === "") {
					_this.setState({
						listShow: "block",
						toastShow: "none"
					})
					return
				} else {
					_this.setState({
						listShow: "none"
					})
				}
				getAjax("/ppycars/group" + "?" + _inquireKeys, "code=" + data.brand + "&vin=" + data.vin, respon => {
					if (data.brand === "bullstuff") {
						isNoPic = true
					} else {
						isNoPic = false
					}
					_this.setState({
						imgsData: respon,
						brandName: data.brand
					}, () => _this.disableInquire())
				})
			} else if (data.code === 2) location.href = "/logout"
			else if (data.code === 4001) _this.setState({
				listShow: "block"
			}, () => _this.showToast(data.msg))
			else {
				_this.showToast(data.msg)
			}
			$('#searching').hide()
		}, true)
	}

	showToast(message) {
		this.setState({
			show: false,
			toastShow: "flex",
			toastMessage: message
		})
	}

	detail() { //更多历史记录
		let baseUrl = this.state.imgsData.data[0].uri + "&index=0";
		location.href = baseUrl
	}

	chooseItem(item, name) { //点击历史记录
		//		nextkey.log(name)
		this.inquireBrand = name
		this.setState({
			inputValue: item,
			isShow: false,
			length: item.length
		}, () => {
			this.inquire()
			this.search()
		})
	}

	deleteItem(index, item) { //删除历史记录
		//		console.log(item)
		let _url = "/search/calloff"
		let _obj = {
			vin: item,
			off: false
		}
		$('#searching').show();
		getAjax(_url, _obj, response => {
			//			console.log(response)
			let _historys = this.state.historys
			for (var i = 0; i < _historys.length; i++) {
				let history = _historys[i]
				if (history[0] == item) {
					_historys.splice(i, 1);
					break
				}
			}
			this.setState({
				historys: _historys

			})
			$('#searching').hide();
		})
	}

	closeHistory() { //关闭历史记录
		this.setState({
			isShow: false
		})
	}

	clear() { //清空内容
		this.inquireBrand = ""
		this.enableInquire()
		this.setState({
			name: "选择品牌",
			length: 0,
			inputValue: "",
			remind: ""
		}, this.getHistory.bind(this))
	}
	reSet() {
		this.setState({
			remind: "",
			length: params.vin ? params.vin.length : 0,
			infoData: {
				mains: [],
				sub: [],
				formats: []
			},
			imgUrl: "",
			vins: "车型图片",
			show: false, //中间查询内容是否显示
			historys: [],
			isShow: false, //历史记录是否显示
			inputValue: "",
			name: "选择品牌",
			imgname: "",
			toastShow: "none",
			toastMessage: "",
			backgroundColor: "#0D6FB8",
			inputVin: "",
			listShow: "none", //品牌列表是否显示
			imgsData: {
				data: []
			}
		})
		$(this.refs.showzonesearchinput).focus()

	}
	listHeaderClick() { //品牌列表头部点击
		let _listShow = "none"
		if (this.state.listShow == "none") _listShow = "block"
		this.setState({
			listShow: _listShow
		})
	}
	cobyBodyClick() {
		if (this.state.listShow == "block") this.setState({
			listShow: "none"
		})
	}

	render() {

		let _inputVin = this.state.inputVin
		let _inputVinNew = this.inputVinNew
		let _remind = this.state.remind
		let _length = this.state.length
		let _name = this.state.name
		let _changeColor = _name == "选择品牌" ? "#999" : "#000"
		let _change = this.change.bind(this)
		let _search = this.search.bind(this)
		let _leftImgUrl = this.state.imgUrl
		let _rightData = this.state.infoData
		let _brandSelected = this.brandSelected.bind(this)
		let _inquire = this.inquire.bind(this, _inputVin)
		let _vins = this.state.vins
		let _detail = this.detail.bind(this)
		let _show = this.state.show
		let _chooseItem = this.chooseItem.bind(this)
		let _deleteItem = this.deleteItem.bind(this)
		let _closeHistory = this.closeHistory.bind(this)
		let _historys = this.state.historys
		let _isShow = this.state.isShow
		let _inputValue = this.state.inputValue
		let _imgname = this.state.imgname
		let _linkType = "/histroy/vins"
		let _clear = this.clear.bind(this)
		let _showClear = _length > 0 ? "block" : "none"
		let _toastShow = this.state.toastShow
		let _toastMessage = this.state.toastMessage
		let _backgroundColor = "#0D6FB8"
		let _cid = this.state.cid
		let _brandName = this.state.brandName
		let _listShow = this.state.listShow
		let _listHeaderClick = this.listHeaderClick.bind(this)
		let _bottomListData = this.state.imgsData.data //数组

		return (
			<div className="InquireVINContainer" onClick={this.cobyBodyClick.bind(this)}>
				<div className="toBlackBorder" style={{display:this.state.searchShow}}>
					<FixedHeadShow showMessage={this.state.floatheadtitlelist} whetherShow={this.state.titlelistchangeshow}/>
					<FixedDiv  isShow={this.state.titlelistchangeshow}/>
				</div>
			<div className="ShowZoneSearchContainerBackgroundnew"></div>
				<div className="ShowZoneSearchContainer" style={{display:"none"}}>
					<div className="ShowZoneSearchRemind">{_remind}</div>
					<input ref="showzonesearchinput" className="ShowZoneSearchInput" placeholder="输入17位VIN车架号"
						value={_inputValue}
						onClick={() => {if(_inputValue.length < 1) this.getHistory()}}
						onChange={_change}
						onCompositionStart={() => {
							this.inputLock = true
							setTimeout(() => this.inputLock = false, 50)}}
						onKeyPress={e => {
							let _keyCode = e.which || e.keyCode
							if (_keyCode == 13) _inquire()
						}}/>
					<InquireVINPullBrands brandSelected={_brandSelected} color={_changeColor} name={_name} listShow={_listShow} listHeaderClick={_listHeaderClick}/>
					<button className="ShowZoneSearchButton" style={{backgroundColor: _backgroundColor}} onClick={_inquire}>VIN查询</button>
					<img className="ShowZoneSearchClearButton" src={cdnHost+"/img/icon_shancu.png"} onClick={_clear} style={{display: _showClear}}/>
					<div className="ShowZoneSearchLength">{_length == 0 ? "" : _length}</div>
					<PartHistoryList
						arr = {_historys}
				    		chooseItem = {_chooseItem}
				    		deleItem = {_deleteItem}
				   		isShow={_isShow}
				   		closeHistory={_closeHistory}
				   		linkType={_linkType}/>
				</div>

				<div className="MiddleContentContainernew">
					<div className="MiddleContentHead"  style={{opacity: _show ? "1" : "0",height: _show ?"auto":"0"}}>
						<div className="MiddleHeadCenter">
							<span  onClick={this.detail.bind(this)}>
								<span>{_inputVinNew}</span>
								<span>{"_"+_vins.slice(0,-4)+"_零件组"}</span>
							</span>
						</div>
					</div>
					<div className="MiddleContent" style={{opacity: _show ? "1" : "0",display: _show ?"block":"none"}}>
						<MiddleLeft imgUrl={_leftImgUrl} vins={_vins} remind={_imgname} imgClick={_detail}/>
						<MiddleRight data={_rightData} />
						<MiddleBottom inputVinNew={_inputVinNew}
						cid={_cid}
						brandName={_brandName}
						listData={_bottomListData} />
					</div>
					<div className="MiddleContentBackground" style={{display: !_show ? "block" : "none"}}></div>
				</div>
				<button className="InquireVINDetailContainer" style={{display: "none"}} onClick={_detail}>查看零件详情</button>
				<div className="ErrorContainer"  style={{display:_toastShow}}>
					<SearchError
						serachIsShow = {_toastShow}
						code = {_inputVin}
						reSearch = {this.reSet.bind(this)}
						reMoveSearch = {this.inquire.bind(this,_inputValue)}
					/>
				</div>
			</div>
		)
	}
}