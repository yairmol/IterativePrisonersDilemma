import CanvasJSReact from './canvasjs/canvasjs.react';
import styles from './PopUp.module.css';
import {getStratGames} from './getInfo';
import PopUpGameDetails from './PopUpGameDetails'
import {
    BarChart, Bar, Cell, CartesianGrid, Tooltip, Legend,
} from 'recharts';
import { LineChart, Line, XAxis, YAxis, Label, ResponsiveContainer } from 'recharts';

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
return (
<div onClick={() => this.showGameDetails(game.index)} className={this.getStyle(game, label)}>
    <BarChart
        width={500}
        height={500}
        data={this.getData(game, label)}
        margin={{
            top: 5, right: 30, left: 20, bottom: 5,
        }}
    >
        <XAxis dataKey="label" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="y" fill="#82ca9d" />
    </BarChart>
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
