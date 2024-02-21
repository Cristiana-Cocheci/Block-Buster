import React, { useState } from 'react';
import './tile.css';

interface TileProps {
  color: string;
  size: string;
  onClick: ()=> void;
}

class Tile extends React.Component <TileProps> {
  state = {
    color: this.props.color
  };
  // const [backgroundColor, setBackgroundColor] = useState(props.color);
  // const [isHovered, setIsHovered] = useState(false);

  // handleMouseEnter = () => {
  //   this.setState({color: "lightblue"});
  // };

  // handleMouseLeave = () => {
  //   this.setState({color: this.props.color});
  // };
  handleOnClick = () => {
    this.props.onClick();
  };

  render(){
    return (
    <div
      className='Tiles'
      // onMouseEnter={this.handleMouseEnter}
      // onMouseLeave={this.handleMouseLeave}
      onClick={this.handleOnClick}
      style={{ backgroundColor: this.props.color }}
    ></div>
  );}
}

export default Tile;
