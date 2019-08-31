import React, {Component} from 'react';
import './App.css';
import DisplayCar from './components/DisplayCar'
import ColorButtonList from './components/ColorButtonList'

export default class App extends Component {
  
  constructor(props) {
    super(props)
    this.state = {
      fullWidth: 0,
      fullHeight: 0,
      colors: ['rgb(255, 0, 0)', 'rgb(255, 255, 255)', 'rgb(49, 62, 195)'],
      currentColor: ''
    }
  }

  componentDidMount () {
    const root = document.getElementById('root')
    const width = root.clientWidth
    const height = root.clientHeight
    this.setState({
      fullWidth:width,
      fullHeight:height
    })

  }


  colorChoose = (color) => {
    this.setState({
      currentColor: color
    })
  }

  render () {
    const {fullWidth, fullHeight, colors, currentColor} = this.state
    return <div className="App" id="root">
      <DisplayCar fullWidth={fullWidth} fullHeight={fullHeight} currentColor={currentColor}/>
      <ColorButtonList colors={colors} colorChoose={this.colorChoose}/>
    </div>
  }
  
}
