import React, {Component} from 'react'
import './ColorButtonList.scss'

export default class ColorButtonList extends Component {
    constructor (props) {
        super(props)
        this.state = {

        }
    }


    render() {
        return <div className='button-list'>
            <ul className='button-list-ul'>
            {
                this.props.colors.map(color => {
                    return <li style={{backgroundColor: color + ''}} onClick={() => {this.props.colorChoose(color)}}></li>
                })
            }
            </ul>
        </div>
    }
}