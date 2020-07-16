import CanvasJSReact from './canvasjs/canvasjs.react';
import styles from './PopUp.module.css';
import {getStratGames} from './getInfo';
import PopUpGameDetails from './PopUpGameDetails'
import {
    BarChart, Bar, Cell, CartesianGrid, Tooltip, Legend,
} from 'recharts';
import {LineChart, Line, XAxis, YAxis, Label, ResponsiveContainer} from 'recharts';
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Title from "./template/Title";

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
            "#6f6cde" : "#DE7171" :
            game.score1 < game.score2 ?
                "#6f6cde" : "#DE7171";

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
            <Grid item>
                <div className={styles.grid} onClick={() => this.showGameDetails(game.index)} >
                    <BarChart
                        width={200}
                        height={200}
                        data={this.getData(game, label)}
                        margin={{
                            top: 5, right: 5, left: 5, bottom: 5,
                        }}
                    >
                        <XAxis dataKey="label"/>
                        <YAxis/>
                        <Bar dataKey="y" fill={this.getStyle(game, label)}/>
                    </BarChart>
                </div>
            </Grid>
        );
    }


    render() {
        var games = getStratGames(this.props.label);
        var charts = games.map((x) => this.getMiniChart(this.props.label, x));
        var label = this.props.label;
        var score = this.props.score;
        var gamesNum = games.length;
        return (
            <div>
                <div className={styles.modal}>
                    <div className={styles.modal_content}>
                        <span className={styles.close} onClick={this.handleClick}>&times;    </span>
                        <Title><b>{"Strategy: "}</b>{label},<b>{" score: "}</b>{score},<b>{" games: "}</b>{gamesNum}</Title>
                        <hr/>
                        <br/>
                        <Grid container spacing={3}>
                            {charts}
                        </Grid>
                    </div>
                    {this.state.showWindow ? (
                        <PopUpGameDetails index={this.state.gameIndex} toggle={this.closeWindow}/>) : null}
                </div>
            </div>
        );
    }

}

export default PopUpStratDetails;

{/*<div onClick={() => this.showGameDetails(game.index)} className={this.getStyle(game, label)}>*/
}
