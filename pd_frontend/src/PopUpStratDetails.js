import styles from './PopUp.module.css';
import {getStratGames} from './getInfo';
import PopUpGameDetails from './PopUpGameDetails'
import {BarChart, Bar, XAxis, YAxis} from 'recharts';
import Grid from "@material-ui/core/Grid";
import Title from "./template/Title";

const React = require('react');
const Component = React.Component;

class PopUpStratDetails extends Component {
    state = {
        gameIndex: null,
        showWindow: false,
        isLoaded: false
    };
    showGameDetails = (game) => {
        this.setState({
            game: game,
            showWindow: true
        })
    };

    closeWindow = () => {
        this.setState({
            showWindow: false
        })
    };

    handleClick = () => {
        this.props.toggle();
    };


    getStyle = (game, label) =>
        game.player1name === label ? game.player1score > game.player2score ?
            "#6f6cde" : "#DE7171" :
            game.player1score < game.player2score ?
                "#6f6cde" : "#DE7171";

    getData = (x, label) => {
        const currentIsFirst = x.player1name === label;
        return [
            {
                label: currentIsFirst ? x.player1name : x.player2name,
                y: currentIsFirst ? x.player1score : x.player2score
            },
            {
                label: !currentIsFirst ? x.player1name : x.player2name,
                y: !currentIsFirst ? x.player1score : x.player2score
            }
        ]
    };

    getMiniChart = (label, game) => {
        return (
            <Grid item>
                <div className={styles.grid} onClick={() => this.showGameDetails(game)} >
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
    };


    render() {
        if (!this.state.isLoaded) {
            getStratGames(this.props.label, this.props.iteration)
                .then(games => {
                    this.setState({
                        games: games,
                        isLoaded: true
                    })
                });
            return (
                <div>
                    <div className={styles.modal}>
                        <div className={styles.modal_content}>
                            <Title>Loading...</Title>
                        </div>
                    </div>
                </div>
            )
        } else {
            const charts = this.state.games.map((x) => this.getMiniChart(this.props.label, x));
            const label = this.props.label;
            const score = this.props.score;
            const gamesNum = this.state.games.length;
            return (
                <div>
                    <div className={styles.modal}>
                        <div className={styles.modal_content}>
                            <span className={styles.close} onClick={this.handleClick}>&times;    </span>
                            <Title><b>{"Strategy: "}</b>{label},<b>{" score: "}</b>{score},<b>{" games: "}</b>{gamesNum}
                            </Title>
                            <hr/>
                            <br/>
                            <Grid container spacing={3}>
                                {charts}
                            </Grid>
                        </div>
                        {this.state.showWindow ? (
                            <PopUpGameDetails game={this.state.game} toggle={this.closeWindow}/>) : null}
                    </div>
                </div>
            );
        }
    }

}

export default PopUpStratDetails;

{/*<div onClick={() => this.showGameDetails(game.index)} className={this.getStyle(game, label)}>*/
}
