import React from "react";
import Title from "./template/Title";
import AceEditor from 'react-ace';
import "ace-builds/src-noconflict/mode-python"
import "ace-builds/src-noconflict/snippets/python"
import "ace-builds/src-noconflict/theme-xcode"
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Paper from "@material-ui/core/Paper";
import {makeStyles} from "@material-ui/core/styles";
import "ace-builds/src-min-noconflict/ext-searchbox";
import "ace-builds/src-min-noconflict/ext-language_tools";
import "ace-builds/src-noconflict/mode-jsx";

const axios = require("axios").default;
const beginner_code = `# don't change the name of this class
class NewStrategy:
    # strategy initialization method. add variables as you wish (for example a number_of_turns variable)
    def __init__(self):
        # this field is mandatory! its value is True if the strategy has randomized elements
        self.is_random = False
        # implement
        # example: 
        self.number_of_turns = 0

    # the strategy's main function.
    # it calculates the next move, given the previous moves of herself and her opponent
    # it can also use any variables declared in the init function
    def next_move(self, my_moves: List[Move], enemy_moves: List[Move]) -> Move:
        # Move is an Enum with two values:
        #   Move.CO_OPERATE and Move.DEFECT
        # this function must return one of this value
        # the function params my_moves and enemy_moves are both lists
        # composed of this enum.
        # example:
        self.number_of_turns += 1
        if self.number_of_turns % 2 == 0:
            return Move.CO_OPERATE
        else:
            return Move.DEFECT`;

const useStyles = makeStyles((theme) => ({
    paper: {
        padding: theme.spacing(2),
        display: 'flex',
        overflow: 'auto',
        flexDirection: 'column',
    },
    fixedHeight: {
        height: 240,
    },
    fixedHeight2: {
        height: 400,
    },

    button: {
        margin: theme.spacing(3),
    },
    text: {
        margin: theme.spacing(1),
        minWidth: '40%'
    },
}));

export default function CreateStrategy(){
    const [code, setCode] = React.useState(beginner_code);
    const [name, setName] = React.useState("");
    const classes = useStyles();

    const createStrategy = () => {
        axios.post('http://localhost:8080/create_strategy',{
            code: code,
            name: name
        })
            .then(res => {
                alert("strategy created");
            })
            .catch(err => alert(err))
    };

    return (
        <div>
            <Paper className={classes.paper}>
            <Title>Create Strategy</Title>
            <form noValidate>
                <Grid container spacing={3}>
                    <Grid item xs={12}>
                        <TextField value={name} placeholder={"enter strategy name"}
                                   onChange={(e) => setName(e.target.value)}
                                   label={"strategy name"}
                                   className={classes.text} />
                    </Grid>
                    <Grid item xs={12}>
                        <AceEditor
                            mode="python"
                            theme="xcode"
                            value={code}
                            onChange={(new_code) => setCode(new_code)}
                            width={1000}
                            showPrintMargin={false}
                            fontSize={18}
                            enableLiveAutocompletion={true}
                            enableBasicAutocompletion={true}
                            enableSnippets={true}
                            setOptions={{
                                enableBasicAutocompletion: true,
                                enableLiveAutocompletion: true,
                                enableSnippets: true
                            }}
                        />
                    </Grid>
                </Grid>
                <Button
                    type="button"
                    color="primary"
                    className={classes.button}
                    variant="outlined"
                    onClick={createStrategy}>
                    Create Strategy
                </Button>
            </form>
            </Paper>
        </div>
    )
}