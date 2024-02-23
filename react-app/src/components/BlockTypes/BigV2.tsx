import Tile from "../Tile";
import React from "react";

interface VProps {
  size: string;
  color: string;
  changeOnClick: (s: string)=>void;
}

class BigV2 extends React.Component<VProps>{
  handleOnClick = () => {
    this.props.changeOnClick("BigV2");
  }

  getTiles() {
    let v = [];
    let c=[1,2,3,3,3];
    let r=[1,1,1,2,3];
    for(let i = 0; i < 5; i++) {
      v.push(
        <div key={`BigV2${i}`} className="BigV2cell"
        style={{ display: 'grid' , gridColumn: `${c[i]}`, gridRow: `${r[i]}` }}>
          {<Tile size={this.props.size} color={this.props.color} onClick={this.handleOnClick} />}
        </div>
      );
    }
    return v;
  }

  render() {
    return (
      <div className="BigV2" 
        onClick={this.handleOnClick}
        style={{ display: 'grid' , gridTemplateRows: `repeat(3, ${this.props.size})`, gridTemplateColumns: `repeat(3, ${this.props.size})` }}>
        {this.getTiles()}
      </div>
    );
  }
}

export default BigV2;
