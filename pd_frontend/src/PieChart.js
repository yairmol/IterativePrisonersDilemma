import React, {useState} from 'react';
import { useTheme } from '@material-ui/core/styles';
import {PieChart, Pie, Line, XAxis, YAxis, Label, ResponsiveContainer, Tooltip} from 'recharts';
import Title from './template/Title';
import CartesianGrid from "recharts/lib/cartesian/CartesianGrid";
import Legend from "recharts/lib/component/Legend";
import Slider from "@material-ui/core/Slider";

// Generate Sales Data
function createData(time, amount) {
    return { time, amount };
}

export default function IterationsChart() {
    const theme = useTheme();
    const [data, setData] = useState([{name: "G1", value: 30}, {name: "G2", value: 30}]);


    return (
        <React.Fragment>
            <Slider
                defaultValue={30}
                onChange={(e, value) => {
                    const new_data = data.slice(0);
                    new_data[0]['value'] = value;
                    setData(new_data)
                }}
                value={data[0]['value']}
                aria-labelledby="discrete-slider"
                valueLabelDisplay="auto"
                step={10}
                marks
                min={10}
                max={110}
            />
            <ResponsiveContainer height={300} width="95%">

                {/*<Slider*/}
                {/*    defaultValue={30}*/}
                {/*    value={data[1]['value']}*/}
                {/*    aria-labelledby="discrete-slider"*/}
                {/*    valueLabelDisplay="auto"*/}
                {/*    step={10}*/}
                {/*    marks*/}
                {/*    min={10}*/}
                {/*    max={110}*/}
                {/*/>*/}
                <PieChart width={730} height={250}>
                    <Pie data={data} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={50} fill="#8884d8" />
                    <Tooltip/>
                    <legend/>
                </PieChart>

            </ResponsiveContainer>
        </React.Fragment>
    );
}

