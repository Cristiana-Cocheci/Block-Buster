import React from 'react'
import './PopUp.css'
interface PopUpProps {
  title: string;
  text: string;
  // closePopUp: ()=>void;
  // restartGame: ()=>void;
}


class PopUp extends React.Component<PopUpProps>{
  
  render(){
    return(
      <div className='popup'>
        <div className='popup-inner'>
          <h1>{this.props.title}</h1>
          <p>{this.props.text}</p>
          {/* <button onClick={this.props.closePopUp}>Close</button>
          <button onClick={this.props.restartGame}>Restart</button> */}
        </div>
    </div>
    )
    }
}

export default PopUp;