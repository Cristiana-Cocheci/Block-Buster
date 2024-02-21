import Tile from "../Tile";
import React from "react";

interface BlocksProps {
  size: string;
  color: string;
  changeOnClick: (s: string)=>void;
}

class LBlock extends React.Component<BlocksProps>{
  handleOnClick = () => {
    this.props.changeOnClick("LBlock");
  }

  getTiles() {
    let v = [];
    for(let i = 0; i < 4; i++) {
      let r = (i+1)%4;
      let c = 1;
      if(i==3){
        r=3;
        c=2;
      }
      v.push(
        <div key={`LBlock${i}`} className="LBlockcell"
        style={{ display: 'grid' , gridColumn: `${c}`, gridRow: `${r}` }}>
          {<Tile size={this.props.size} color={this.props.color} onClick={this.handleOnClick} />}
        </div>
      );
    }
    return v;
  }

  render() {
    return (
      <div className="LBlock" 
        onClick={this.handleOnClick}
        style={{ display: 'grid' , gridTemplateColumns: `repeat(2, ${this.props.size})`, gridTemplateRows: `repeat(3, ${this.props.size})` }}>
        {this.getTiles()}
      </div>
    );
  }
}

export default LBlock;
