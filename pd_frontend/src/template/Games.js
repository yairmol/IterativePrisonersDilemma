import React from 'react';
import Link from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Title from './Title';
import TableContainer from "@material-ui/core/TableContainer";


function preventDefault(event) {
    event.preventDefault();
}

const useStyles = makeStyles((theme) => ({
    seeMore: {
        marginTop: theme.spacing(3),
    },
    container: {
        maxHeight: 200,
    },
}));

export default function Games(props) {
    const classes = useStyles();
    return (
        <React.Fragment>
            <Title>Recent Games</Title>
            <TableContainer className={classes.container}>
            <Table size="small" stickyHeader>
                <TableHead>
                    <TableRow>
                        <TableCell>Player 1</TableCell>
                        <TableCell>Player 2</TableCell>
                        <TableCell>Player 1 score</TableCell>
                        <TableCell>Player 2 score</TableCell>
                        <TableCell>num of games</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {props.games.map((row) => (
                        <TableRow /*key={row.id}*/>
                            <TableCell>{row.player1name}</TableCell>
                            <TableCell>{row.player2name}</TableCell>
                            <TableCell>{row.player1score}</TableCell>
                            <TableCell>{row.player2score}</TableCell>
                            <TableCell>{row.numOfGames}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
            </TableContainer>
            <div className={classes.seeMore}>
                <Link color="primary" href="#" onClick={preventDefault}>
                    See more Games
                </Link>
            </div>
        </React.Fragment>
    );
}