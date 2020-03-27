import React, { Component } from 'react'
import { Bar } from 'react-chartjs-2';

export default class IPRChart extends Component {
    data = {
        labels: this.props.XAxisValue,
        datasets: [
            {
                label: this.props.lineLabel,
                type: 'line',
                data: this.props.lineData,
                fill: false,
                borderColor: this.props.lineBorderColor,
                backgroundColor: this.props.LineBackgroundColor,
                pointBorderColor: this.props.LinePointBorderColor,
                pointBackgroundColor: this.props.LinePointBackgroundColor,
                pointHoverBackgroundColor: this.props.LinePointHoverBackgroundColor,
                pointHoverBorderColor: this.props.LinePointHoverBorderColor,
                yAxisID: 'y-axis-1'
            }, {
                label: this.props.barLabel,
                backgroundColor: this.props.barBackgroundColor,
                borderColor: this.props.barBorderColor,
                hoverBackgroundColor: this.props.barHoverBackgroundColor,
                hoverBorderColor: this.props.barHoverBorderColor,
                data: this.props.barData,
                yAxisID: 'y-axis-1'
            }
        ]
    };

    options = {
        title: {
            display: true,
            text: 'Individual Performance Report',
            fontSize: 18,
            fontFamily: 'ubuntu',

        },
        maintainAspectRatio: false,
        responsive: true,
        tooltips: {
            mode: 'label'
        },
        elements: {
            line: {
                fill: false
            }
        },
        scales: {
            xAxes: [
                {
                    display: true,
                    gridLines: {
                        display: true
                    },
                    scaleLabel: {
                        display: true,
                        labelString: this.props.xAxisText
                    }
                }
            ],
            yAxes: [
                {
                    display: true,
                    position: 'left',
                    id: 'y-axis-1',
                    gridLines: {
                        display: true
                    },
                    scaleLabel: {
                        display: true,
                        labelString: this.props.yAxisText
                    },
                    ticks: {
                        beginAtZero: true,
                        callback: function (value, index, values) {
                            return value + '%';
                        }
                    },
                },
            ]
        }
    };

    render() {
        return (
            <Bar
                data={this.data}
                options={this.options}
            />
        )
    }
}
