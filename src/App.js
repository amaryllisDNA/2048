import React, {Component} from "react"
import {render} from "react-dom"
import './App.css';

class Square extends Component {
  constructor(props){
    super(props);
    this.state = {
      value : undefined}}
    render(){
      return(
        <div className="square">{this.props.value}</div>
      )
    }
}

class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      values :[[undefined,undefined,undefined,undefined],[undefined,undefined,undefined,undefined],[undefined,undefined,undefined,undefined],[undefined,undefined,undefined,undefined]],
      free : [[0,0],[0,1],[0,2],[0,3],[1,0],[1,1],[1,2],[1,3],[2,0],[2,1],[2,2],[2,3],[3,0],[3,1],[3,2],[3,3]],
      gameStarted : false,
      obereParagraph :"Press 'Space' to play",
      stateReseter : {
        values :[[undefined,undefined,undefined,undefined],[undefined,undefined,undefined,undefined],[undefined,undefined,undefined,undefined],[undefined,undefined,undefined,undefined]],
        free : [[0,0],[0,1],[0,2],[0,3],[1,0],[1,1],[1,2],[1,3],[2,0],[2,1],[2,2],[2,3],[3,0],[3,1],[3,2],[3,3]],
        gameStarted : false,
        obereParagraph :"Press 'Space' to play",
      }
    }
  }

  componentDidMount(){
    document.addEventListener("keydown", this.handleKeyDown)
  }
  componentWillUnmount(){
    document.removeEventListener("keydown", this.handleKeyDown)
  }

  handleKeyDown = (event)=>{
    if(event.keyCode ===32){
      this.newTile()
    }  
  }

  newTile = ()=>{
    if(!this.state.gameStarted){
      let newFree = [...this.state.free];
      if (newFree.length===0){
        this.setState({obereParagraph : "No free tiles, game over !"})
      } else {
        const tileSelected = newFree[Math.floor(Math.random()*newFree.length)]
        const newValues = [...this.state.values];
        newValues[tileSelected[0]][tileSelected[1]]=2;
        newFree = newFree.filter(tile => !(tile[0]===tileSelected[0] && tile[1]===tileSelected[1]))
        this.setState ({values : newValues, free:newFree})
        this.setState({obereParagraph :`Keep Going ! Tiles Free : ${newFree.length}`})
      }
    }
  }
  render(){
    return(
      <div id="container">
        <div >{this.state.values}</div>
      <div id="obereParagraph">{this.state.obereParagraph}</div>
        <div id="gameboard">{this.state.values.map((row,rowIndex) =>{
          return row.map((value, colIndex) => (
            <Square
              keys={`square${rowIndex}${colIndex}`}
              value = {value} />
          ))

        })}</div>
      </div>
    )
  }
}

export default App
