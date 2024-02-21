import Square from "./BlockTypes/Square";
import VLine from "./BlockTypes/VLine";
import VBlock from "./BlockTypes/VBlock";
import LBlock from "./BlockTypes/LBlock";
import TBlock from "./BlockTypes/TBlock";
import HLine from "./BlockTypes/HLine";
import VBlock2 from "./BlockTypes/VBlock2";
import TBlock2 from "./BlockTypes/TBlock2";
import React from "react";

interface BlocksProps {
  blockType: string;
  size: string;
  changeBlockOnClick: (s: string)=>void; 
}
class Blocks extends React.Component<BlocksProps>{
  render(){
    const mycolors = ["#9b2226", "#ae2012", "#bb3e03", "#ca6702", "#ee9b00", "#0a9396", "#005f73", "#3a0ca3", "#560bad", "#b5179e"];
    
    // const mycolors= ["#ff595e","#ffca3a", "#8ac926", "#1982c4", "#6a4c93"];
    //const r = (Math.floor(Math.random() * 100) + 1)%5;
    const BlockType = () => {
      switch(this.props.blockType) {

        case "Square":   return <Square size = {this.props.size} color={mycolors[0]} changeOnClick={this.props.changeBlockOnClick}/>;
        case "LBlock":    return <LBlock size = {this.props.size} color={mycolors[1]} changeOnClick={this.props.changeBlockOnClick}/>;
        case "VBlock":  return <VBlock size = {this.props.size} color={mycolors[2]} changeOnClick={this.props.changeBlockOnClick}/>;
        case "VLine":  return <VLine size = {this.props.size} color={mycolors[3]} changeOnClick={this.props.changeBlockOnClick}/>;
        case "TBlock":  return <TBlock size = {this.props.size} color={mycolors[4]} changeOnClick={this.props.changeBlockOnClick}/>;
        case "HLine":  return <HLine size = {this.props.size} color={mycolors[5]} changeOnClick={this.props.changeBlockOnClick}/>;
        case "VBlock2":  return <VBlock2 size = {this.props.size} color={mycolors[6]} changeOnClick={this.props.changeBlockOnClick}/>;
        case "TBlock2":  return <TBlock2 size = {this.props.size} color={mycolors[7]} changeOnClick={this.props.changeBlockOnClick}/>;

        default:      return <h1>No block match</h1>
      }
    }

    return (
      <div className="Block">{ BlockType() }</div>
    )
  }
}

export default Blocks 