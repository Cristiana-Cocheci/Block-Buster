import Tile from "../Tile";
import React from "react";

interface VLineProps {
  size: string;
  color: string;
  changeOnClick: (s: string)=>void;
}

class VLine extends React.Component<VLineProps>{
  handleOnClick = () => {
    this.props.changeOnClick("Vline");
  }

  getTiles() {
    let v = [];
    for(let i = 0; i < 5; i++) {
      v.push(
        <div key={`Line${i}`} className="Linecell">
          {<Tile size={this.props.size} color={this.props.color} onClick={this.handleOnClick} />}
        </div>
      );
    }
    return v;
  }

  render() {
    return (
      <div className="LineBlock" 
        onClick={this.handleOnClick}
        style={{ display: 'grid' , gridTemplateRows: `repeat(5, ${this.props.size})`, gridTemplateColumns: `1fr` }}>
        {this.getTiles()}
      </div>
    );
  }
}

export default VLine;
