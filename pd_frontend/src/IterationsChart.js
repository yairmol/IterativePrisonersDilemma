import React from 'react';
import { useTheme } from '@material-ui/core/styles';
import {LineChart, Line, XAxis, YAxis, Label, ResponsiveContainer, Tooltip} from 'recharts';
import Title from './template/Title';
import CartesianGrid from "recharts/lib/cartesian/CartesianGrid";
import Legend from "recharts/lib/component/Legend";

// Generate Sales Data
function createData(time, amount) {
    return { time, amount };
}

const colors = ["#ed553b", "#f6d55c", "#3caea3", "#20639b",
    "#7268a6", "#32a852"];

const data = [
    {
        name: "iteration 1",
        tit_for_tat: 20,
        grudger: 20,
        yair: 20
    },
    {
        name: "iteration 2",
        tit_for_tat: 22,
        grudger: 18,
        yair: 20
    },
    {
        name: "iteration 3",
        tit_for_tat: 24,
        grudger: 20,
        yair: 16
    },
    {
        name: "iteration 4",
        tit_for_tat: 30,
        grudger: 5,
        yair: 25
    },
    {
        name: "iteration 5",
        tit_for_tat: 28,
        grudger: 7,
        yair: 25
    },
    {
        name: "iteration 6",
        tit_for_tat: 30,
        grudger: 8,
        yair: 22
    },
    {
        name: "iteration 7",
        tit_for_tat: 32,
        grudger: 2,
        yair: 26
    },
    {
        name: "iteration 8",
        tit_for_tat: 35,
        grudger: 1,
        yair: 24
    },
    {
        name: "iteration 9",
        tit_for_tat: 37,
        grudger: 3,
        yair: 20
    },
    {
        name: "iteration 10",
        tit_for_tat: 40,
        grudger: 2,
        yair: 18
    },
    {
        name: "iteration 11",
        tit_for_tat: 44,
        grudger: 4,
        yair: 12
    },
    {
        name: "iteration 12",
        tit_for_tat: 48,
        grudger: 7,
        yair: 5
    },
    {
        name: "iteration 13",
        tit_for_tat: 50,
        grudger: 8,
        yair: 2
    },
    {
        name: "iteration 14",
        tit_for_tat: 48,
        grudger: 10,
        yair: 3
    },
    {
        name: "iteration 15",
        tit_for_tat: 52,
        grudger: 4,
        yair: 4
    },


];

// const data = [
//         {
//             "name": "Page A",
//             "uv": 4000,
//             "pv": 2400,
//             "amt": 2400
//         },
//         {
//             "name": "Page B",
//             "uv": 3000,
//             "pv": 1398,
//             "amt": 2210
//         },
//         {
//             "name": "Page C",
//             "uv": 2000,
//             "pv": 9800,
//             "amt": 2290
//         },
//         {
//             "name": "Page D",
//             "uv": 2780,
//             "pv": 3908,
//             "amt": 2000
//         },
//         {
//             "name": "Page E",
//             "uv": 1890,
//             "pv": 4800,
//             "amt": 2181
//         },
//         {
//             "name": "Page F",
//             "uv": 2390,
//             "pv": 3800,
//             "amt": 2500
//         },
//         {
//             "name": "Page G",
//             "uv": 3490,
//             "pv": 4300,
//             "amt": 2100
//         }
//     ];


export default function IterationsChart(props) {
    const theme = useTheme();
    const getStrategies = () => {
        let strats = [];
        for (let strat in props.quantities[0]){
            strats = strats.concat([strat]);
        }
        return strats
    };

    return (
        <React.Fragment>
            <Title>Today</Title>
            <ResponsiveContainer height={350} width="95%">
                <LineChart onClick={(e) => e != null ? props.setIter(e.activeLabel) : null} data={props.quantities}
                           margin={{ top: 5, right: 30, left: 20, bottom: 100 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    {
                        getStrategies().map((val, i) =>
                            (<Line type="monotone" dataKey={val} stroke={props.colors[val]} />))
                    }
                    {/*<Line type="monotone" dataKey="tit_for_tat" stroke="#8884d8" />*/}
                    {/*<Line type="monotone" dataKey="yair" stroke="#82ca9d" />*/}
                    {/*<Line type="monotone" dataKey="grudger" stroke="#82ca22" />*/}
                </LineChart>
            </ResponsiveContainer>
        </React.Fragment>
    );
}

