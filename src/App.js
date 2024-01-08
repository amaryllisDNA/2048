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
      coordinates : [[0,0,false],[0,1,false],[0,2,false],[0,3,false],[1,0,false],[1,1,false],[1,2,false],[1,3,false],[2,0,false],[2,1,false],[2,2,false],[2,3,false],[3,0,false],[3,1,false],[3,2,false],[3,3,false]], 
      gameStarted : false,
      slider : 'default', 
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
      if (!this.state.gameStarted){
      this.setState({gameStarted:true})
      this.newTile(this.state.values)
    }else {
      console.log("Game has already started. Ignoring Space key.");
    }
    

    } else if (this.state.gameStarted){
    if (event.keyCode ===37){
      this.slideTiles('left');
      this.mergeTiles(this.state.values,'left')
    } else if (event.keyCode ===39){
      this.slideTiles('right');
      this.mergeTiles(this.state.values,'right')
    } else if (event.keyCode ===38){
      this.slideTiles('up');
      this.mergeTiles(this.state.values,'up')
    } else if (event.keyCode ===40){
      this.slideTiles('down');
      this.mergeTiles(this.state.values,'down')
    }     
    console.log(this.state) 
    this.newTile(this.state.values) 
}
  } 
  
  slideTiles = (direction) =>{
    let newStateValues = [...this.state.values]
      if(direction === 'left' || direction === 'right'){
        for (let i=0; i<=3; i++){
        if (direction === 'left' ){
          for (let j=3; j>=0; j--){
            if(newStateValues[i][j]===undefined){
              newStateValues[i].splice(j, 1);
              newStateValues[i].push(undefined);
            }           
          }     
          console.log(newStateValues[i], newStateValues)     
        } else if (direction === 'right') {
        for (let j=0; j<=3; j++){
          if(newStateValues[i][j]===undefined){
            newStateValues[i].splice(j, 1);
            newStateValues[i].unshift(undefined)
            }
          }
      } } 
    }else if (direction === 'up' || direction ==='down'){
        for (let i = 0 ; i<= 3; i++){
          let sortArray = [newStateValues[0][i],newStateValues[1][i],newStateValues[2][i],newStateValues[3][i]]
          sortArray=sortArray.filter(value => value != undefined)
          if(direction ==='up'){
            while (sortArray.length<4){
              sortArray.push(undefined)
            }
            for (let j=0; j<=3; j++){
              newStateValues[j][i]=sortArray[j]
            }
          }
          if(direction ==='down'){
            while (sortArray.length<4){
              sortArray.unshift(undefined)
            }
            for (let j=0; j<=3; j++){
              newStateValues[j][i]=sortArray[j];
            }
          }
        
      } 
      
  }
 

    this.setState({slider : direction, values : newStateValues})
  }

  mergeTiles = (arr, direction)=> {
    let newArr=[...arr]
    if (direction === 'left' || direction ==='right'){
      for (let i=0; i<=3; i++){      
        if(direction ==='left'){
          for(let j=3; j>0;j--){
            if(arr[i][j]===arr[i][j-1] && arr[i][j]!==undefined){
              newArr[i][j-1]=arr[i][j]*2;
              newArr[i][j]=undefined; 
              j--
            }
          } 
    } else if (direction ==='right'){
      for(let j=0; j<3;j++){
        if(arr[i][j]===arr[i][j+1] && arr[i][j]!==undefined){
          newArr[i][j+1]=arr[i][j]*2;
          newArr[i][j]=undefined; 
          j++
        }
      } 
    }
  } 
 } else if (direction === 'up' || direction === 'down'){
  for (let i=0 ; i<=3; i++){
    if (direction === 'up'){
      for(let j=3; j>0;j--){
        if(arr[j][i]===arr[j-1][i] && arr[j][i]!==undefined){
          newArr[j-1][i]= arr[j][i]*2;
          newArr[j][i]=undefined;
          j--
        }
    }
  } else if (direction ==='down'){
    for (let j=0; j<3; j++){
      if (arr[j][i]===arr[j+1][i] && arr[j][i]!==undefined){
        newArr[j+1][i]=arr[j][i]*2;
        newArr[j][i]=undefined;
        j++
      }
    }
  }
 }       
    

  }}    

  newTile = (stateValues)=>{    
    let updatedValues=stateValues;
      let updateStateFree = []
      for(let i=0; i<=3; i++){
        for (let j=0; j<=3; j++){
          if(updatedValues[i][j]===undefined){
            updateStateFree.push([i,j])
          }
        }
      }  
    this.setState ({free:updateStateFree}, ()=>{
       if (updateStateFree.length===0){
        this.setState({obereParagraph : "No free tiles, game over !"})
    } else{
    const tileSelected = updateStateFree[Math.floor(Math.random()*updateStateFree.length)]
    const newValues = [...this.state.values];
    newValues[tileSelected[0]][tileSelected[1]]=2;
    updateStateFree = updateStateFree.filter(tile => !(tile[0]===tileSelected[0] && tile[1]===tileSelected[1]))
    this.setState ({values : newValues, free:updateStateFree})

    this.setState({obereParagraph :`Keep Going ! Tiles Free : ${updateStateFree.length}`})
      }
    })

   }
  

  
  render(){
    return(
      <div id="container">
      <div id="obereParagraph">{this.state.obereParagraph}</div>
        <div id="gameboard">{this.state.values.map((row,rowIndex) =>{
          return row.map((value, colIndex) => (
            <Square
              keys={`square${rowIndex}${colIndex}`}
              value = {value} />
          ))

        })}</div>
        <div id="direction-show">{this.state.slider}</div>
      </div>
    )
  }
}

export default App
