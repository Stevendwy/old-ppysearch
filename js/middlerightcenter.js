import React, {Component} from 'react'
import {render} from 'react-dom'
import Sliders from './sliders'

import {middleEvents, sendEvent} from './eventmodel'
export default class MiddleRightTwo extends Component {
	constructor(props) {
		super(props)
		this.state = {
			
		}
		this.imgs = ['/img/p_3.jpg', '/img/p_1.jpg', '/img/p_2.jpg', '/img/p_3.jpg', '/img/p_1.jpg', ]
	}
	
	
	render() {
		return (
				<div className="NmiddleLeftListImgTwohas">
				<Sliders imgs={this.imgs} />
				</div>
			
		)
	}
}
