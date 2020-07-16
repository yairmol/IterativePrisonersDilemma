import React, {PureComponent} from 'react';
import { useTheme } from '@material-ui/core/styles';
import { LineChart, Line, XAxis, YAxis, Label, ResponsiveContainer } from 'recharts';
import Title from './Title';
import {
    BarChart, Bar, Cell, CartesianGrid, Tooltip, Legend,
} from 'recharts';

// Generate Sales Data
function createData(time, amount) {
    return { time, amount };
}

const data1 = [
    createData('00:00', 0),
    createData('03:00', 300),
    createData('06:00', 600),
    createData('09:00', 800),
    createData('12:00', 1500),
    createData('15:00', 2000),
    createData('18:00', 2400),
    createData('21:00', 2400),
    createData('24:00', undefined),
];

const data = [
    {
        name: 'Page A', uv: 4000, pv: 2400, amt: 2400,
    },
    {
        name: 'Page B', uv: 3000, pv: 1398, amt: 2210,
    },
    {
        name: 'Page C', uv: 2000, pv: 9800, amt: 2290,
    },
    {
        name: 'Page D', uv: 2780, pv: 3908, amt: 2000,
    },
    {
        name: 'Page E', uv: 1890, pv: 4800, amt: 2181,
    },
    {
        name: 'Page F', uv: 2390, pv: 3800, amt: 2500,
    },
    {
        name: 'Page G', uv: 3490, pv: 4300, amt: 2100,
    },
];

export default class Example extends PureComponent {
    static jsfiddleUrl = 'https://jsfiddle.net/alidingling/30763kr7/';

    render() {
        return (
            <BarChart
                width={1000}
                height={300}
                data={data}
                margin={{
                    top: 5, right: 30, left: 20, bottom: 5,
                }}
            >
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="pv" fill="#8884d8" />
                <Bar dataKey="uv" fill="#82ca9d" />
            </BarChart>
        );
    }
}

// export default function Chart() {
//     const theme = useTheme();
//
//     return (
//         <React.Fragment>
//             <Title>Today</Title>
//             <ResponsiveContainer>
//                 <LineChart
//                     data={data}
//                     margin={{
//                         top: 16,
//                         right: 16,
//                         bottom: 0,
//                         left: 24,
//                     }}
//                 >
//                     <XAxis dataKey="time" stroke={theme.palette.text.secondary} />
//                     <YAxis stroke={theme.palette.text.secondary}>
//                         <Label
//                             angle={270}
//                             position="left"
//                             style={{ textAnchor: 'middle', fill: theme.palette.text.primary }}
//                         >
//                             Sales ($)
//                         </Label>
//                     </YAxis>
//                     <Line type="monotone" dataKey="amount" stroke={theme.palette.primary.main} dot={false} />
//                 </LineChart>
//             </ResponsiveContainer>
//         </React.Fragment>
//     );
// }