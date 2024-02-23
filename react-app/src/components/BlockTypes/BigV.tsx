import Tile from "../Tile";
import React from "react";

interface VProps {
  size: string;
  color: string;
  changeOnClick: (s: string)=>void;
}

class BigV extends React.Component<VProps>{
  handleOnClick = () => {
    this.props.changeOnClick("BigV");
  }

  getTiles() {
    let v = [];
    let r=[1,2,3,3,3];
    let c=[3,3,3,2,1];
    for(let i = 0; i < 5; i++) {
      v.push(
        <div key={`BigV${i}`} className="BigVcell"
        style={{ display: 'grid' , gridColumn: `${c[i]}`, gridRow: `${r[i]}` }}>
          {<Tile size={this.props.size} color={this.props.color} onClick={this.handleOnClick} />}
        </div>
      );
    }
    return v;
  }

  render() {
    return (
      <div className="BigV" 
        onClick={this.handleOnClick}
        style={{ display: 'grid' , gridTemplateRows: `repeat(3, ${this.props.size})`, gridTemplateColumns: `repeat(3, ${this.props.size})` }}>
        {this.getTiles()}
      </div>
    );
  }
}

export default BigV;
