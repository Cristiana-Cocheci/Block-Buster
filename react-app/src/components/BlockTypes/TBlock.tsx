import Tile from "../Tile";
import React from "react";

interface BlocksProps {
  size: string;
  color: string;
  changeOnClick: (s: string)=>void;
}

class TBlock extends React.Component<BlocksProps>{
  handleOnClick = () => {
    this.props.changeOnClick("TBlock");
  }

  getTiles() {
    let v = [];
    for(let i = 0; i < 4; i++) {
      let r = (i+1)%4;
      let c = 2;
      if(i==3){
        r=2;
        c=1;
      }
      v.push(
        <div key={`TBlock${i}`} className="TBlockcell"
        style={{ display: 'grid' , gridColumn: `${c}`, gridRow: `${r}` }}>
          {<Tile size={this.props.size} color={this.props.color} onClick={this.handleOnClick} />}
        </div>
      );
    }
    return v;
  }

  render() {
    return (
      <div className="TBlock" 
        onClick={this.handleOnClick}
        style={{ display: 'grid' , gridTemplateColumns: `repeat(2, ${this.props.size})`, gridTemplateRows: `repeat(3, ${this.props.size})` }}>
        {this.getTiles()}
      </div>
    );
  }
}

export default TBlock;
