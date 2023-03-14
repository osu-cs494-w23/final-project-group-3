import React from 'react';

import CanvasJSReact from "../assets/canvasjs.react";

var CanvasJS = CanvasJSReact.CanvasJS;
var CanvasJSChart = CanvasJSReact.CanvasJSChart;
 
function PriceHistoryChart(props) {
    const dataPoints = props.xAxis.map( (x, y) =>  ({ x: new Date(x), y: Number(props.yAxis[y]) }) )

    const options = {
        animationEnabled: true,
        theme: "light2",
        title:{
            text: `ZHVI by month: ${props.name}`
        },
        axisX:{
            valueFormatString: "DD MMM YY",
            crosshair: {
                enabled: true,
                snapToDataPoint: true
            }
        },
        axisY: {
            title: "Home Value",
            valueFormatString: "$##0.00",
            crosshair: {
                enabled: true,
                snapToDataPoint: true,
                labelFormatter: function(e) {
                    return "$" + CanvasJS.formatNumber(e.value, "##0.00");
                }
            }
        },
        data: [{
            type: "area",
            xValueFormatString: "DD MMM YY",
            yValueFormatString: "$##0.00",
            dataPoints: dataPoints
        }]
    }
    
    return (
    <div>
        <CanvasJSChart options = {options} 
            /* onRef={ref => this.chart = ref} */
        />
        {/*You can get reference to the chart instance as shown above using onRef. This allows you to access all chart properties and methods*/}
    </div>
    )
}
 
export default PriceHistoryChart