import CanvasJSReact from './canvasjs/canvasjs.react';
import styles from './PopUp.module.css';
import {getStratGames} from './getInfo';
import PopUpGameDetails from './PopUpGameDetails'

var React = require('react');
var Component = React.Component;
var CanvasJS = CanvasJSReact.CanvasJS;
var CanvasJSChart = CanvasJSReact.CanvasJSChart;

 class PopUpStratDetails extends Component {
   state = {
    gameIndex: null,
    showWindow: false,
   }
    showGameDetails = (i) => {
    this.setState({
      gameIndex: i,
      showWindow: true
    })
  }

  closeWindow = () => {
    this.setState({
      showWindow: false
    })
  }

  	handleClick = () => {
   this.props.toggle();
  };


  getStyle = (game, label) =>
    game.name1 == label ? game.score1 > game.score2 ? 
                            styles.winnerMove : styles.loserMove :
                          game.score1 < game.score2 ? 
                            styles.winnerMove : styles.loserMove;

getData = (x, label) => {
  var currectIsFirst = x.name1 == label
  return [
    {
      label: currectIsFirst ? x.name1 : x.name2,
      y: currectIsFirst ? x.score1 : x.score2
    },
    {
      label: !currectIsFirst ? x.name1 : x.name2,
      y: !currectIsFirst ? x.score1 : x.score2
    }
  ]
}

getMiniChart = (label, game) => {
  const options = {
    exportEnabled: false,
  animationEnabled: true,
  title:{
  },
  // subtitles: [{
  // 	text: "Click Legend to Hide or Unhide Data Series"
  // }], 
  axisX: {
  },
  axisY: {
      titleFontColor: "#4F81BC",
      lineColor: "#4F81BC",
      labelFontColor: "#4F81BC",
      tickColor: "#4F81BC"
  },
  // toolTip: {
  // 	shared: true
  // },
  height: 100,
  data: [
  {
      type: "column",
      name: "Clutch",
      axisYType: "secondary",
      showInLegend: false,
      yValueFormatString: "#,##0.# Units",
      dataPoints: this.getData(game, label)
  }]
}

return (
<div onClick={() => this.showGameDetails(game.index)} className={this.getStyle(game, label)}>
  <CanvasJSChart options = {options}/>
</div>
);
}


  
render() {
  var games = getStratGames(this.props.label);
  var charts = games.map((x) => this.getMiniChart(this.props.label, x))
  return (
    <div>
   <div className={styles.modal}>
     <div className={styles.modal_content}>
     <span className={styles.close} onClick={this.handleClick}>&times;    </span>
      {charts}
    </div>
    {this.state.showWindow ? (<PopUpGameDetails index={this.state.gameIndex} toggle={this.closeWindow}/>) : null}
   </div>
   </div>
  );
 }

}
export default PopUpStratDetails;
