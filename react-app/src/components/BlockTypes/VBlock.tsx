import Tile from "../Tile";
import React from "react";

interface VProps {
  size: string;
  color: string;
  changeOnClick: (s: string)=>void;
}

class VBlock extends React.Component<VProps>{
  handleOnClick = () => {
    this.props.changeOnClick("VBlock");
  }

  getTiles() {
    let v = [];
    for(let i = 0; i < 3; i++) {
      v.push(
        <div key={`V${i}`} className="Vcell">
          {<Tile size={this.props.size} color={this.props.color} onClick={this.handleOnClick} />}
        </div>
      );
    }
    return v;
  }

  render() {
    return (
      <div className="VBlock" 
        onClick={this.handleOnClick}
        style={{ display: 'grid' , gridTemplateRows: `repeat(2, ${this.props.size})`, gridTemplateColumns: `repeat(2, ${this.props.size})` }}>
        {this.getTiles()}
      </div>
    );
  }
}

export default VBlock;
