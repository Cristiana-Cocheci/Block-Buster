import Tile from "../Tile";
import React from "react";

interface BlocksProps {
  size: string;
  color: string;
  changeOnClick: (s: string)=>void;
}

class Square extends React.Component<BlocksProps>{
  handleOnClick = () => {
    this.props.changeOnClick("square");
  }

  getTiles() {
    let v = [];
    for(let i = 0; i < 4; i++) {
      v.push(
        <div key={`Square${i}`} className="Squarecell">
          {<Tile size={this.props.size} color={this.props.color} onClick={this.handleOnClick} />}
        </div>
      );
    }
    return v;
  }

  render() {
    return (
      <div className="SquareBlock" 
        onClick={this.handleOnClick}
        style={{ display: 'grid' , gridTemplateColumns: `repeat(2, ${this.props.size})` }}>
        {this.getTiles()}
      </div>
    );
  }
}

export default Square;
