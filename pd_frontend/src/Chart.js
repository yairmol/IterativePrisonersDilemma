import React from 'react'
import PopUpDet from './PopUpStratDetails';
import {construct} from './getInfo'
import {BarChart, Bar, Tooltip, XAxis, YAxis, ResponsiveContainer, Cell} from 'recharts';
import Title from "./template/Title";

const Component = React.Component;

const colors = ["#ed553b", "#f6d55c", "#3caea3", "#20639b",
    "#7268a6", "#32a852"];

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
                <Title>
                    Average total score of every strategy
                </Title>
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
                    <Bar dataKey="score" fill="#82ca9d">
                        {this.props.scores.map((entry, index) => <Cell fill={this.props.colors[entry.name]}/>)}
                    </Bar>
                </BarChart>
                </ResponsiveContainer>
                {this.state.showStratDetails ? <PopUpDet score={this.score} label={this.label}
                                                         iteration={this.props.iteration}
                                                         toggle={this.closeWindow}/> : null}
                {/*You can get reference to the chart instance as shown above using onRef. This allows you to access all chart properties and methods*/}
            </div>
        );
    }
}

export default Chart;

