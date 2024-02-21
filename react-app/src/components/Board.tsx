import React, {useState} from 'react'
import Tile from './Tile'
import './board.css'
import Blocks from './Blocks'

interface BoardProps {
  rows: number;
  cols: number; 
  size: string;
  defaultScore: number;
}


class Board extends React.Component<BoardProps>{
  state = {
    colors: Array.from({ length: this.props.rows * this.props.cols }, () => "#edede9"),
    blocks: Array.from({ length: this.props.rows * this.props.cols }, ()=>false),
    selectedBlock: 'none',
    score: 0
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
      // console.log(i);
      if (!x[i]) {
        return false;
      }
    }
    return true;
  }
  colIsFull(col: number, x: boolean[]) {
    
    for (let i = 0; i < this.props.rows; i++) {
      let aux = i* this.props.rows+ col;
      //console.log(aux);
      if (!x[aux]) {
        return false;
      }
    }
    return true;
  }
  
  callForRows(newBlocks: boolean[], newColors: string[],  y: number[]){
    let cntScor=0;
    for(let i=0;i<y.length;i++){
      if(this.rowIsFull(y[i], newBlocks)){
        console.log(y[i], "rowIsfull");
        //empty the row
        let row = y[i];
        cntScor+= this.props.defaultScore;
        for (let i = row*this.props.cols; i < (1+row)*this.props.cols; i++) {
          newColors[i]="#edede9";
          newBlocks[i]=false;
          
        }
      }
    }
    return cntScor;
  }
  
  callForCols(newBlocks: boolean[], newColors: string[],  y: number[]){
    let cntScor=0;
    for(let i=0;i<y.length;i++){
      if(this.colIsFull(y[i], newBlocks)){
        console.log(y[i], "colIsfull");
        //empty the column
        let col = y[i];
        cntScor+= this.props.defaultScore;
        for (let j = 0; j < this.props.rows; j++) {
          let aux = j* this.props.rows+ col;
          //console.log(aux);
          newColors[aux]="#edede9";
          newBlocks[aux]=false;
        }
      }
    }
    return cntScor;

  }
  handleTileClick(index: number){
    const mycolors = ["#9b2226", "#ae2012", "#bb3e03", "#ca6702", "#ee9b00", "#0a9396", "#005f73", "#3a0ca3", "#560bad", "#b5179e"];
    
    const { colors, blocks, selectedBlock, score } = this.state;
    let newColors = [...colors];
    let newBlocks = [... blocks];
    let possibleWinRows : number[] = [];
    let possibleWinCols : number[] =[];
    switch(selectedBlock){
      case 'none': newColors =  [...colors]; break;
      case 'square' : (()=>{
                      const indexes = [index, index+1, index+this.props.cols, index+this.props.cols+1];
                      if(index%this.props.cols<this.props.cols-1 
                        && index/this.props.rows<this.props.rows-1
                        && this.is_free(indexes)){
                          possibleWinRows = [Math.floor(index/ this.props.cols), Math.floor((index+this.props.cols)/ this.props.cols)];
                          possibleWinCols = [index % this.props.rows, (index+1)% this.props.rows];
                          console.log(possibleWinCols);
                          console.log(possibleWinRows);
                        for(let i=0;i<indexes.length;i++){
                          newColors[indexes[i]]=mycolors[0];
                          newBlocks[indexes[i]] = true;
                        }
                        
                      }})(); break;
      case 'VBlock': (()=>{
        const indexes = [index, index+1, index+this.props.cols];
        if(index%this.props.cols<this.props.cols-1 
          && index/this.props.rows<this.props.rows-1 
          && this.is_free(indexes)){
            possibleWinRows = [Math.floor(index/ this.props.cols), Math.floor((index+this.props.cols)/ this.props.cols)];
            possibleWinCols = [index % this.props.rows, (index+1)% this.props.rows];
            console.log(possibleWinCols);
            console.log(possibleWinRows);
          for(let i=0;i<indexes.length;i++){
            newColors[indexes[i]]=mycolors[2];
            newBlocks[indexes[i]] = true;
          }
          }})(); break;
      case 'VBlock2': (()=>{
            const indexes = [index, index+this.props.cols, index+this.props.cols-1];
            if(index%this.props.cols<this.props.cols
              && index/this.props.rows<this.props.rows-1 
              && this.is_free(indexes)){
                possibleWinRows = [Math.floor(index/ this.props.cols), Math.floor((index+this.props.cols)/ this.props.cols)];
                possibleWinCols = [index % this.props.rows, (index+1)% this.props.rows];
                console.log(possibleWinCols);
                console.log(possibleWinRows);
              for(let i=0;i<indexes.length;i++){
                newColors[indexes[i]]=mycolors[6];
                newBlocks[indexes[i]] = true;
              }
              }})(); break;
      case 'LBlock': (()=>{
            const indexes = [index, index+1, index+2, index+this.props.cols+2];
            if(index%this.props.cols<this.props.cols-2 && 
                index/this.props.rows<this.props.rows-1 &&
               this.is_free(indexes)){
                possibleWinRows = [Math.floor(index/ this.props.cols), Math.floor((index+this.props.cols)/ this.props.cols)];
                possibleWinCols = [index % this.props.rows, (index+1)% this.props.rows, (index+2)% this.props.rows];
                console.log(possibleWinCols);
                console.log(possibleWinRows);
              for(let i=0;i<indexes.length;i++){
                newColors[indexes[i]]=mycolors[1];
                newBlocks[indexes[i]] = true;
              }
              }})(); break;
              
      case 'Vline': (()=>{
        const indexes = [index, index+1, index+2, index+3, index+4];
        if(index%this.props.cols<this.props.cols-4 
          && this.is_free(indexes)){
            possibleWinRows = [Math.floor(index/ this.props.cols)];
            possibleWinCols = [index%this.props.rows,(index+1)% this.props.rows, (index+2)% this.props.rows,(index+3)% this.props.rows, (index+4)% this.props.rows];
          for(let i=0;i<indexes.length;i++){
            newColors[indexes[i]]=mycolors[3];
            newBlocks[indexes[i]] = true;
          }
          }})(); break;
      case 'HLine': (()=>{
            const indexes = [index, index+this.props.cols*4, index+this.props.cols*3, index+this.props.cols*2, index+this.props.cols];
            if(index/this.props.rows<this.props.rows-4 
              && this.is_free(indexes)){
                possibleWinRows = [Math.floor(index/ this.props.cols), Math.floor((index+this.props.cols)/ this.props.cols),Math.floor((index+2*this.props.cols)/ this.props.cols),Math.floor((index+3*this.props.cols)/ this.props.cols),Math.floor((index+4*this.props.cols)/ this.props.cols)];
                possibleWinCols = [index%this.props.rows];
                console.log(possibleWinRows);
              for(let i=0;i<indexes.length;i++){
                newColors[indexes[i]]=mycolors[5];
                newBlocks[indexes[i]] = true;
              }
              }})(); break;
      case 'TBlock': (()=>{
        const indexes = [index, index+this.props.cols+1,  index+this.props.cols-1,  index+this.props.cols];
        if(index%this.props.cols<this.props.cols-1 && 
            index/this.props.rows<this.props.rows-1 &&
            index/this.props.rows>0 &&
            this.is_free(indexes)){
              possibleWinRows = [Math.floor(index/ this.props.cols), Math.floor((index+this.props.cols)/ this.props.cols)];
              possibleWinCols = [index % this.props.rows, (index+1)% this.props.rows, (index+2)% this.props.rows];
              console.log(possibleWinCols);
              console.log(possibleWinRows);
              for(let i=0;i<indexes.length;i++){
                newColors[indexes[i]]=mycolors[4];
                newBlocks[indexes[i]] = true;
              }
              }})(); break;
       case 'TBlock2': (()=>{
          const indexes = [index, index+this.props.cols-1,  index+this.props.cols*2,  index+this.props.cols];
          if(index%this.props.cols<this.props.cols && 
                index/this.props.rows<this.props.rows-1 &&
                index/this.props.rows>0 &&
                    this.is_free(indexes)){
                      possibleWinRows = [Math.floor(index/ this.props.cols), Math.floor((index+this.props.cols)/ this.props.cols), Math.floor((index+2*this.props.cols)/ this.props.cols)];
                      possibleWinCols = [index % this.props.rows, (index+1)% this.props.rows];
                      console.log(possibleWinCols);
                      console.log(possibleWinRows);
                      for(let i=0;i<indexes.length;i++){
                        newColors[indexes[i]]=mycolors[7];
                        newBlocks[indexes[i]] = true;
                      }
          }})(); break;
    }
    
    this.generateBoard();

    let newScore = score;
    newScore += this.callForRows(newBlocks, newColors, possibleWinRows);
    newScore += this.callForCols(newBlocks, newColors, possibleWinCols);
    console.log(newScore);
    this.setState({ colors: newColors, blocks: newBlocks, score:newScore });
    
  }
  generateBoard = () => {
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
  render(){
  return(
    <div className='wholeboard'>
      <div className='playboard'
      style={{ display: 'grid', gridTemplateColumns: `repeat(${this.props.rows}, ${this.props.size})` }}>
      {this.generateBoard()}
      </div>
      
      <div className='option1'>{<Blocks blockType="Square" size={this.props.size} changeBlockOnClick = {this.changeBlock}/>}</div>
      <div className='option2'>{<Blocks blockType="VBlock" size={this.props.size} changeBlockOnClick = {this.changeBlock}/>}</div>
      <div className='option3'>{<Blocks blockType="LBlock" size={this.props.size} changeBlockOnClick = {this.changeBlock}/>}</div>
      <div className='option4'>{<Blocks blockType="VLine" size={this.props.size} changeBlockOnClick = {this.changeBlock}/>}</div>
      <div className='option5'>{<Blocks blockType="TBlock" size={this.props.size} changeBlockOnClick = {this.changeBlock}/>}</div> 
      <div className='option6'>{<Blocks blockType="HLine" size={this.props.size} changeBlockOnClick = {this.changeBlock}/>}</div> 
      <div className='option7'>{<Blocks blockType="VBlock2" size={this.props.size} changeBlockOnClick = {this.changeBlock}/>}</div> 
      <div className='option8'>{<Blocks blockType="TBlock2" size={this.props.size} changeBlockOnClick = {this.changeBlock}/>}</div> 
      
      <div className='SCORE'>{this.state.score}</div>
  </div>
  )
  }
}
export default Board