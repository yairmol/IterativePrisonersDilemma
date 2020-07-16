import CanvasJSReact from './canvasjs/canvasjs.react';
import {getScores} from './getInfo';
import PopUpDet from './PopUpStratDetails';
import {construct} from './getInfo'

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
      const options = {
        exportEnabled: false,
      animationEnabled: true,
      title:{
      },
      // subtitles: [{
      // 	text: "Click Legend to Hide or Unhide Data Series"
      // }], 
      axisX: {
          title: "strategies"
      },
      axisY: {
          title: "Score",
          titleFontColor: "#4F81BC",
          lineColor: "#4F81BC",
          labelFontColor: "#4F81BC",
          tickColor: "#4F81BC"
      },
      // toolTip: {
      // 	shared: true
      // },
      data: [
      {
          click: (e) => {
            this.label = e.dataPoint.label;
            this.setState({
              showStratDetails: true
            })
          },
          type: "column",
          name: "Clutch",
          axisYType: "secondary",
          showInLegend: false,
          yValueFormatString: "#,##0.# Units",
          dataPoints: getScores()
      }]
  };
  
      return (
          <div>
            <CanvasJSChart options = {options}
                /* onRef={ref => this.chart = ref} */
            />
            {this.state.showStratDetails ? <PopUpDet label={this.label} toggle={this.closeWindow}/> : null}
            {/*You can get reference to the chart instance as shown above using onRef. This allows you to access all chart properties and methods*/}
          </div>
      );
    }
  }

  export default Chart;
