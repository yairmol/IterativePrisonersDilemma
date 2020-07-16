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

// Generate Order Data
function createData(p1, p2, p1_score, p2_score) {
    return { p1, p2, p1_score, p2_score };
}

const rows = [
    createData('tit-for-tat', 'tit-for-tat', 30,30),
    createData('tit-for-tat', 'grunger', 30,30),
    createData('grunger', 'tit-for-tat', 30,30),
    createData('tit-for-tat', 'defector', 0,50),
];

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

export default function Games() {
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
                        <TableCell align="right">Player 2 score</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rows.map((row) => (
                        <TableRow /*key={row.id}*/>
                            <TableCell>{row.p1}</TableCell>
                            <TableCell>{row.p2}</TableCell>
                            <TableCell>{row.p1_score}</TableCell>
                            <TableCell>{row.p2_score}</TableCell>
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