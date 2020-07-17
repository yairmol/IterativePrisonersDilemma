import React from 'react';
import {getGame} from './getInfo';
import styles from './DisplayGame.module.css'
import GridList from "@material-ui/core/GridList";
import GridListTile from "@material-ui/core/GridListTile";
import makeStyles from "@material-ui/core/styles/makeStyles";

const goodPicPath = 'data:image/png;base64,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';
const badPicPath = 'https://image.flaticon.com/icons/png/512/1642/1642143.png';

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
        overflow: 'hidden',
        backgroundColor: theme.palette.background.paper,
    },
    gridList: {
        width: 500,
        height: 450,
    },
    tile: {
        height: 'max-content'
    }
}));

function Game(props) {
    const classes = useStyles();
    const game = props.game;
    const player1moves = game.player1moves;
    const player2moves = game.player2moves;
    const player1isWinner = game.player1score > game.player2score;
    const res = getScoring(player1moves, player2moves);
    const p1imgs = player1moves.map((x, i) => (
        <img className={getStyle(res[i][0])} src={x ? goodPicPath : badPicPath} rounded alt={"defect/coop"}/>));
    const p2imgs = player2moves.map((x, i) => (
        <img className={getStyle(res[i][1])} src={x ? goodPicPath : badPicPath} rounded alt={"defect/coop"}/>));
    // const rounds = [[(<div className={player1isWinner ? styles.winnerMove : styles.loserMove}>
    //         <text className={player1isWinner ? styles.winnerText : styles.loserText}> {game.player1name} </text></div>),
    //     (<div className={!player1isWinner ? styles.winnerMove : styles.loserMove}>
    //         <text className={!player1isWinner ? styles.winnerText : styles.loserText}> {game.player2name} </text></div>)]]
    // .concat(p1imgs.map((x, i) => [x, p2imgs[i]]));
    const titles = [[(
        <div className={player1isWinner ? styles.winnerMove : styles.loserMove}>
            <text className={player1isWinner ? styles.winnerText : styles.loserText}> {game.player1name} </text>
        </div>),
        (<div className={!player1isWinner ? styles.winnerMove : styles.loserMove}>
            <text className={!player1isWinner ? styles.winnerText : styles.loserText}> {game.player2name} </text>
        </div>)]];
    let rounds = p1imgs.map((x, i) => [x, p2imgs[i]]);
    rounds = rounds.concat([[(
        <div className={player1isWinner ? styles.winnerMove : styles.loserMove}>
            <text className={player1isWinner ? styles.winnerText : styles.loserText}> {game.player1score} </text>
        </div>),
        (<div className={!player1isWinner ? styles.winnerMove : styles.loserMove}>
            <text className={!player1isWinner ? styles.winnerText : styles.loserText}> {game.player2score} </text>
        </div>)]]);
    const resRounds = rounds.map(x =>
        (<GridListTile className={classes.tile} cols={2}>
            <div className={styles.round}>{x[0]}{x[1]}</div>
        </GridListTile>));
    return (
        <div className={classes.root}><GridList className={classes.gridList} cols={2}>
            <GridListTile className={styles.tile} cols={2}>
                <div className={styles.titles}>{titles}</div>
            </GridListTile>
            {/*<div className={styles.match}>*/}{resRounds}{/*</div>*/}
        </GridList></div>);
}

const getScoring = (moves1, moves2) => {
    let res = [];
    for (let i = 0; i < moves1.length; i++) {
        let move1 = moves1[i];
        let move2 = moves2[i];
        if (move1 === move2) {
            res = res.concat([[move1, move2]])
        } else {
            if (move1 > move2) {
                res = res.concat([[-1, 1]])
            } else {
                res = res.concat([[1, -1]])
            }
        }
    }
    return res
};

const getStyle = (score) =>
    score === 0 ? styles.neutralMove :
        score === 1 ? styles.winnerMove :
            styles.loserMove;


const gameToDisplay = (i) => {
    const game = getGame(i);
    const player1moves = game.player1moves;
    const player2moves = game.player2moves;
    const p1imgs = player1moves.map(x => (<img src={x ? goodPicPath : badPicPath} rounded alt={"defect/coop"}/>));
    const p2imgs = player2moves.map(x => (<img src={x ? goodPicPath : badPicPath} rounded alt={"defect/coop"}/>));
    return (<div>
        <div>{p1imgs}</div>
        <div>{p2imgs}</div>
    </div>);
};


export default Game;