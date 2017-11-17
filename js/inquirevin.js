import React, {
	Component
} from 'react'
import MiddleLeft from './middleleft'
import MiddleRight from './middleright'
import MiddleBottom from './middlebottom'
import PartHistoryList from './parthistorylist'
import SearchError from './searchError.js'
import FixedHeadShow from './fixedheadshow'
import FixedDiv from './fixeddiv'
import FloatWindow from './floatwindow'
import {
	catchEvent,
	middleEvents
} from './eventmodel'

export default class InquireVIN extends Component {
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
			cid: "",
			imgname: "",
			likenessVin: "",
			toastShow: "none",
			toastMessage: "",
			backgroundColor: "#0D6FB8",
			inputVin: "",
			listShow: "none", //品牌列表是否显示
			imgsData: {
				data: []
			},
			titlelistchangeshow: "none",
			floatheadtitlelist: "",
			showFloatWindow: false,
			brandName: "",
			dataShowImg: [],
			backgroundButton: "#0d6fb8",
			errorMsg: "",
			chooseBrandsIndex: 0,
			placeholderText: "输入17位VIN车架号",
			eightVin: false,
			sevenVin: false,
			realVin: "",
			isEurope: false,
			showMum: false, //搜索菊花转
			showBackground: true,
			netError: false
		}
		this.toHistoryBrand = "all"
		this.inquireBrand = "all"
		this.inquireBrandVip = ""
		this.historyVIN = ""
		this.canInquire = true
		this.logoHeight = bodyHeight - 225;
		this.generalBrands = ["所有品牌", "宝马", "捷豹", "路虎", "玛莎拉蒂"]
		this.codeBrands = ['all', 'bmw', 'jaguar', 'land_rover', 'maserati']
		this.choosedBrandIndex = 0 //选中的品牌序号，用于处理是否需要查询显示在上方的提示内容
	}

	handleScroll() {
		if (this.state.show) {
			let scrolltop = document.body.scrollTop
			if (scrolltop > 200) {
				this.setState({
					titlelistchangeshow: "block",
					floatheadtitlelist: this.state.realVin + "_" + this.state.vins.slice(0, -3)
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
			/**
			 * @param {{showZoneSearchInput: object}} this.refs
			 */
		$(this.refs.showZoneSearchInput).focus()
		catchEvent(middleEvents.topItemClick, e => {
			if (e.info.type === "vin") {
				this.reSet()
			}
		})

		getAjax("/brandbase", {}, (response) => {
			this.setState({
				dataShowImg: response.data
			})
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
		let _value = this.refs.showZoneSearchInput.value
		this.refs.showZoneSearchInput.value = _value.replace(/\W/g, "")
		this.handleValue()
	}

	handleValue(isInitial = false) { //isInitial判断是不是初始化，input内容处理
		let _value = this.refs.showZoneSearchInput.value.toLocaleUpperCase()
		let _length = _value.length
		if (!this.canInquire) this.enableInquire()

		let _search = this.search.bind(this)
		let _getHistory = this.getHistory.bind(this)
		let _inquire = this.inquire.bind(this)
		let _remind = this.state.remind
		let _closeHistory = this.closeHistory.bind(this)

		if (_length === 17) {
			if (isInitial) _inquire()
			_closeHistory()
		}
		if (_length === 1 || _length === 2 || _length === 3 || _length === 4 || _length === 7 || _length === 10 || _length === 17) {
			if (_length !== 17) _getHistory()
			_search()
		} else if (_length === 9) _search()
		else if (_length < 1) {
			_remind = ""
			if (!isInitial) _getHistory()
		} else if (_length > 17) {
			//			_remind = "已满17位车架号"
			setTimeout(() => {
					this.refs.showZoneSearchInput.value = _value.substr(0, 17)
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
		let _vin = this.refs.showZoneSearchInput.value
		let _obj = {
			vin: _vin ? _vin : "",
			brands: this.inquireBrand
		}
		$('#searching').show();
		getAjax(_url, _obj, response => {
			this.setState({
				historys: response.data,
				isShow: response.data.length > 0

			})
			$('#searching').hide();
		})
	}

	search() { //自动搜索，蓝色文字内容
		if (this.choosedBrandIndex !== 0) return
		let _vin = this.refs.showZoneSearchInput.value.slice(0, 17)
		let _url = "/parse/vins"
		let _obj = {
			vin: _vin
		}
		$('#searching').show();
		getAjax(_url, _obj, response => {
			/**
			 * @param {{brandname: string}} response
			 */
			this.setState({
				remind: response.data,
				name: response.brandname.length > 0 ? response.brandname : "选择品牌"
			})
			$('#searching').hide();
		})
	}

	brandSelected(brandname, brand) { //品牌列表点击
		if (this.inquireBrand === brand) return
		this.state.name = brandname
		this.inquireBrand = brand
		this.historyVIN = "" //改变品牌，这里修改保存的vin用来避免当做已查询处理
		this.enableInquire()
		this.setState({
			inputVin: this.refs.showZoneSearchInput.value
		})
	}

	inquire(item) { //VIN查询
		this.setState({
			inputVin: this.refs.showZoneSearchInput.value
		})
		item = this.refs.showZoneSearchInput.value
		if (item === "") return
		this.setState({
			isShow: false
		})
		let _value = this.refs.showZoneSearchInput.value

		if (_value.length < 1) {
			this.showToast("没有输入VIN车架号")
			return
		}

		if (item) _value = item
		else {
			if (_value === this.historyVIN) {
				this.setState({
					toastShow: "flex",
					toastMessage: "已显示对应结果",
					backgroundColor: "#999"
				}, () => this.canInquire = false)
				return
			}
		}

		this.historyVIN = _value

		this.setState({ //先隐藏掉下面内容
			show: false,
			showBackground: false,
			toastShow: "none",
			inputVin: this.refs.showZoneSearchInput.value
		})

		this.closeHistory()
		let _url = "/ppyvin/searchvins"
		let _obj = {
			vin: _value,
			brands: this.inquireBrandVip === '' ? this.inquireBrand : this.inquireBrandVip,
		}
		let _this = this
		if (this.state.eightVin) {
			if (_obj.vin.length !== 8 && _obj.vin.length !== 17) {
				this.setState({
					errorMsg: "抱歉，您输入的车架号不是<span>8</span>或<span>17</span>位。",
					toastShow: "block"
				})
				return;
			}
		} else if (this.state.sevenVin) {
			if (_obj.vin.length !== 7 && _obj.vin.length !== 17) {
				this.setState({
					errorMsg: "抱歉，您输入的车架号不是<span>7</span>或<span>17</span>位。",
					toastShow: "block"
				})
				return;
			}
		} else if (_obj.vin.length < 17) {
			this.setState({
				errorMsg: "抱歉，您输入的车架号不足<span>17</span>位。",
				toastShow: "block"
			})
			return;
		}

		this.setState({
			showMum: true
		})
		getAjax(_url, _obj, data => {
			if (data.code == 9) {
				_this.setState({
					errorMsg: data.msg,
					toastShow: "block",
					showMum: false
				})
			} else {
				if (data.code === 3) {
					// console.log("runing")
					_this.setState({
						likenessVin: data.vins,
						errorMsg: "抱歉,没有找到相关信息。<br/>.是否需要查询<span style='cursor:default;text-decoration:none'>" + data.vins + "</span>",
						toastShow: "block",
						showMum: false,
						netError: false
					})
					return
				} else if (data.code == 0) {
					_this.setState({
						errorMsg: "网络异常。",
						toastShow: "block",
						netError: true,
						likenessVin: "",
						showMum: false
					})
					return
				} else if (data.code == 2) {
					_this.setState({
						errorMsg: "抱歉，没有找到相关信息。",
						toastShow: "block",
						netError: false,
						likenessVin: "",
						showMum: false
					})
					return
				}
				_this.setState({
					showMum: false
				})
				_this.inquireBrandVip = "";
				let msg = "";
				let brandName = ""
				if (_this.inquireBrand !== "all") {
					switch (_this.inquireBrand) {
						case "jaguar":
							brandName = "捷豹"
							break;
						case "bmw":
							brandName = "宝马"
							break;
						case "land_rover":
							brandName = "路虎"
							break;
						case "maserati":
							brandName = "玛莎拉蒂"
					}
					msg = "在" + brandName + "品牌中,"
				}
				_this.setState({
					errorMsg: "抱歉，" + msg + "没有找到与<span>" + _obj.vin + "</span>相关的信息."
				})
				if (data.code === 4001) {
					if (!_this.state.eightVin && !_this.state.sevenVin) {
						_this.setState({
							showFloatWindow: true,
							toastShow: "none",
						})
					} else {
						data.brand = "bmw";
						getAjax("/ppyvin/vingroup", "code=" + data.brand + "&vin=" + _obj.vin, respon => {
							_this.setState({
								imgsData: respon,
								remind: ""
							}, () => _this.disableInquire())
						})
					}
				} else if (data.code === 1) {
					/**
					 * @param {{imglogo: string}} data
					 */
					_this.setState({
						imgUrl: data.imglogo,
						vins: data.vins,
						realVin: data.vin,
						infoData: data,
						name: data.name,
						cid: data.cid,
						show: true,
						imgname: data.imgname,
						toastShow: "none"
					})
					getAjax("/ppyvin/vingroup", "code=" + data.brand + "&vin=" + data.vin, respon => {
						isNoPic = data.brand === "bullstuff"
						_this.setState({
							imgsData: respon,
							isEurope: respon.data.length === 0,
							remind: "",
							brandName: data.brand

						}, () => _this.disableInquire())
					})
				}
				// else if (data.code === 2) location.href = "/logout"
				else if (data.code === 4001) _this.setState({
					listShow: "block"
				}, () => _this.showToast(data.msg))
				else {
					_this.showToast(data.msg)
				}
			}
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
		location.href = this.state.imgsData.data[0].uri + "&index=0"
	}

	chooseItem(item) { //点击历史记录
		//		if() this.inquireBrand = name
		this.setState({
			inputValue: item,
			isShow: false,
			length: item.length,
			remind: ""
		}, () => {
			this.inquire()
			this.search()
		})
	}

	deleteItem(item) { //删除历史记录
		let _url = "/search/calloff"
		let _obj = {
			vin: item,
			off: false
		}
		$('#searching').show();
		getAjax(_url, _obj, () => {
			let _historys = this.state.historys
			for (let i = 0; i < _historys.length; i++) {
				let history = _historys[i]
				if (history[0] === item) {
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
			length: 0,
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
			},
			titlelistchangeshow: "none",
			floatheadtitlelist: "",
			showFloatWindow: false,
			backgroundButton: "#0d6fb8",
			errorMsg: ""
		})
		$(this.refs.showZoneSearchInput).focus()
	}

	listHeaderClick() { //品牌列表头部点击
		let _listShow = "none"
		if (this.state.listShow === "none") _listShow = "block"
		this.setState({
			listShow: _listShow
		})
	}

	cobyBodyClick() {
		if (this.state.listShow === "block") this.setState({
			listShow: "none"
		})
	}

	handleClick(brands) {
		let _brands = brands.split("=");
		this.inquireBrandVip = _brands[1]
		this.setState({
			showFloatWindow: false
		})
		this.inquire()
	}

	toSearch(vins) {
		// console.log(vin)
		// console.log(vins)
		if (vins) {
			this.setState({
				inputValue: vins
			}, () => {
				this.inquire()
			})
		} else {
			this.inquire()

		}


	}

	choosedBrands(index) {
		this.choosedBrandIndex = index
		this.inquireBrand = this.codeBrands[index]
		this.toHistoryBrand = this.codeBrands[index]
		this.clear()
		this.refs.showZoneSearchInput.focus()
		if (index === 3) {
			this.setState({
				placeholderText: "输入后8位车架号",
				eightVin: true,
				sevenVin: false,
				chooseBrandsIndex: index
			})
		} else if (index === 1 || index === 2 || index === 4) {
			this.setState({
				placeholderText: "输入后7位车架号",
				sevenVin: true,
				eightVin: false,
				chooseBrandsIndex: index
			})
		} else {
			this.setState({
				placeholderText: "输入17位VIN车架号",
				eightVin: false,
				sevenVin: false,
				chooseBrandsIndex: index
			})
		}
	}

	//意见反馈
	feedBackClick() {
		$('.FeedBackButton').click()
	}

	render() {
		let _inputVin = this.state.inputVin
		let _remind = this.state.remind
		let _length = this.state.length
		let _change = this.change.bind(this)
		let _leftImgUrl = this.state.imgUrl
		let _rightData = this.state.infoData
		let _inquire = this.inquire.bind(this, _inputVin)
		let _vins = this.state.vins
		let _detail = this.detail.bind(this)
		let _show = this.state.show
		let _showBackground = this.state.showBackground
		let _chooseItem = this.chooseItem.bind(this)
		let _deleteItem = this.deleteItem.bind(this)
		let _closeHistory = this.closeHistory.bind(this)
		let _historys = this.state.historys
		let _isShow = this.state.isShow
		let _inputValue = this.state.inputValue
		let _imgname = this.state.imgname
		let _linkType = "/histroy/vins?brand=" + this.toHistoryBrand
		let _clear = this.clear.bind(this)
		let _showClear = _length > 0 ? "block" : "none"
		let _toastShow = this.state.toastShow
		let _errorMsg = this.state.errorMsg
		let _bottomListData = this.state.imgsData.data //数组
		let _backgroundButton = this.state.backgroundButton
		let _showFloatWindow = this.state.showFloatWindow
		let _logoHeight = this.logoHeight
		let _realVin = this.state.realVin
		let _isEurope = this.state.isEurope
		let _brandName = this.state.brandName
		let _cid = this.state.cid
		let _placeholderText = this.state.placeholderText
		let _otherSearchError = <div className="otherSearchError">
			抱歉，零零汽暂不提供此车零件组信息
		</div>
		let _isEuropeContainer = _isEurope ? _otherSearchError : <MiddleBottom listData={_bottomListData} vin={_realVin} vins={_vins} cid={_cid} brandName={_brandName}/>

		let _modal = <div className="brandsContainer">
			{
				this.state.dataShowImg.map((item, index) => {
					return (
						<div key={index} className="brandsItem" onClick={this.handleClick.bind(this,item.uri)}>
							<img src={cdnHost + item.img} />
							<span>{item.name}</span>
						</div>
					)
				})
			}
		</div>
		let _chooseItemContainer = <div className="chooseBrandItem">
				{
					this.generalBrands.map((item,index)=>{
						let srcs= index === this.state.chooseBrandsIndex ? "/img/Pay/choose.png" : "/img/Pay/unchoose.png"
						return(
							<div key={index} onClick={this.choosedBrands.bind(this,index)}>
								<img src={cdnHost + srcs} />
								<span>{item}</span>
							</div>
						)
					})
				}
		</div>

		return (
			<div className="InquireVINContainer" onClick={this.cobyBodyClick.bind(this)}>
				<div className="toBlackBorder" style={{display:this.state.titlelistchangeshow}}>
					<FixedHeadShow showMessage={this.state.floatheadtitlelist} whetherShow={this.state.titlelistchangeshow}/>
					<FixedDiv  isShow={this.state.titlelistchangeshow}/>
				</div>
			<div className="ShowZoneSearchContainerBackground" />
				<div className="ShowZoneSearchContainer">
					<div className="ShowZoneSearchRemind">{_remind}</div>
					<input ref="showZoneSearchInput" className="ShowZoneSearchInput" placeholder={_placeholderText}
						value={_inputValue}
						onClick={() => {if(_inputValue.length < 1) this.getHistory()}}
						onChange={_change}
						onKeyPress={e => {
							let _keyCode = e.which || e.keyCode
							// if (_keyCode == 13 && isPart==false) _inquire()
							if (_keyCode === 13) _inquire()
						}}/>
					{_chooseItemContainer}
					<FloatWindow
							title="选择品牌"
							img="/img/icon_san.png"
							top="137px"
							left="calc(50% - 314px)"
							width="628px"
							height="268px"
							hiddenEvent={() => {this.setState({showFloatWindow: false})}}
							show={_showFloatWindow ? "block" : "none"}
							content={_modal}/>
					<button className="ShowZoneSearchButton"
						onClick={_inquire}
						style={{background:_backgroundButton}}
						onMouseDown={()=>{
							this.setState({
								backgroundButton:"#0D6FB8"
							})}
						}
						onMouseEnter={()=>{
							this.setState({
								backgroundButton:"#2687D0"
							})
						}}
						onMouseUp={()=>{
							this.setState({
								backgroundButton:"#2687D0"
							})
						}}
						onMouseLeave={()=>{
							this.setState({
								backgroundButton:"#0D6FB8"
							})
						}}>VIN查询</button>
					<img className="ShowZoneSearchClearButton" src={cdnHost+"/img/icon_shancu.png"} onClick={_clear} style={{display: _showClear}}/>
					<div className="ShowZoneSearchLength">{_length === 0 ? "" : _length}</div>
					<PartHistoryList
						arr = {_historys}
				    	chooseItem = {_chooseItem}
				    	deleItem = {_deleteItem}
				   		isShow={_isShow}
				   		closeHistory={_closeHistory}
				   		linkType={_linkType}/>
				</div>

				<div className="MiddleContentContainer">
					<div className="MiddleContentBackground" style={{display: _showBackground ? "block" : "none", height:_logoHeight+"px"}} />
					<div className="MiddleContentMum" style={{display: this.state.showMum ? "block" : "none"}} />
					<div className="MiddleContentHead"  style={{opacity: _show ? "1" : "0",height: _show ?"auto":"0"}}>
						<div className="MiddleHeadCenter">
							<span  onClick={this.detail.bind(this)}>
								<span style={{textDecoration: _isEurope ? "none" : "underline",cursor:  _isEurope ? "default" : "pointer"}}>{_realVin}</span>
								<span style={{textDecoration: _isEurope ? "none" : "underline",cursor:  _isEurope ? "default" : "pointer"}}>{"_"+_vins.slice(0,-4)+"_零件组"}</span>
							</span>
						</div>
					</div>
					<div className="MiddleContent" style={{opacity: _show ? "1" : "0",display: _show ?"block":"none"}}>
						<MiddleLeft imgUrl={_leftImgUrl} vins={_vins} remind={_imgname} imgClick={_detail}/>
						<MiddleRight data={_rightData} />
						{_isEuropeContainer}
					</div>
					<div className="loadingContainer" style={{height:_logoHeight+"px"}} />
				</div>
				<button className="InquireVINDetailContainer" style={{display: "none"}} onClick={_detail}>查看零件详情</button>
				<div className="ErrorContainer"  style={{display:_toastShow}}>
					<SearchError
						serachIsShow = {_toastShow}
						code = {_errorMsg}
						reSearch = {this.reSet.bind(this)}
						reMoveSearch = {this.inquire.bind(this,_inputValue)}
						height={"auto"}
						toSearch = {this.toSearch.bind(this)}
						likenessVin = {this.state.likenessVin}
						netError = {this.state.netError}
					/>
				</div>
			</div>
		)
	}
}