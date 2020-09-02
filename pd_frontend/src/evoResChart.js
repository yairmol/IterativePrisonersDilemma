import React, {PureComponent} from 'react';
import { LineChart, Line, XAxis, YAxis, Label, ResponsiveContainer , PieChart, Pie} from 'recharts';
import {
    BarChart, Bar, Cell, CartesianGrid, Tooltip, Legend
} from 'recharts';
import Slider from '@material-ui/core/Slider';
import Title from "./template/Title";


const COLORS = ["#ed553b", "#f6d55c", "#3caea3", "#20639b",
    "#7268a6", "#32a852"];

// const data01 = [
//     {
//         "name": "Group A",
//         "value": 400
//     },
//     {
//         "name": "Group B",
//         "value": 300
//     },
//     {
//         "name": "Group C",
//         "value": 300
//     },
//     {
//         "name": "Group D",
//         "value": 200
//     },
//     {
//         "name": "Group E",
//         "value": 278
//     },
//     {
//         "name": "Group F",
//         "value": 189
//     }
// ];
// const data02 = [
//     {
//         "name": "Group A",
//         "value": 2400
//     },
//     {
//         "name": "Group B",
//         "value": 4567
//     },
//     {
//         "name": "Group C",
//         "value": 1398
//     },
//     {
//         "name": "Group D",
//         "value": 9800
//     },
//     {
//         "name": "Group E",
//         "value": 3908
//     },
//     {
//         "name": "Group F",
//         "value": 4800
//     }
// ];

var iteration = 0;
var data = [];

const setData = (quants) =>{
    data = [];
    for(const x in quants) {
        data = data.concat({name: x, value: quants[x]})
    }
}
    


export default class Res extends PureComponent {

    static jsfiddleUrl = 'https://jsfiddle.net/alidingling/30763kr7/';

    render() {
        setData(this.props.scores)
        return (
            <div>
            {/* <Slider
                onChange={(e, val) => this.setState({data: getData(val)})}
                defaultValue={0}
                aria-labelledby="discrete-slider-small-steps"
                step={5}
                marks = {true}
                min={0}
                max={50}
                valueLabelDisplay="auto"
            /> */}
            <Title>
                    Strategy Quantities
            </Title>
            <PieChart width={300} height={300} margin={{
                        top: 5, right: 30, left: 20, bottom: 5,
                    }}>
                <Pie 
                    data={data} 
                    dataKey="value" 
                    nameKey="name" 
                    cx="50%" 
                    cy="50%" 
                    outerRadius={100} 
                    fill="#8884d8" 
                    onClick={(x) => alert(x.name)}
                    label
                    >
                    	{
                    	data.map((entry, index) => <Cell fill={this.props.colors[entry.name]}/>)
                    }
                    </Pie>
                    <Tooltip/>
                    {/* <Legend content={renderLegend} layout='vertical' verticalAlign="middle" align="right"/> */}
            </PieChart>
            </div>
        );
    }
}

// const renderLegend = (props) => {
//     const { payload } = props;
//     const spaces = "    ";
//     return (
//         <ul>
//             {
//                 payload.map((entry, index) => (
//                     <li style={{color: COLORS[index % COLORS.length]}} key={`item-${index}`}>
//                         {entry.value}
//                     </li>
//                 ))
//             }
//         </ul>
//     );
// }


