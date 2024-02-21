import Tile from "../Tile";
import React from "react";

interface VProps {
  size: string;
  color: string;
  changeOnClick: (s: string)=>void;
}

class VBlock2 extends React.Component<VProps>{
  handleOnClick = () => {
    this.props.changeOnClick("VBlock2");
  }

  getTiles() {
    let v = [];
    let r=[1,2,2];
    let c=[2,1,2];
    for(let i = 0; i < 3; i++) {
      v.push(
        <div key={`VBlock2${i}`} className="VBlock2cell"
        style={{ display: 'grid' , gridColumn: `${c[i]}`, gridRow: `${r[i]}` }}>
          {<Tile size={this.props.size} color={this.props.color} onClick={this.handleOnClick} />}
        </div>
      );
    }
    return v;
  }

  render() {
    return (
      <div className="VBlock2" 
        onClick={this.handleOnClick}
        style={{ display: 'grid' , gridTemplateRows: `repeat(2, ${this.props.size})`, gridTemplateColumns: `repeat(2, ${this.props.size})` }}>
        {this.getTiles()}
      </div>
    );
  }
}

export default VBlock2;
