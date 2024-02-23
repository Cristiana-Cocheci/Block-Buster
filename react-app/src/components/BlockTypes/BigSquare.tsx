import Tile from "../Tile";
import React from "react";

interface BlocksProps {
  size: string;
  color: string;
  changeOnClick: (s: string)=>void;
}

class BigSquare extends React.Component<BlocksProps>{
  handleOnClick = () => {
    this.props.changeOnClick("BigSquare");
  }

  getTiles() {
    let v = [];
    for(let i = 0; i < 9; i++) {
      v.push(
        <div key={`BigSquare${i}`} className="BigSquarecell">
          {<Tile size={this.props.size} color={this.props.color} onClick={this.handleOnClick} />}
        </div>
      );
    }
    return v;
  }

  render() {
    return (
      <div className="BigSquareBlock" 
        onClick={this.handleOnClick}
        style={{ display: 'grid' , gridTemplateColumns: `repeat(3, ${this.props.size})` }}>
        {this.getTiles()}
      </div>
    );
  }
}

export default BigSquare;
