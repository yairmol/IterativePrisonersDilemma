import CanvasJSReact from './canvasjs/canvasjs.react';
import styles from './PopUp.module.css';
import Game from './DisplayGame'

var React = require('react');
var Component = React.Component;
var CanvasJS = CanvasJSReact.CanvasJS;
var CanvasJSChart = CanvasJSReact.CanvasJSChart;

 class PopUpGameDetails extends Component {
  	handleClick = () => {
   this.props.toggle();
  };
render() {
  return (
   <div className={styles.modal}>
     <div className={styles.modal_content2}>
     <div><span className={styles.close} onClick={this.handleClick}>&times;</span></div>
     <div className={styles.list}>
      <Game index={this.props.index}/>
      </div>
    </div>
   </div>
  );
 }
}

export default PopUpGameDetails