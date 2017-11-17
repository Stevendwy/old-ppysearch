import React, {
    Component
} from "react"
import FloatWindow from './floatwindow'
import PartDetail from './partdetail'
import PartList from './partlist'
import {
    listHeadtitle
} from './datetest'
export default class InquirePart extends Component {
    constructor(props) {
        super(props)
        this.state = {
            partDetailObj: {},
            partDetailDate: {},
            partlist: false,
            partdetail: <div />,
            showFloatWindow: false,
            dataShowImg: [],
            partlstdata: [],
            isShowList: false,
            backIsShow: "block",
            loadingShow: "none",
            value: ""
        }
        this.partCode = ""
        this.brand = ""
        this.toDetailObj = {}
        this.isLargeNumber = false
        this.image = ""
        this.length = 1
        this.cobyDate = []

    }

    submitClick(value, brand = "") {
        this.isLargeNumber = false
        value = value.replace(/[\r\n]/g, ",")
            // /\\,{2,}/
        this.partCode = value
            // if (value.indexOf(",") !== -1) {
            //     //多个零件
            //     this.isLargeNumber = true
            // }
            // console.log(value.length)
        if (value.length !== 0) {
            this.setState({
                loadingShow: "block"
            }, () => {
                this.testBrands(value, brand)
            })
        }

    }

    testBrands(part, brand = "") {
        let _this = this
        Model.submit({
            "parts": part,
            "brand": brand
        }, res => {
            this.setState({
                loadingShow: "none"
            })
            let brand = res.brand
            this.brand = brand
            this.image = res.img
            if (res.code == 1) {
                //有品牌进入零件列表页面或者进入零件详情页
                if (res.data.length > 1) {
                    this.isLargeNumber = true
                }
                _this.testContainerType(res)
            } else if (res.code == 6) {
                //选择零件平台再查询
                _this.setState({
                    dataShowImg: res.data,
                    showFloatWindow: true
                })
            } else if (res.code == 0) {
                this.isLargeNumber = true
                _this.testContainerType(res)
            }
        })
    }

    testContainerType(res) {
        if (!this.isLargeNumber) {
            let obj = {
                "detailshow": "block",
                "length": 1,
                "whitch": 1,
                "part": res.data[0].pid,
                "brand": this.brand
            }
            this.partData(obj)
        } else {
            let i = 0
            res.data.map((item, index) => {
                if (item.status) {
                    this.cobyDate[i] = item
                    i++
                }
            })
            this.length = this.cobyDate.length
            this.setState({
                partlist: true,
                partdetail: <div/>,
                loadingShow: "none"
            }, () => {
                this.setState({
                    backIsShow: "none",
                    isShowList: true,
                    partlstdata: res.data
                })
            })

        }
    }

    handleClick(chooseBrand) {
        let _this = this
        Model.submit({
            "parts": _this.partCode,
            "brand": chooseBrand
        }, res => {
            this.brand = chooseBrand
            if (res.data.length > 1) {
                this.isLargeNumber = true
            }
            _this.testContainerType(res)
            _this.setState({
                showFloatWindow: false
            })
        })
    }

    modal() {
        let dataShowImg = this.state.dataShowImg
        let modal = (
            <div className="brandsContainer">
                {
                    this.state.dataShowImg.map((item, index) => {
                        return (
                            <div key={index} className="brandsItem"  onClick={this.handleClick.bind(this,item.brand)}>
                                <img src={item.img} />
                                <span>{item.name}</span>
                            </div>
                        )
                    })
                }
            </div>
        )
        return modal
    }

    changePage(type, index) {
        index--
        this.setState({
            partdetail: <div className="search-loading"/>,
            isShowList: true
        }, () => {
            if (type == "next") {
                this.toDetail(this.cobyDate[index + 1].pid, index + 1 + 1)

            } else if (type == "pre") {
                this.toDetail(this.cobyDate[index - 1].pid, index - 1 + 1)
            }
        })
    }

    toDetail(partCode, index) {
        let _obj = {
            "detailshow": "block",
            "length": this.length,
            "whitch": index,
            "part": partCode,
            "brand": this.brand
        }

        this.partData(_obj)
            // this.setState({
            // partdetail: <PartDetail date={listHeadtitle}  obj={_obj} />
            // })
    }
    tohide() {
        this.setState({
            partdetail: <div/>,
            isShowList: true
        })
    }

    partData(_obj) {
        this.setState({
            partdetail: <div className="search-loading"/>
        }, () => {
            Model.listHead(_obj, res => {
                let _divtail = <PartDetail date={res}  obj={_obj} changePage={this.changePage.bind(this)} tohide={this.tohide.bind(this)} />
                let _divempty = <div className="search-loading"/>
                let _turediv = res.code == 0 ? _divempty : _divtail
                this.setState({
                    isShowList: false,
                    backIsShow: "none",
                    loadingShow: "none",
                    partdetail: _turediv
                })
            })
        })
    }

    componentWillMount() {
        if (params.replacecode) {
            this.submitClick(params.replacecode, params.brand)
        }
        if (params.part) {
            this.submitClick(params.part, "".brand)
        }
    }


    render() {
        let _partDetailObj = this.state.partDetailObj
        let _partDetailDate = this.state.partDetailDate
        let backIsShow = this.state.backIsShow
        let submitClick = this.submitClick.bind(this)
        let showFloatWindow = this.state.showFloatWindow
        let partdetail = this.state.partdetail
        let _loadingShow = this.state.loadingShow
        let partlist = this.state.partlist ? <PartList
                    partCode={this.partCode}
                    brand = {this.partBrand}
                    toDetail = {this.toDetail.bind(this)}
                    data = {this.state.partlstdata}
                    isShow = {this.state.isShowList}
                    image = {this.image}
                /> : <div/>
            // <PartDetail date={_partDetailDate}  obj={_partDetailObj} />
        return (
            <div className="container-inquire-part">
                <div className="container-left">
                    <div style={{display:backIsShow}} className="left-background" src={cdnHost+"/img/img_logo2.png"}/>
                    {partlist}
                    {/*<PartDetail obj={_partDetailObj} date={_partDetailDate} />*/}
                    {partdetail}
                    <div style={{display:_loadingShow}} className="search-loading"></div>
                </div>
                <Right submitClick={submitClick}/>
                 <FloatWindow
                    title="选择品牌"
                    img="/img/icon_san.png"
                    top="137px"
                    left="calc(50% - 314px)"
                    width="628px"
                    height="268px"
                    hiddenEvent={() => {this.setState({showFloatWindow: false})}}
                    show={showFloatWindow ? "block" : "none"}
                    content={this.modal()}/>
            </div>
        )
    }
}


class Right extends Component {

    constructor() {
        super()
        this.state = {
            historyData: [],
            value: ""
        }
    }
    historyClick(partCode, brand) {
        // this.props.historyClick(partCode)
        this.props.submitClick(partCode, brand)

    }

    componentDidMount() {
        Model.historyData(res => {
            this.setState({
                historyData: res.data
            })
        })
        if (params.replacecode) {
            this.setState({
                value: params.replacecode
            })
        }
        if (params.part) {
            this.setState({
                value: params.part
            })
        }
    }

    historyItems() {
        let historyData = this.state.historyData
        let histories = (
            historyData.map((item, index) => {
                if (index < 4) {
                    return (<div className="history-item" key={index} onClick={this.historyClick.bind(this,item[0],item[2])}>
                            <div className="history-item-code">{item[0]}</div>
                            <div className="history-item-brand">{item[1]}</div>
                        </div>)
                }

            })
        )
        return histories
    }

    inputChange(e) {
        // let value = e.target.value.replace(/[^\d\r\n]/g, "")
        let value = e.target.value
        this.setState({
            value: value.toLocaleUpperCase()
        })
    }

    inquireClick() {
        let value = this.refs.textarea.value.replace(/[\r\n]/, ",")
            // alert(value)
        this.props.submitClick(value)
    }

    render() {
        let inputChange = this.inputChange.bind(this)
        let inquireClick = this.inquireClick.bind(this)
        let value = this.state.value
        return (
            <div className="container-right">
                <span className="title">零件号查询</span>
                <textarea className="textarea"
                          ref="textarea"
                          value={value}
                          onChange={inputChange}/>
                <input className="inquire"
                       type="button"
                       defaultValue="查询"
                       onClick={inquireClick}/>
                <div className="remind">
                    *说明：<br/>
                    1. 最多支持5个零件同时查询；<br/>
                    2. 多个零件查询需换行，每行1个；<br/>
                    3.一次查询仅限一个品牌，不支持多品牌零件同时查询。<br/>
                </div>
                <span className="title">历史记录</span>
                <div className="container-histories">
                    {
                        this.historyItems()
                    }
                    <div className="histories-all" onClick={()=>{location.href="/histroy/parts?brand=all"}}>
                        <img src={cdnHost+"/img/icon_recentlyhistory.png"} alt="所有历史记录"/>
                        显示所有历史记录
                    </div>
                </div>
            </div>
        )
    }
}

class Model {
    static historyData(callback) {
        let url = "/search/parts"
        let obj = ""
        getAjax(url, obj, res => {
            callback(res)
        })
    }
    static submit(obj, callback) {
        let url = "/parts/search"
        postAjax(url, obj, res => {
            callback(res)
        }, true)
    }
    static listHead(obj, callback) {
        let url = "/ppys/partssearchs"
        getAjax(url, obj, res => {
            callback(res)
        }, true)
    }
    static partDetailDate(obj, callback) {
        let url = "/parts/search"
        getAjax(url, obj, res => {
            callback(res)
        })
    }
}