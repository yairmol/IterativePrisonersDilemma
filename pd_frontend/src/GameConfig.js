import MenuItem from "@material-ui/core/MenuItem";
import React, {useState} from 'react';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import {makeStyles} from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Title from "./template/Title";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";

const axios = require("axios").default;

const useStyles = makeStyles((theme) => ({
    paper: {
        // marginTop: theme.spacing(8),
        // display: 'flex',
        // flexDirection: 'column',
        // alignItems: 'center',
        margin:theme.spacing(1) ,
        textAlign: 'center',
        color: theme.palette.text.secondary
    },
    button: {
        margin: theme.spacing(1),
    },
    text: {
        margin: theme.spacing(1),
        minWidth: '40%'
    },
}));

function StrategyConfig(props) {
    const classes = useStyles();
    return (
        <Paper className={classes.paper}>
            <TextField className={classes.text}
                       label="Strategy"
                       select
                       value={props.name}
                       onChange={props.onStrategyChange}>

                {props.strategies.map((option) => {
                    return option === props.selectedStrategy ?
                         (<MenuItem selected value={option}>{option}</MenuItem>) :
                         (<MenuItem value={option}>{option}</MenuItem>)
                })}

            </TextField>
            <TextField
                value={props.selectedStrategy.quantity}
                className={classes.text}
                onChange={props.onQuantityChange}
                label="Quantity"
            />
        </Paper>
    )
}

export default function GameConfig(props) {
    const [selectedStrategies, setSelectedStrategies] = useState([{name: "", quantity: 0}]);
    const [strategies, setStrategies] = useState([]);
    const [isLoaded, setIsLoaded] = useState(false);
    const [rounds, setRounds] = useState("20");
    const [iterations, setIterations] = useState("1");
    const classes = useStyles();
    if (!isLoaded) {
        axios({
            method: 'get',
            url: "http://localhost:8080/strategies",
        })
            .then((response) => {
                setStrategies(response.data.message);
                setIsLoaded(true);
            })
            .catch(err => alert(err));
    }

    const onSubmit = () => {
        axios.post('http://localhost:8080/match',{
            strategies: selectedStrategies,
            rounds: rounds,
            iterations: iterations
        })
            .then(res => {
                props.updateData(res.data);
            })
            .catch(err => alert(err))
    };

    const onSelectionChanged = (event, i) => {
        const array = selectedStrategies.slice(0);
        array[i].name = event.target.value;
        setSelectedStrategies(array);
    };

    const onQuantityChanged = (event, i) => {
        const array = selectedStrategies.slice(0);
        array[i].quantity = event.target.value;
        setSelectedStrategies(array);
    };

    const addStrategy = () => {
        setSelectedStrategies(selectedStrategies.concat([{name: "", quantity: 0}]))
    };

    if (!isLoaded) {
        return (
            <Container component="main" maxWidth="xs">
                <CssBaseline/>
                <div className={classes.paper}>
                    <Typography component="h1" variant="h5">
                        Loading ...
                    </Typography>
                </div>
            </Container>
        )
    }

    return (
        <React.Fragment>
            <Title>Game Configurations</Title>
                <form noValidate>
                    <Grid container spacing={3}>
                        {
                            selectedStrategies.map((st, i) => {
                                return (
                                    <Grid item xs={6}>
                                    <StrategyConfig strategies={strategies}
                                                    onQuantityChange={(event => onQuantityChanged(event, i))}
                                                    onStrategyChange={(event) => onSelectionChanged(event, i)}
                                                    selectedStrategy={selectedStrategies[i]}
                                                    name={selectedStrategies[i].name}
                                    />
                                    </Grid>
                                )
                            })
                        }
                        {selectedStrategies.length % 2 === 1 ? (<Grid xs={6}/>) : (<div/>)}
                        <Grid item xs={6}>
                            <TextField value={rounds} placeholder={"enter a number or random"}
                                       onChange={(e) => setRounds(e.target.value)}
                                       label={"rounds"}
                                       className={classes.text}/>
                            <TextField value={iterations} placeholder={"number of iterations"}
                                       onChange={(e) => setIterations(e.target.value)}
                                       label={"iterations"}
                                       className={classes.text}/>
                        </Grid>
                    </Grid>
                    <Button
                        type="button"
                        color="primary"
                        className={classes.button}
                        variant="outlined"
                        onClick={addStrategy}>
                        Add Strategy
                    </Button>
                    <Button
                        type="button"
                        onClick={onSubmit}
                        color="primary"
                        className={classes.button}
                        variant="contained">
                        Make Match
                    </Button>
                </form>
        </React.Fragment>
    );
}