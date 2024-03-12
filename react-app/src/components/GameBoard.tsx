import React, {useState} from 'react'
import Tile from './Tile'
import './gameboard.css'
import Blocks from './Blocks'
import PopUp from './PopUp';

interface GameBoardProps {
  rows: number;
  cols: number; 
  size: string;
  defaultScore: number;
}


class GameBoard extends React.Component<GameBoardProps>{
  state = {
    colors: Array.from({ length: this.props.rows * this.props.cols }, () => "#edede9"),
    blocks: Array.from({ length: this.props.rows * this.props.cols }, ()=>false),
    selectedBlock: 'none',
    score: 0,
    partialWin: 1,
    currentBlocks: [],
    currentNames: [],
    showPopUp: false
  };

  changeBlock = (newValue: string) => {
    this.setState({ selectedBlock: newValue });
  };
  is_free(indexes: number[]){
    const { blocks } = this.state;
    let b = [... blocks];
    for(let i=0;i<indexes.length;i++){
      if(b[indexes[i]]){
        return false;
      }
    }
    return true;
  }

  rowIsFull(row: number, x: boolean[]) {
    for (let i = row*this.props.cols; i < (1+row)*this.props.cols; i++) {
      // console.log(row, i, x[i]);
      if (!x[i]) {
        return false;
      }
    }
    return true;
  }
  colIsFull(col: number, x: boolean[]) {
    
    for (let i = 0; i < this.props.rows; i++) {
      // console.log(col, i, x[i]);
      let aux = i* this.props.rows+ col;
      //console.log(aux);
      if (!x[aux]) {
        return false;
      }
    }
    return true;
  }
  
  emptyRows(newBlocks: boolean[], newColors: string[],  y: number[]){
    for(let i=0;i<y.length;i++){
        //empty the row
        let row = y[i];
        
        for (let i = row*this.props.cols; i < (1+row)*this.props.cols; i++) {
          newColors[i]="#edede9";
          newBlocks[i]=false;
          
        
      }
    }
  }
  callForRows(newBlocks: boolean[],  y: number[]){
    let cntScor2=0;
    let actrows = [];
    for(let i=0;i<y.length;i++){
      if(this.rowIsFull(y[i], newBlocks)){
        // console.log(y[i], "rowIsfull");
        cntScor2+= this.props.defaultScore;
        actrows.push(y[i]);
      }
      
    }
    return {cntScor2, actrows};
  }
  
  emptyCols(newBlocks: boolean[], newColors: string[],  y: number[]){
    for(let i=0;i<y.length;i++){
        //empty the column
        let col = y[i];
        
        for (let j = 0; j < this.props.rows; j++) {
          let aux = j* this.props.rows+ col;
          //console.log(aux);
          newColors[aux]="#edede9";
          newBlocks[aux]=false;
        
      }
    }
  }

  callForCols(newBlocks: boolean[],  y: number[]){
    let cntScor1 = 0;
    let actcols = [];
    for(let i=0;i<y.length;i++){
      if(this.colIsFull(y[i], newBlocks)){
        // console.log(y[i], "colIsfull");
        actcols.push(y[i]);
        cntScor1+= this.props.defaultScore;
      }
    }
    return {cntScor1,actcols};

  }
  checkBoardRows(newBlocks: boolean[]){
    let cntScor2=0;
    let actrows = [];
    for(let i=0;i<this.props.rows;i++){
      if(this.rowIsFull(i, newBlocks)){
        // console.log(i, "rowIsfull");
        cntScor2+= this.props.defaultScore;
        actrows.push(i);
      }
      
    }
    return {cntScor2, actrows};
  }
  
  checkBoardCols(newBlocks: boolean[]){
    let cntScor1 = 0;
    let actcols = [];
    for(let i=0;i<this.props.cols;i++){
      if(this.colIsFull(i, newBlocks)){
        // console.log(i, "colIsfull");
        actcols.push(i);
        cntScor1+= this.props.defaultScore;
      }
    }
    return {cntScor1,actcols};
  }
  handleTileClick(index: number){
    const mycolors = ["#9b2226", "#ae2012", "#bb3e03", "#ca6702", "#ee9b00", "#0a9396", "#005f73", "#3a0ca3", "#491a74","#b4418e", "#d94a8c"];
    
    const { colors, blocks, selectedBlock, score, currentBlocks, currentNames } = this.state;
    let newColors = [...colors];
    let newBlocks = [... blocks];
    let newCurrentBlocks = [... currentBlocks];
    let newCurrentNames : string[] = [... currentNames];
    let possibleWinRows : number[] =[];
    let possibleWinCols : number[] =[];
    switch(selectedBlock){
      case 'none': newColors =  [...colors]; break;
      case 'Square' : (()=>{
                      let currentBlockIndex = newCurrentNames.indexOf("Square");
                      if(currentBlockIndex!= -1){
                      const indexes = [index, index+1, index+this.props.cols, index+this.props.cols+1];
                      if(index%this.props.cols<this.props.cols-1 
                        && index/this.props.rows<this.props.rows-1
                        && this.is_free(indexes)){
                          newCurrentBlocks.splice(currentBlockIndex, 1);
          newCurrentNames.splice(currentBlockIndex, 1);
                          possibleWinRows = [Math.floor(index/ this.props.cols), Math.floor((index+this.props.cols)/ this.props.cols)];
                          possibleWinCols = [index % this.props.rows, (index+1)% this.props.rows];
                          // console.log(possibleWinCols);
                          // console.log(possibleWinRows);
                        for(let i=0;i<indexes.length;i++){
                          newColors[indexes[i]]=mycolors[0];
                          newBlocks[indexes[i]] = true;
                        }
                        
                      }}})(); break;
      case 'BigSquare' : (()=>{
        let currentBlockIndex = newCurrentNames.indexOf("BigSquare");
        if(currentBlockIndex!= -1){
                        const indexes = [index, index+1, index+2, index+this.props.cols, index+this.props.cols+1, index+this.props.cols+2
                        , index+2*this.props.cols, index+2*this.props.cols+1, index+2*this.props.cols+2];
                        if(index%this.props.cols<this.props.cols-2 
                          && index/this.props.rows<this.props.rows-2
                          && this.is_free(indexes)){
                            newCurrentBlocks.splice(currentBlockIndex, 1);
          newCurrentNames.splice(currentBlockIndex, 1);
                            possibleWinRows = [Math.floor(index/ this.props.cols), Math.floor((index+this.props.cols)/ this.props.cols), Math.floor((index+2*this.props.cols)/ this.props.cols)];
                            possibleWinCols = [index % this.props.rows, (index+1)% this.props.rows, (index+2)% this.props.rows];
                            // console.log(possibleWinCols);
                            // console.log(possibleWinRows);
                          for(let i=0;i<indexes.length;i++){
                            newColors[indexes[i]]=mycolors[8];
                            newBlocks[indexes[i]] = true;
                          }
                          
                        }}})(); break;
      case 'BigV' : (()=>{
        let currentBlockIndex = newCurrentNames.indexOf("BigV");
        if(currentBlockIndex!= -1){
                          const indexes = [index, index+this.props.cols, index+2*this.props.cols, index+2*this.props.cols-1, index+2*this.props.cols-2];
                          if(index%this.props.cols<this.props.cols &&index%this.props.cols>1 
                            && index/this.props.rows<this.props.rows-2
                            && this.is_free(indexes)){
                              newCurrentBlocks.splice(currentBlockIndex, 1);
          newCurrentNames.splice(currentBlockIndex, 1);
                              possibleWinRows = [Math.floor(index/ this.props.cols), Math.floor((index+this.props.cols)/ this.props.cols), Math.floor((index+2*this.props.cols)/ this.props.cols)];
                              possibleWinCols = [index % this.props.rows, (index-1)% this.props.rows, (index-2)% this.props.rows];
                              // console.log(possibleWinCols);
                              // console.log(possibleWinRows);
                            for(let i=0;i<indexes.length;i++){
                              newColors[indexes[i]]=mycolors[9];
                              newBlocks[indexes[i]] = true;
                            }
                            
                          }}})(); break;
      case 'BigV2' : (()=>{
        let currentBlockIndex = newCurrentNames.indexOf("BigV2");
        if(currentBlockIndex!= -1){
                            const indexes = [index, index+this.props.cols, index+2*this.props.cols, index+2*this.props.cols+1, index+2*this.props.cols+2];
                            if(index%this.props.cols<this.props.cols-2 
                              && index/this.props.rows<this.props.rows-2
                              && this.is_free(indexes)){
                                newCurrentBlocks.splice(currentBlockIndex, 1);
          newCurrentNames.splice(currentBlockIndex, 1);
                                possibleWinRows = [Math.floor(index/ this.props.cols), Math.floor((index+this.props.cols)/ this.props.cols), Math.floor((index+2*this.props.cols)/ this.props.cols)];
                                possibleWinCols = [index % this.props.rows, (index+1)% this.props.rows, (index+2)% this.props.rows];
                                // console.log(possibleWinCols);
                                // console.log(possibleWinRows);
                              for(let i=0;i<indexes.length;i++){
                                newColors[indexes[i]]=mycolors[10];
                                newBlocks[indexes[i]] = true;
                              }
                              
                            }}})(); break;
      case 'VBlock': (()=>{
        let currentBlockIndex = newCurrentNames.indexOf("VBlock");
        if(currentBlockIndex!= -1){
        const indexes = [index, index+1, index+this.props.cols];
        if(index%this.props.cols<this.props.cols-1 
          && index/this.props.rows<this.props.rows-1 
          && this.is_free(indexes)){
            newCurrentBlocks.splice(currentBlockIndex, 1);
          newCurrentNames.splice(currentBlockIndex, 1);
            possibleWinRows = [Math.floor(index/ this.props.cols), Math.floor((index+this.props.cols)/ this.props.cols)];
            possibleWinCols = [index % this.props.rows, (index+1)% this.props.rows];
            // console.log(possibleWinCols);
            // console.log(possibleWinRows);
          for(let i=0;i<indexes.length;i++){
            newColors[indexes[i]]=mycolors[2];
            newBlocks[indexes[i]] = true;
          }
          }}})(); break;
      case 'VBlock2': (()=>{
        let currentBlockIndex = newCurrentNames.indexOf("VBlock2");
        if(currentBlockIndex!= -1){
            const indexes = [index, index+this.props.cols, index+this.props.cols-1];
            if(index%this.props.cols<this.props.cols
              && index/this.props.rows<this.props.rows-1 
              && this.is_free(indexes)){
                newCurrentBlocks.splice(currentBlockIndex, 1);
          newCurrentNames.splice(currentBlockIndex, 1);
                possibleWinRows = [Math.floor(index/ this.props.cols), Math.floor((index+this.props.cols)/ this.props.cols)];
                possibleWinCols = [index % this.props.rows, (index+1)% this.props.rows];
                // console.log(possibleWinCols);
                // console.log(possibleWinRows);
              for(let i=0;i<indexes.length;i++){
                newColors[indexes[i]]=mycolors[6];
                newBlocks[indexes[i]] = true;
              }
              }}})(); break;
      case 'LBlock': (()=>{
        let currentBlockIndex = newCurrentNames.indexOf("LBlock");
        if(currentBlockIndex!= -1){
            const indexes = [index, index+1, index+2, index+this.props.cols+2];
            if(index%this.props.cols<this.props.cols-2 && 
                index/this.props.rows<this.props.rows-1 &&
               this.is_free(indexes)){
                newCurrentBlocks.splice(currentBlockIndex, 1);
          newCurrentNames.splice(currentBlockIndex, 1);
                possibleWinRows = [Math.floor(index/ this.props.cols), Math.floor((index+this.props.cols)/ this.props.cols)];
                possibleWinCols = [index % this.props.rows, (index+1)% this.props.rows, (index+2)% this.props.rows];
                // console.log(possibleWinCols);
                // console.log(possibleWinRows);
              for(let i=0;i<indexes.length;i++){
                newColors[indexes[i]]=mycolors[1];
                newBlocks[indexes[i]] = true;
              }
              }}})(); break;
              
      case 'Vline': (()=>{
        let currentBlockIndex = newCurrentNames.indexOf("VLine");
        if(currentBlockIndex!= -1){
        const indexes = [index, index+1, index+2, index+3, index+4];
        if(index%this.props.cols<this.props.cols-4 
          && this.is_free(indexes)){
            newCurrentBlocks.splice(currentBlockIndex, 1);
          newCurrentNames.splice(currentBlockIndex, 1);
            possibleWinRows = [Math.floor(index/ this.props.cols)];
            possibleWinCols = [index%this.props.rows,(index+1)% this.props.rows, (index+2)% this.props.rows,(index+3)% this.props.rows, (index+4)% this.props.rows];
          for(let i=0;i<indexes.length;i++){
            newColors[indexes[i]]=mycolors[3];
            newBlocks[indexes[i]] = true;
          }
          }}})(); break;
      case 'HLine': (()=>{
        let currentBlockIndex = newCurrentNames.indexOf("HLine");
        if(currentBlockIndex!= -1){
            const indexes = [index, index+this.props.cols*4, index+this.props.cols*3, index+this.props.cols*2, index+this.props.cols];
            if(index/this.props.rows<this.props.rows-4 
              && this.is_free(indexes)){
                newCurrentBlocks.splice(currentBlockIndex, 1);
          newCurrentNames.splice(currentBlockIndex, 1);
                possibleWinRows = [Math.floor(index/ this.props.cols), Math.floor((index+this.props.cols)/ this.props.cols),Math.floor((index+2*this.props.cols)/ this.props.cols),Math.floor((index+3*this.props.cols)/ this.props.cols),Math.floor((index+4*this.props.cols)/ this.props.cols)];
                possibleWinCols = [index%this.props.rows];
                // console.log(possibleWinRows);
              for(let i=0;i<indexes.length;i++){
                newColors[indexes[i]]=mycolors[5];
                newBlocks[indexes[i]] = true;
              }
              }}})(); break;
      case 'TBlock': (()=>{
        let currentBlockIndex = newCurrentNames.indexOf("TBlock");
        if(currentBlockIndex!= -1){
          
        const indexes = [index, index+this.props.cols+1,  index+this.props.cols-1,  index+this.props.cols];
        if(index%this.props.cols<this.props.cols-1 && 
            index/this.props.rows<this.props.rows-1 &&
            index/this.props.rows>0 &&
            this.is_free(indexes)){
              newCurrentBlocks.splice(currentBlockIndex, 1);
          newCurrentNames.splice(currentBlockIndex, 1);
              possibleWinRows = [Math.floor(index/ this.props.cols), Math.floor((index+this.props.cols)/ this.props.cols)];
              possibleWinCols = [index % this.props.rows, (index+1)% this.props.rows, (index-1)% this.props.rows];
              // console.log(possibleWinCols);
              // console.log(possibleWinRows);
              for(let i=0;i<indexes.length;i++){
                newColors[indexes[i]]=mycolors[4];
                newBlocks[indexes[i]] = true;
              }
              }}})(); break;
       case 'TBlock2': (()=>{
        let currentBlockIndex = newCurrentNames.indexOf("TBlock2");
        if(currentBlockIndex!= -1){
          
          const indexes = [index, index+this.props.cols-1,  index+this.props.cols*2,  index+this.props.cols];
          if(index%this.props.cols<this.props.cols && 
                index/this.props.rows<this.props.rows-1 &&
                index/this.props.rows>0 &&
                    this.is_free(indexes)){
                      newCurrentBlocks.splice(currentBlockIndex, 1);
                      newCurrentNames.splice(currentBlockIndex, 1);
                      possibleWinRows = [Math.floor(index/ this.props.cols), Math.floor((index+this.props.cols)/ this.props.cols), Math.floor((index+2*this.props.cols)/ this.props.cols)];
                      possibleWinCols = [index % this.props.rows, (index+1)% this.props.rows];
                      // console.log(possibleWinCols);
                      // console.log(possibleWinRows);
                      for(let i=0;i<indexes.length;i++){
                        newColors[indexes[i]]=mycolors[7];
                        newBlocks[indexes[i]] = true;
                      }
          }}})(); break;
    }
    
    this.generateGameBoard();

    let newScore = score;
    let {cntScor1, actcols} = this.checkBoardCols(newBlocks);
    let {cntScor2, actrows} = this.checkBoardRows(newBlocks);
    this.emptyCols(newBlocks, newColors, actcols);
    this.emptyRows(newBlocks, newColors, actrows);
    // console.log("Actcols: ",actcols);
    // console.log("Actrows: ",actrows);
    newScore += cntScor2;
    newScore += cntScor1;
    
    let newPartialWin = 0;
    if(0 == newCurrentBlocks.length){
      newPartialWin=1;
    }
    this.setState({ colors: newColors, blocks: newBlocks, score:newScore, currentBlocks:newCurrentBlocks, currentNames:newCurrentNames, partialWin: newPartialWin });
    //console.log(this.checkLoss());
    if (this.checkLoss()){
      this.setState({showPopUp: true});
      //alert("You lost! Try again?");
    }
  }
  generateGameBoard = () => {
    const s = this.props.size;
    const matrix = [];
    for(let i=0; i < this.props.rows; i++){
      const row =[];
      for(let j=0;j<this.props.cols; j++){
        const index = i * this.props.cols + j;
        row.push(<div key={`${index}`} className="cell">
          {<Tile size ={s} color={this.state.colors[index]} 
          onClick={() => this.handleTileClick(index)}/>}
          </div>);
      }
      matrix.push(<div key={`row-${i}`} className="row">{row}</div>);
    }
    return matrix;
  };
  getBlocksArray(no:number){
    let arr : string[] =  ["Square","LBlock","VBlock","VLine","TBlock","HLine","VBlock2","TBlock2","BigSquare","BigV","BigV2"];
    let blcs = [];
    let names = [];
    for(let i=0;i<no;i++){
      let index = Math.floor((Math.random()*100))%arr.length;
      let cn = "option" + i.toString();
      blcs.push( <div className="options" id={cn} key={cn}>{<Blocks blockType={arr[index]} size={this.props.size} changeBlockOnClick = {this.changeBlock}/>}</div>);
      names.push(arr[index]);
    }
    const pair ={blocks: blcs, names: names};
    return pair;
  }
  playGame(){
    const { partialWin } = this.state;
    if(partialWin == 1){
      let {blocks, names} = this.getBlocksArray(3);
      this.setState({partialWin : 0, currentBlocks : blocks, currentNames: names});
    }
  }
  blockFits(blockType: string){
    // console.log(blockType);
    //return true;
    switch(blockType) {

        case 'Square' : 
          for(let index = 0; index <this.props.cols*this.props.rows;index++){
            const indexes = [index, index+1, index+this.props.cols, index+this.props.cols+1];
            if(index%this.props.cols<this.props.cols-1 
              && index/this.props.rows<this.props.rows-1
              && this.is_free(indexes)){
                console.log(indexes);
                return true;
              }
          }
          return false;
          
        case 'BigSquare' : 
          for(let index = 0; index <this.props.cols*this.props.rows;index++){
            const indexes = [index, index+1, index+2, index+this.props.cols, index+this.props.cols+1, index+this.props.cols+2
            , index+2*this.props.cols, index+2*this.props.cols+1, index+2*this.props.cols+2];
            if(index%this.props.cols<this.props.cols-2 
              && index/this.props.rows<this.props.rows-2
              && this.is_free(indexes)){
                console.log(indexes);
                return true;
              
            }}return false;
        case 'BigV' : 
          for(let index = 0; index <this.props.cols*this.props.rows;index++){
              const indexes = [index, index+this.props.cols, index+2*this.props.cols, index+2*this.props.cols-1, index+2*this.props.cols-2];
              if(index%this.props.cols<this.props.cols &&index%this.props.cols>1 
                && index/this.props.rows<this.props.rows-2
                && this.is_free(indexes)){
                  console.log(indexes);
                  return true;
                
              }}return false;
        case 'BigV2' : 
          for(let index = 0; index <this.props.cols*this.props.rows;index++){
                const indexes = [index, index+this.props.cols, index+2*this.props.cols, index+2*this.props.cols+1, index+2*this.props.cols+2];
                if(index%this.props.cols<this.props.cols-2 
                  && index/this.props.rows<this.props.rows-2
                  && this.is_free(indexes)){
                    console.log(indexes);
                    return true;
                  
                }}return false;
        case 'VBlock': 
          for(let index = 0; index <this.props.cols*this.props.rows;index++){
              const indexes = [index, index+1, index+this.props.cols];
              if(index%this.props.cols<this.props.cols-1 
              && index/this.props.rows<this.props.rows-1 
              && this.is_free(indexes)){
                console.log(indexes);
                    return true;
          }}return false;
        case 'VBlock2': 
          for(let index = 0; index <this.props.cols*this.props.rows;index++){
              const indexes = [index, index+this.props.cols, index+this.props.cols-1];
              if(index%this.props.cols<this.props.cols
              && index/this.props.rows<this.props.rows-1 
              && this.is_free(indexes)){
                console.log(indexes);
                  return true;
              }}return false;
        case 'LBlock': 
          for(let index = 0; index <this.props.cols*this.props.rows;index++){
            const indexes = [index, index+1, index+2, index+this.props.cols+2];
            if(index%this.props.cols<this.props.cols-2 && 
              index/this.props.rows<this.props.rows-1 &&
            this.is_free(indexes)){
              console.log(indexes);
              return true;
              }}return false; 

        case 'VLine': 
          for(let index = 0; index <this.props.cols*this.props.rows;index++){
            const indexes = [index, index+1, index+2, index+3, index+4];
            if(index%this.props.cols<this.props.cols-4 
            && this.is_free(indexes)){
              console.log(indexes);
              return true;
            }}return false;
        case 'HLine':
          for(let index = 0; index <this.props.cols*this.props.rows;index++){
            const indexes = [index, index+this.props.cols*4, index+this.props.cols*3, index+this.props.cols*2, index+this.props.cols];
            if(index/this.props.rows<this.props.rows-4 
            && this.is_free(indexes)){
              console.log(indexes);
              return true;
              }}return false;
        case 'TBlock':
          for(let index = 0; index <this.props.cols*this.props.rows;index++){

            const indexes = [index, index+this.props.cols+1,  index+this.props.cols-1,  index+this.props.cols];
            if(index%this.props.cols<this.props.cols-1 && 
                index/this.props.rows<this.props.rows-1 &&
                index/this.props.rows>0 &&
                this.is_free(indexes)){
                  console.log(indexes);
                  return true;
            }}
            return false;
        case 'TBlock2': 
          for(let index = 0; index <this.props.cols*this.props.rows;index++){
              const indexes = [index, index+this.props.cols-1,  index+this.props.cols*2,  index+this.props.cols];
              if(index%this.props.cols<this.props.cols && 
                index/this.props.rows<this.props.rows-1 &&
                index/this.props.rows>0 &&
                    this.is_free(indexes)){
                      console.log(indexes);
                return true;
        }}return false;
        default:
            console.error("Invalid block type:", blockType);
            return false;
    }
  }

  checkLoss(){
    const {currentNames} = this.state;
    for(let i=0; i<currentNames.length;i++){
      console.log(i,currentNames[i], this.blockFits(currentNames[i]));
      if(!this.blockFits(currentNames[i])){
        console.log("ai pierdut");
        return true;
      }
    }
    return false;
  }
  getCurrentBlocks(){
    this.playGame();
    const { currentBlocks } = this.state;
    return currentBlocks;
  }
  closePopUp(){
    this.setState({showPopUp: false});
  }
  render(){
  return(
    <div className='wholeGameBoard'>
      <div className='playGameBoard'
      style={{ display: 'grid', gridTemplateColumns: `repeat(${this.props.rows}, ${this.props.size})` }}>
      {this.generateGameBoard()}
      </div>
      {this.getCurrentBlocks()}
      <div className='SCORE'>Score: {this.state.score}</div>
      {this.state.showPopUp && (
        <PopUp
          title="You Lost"
          text="Think you can do better? Refresh the page and try again!"
          // closePopUp={this.closePopUp}
          // restartGame={this.closePopUp}
        />
      )}
  </div>
  )
  }
}
export default GameBoard