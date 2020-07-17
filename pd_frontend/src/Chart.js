import React from 'react'
import PopUpDet from './PopUpStratDetails';
import {construct} from './getInfo'
import {BarChart, Bar, Tooltip, XAxis, YAxis, ResponsiveContainer} from 'recharts';

const Component = React.Component;


class Chart extends Component {
    state = {
        showStratDetails: false,
    };
    label = null;

    closeWindow = () => {
        this.setState({
            showStratDetails: false
        })
    };

    render() {
        return (
            <div>
                <ResponsiveContainer height={300} width="95%">
                <BarChart

                    data={this.props.scores}
                    margin={{
                        top: 5, right: 30, left: 20, bottom: 5,
                    }}
                    onClick={(e) => {
                        this.label = e.activePayload[0].payload.name;
                        this.score = e.activePayload[0].payload.score;
                        this.setState({
                            showStratDetails: true
                        })
                    }}
                >
                    <XAxis dataKey="name"/>
                    <YAxis/>
                    <Tooltip/>
                    <Bar dataKey="score" fill="#82ca9d"/>
                </BarChart
>
                </ResponsiveContainer>
                {this.state.showStratDetails ? <PopUpDet score={this.score} label={this.label} toggle={this.closeWindow}/> : null}
                {/*You can get reference to the chart instance as shown above using onRef. This allows you to access all chart properties and methods*/}
            </div>
        );
    }
}

export default Chart;

