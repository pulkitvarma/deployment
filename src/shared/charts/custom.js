import React, { Component } from 'react'
import { Line } from 'react-chartjs-2';

export default class Custom extends Component {
    data = {
        labels: ['Dev Tools', 'Copy-Paste', 'New Tab', 'Screen Shot'],
        datasets: [
            {
                label: 'No. Of Occurances',
                fill: false,
                lineTension: 0.7,
                backgroundColor: 'rgba(75,192,192,0.4)',
                borderColor: 'rgba(75,192,192,1)',
                borderCapStyle: 'butt',
                borderDash: [],
                borderDashOffset: 0.0,
                borderJoinStyle: 'miter',
                pointBorderColor: 'rgba(75,192,192,1)',
                pointBackgroundColor: '#fff',
                pointBorderWidth: 5,
                pointHoverRadius: 5,
                pointHoverBackgroundColor: 'rgba(75,192,192,1)',
                pointHoverBorderColor: 'rgba(220,220,220,1)',
                pointHoverBorderWidth: 2,
                pointRadius: 5,
                pointHitRadius: 10,
                data: [5, 1, 9, 2],
                yAxisID: 'y-axis-1'
            },
            {
                label: 'Marks Deducted',
                type: 'line',
                data: [15, 2, 18, 4],
                fill: false,
                borderColor: '#EC932F',
                backgroundColor: '#EC932F',
                pointBorderColor: '#EC932F',
                pointBackgroundColor: '#EC932F',
                pointHoverBackgroundColor: '#EC932F',
                pointHoverBorderColor: '#EC932F',
                yAxisID: 'y-axis-2',
                pointHoverBorderWidth: 5,
                pointRadius: 5,
                pointHitRadius: 10,
            }
        ]
    };

    options = {
        title: {
            display: true,
            text: 'Violations Chart',
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
                        labelString: 'Violation Types'
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
                        labelString: 'No. Of Occurances'
                    },
                    ticks: {
                        beginAtZero: true,
                        callback: function (value, index, values) {
                            return value;
                        }
                    },
                },
                {
                    display: true,
                    position: 'right',
                    id: 'y-axis-2',
                    gridLines: {
                        display: true
                    },
                    scaleLabel: {
                        display: true,
                        labelString: 'Marks Deducted'
                    },
                    ticks: {
                        beginAtZero: true,
                        callback: function (value, index, values) {
                            return value;
                        }
                    },
                }
            ]
        }
    };

    render() {
        return (
            <Line
                data={this.data}
                options={this.options}
            />
        )
    }
}
