import React, {
	Component
} from 'react'
import OkO from './okbtn'
//import {
//	dataShowImg,response
//} from './datetest'

import {
	sendEvent,
	catchEvent,
	removeEvent,
	middleEvents
} from './eventmodel'
import FixedDiv from './fixeddiv'
export default class CarContentBody extends Component {
	constructor() {
		super()
		this.state = {
			newurl: "",
			showname: "",
			whitchmoveingshow: "none",
			allowshow: 0,
			floatShowleft: 0,
			floatShowtop: 0,
			floatShowwidth: 0,
			fatherindex: 0,
			floatShowbottom: 0,
			bodyscrollTop: 0,
			responseDate: [],
			moveimg: false,
			imgclickindex: -1,
			scrollindexchange: true,
			dataShowImg: {
				data: []
			},
			inputShow: "none",
			floatShow: "none",
			sentwho: "baocun",
			sentshow: "none",
			imgsetx: 0, //当前图片位置
			imgsety: 0,
			sentmessage: "保存当前设置？",
			backmessagewho: "who",
			backmessagetrue: "back",
			titlelistchangeshow: "none",
			contentclickindex: -1,
			activeIndexchange: -1,
			floatheadtitlelist: "",
			showwhetherchangenavfalse: "block", //排序是否显示
			datatext: [
				[],
				[],
				[],
				[],
				[],
				[],
				[]
			],
			showornot: [0, 0, 0, 0, 0, 0, 0],
			titlelist: ["", "", "", "", "", "", "", ""],
			headtitlelist: ["", "", "", "", "", "", "", ""],
			headtitlelistdelet: ["", "", "", "", "", "", "", ""],
			CarPartBodyImgBodyBackgroundColor: "",
			imgshoworder: [],
			imgchange: ["https://cdns.007vin.com/img/icon_huifu.png", "https://cdns.007vin.com/img/icon_baocun.png", "https://cdns.007vin.com/img/icon_paixu.png", "https://cdns.007vin.com/img/icon_tuichu.png"],
			liBackGroundColorContent: ["true", "true", "true", "true", "true", "true", "true"],
			contentshowwhether: ["none", "none", "none", "none", "none", "none", "none", "none"],
			classnamelist: ["CarPartBodyImgBodyList1", "CarPartBodyImgBodyList2", "CarPartBodyImgBodyList3", "CarPartBodyImgBodyList4", "CarPartBodyImgBodyList5", "CarPartBodyImgBodyList6", "CarPartBodyImgBodyList7"]
		}
		this.datahas = [
			[],
			[],
			[],
			[],
			[],
			[],
			[]
		]
		this.liBackGroundColor = [1, 0, 0, 0, 0, 0, 0]
		this.contentshowwhetherold = ["none", "none", "none", "none", "none", "none", "none", "none"]
		this.imgchangeold = ["https://cdns.007vin.com/img/icon_huifu.png", "https://cdns.007vin.com/img/icon_baocun.png", "https://cdns.007vin.com/img/icon_paixu.png", "https://cdns.007vin.com/img/icon_tuichu.png"]
		this.imgchangeenter = ["https://cdns.007vin.com/img/icon_huifu.png", "https://cdns.007vin.com/img/icon_baocun.png", "https://cdns.007vin.com/img/icon_paixu.png", "https://cdns.007vin.com/img/icon_tuichu.png"]
		this.imgchangedian = ["https://cdns.007vin.com/img/icon_huifu_dian.png", "https://cdns.007vin.com/img/icon_baocun_dian.png", "https://cdns.007vin.com/img/icon_paixu_dian.png", "https://cdns.007vin.com/img/icon_tuichu_dian.png"]
		this.titlelistchange = ["", "", "", "", "", "", "", ""]
		this.titlelistkong = ["", "", "", "", "", "", "", ""]
		this.headtitlelistold = ["", "", "", "", "", "", "", ""]
		this.headtitlelistolddelet = ["", "", "", "", "", "", "", ""]
		this.imgshoworderold = []
		this.floatShowTime = {}
		this.dataShowImgold = {
			data: []
		}
		this.dataShowImgoldstore = {
			data: []
		}
		this.dataShowImgoldchange = {
			data: []
		}
		this.titlelistchangeshow = ""
		this.titlelistchangeshowdelet = ""
		this.floatheadtitlelistold = ""
		this.searchauth = ""
		this.searchcode = ""
		this.startX = 0 //鼠标点击后移动的起始X
		this.startY = 0 //鼠标点击后移动的起始Y
		this.originX = 0 //鼠标点击后控件的起始X
		this.originY = 0 //鼠标点击后控件的起始Y
		this.hasMouseDown = false
		this.moving = false
		this.canmoving = false
		this.whitchmoveimg = "" //图片移动
		this._movenumX = 0 //移动位置
		this._movenumY = 0
		this._oldindex = 0 //新旧index
		this._setimglist = "" //发送的图片顺序
	}
	handleClick(_index, _url, _name, _brand, _keys, _img) {
		let _moveimgWhether = this.state.moveimg
		if (_moveimgWhether == true) {
			return
		}
		getAjax(_url, {}, (response) => {
			let _indexchange = this.state.indexchange
			this.datahas[0] = response.data
			this.titlelistchange[1] = response.title
			this.titlelistchange[0] = "选择品牌"
			for (var i = 0; i < this.state.showornot.length; i++) {
				if (i > 0) {
					this.state.showornot[i] = 0
				} else {
					this.state.showornot[i] = 1
				}
				if (i > 1) {
					this.titlelistchange[i] = ""
				}
				this.liBackGroundColor[i] = "true"
			}
			this.setState({
				datatext: this.datahas,
				titlelist: this.titlelistchange,
				inputShow: "none",
				liBackGroundColorContent: this.liBackGroundColor
			})
		})
		this.titlelistchangeshow = _name
		for (let i = 0; i < this.headtitlelistold.length; i++) {
			if (i >= 1) {
				this.headtitlelistold[i] = ""
				this.headtitlelistolddelet[i] = ""
			} else {
				this.headtitlelistold[i] = this.titlelistchangeshow
				this.headtitlelistolddelet[i] = this.titlelistchangeshow
			}
			if (i < 1) {
				this.contentshowwhetherold[i] = "block"
			} else {
				this.contentshowwhetherold[i] = "none"
			}
		}
		this.setState({
				CarPartBodyImgBodyBackgroundColor: _name,
				headtitlelist: this.headtitlelistold,
				headtitlelistdelet: this.headtitlelistolddelet,
				contentshowwhether: this.contentshowwhetherold,
				floatheadtitlelist: _name,
				allowshow: 1,
				showwhetherchangenavfalse: "none"
			})
			//给上层传参数
		this.searchcode = _brand
		let _newmessage = this.state.floatheadtitlelist
		this.props.handleClickInquireContentVin("none", this.searchcode, this.searchauth, _keys, _newmessage, "true")
	}
	handleClickChange(index, url, auth, fatherindex, name, keys, e) {
			//判断是否需要请求新数据，根据判断将需要内容拼接
			if (url == "") {
				for (var i = 0; i < this.state.showornot.length; i++) {
					if (i >= fatherindex + 1) {
						this.state.showornot[i] = 0
						this.liBackGroundColor[i] = "true"
					} else if (i == fatherindex) {
						this.state.showornot[i] = 1
						this.liBackGroundColor[i] = index
					} else {
						this.state.showornot[i] = 1
					}
				}
				//展示或者隐藏
				let _contentshowwhetherold = this.contentshowwhetherold
				for (var i = 0; i < _contentshowwhetherold.length; i++) {
					if (i <= fatherindex + 1) {
						this.contentshowwhetherold[i] = "block"
					} else {
						this.contentshowwhetherold[i] = "none"
					}
				}
				this.setState({
					newurl: auth,
					inputShow: "block",
					liBackGroundColorContent: this.liBackGroundColor
				})
			} else {
				getAjax(url, {}, (response) => {
					this.datahas[fatherindex + 1] = response.data
					this.titlelistchange[fatherindex + 2] = response.title
					for (var i = 0; i < this.state.showornot.length; i++) {
						if (i > fatherindex + 1) {
							this.state.showornot[i] = 0
							this.liBackGroundColor[i] = "true"
							this.titlelistchange[i + 1] = ""
						} else if (i == fatherindex) {
							this.state.showornot[i] = 1
							this.liBackGroundColor[i] = index
						} else {
							this.state.showornot[i] = 1
						}
					}
					//展示或者隐藏
					let _contentshowwhetherold = this.contentshowwhetherold
					for (var i = 0; i < _contentshowwhetherold.length; i++) {
						if (i <= fatherindex + 1) {
							this.contentshowwhetherold[i] = "block"
						} else {
							this.contentshowwhetherold[i] = "none"
						}
					}
					this.setState({
							datatext: this.datahas,
							titlelist: this.titlelistchange,
							inputShow: "none",
							liBackGroundColorContent: this.liBackGroundColor
						})
						//回调执行
					if (response.data.length == 1) {
						let _newdata = response.data[0]
						this.handleClickChange(0, _newdata.uri, _newdata.auth, fatherindex + 1, _newdata.name, _newdata.keys)
					}
				})
			}
			//处理浮动显示内容以及修改点击页面滚动
			this.titlelistchangeshow = ">" + name
			this.titlelistchangeshowdelet = name
			this.headtitlelistold[fatherindex + 1] = this.titlelistchangeshow
			this.headtitlelistolddelet[fatherindex + 1] = this.titlelistchangeshowdelet
				//添加headtitlelistolddelet后代清空
			this.headtitlelistolddelet[fatherindex + 2] = ""
			let _floatheadtitlelist = this.state.headtitlelist
			this.floatheadtitlelistold = ""
			for (var i = 0; i < fatherindex + 2; i++) {
				if (_floatheadtitlelist[i] != "") {
					this.floatheadtitlelistold += _floatheadtitlelist[i]
				}
			}
			//页面滚动处理

			let bodyclientHeight = document.body.clientHeight
			let documentclientHeight = document.body.scrollHeight
			let _bodyscrollTop = documentclientHeight - bodyclientHeight
				//$(document.body).animate({"scrollTop":_bodyscrollTop},"slow")
			this.setState({
				headtitlelist: this.headtitlelistold,
				headtitlelistdelet: this.headtitlelistolddelet,
				floatheadtitlelist: this.floatheadtitlelistold,
				contentshowwhether: this.contentshowwhetherold,
				bodyscrollTop: _bodyscrollTop,
				activeIndexchange: fatherindex + 1,
				scrollindexchange: true
			})
			let _newmessage = this.floatheadtitlelistold
			if (url == "") {
				//给上层传参数
				this.props.handleClickInquireContentVin("block", this.searchcode, auth, keys, _newmessage, "true")
			} else {
				//给上层传参数
				this.props.handleClickInquireContentVin("none", this.searchcode, auth, keys, _newmessage, "true")
			}
		}
		//图片移入移除
	moveImgEnter(whitch) {
			switch (whitch) {
				case "Imghuifu":
					this.imgchangeold[0] = this.imgchangedian[0]
					this.setState({
						imgchange: this.imgchangeold
					})
					break;
				case "Imgbaocun":
					this.imgchangeold[1] = this.imgchangedian[1]
					this.setState({
						imgchange: this.imgchangeold
					})
					break;
				case "Imgpaixu":
					this.imgchangeold[2] = this.imgchangedian[2]
					this.setState({
						imgchange: this.imgchangeold
					})
					break;
					//		  case "Imgtuichu":
					//			  this.imgchangeold[3]=this.imgchangedian[3]
					//			  this.setState({
					//			  	imgchange:this.imgchangeold
					//			  })
					//			  break;
				default:
					this.setState({
						imgchange: this.imgchangeenter
					})
			}
		}
		//退出图片 <img src={this.state.imgchange[3]} className="Imgtuichu"/>
	moveImgLeave(whitch) {
			switch (whitch) {
				case "Imghuifu":
					this.imgchangeold[0] = this.imgchangeenter[0]
					this.setState({
						imgchange: this.imgchangeold
					})
					break;
				case "Imgbaocun":
					this.imgchangeold[1] = this.imgchangeenter[1]
					this.setState({
						imgchange: this.imgchangeold
					})
					break;
				case "Imgpaixu":
					this.imgchangeold[2] = this.imgchangeenter[2]
					this.setState({
						imgchange: this.imgchangeold
					})
					break;
					//		   case "Imgtuichu":
					//			  this.imgchangeold[3]=this.imgchangeenter[3]
					//			  this.setState({
					//			  	imgchange:this.imgchangeold
					//			  })
					//			  break;
				default:
					this.setState({
						imgchange: this.imgchangeenter
					})
			}
		}
		//图片拖动处理
	moveClick() {
			this.setState({
				moveimg: true
			})
		}
		//退出设置
	moveClicktuichu() {
			//		this.imgshoworderold=[0,1,4,3,2,5,6,7,10,9,8]
			this.setState({
				dataShowImg: this.dataShowImgoldstore,
				showwhetherchangenavfalse: "block",
				moveimg: false
			})
		}
		//保存设置moveimg:false
	moveClickNo() {
			this.setState({
				sentwho: "Imgbaocun",
				sentshow: "block",
				sentmessage: "保存当前设置？"
			})
		}
		//字母排序
	moveClickBack() {
			//		this.setState({
			//			sentwho:"Imghuifu",
			//			sentshow:"block",
			//			sentmessage:"恢复字母排序？"
			//		})
			let _list = []
			for (let i = 0; i < this.state.dataShowImg.data.length; i++) {
				_list.push(i)
			}
			this.imgshoworderold = _list
			this.setState({
				dataShowImg: this.dataShowImgoldchange,
				showwhetherchangenavfalse: "none"
			})
		}
		//弹框
	backmessage(okmessage, whoUseMe, okfathershow) {
			this.setState({
				backmessagewho: whoUseMe,
				backmessagetrue: okmessage,
				sentshow: okfathershow
			})
			let _backmessagewho = whoUseMe
			let _backmessagetrue = okmessage
			let _sentshow = okfathershow

			if (_backmessagetrue == "true") {
				switch (_backmessagewho) {
					case "Imgbaocun":
						let _url = "/brandrecord"
						let _storedata = this.state.dataShowImg.data
						let _data = ""
						for (let i = 0; i < _storedata.length; i++) {
							if (i < _storedata.length - 1) {
								_data += _storedata[i].brand + ","
							} else {
								_data += _storedata[i].brand
							}
						}
						let _sendmessage = {
							keys: _data
						}
						getAjax("/brandrecord", _sendmessage, response => {
							this.setState({
								showwhetherchangenavfalse: "block",
								moveimg: false
							})
						})
						break;
					default:
						break;
				}
			}
		}
		//拖动处理
	moveClickMove(indexorder, whitch, _img, e) {
		let _type = e.type
		if (_type == "mouseleave") this.moving = false
		if (_type == "mousedown" || _type == "touchstart") {
			this._movenumX = 0
			this.moving = true
			this.startX = e.hasOwnProperty('touches') ? e.touches[0].clientX : e.clientX //判断是手指还是鼠标
			this.startY = e.hasOwnProperty('touches') ? e.touches[0].clientY : e.clientY
			this.hasMouseDown = true
			let _whetherImgmove = this.state.moveimg
			if (_whetherImgmove == true) {
				this.setState({
					imgclickindex: whitch,
					whitchmoveingshow: "block",
					imgsetx: this.startX - 260,
					imgsety: this.startY - 150
				})
			}
			this.whitchmoveimg = cdnHost + _img
		} else if (this.hasMouseDown && (_type == "mousemove" || _type == "touchmove")) {
			if (this.moving == false) return
			let _whetherImgmove = this.state.moveimg
			if (_whetherImgmove == false) return
				//当前鼠标或手指位置
			let _currentX = e.hasOwnProperty('touches') ? e.touches[0].clientX : e.clientX
			let _currentY = e.hasOwnProperty('touches') ? e.touches[0].clientY : e.clientY
				//动作实际偏移量
			let _moveX = _currentX - this.startX
			let _moveY = _currentY - this.startY
				//计算偏移量移动几个
			let Left, Right, Top, Bottom, Width, Height
			let oRect = e.target.getBoundingClientRect()
			Top = oRect.top
			Right = oRect.right
			Bottom = window.innerHeight - oRect.bottom
			Left = oRect.left
			Width = Right - Left;
			Height = oRect.height || Bottom - Top;
			this._movenumX = Math.round(_moveX / Width);
			this._movenumY = Math.round(_moveY / Height);
			let _imsetx = _currentX - 240
			let _imgsety = _currentY - 150
			if (whitch == 10) {
				if (_imgsety < 5 || _imgsety > 175) {
					//					this.moving = false
					this.setState({
						imgclickindex: -1,
						whitchmoveingshow: "none"
					})
				}
			} else {
				if (_imgsety < 5 || _imgsety > 90 || _imsetx > 920) {
					this.moving = false
					this.setState({
						imgclickindex: -1,
						whitchmoveingshow: "none"
					})
				}
			}
			this.setState({
				imgsetx: _imsetx,
				imgsety: _imgsety
			})
			if (_moveX !== 0) {
				this.canmoving = true
			}
		}
	}
	moveClickEnd(e) {
		if (this.moving == false) return
		let _whetherImgmove = this.state.moveimg
		if (_whetherImgmove == false) return
		let whitch = this.state.imgclickindex
		let _type = e.type
		if (_type == "mouseup" || _type == "touchend") {
			let _imgshoworder = this.state.imgshoworder
			let _imgshoworderlist = this.imgshoworderold
			let _dataShowImgold = this.dataShowImgold
			let _dataShowImgoldchange = this.dataShowImgoldchange
			this._oldindex = whitch
			let _oldindextext = whitch
			let _newindextext = this._oldindex + this._movenumX
				//处理下层向上移动
			if (_oldindextext == 10) {
				if (this._movenumX > 0 && this._movenumX <= 9) {
					_newindextext = this._movenumX
				} else {
					_newindextext = 0
				}
			}
			//上层下下层移动
			if (_newindextext < 0) {
				_newindextext = 0
			} else if (_newindextext > 10) {
				_newindextext = 10
			}
			//不足以改变就不变以及越界处理
			//			if(this._movenumX==0) {
			//				this.setState({
			//					imgclickindex:-1,
			//					whitchmoveingshow:"none"
			//				})
			//				this.hasMouseDown = false
			//				this.moving = false
			//				return
			//			}
			if (_oldindextext >= _newindextext) {
				let storeindex = this.imgshoworderold[_newindextext]
					//换位还是插入
					//				this.imgshoworderold[_newindextext]=this.imgshoworderold[whitch]
					//				this.imgshoworderold[whitch]=storeindex			
				let abc = JSON.parse(JSON.stringify(this.imgshoworderold[whitch]))
				let _arr = this.imgshoworderold
				let _imgshoworderoldnochange = _newindextext
				for (var i = _imgshoworder.length - 1; i >= 0; i--) {
					if ((i > _newindextext) && (i <= whitch)) {
						_arr[i] = _arr[i - 1]
					}
					if (i == _newindextext) {
						_arr[i] = abc
					}
					let _imgshoworderoldindex = this.imgshoworderold[i]
					_dataShowImgold.data[i] = _dataShowImgoldchange.data[_imgshoworderoldindex]
				}
			} else {
				let storeindex = this.imgshoworderold[_newindextext]
					//				this.imgshoworderold[_newindextext]=this.imgshoworderold[whitch]
					//				this.imgshoworderold[whitch]=storeindex			
				let abc = JSON.parse(JSON.stringify(this.imgshoworderold[whitch]))
				let _arr = this.imgshoworderold
				let _imgshoworderoldnochange = _newindextext
				for (var i = 0; i < _imgshoworder.length; i++) {
					if ((i < _newindextext) && (i >= whitch)) {
						_arr[i] = _arr[i + 1]
					}
					if (i == _newindextext) {
						_arr[i] = abc
					}
					let _imgshoworderoldindex = this.imgshoworderold[i]
					_dataShowImgold.data[i] = _dataShowImgoldchange.data[_imgshoworderoldindex]
				}
			}
			if (this.canmoving == true) {
				this.setState({
					dataShowImg: _dataShowImgold,
					whitchmoveingshow: "none"
				})
				let _setlist = this.state.dataShowImg.data
					//保存最后的数组发送用
				this._setimglist = ""
				for (let i = 0; i < _setlist.length; i++) {
					if (i < _setlist.length - 1) {
						this._setimglist += _setlist[i].brand + ","
					} else {
						this._setimglist += _setlist[i].brand
					}
				}
			}
			this.hasMouseDown = false
			this.moving = false
			this.canmoving = false
			this.setState({
				imgclickindex: -1,
				whitchmoveingshow: "none"
			})
		}
	}

	//点击处理显示或隐藏
	handleClickShow(indexnum) {
			let _contentshowwhetherold = this.contentshowwhetherold
			for (var i = 0; i < _contentshowwhetherold.length; i++) {
				if (i == indexnum + 1) {
					this.contentshowwhetherold[i] = "none"
				}
			}
			this.setState({
				contentshowwhether: this.contentshowwhetherold
			})
			if (indexnum == -1) {
				this.clicktimes++;
				//排序显示状态判断
				let _none = this.state.contentshowwhether[0]
				let _block = this.state.moveimg
				if (_block == true) {
					this.setState({
						showwhetherchangenavfalse: "none"
					})
				} else {
					this.setState({
						showwhetherchangenavfalse: "block"
					})
				}
			}
		}
		//滚动事件和计时器
	handleScroll(e) {
		if (isCar == false) {
			return
		}
		let scrolltop = document.body.scrollTop
		let _allowshow = this.state.allowshow == 1 ? true : false
		if (scrolltop > 80 && _allowshow) {
			this.setState({
				titlelistchangeshow: "block"
			})
		} else {
			this.setState({
				titlelistchangeshow: "none"
			})
		}
		//给上层传参数，是否显示导航及导航内容
		this.props.handleChange(this.state.floatheadtitlelist, this.state.titlelistchangeshow, "false")
	}

	handleMouseEnter(shownamechange, e) {
		let Left, Right, Top, Bottom, Width, Height
		let oRect = e.target.getBoundingClientRect()
		Top = oRect.top - 30
		Right = oRect.right
		Bottom = window.innerHeight - oRect.bottom + 20
		Left = oRect.left
		Width = Right - Left;
		Height = oRect.height || Bottom - Top;
		this.setState({
			floatShowleft: Left,
			floatShowtop: Top,
			floatShowwidth: Width,
			floatShowbottom: Bottom,
			showname: shownamechange
		})
		var whethershow = 0;
		this.floatShowTime = setInterval(() => {
			whethershow++
			if (whethershow > 2) {
				this.setState({
					floatShow: "block"
				})
			}
		}, 200)
	}
	handleMouseLeave() {
		clearInterval(this.floatShowTime)
		this.setState({
			floatShow: "none"
		})
	}

	handleClickInput() {
		location.href = this.state.newurl
	}

	componentDidMount() {
		window.addEventListener('scroll', this.handleScroll.bind(this));
		//storeimg 替换 response
		getAjax("/brandbase", {}, (response) => {
			let _responsedatalength = response.data.length
			this.dataShowImgold = JSON.parse(JSON.stringify(response))
			this.dataShowImgoldchange = JSON.parse(JSON.stringify(response))
			let _responsekeylist = response.keys.length //存储keys
			var _list = []
			var _listold = []
			var _listkey = []
			var _listres = []
			if (_responsekeylist !== 0) {
				for (let k = 0; k < _responsekeylist; k++) {
					_listres.push(response.keys[k])
				}
				for (let i = 0; i < _responsedatalength; i++) {
					_listkey.push(response.data[i].brand)
					_listold.push(i)
						//					for(let k=0;k<_responsekeylist;k++){
						//						if(response.keys[k]==response.data[i].brand){
						//							_list.push(i)
						//						}
						//					}
				}
				for (let k = 0; k < _responsekeylist; k++) {
					let _haveindex = $.inArray(_listres[k], _listkey)
					if (_haveindex != -1) {
						_list.push(_haveindex)
					}
				}
				for (let i = 0; i < _responsedatalength; i++) {
					if ($.inArray(_listkey[i], _listres) == -1) {
						_list.push(i)
					}
				}
			} else {
				for (var i = 0; i < _responsedatalength; i++) {
					_list.push(i)
					_listold.push(i)
				}
			}
			this.imgshoworderold = _list
			let _dataShowImgold = this.dataShowImgold
			let _dataShowImgoldchange = this.dataShowImgoldchange
			for (let i = 0; i < _responsedatalength; i++) {
				let _imgshoworderoldindex = this.imgshoworderold[i]
				_dataShowImgold.data[i] = _dataShowImgoldchange.data[_imgshoworderoldindex]
					//发送字符串
				if (i < _responsedatalength - 1) {
					this._setimglist += _dataShowImgold.data[i].brand + ","
				} else {
					this._setimglist += _dataShowImgold.data[i].brand
				}
			}
			//			console.log(this._setimglist)
			this.dataShowImgoldstore = JSON.parse(JSON.stringify(_dataShowImgold))
				//获取原始排序数据
			this.setState({
				imgshoworder: _listold,
				dataShowImg: _dataShowImgold
			})
		})
	}
	render() {
		let _moveimgshow = this.state.moveimg == true ? "block" : "none"
		let _paixushow = this.state.moveimg == true ? "none" : "block"
		let _showwhethernav = this.state.contentshowwhether[0] == "block" ? "none" : "block"
		let _showwhetherchangenav = _showwhethernav == "block" ? "none" : "block"
			//是否显示是否有排序
		let _showwhetherchangenavfalse = this.state.showwhetherchangenavfalse
		let _carpartBodyTitleImgright = this.state.headtitlelist[0] == "" ? "" : this.state.headtitlelist[0]
		let _carpartBodyTitleImg = this.state.dataShowImg.title == undefined ? "" : 1 + "." + this.state.dataShowImg.title + ":"
		let _imgdata = this.state.dataShowImg.data.map((item, index) => {

			let _imgclickindex = this.state.imgclickindex == index ? "block" : "none"
			let _orderindex = this.state.imgshoworder[index]
			let _CarPartBodyImgBodyBackgroundColor = this.state.CarPartBodyImgBodyBackgroundColor == item.name ? "CarPartBodyImgBodyClick" : "CarPartBodyImgBody"
			return (
				<div key={index} 
					className={_CarPartBodyImgBodyBackgroundColor}
					onMouseDown = {this.moveClickMove.bind(this,_orderindex,index,item.img)}
					onMouseMove = {this.moveClickMove.bind(this,_orderindex,index,item.img)}
					onMouseUp = {this.moveClickEnd.bind(this)}
					onClick={this.handleClick.bind(this,index,item.uri,item.name,item.brand,item.keys,item.img)}>
					<div className="ImgMoveshow" style={{display:_imgclickindex}}></div>
					<img src={cdnHost + item.img} />
					<span>{item.name}</span>
				</div>
			)
		})

		let _carcontentbody = this.state.datatext.map((item, index) => {
			let showchangeindex = index
			let _showornot = this.state.showornot[showchangeindex] == 1 ? "block" : "none"
			let _datachange = this.state.datatext[showchangeindex]
			let _showwhether = this.state.contentshowwhether[showchangeindex + 1] == "block" ? "none" : "flex"
			let _showwhetherchange = _showwhether == "block" ? "none" : "block"
			let _titlelistshow = this.state.titlelist[index + 1] == undefined ? "" : index + 2 + "." + this.state.titlelist[index + 1] + ":"
			let _chancemessage = _titlelistshow
				//取余数和除数
			let _flootnum = parseInt(_datachange.length / 4)
			let _ceil = parseInt(_datachange.length % 4)
			let _ceilnum = _ceil == 0 ? (_flootnum) * 30 + "px" : (_flootnum + 1) * 30 + "px"

			let _carcontentbodycontent = _datachange.map((item, index) => {
				let _liBackGroundColorContent = this.state.liBackGroundColorContent[showchangeindex] == index ? "CarPartBodyImgBodyListHasClick" : "CarPartBodyImgBodyListHas"
				return ( < div key = {index}
							role = {item.uri}
							className = {_liBackGroundColorContent}
							onMouseEnter = {this.handleMouseEnter.bind(this, item.name)}
							onMouseLeave = {this.handleMouseLeave.bind(this)}
							onClick = {this.handleClickChange.bind(this, index, item.uri, item.auth, showchangeindex, item.name, item.keys)} 
							>
							<span>></span> 
							{item.name} 
						</div>
						)
					})
			return (
				<div key={index} className={this.state.classnamelist[index]} 
					style={{display:_showornot}} id={"to"+index}>
						<div className="CarPartBodyTitleContent" onClick={this.handleClickShow.bind(this,showchangeindex)}>
							<div className="CarpartBodyTitle">
								<span className="CarpartBodyTitleSpanFort">{_chancemessage}</span>
								<span className="CarpartBodyTitleSpan">{this.state.headtitlelistdelet[showchangeindex + 1]}</span>
							</div>
							<div></div>
							<div className="CarPartBodyTitleMessage" style={{display:_showwhetherchange}}>
									<span>展开</span>
									<img className="CarPartBodyTitleMessageImg" src={cdnHost+"/img/icon_down.png"} alt="img"></img>
							</div>
						</div>
						<div className="CarContentShow CarContentShowOther" style={{display:_showwhether,height:_ceilnum}}>{_carcontentbodycontent}</div>						
					</div>
			)
		})
		return (
			<div className="CarPartContentBody" ref="CarPartContentBody">
				<div className="CarpartBodyImg">
					<div className="CarpartBodyTitleSpanMove"
						onMouseEnter={this.moveImgEnter.bind(this,"Imgpaixu")}
						onMouseLeave={this.moveImgLeave.bind(this,"Imgpaixu")}
						onClick={this.moveClick.bind(this)}
						style={{display:_paixushow}}>
						<img src={this.state.imgchange[2]} className="Imgpaixu"/>
						<span>排序</span>
					</div>
				<div className="CarPartBodyTitleContent" onClick={this.handleClickShow.bind(this,-1)}>
					<div className="CarpartBodyTitle">
						<span className="CarpartBodyTitleSpanFort">{_carpartBodyTitleImg}</span>
						<span className="CarpartBodyTitleSpan">{_carpartBodyTitleImgright}</span>
					</div>
					<div></div>
					<div className="CarPartBodyTitleMessage" style={{display:_showwhetherchangenav}}>
						<div className="CarPartBodyTitleMessageOne">
							<span>展开</span>
							<img className="CarPartBodyTitleMessageImg" src={cdnHost + "/img/icon_down.png"} alt="img"></img>
						</div>
					</div>
				</div>
				<div className="CarContentShow CarContentShowFirst" style={{display:_showwhethernav}}>
					<div className="CarContentShowMove">
						<div className="CarContentShowMoveClick" style={{display:_moveimgshow}}>
							<div className="CarContentShowMoveClickBack"
								onMouseEnter={this.moveImgEnter.bind(this,"Imghuifu")}
								onMouseLeave={this.moveImgLeave.bind(this,"Imghuifu")}
								onClick={this.moveClickBack.bind(this)}>
							<img src={this.state.imgchange[0]} className="Imghuifu"/>
								恢复字母排序
								</div>
							<span>直接拖动照片可调整顺序</span>
							<div className="CarContentShowMoveClickOk"
								onMouseEnter={this.moveImgEnter.bind(this,"Imgbaocun")}
								onMouseLeave={this.moveImgLeave.bind(this,"Imgbaocun")}
								onClick={this.moveClickNo.bind(this)}>
							<img src={this.state.imgchange[1]} className="Imgbaocun"/>
								确认保存
							</div>
								<div className="CarpartBodyTitleSpanBack"
									onMouseEnter={this.moveImgEnter.bind(this,"Imgtuichu")}
									onMouseLeave={this.moveImgLeave.bind(this,"Imgtuichu")}
									onClick={this.moveClicktuichu.bind(this)}
									style={{display:_moveimgshow}}>
									<span>退出</span>	
								</div>
						</div>
						{_imgdata}
					</div>
				</div>
				</div>
				<div className="CarPartBodyContent">
					{_carcontentbody}
					<input type="button" 
						className="InquireCarContainerSureBtn" 
						style={{display:"none"}}
						onClick={this.handleClickInput.bind(this)}
						value="查看零件详情" / >
				</div>
					<div className="CarPartBodyImgBodyListHasFloat"
						style={{display:this.state.floatShow,left:this.state.floatShowleft+"px",bottom:this.state.floatShowbottom+"px",maxWidth:this.state.floatShowwidth+"px"}}>
						{this.state.showname}
					</div>
				<div className="whitchimgmove" style={{display:this.state.whitchmoveingshow,left:this.state.imgsetx+"px",top:this.state.imgsety+"px"}}>
					<img src={this.whitchmoveimg} />
				</div>
				<OkO 
				sentShow={this.state.sentshow}
				sentWho={this.state.sentwho}
				sentMessage={this.state.sentmessage}
				backmessage={this.backmessage.bind(this)}
				/>
				<FixedDiv isShow={this.state.titlelistchangeshow}/>
			</div>
		)
	}
}