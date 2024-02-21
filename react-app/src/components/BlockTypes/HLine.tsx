import Tile from "../Tile";
import React from "react";

interface HLineProps {
  size: string;
  color: string;
  changeOnClick: (s: string)=>void;
}

class HLine extends React.Component<HLineProps>{
  handleOnClick = () => {
    this.props.changeOnClick("HLine");
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
        style={{ display: 'grid' , gridTemplateColumns: `repeat(5, ${this.props.size})` }}>
        {this.getTiles()}
      </div>
    );
  }
}

export default HLine;
