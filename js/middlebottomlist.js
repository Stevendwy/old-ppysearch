import React, {Component} from 'react'
import MiddleBottomListItem from './middlebottomlistitem'
import PropTypes from 'prop-types'

export default class MiddleBottomList extends Component {
	
	constructor(props) {
		super(props)
	}
	
	render() {
		let _nodata = "initial"
		if (this.props.listData.length > 0) {
			_nodata = "none"
		}
		let _className = isNoPic ? "MiddleBottomListItemContainer isLowHeight" : "MiddleBottomListItemContainer"
		let _items = (

			this.props.listData.map((a, index) => {
				return (
					<div key={index} className={_className}>
						<MiddleBottomListItem
							imgUrl={a.img}
							title={a.name}
							auth={a.auth}
							uri={a.uri}
							index={index}
						/>
					</div>
				)
			})
		)
		return (
			<div className="MiddleBottomListContainer">
				{_items}
			</div>
		)
	}
}

MiddleBottomList.propTypes = {
	listData: PropTypes.array.isRequired
}
