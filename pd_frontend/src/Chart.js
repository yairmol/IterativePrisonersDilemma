import CanvasJSReact from './canvasjs/canvasjs.react';
import {getScores} from './getInfo';
import PopUpDet from './PopUpStratDetails';
import {construct} from './getInfo'
import {
    BarChart, Bar, Cell, CartesianGrid, Tooltip, Legend,
} from 'recharts';
import { LineChart, Line, XAxis, YAxis, Label, ResponsiveContainer } from 'recharts';


var React = require('react');
var Component = React.Component;
var CanvasJS = CanvasJSReact.CanvasJS;
var CanvasJSChart = CanvasJSReact.CanvasJSChart;


class Chart extends Component {
    state = {
        showStratDetails: false,
    }
    label = null

    closeWindow = () => {
        this.setState({
            showStratDetails: false
        })
    }

    render() {
        construct();

        return (
            <div>
                <BarChart
                    width={500}
                    height={300}
                    data={getScores()}
                    margin={{
                        top: 5, right: 30, left: 20, bottom: 5,
                    }}
                    onClick={(e) => {
                        this.label = e.activePayload[0].payload.label;
                        this.score = e.activePayload[0].payload.y;
                        this.setState({
                            showStratDetails: true
                        })
                    }}
                >
                    <XAxis dataKey="label"/>
                    <YAxis/>
                    <Tooltip/>
                    <Bar dataKey="y" fill="#82ca9d"/>
                </BarChart>
                {this.state.showStratDetails ? <PopUpDet score={this.score} label={this.label} toggle={this.closeWindow}/> : null}
                {/*You can get reference to the chart instance as shown above using onRef. This allows you to access all chart properties and methods*/}
            </div>
        );
    }
}

export default Chart;

