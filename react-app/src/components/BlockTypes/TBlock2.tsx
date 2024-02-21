import Tile from "../Tile";
import React from "react";

interface BlocksProps {
  size: string;
  color: string;
  changeOnClick: (s: string)=>void;
}

class TBlock2 extends React.Component<BlocksProps>{
  handleOnClick = () => {
    this.props.changeOnClick("TBlock2");
  }

  getTiles() {
    let v = [];
    let c = [1,2,3,2];
    let r = [2,2,2,1];
    for(let i = 0; i < 4; i++) {
      v.push(
        <div key={`TBlock2${i}`} className="TBlock2cell"
        style={{ display: 'grid' , gridColumn: `${c[i]}`, gridRow: `${r[i]}` }}>
          {<Tile size={this.props.size} color={this.props.color} onClick={this.handleOnClick} />}
        </div>
      );
    }
    return v;
  }

  render() {
    return (
      <div className="TBlock2" 
        onClick={this.handleOnClick}
        style={{ display: 'grid' , gridTemplateColumns: `repeat(3, ${this.props.size})`, gridTemplateRows: `repeat(2, ${this.props.size})` }}>
        {this.getTiles()}
      </div>
    );
  }
}

export default TBlock2;
