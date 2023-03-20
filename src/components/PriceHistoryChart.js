import React from 'react';
import styled from '@emotion/styled/macro'

import CanvasJSReact from "../assets/canvasjs.react";

var CanvasJS = CanvasJSReact.CanvasJS;
var CanvasJSChart = CanvasJSReact.CanvasJSChart;

const ChartContainer = styled.div`
    border: 1px solid dimgray;
    margin: 15px;
`
 
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
            valueFormatString: "$#,#00.00",
            crosshair: {
                enabled: true,
                snapToDataPoint: true,
                labelFormatter: function(e) {
                    return "$" + CanvasJS.formatNumber(e.value, "#,#00.00");
                }
            }
        },
        data: [{
            type: "area",
            xValueFormatString: "DD MMM YY",
            yValueFormatString: "$#,#00.00",
            dataPoints: dataPoints
        }],
        zoomEnabled: true
    }
    
    return (
        <ChartContainer>
            <CanvasJSChart options = {options} 
                /* onRef={ref => this.chart = ref} */
            />
            {/*You can get reference to the chart instance as shown above using onRef. This allows you to access all chart properties and methods*/}
        </ChartContainer>
    )
}
 
export default PriceHistoryChart
