import React, { Component } from 'react'
import { Bar } from 'react-chartjs-2';
export default class UPRChart extends Component {
    
    render() {
        let data = {
            labels: this.props.xAxisValues,
            datasets: [{
                label: this.props.barLabel,
                backgroundColor: this.props.barColor,
                borderColor: this.props.barColor,
                hoverBackgroundColor: this.props.barColor,
                hoverBorderColor: this.props.barColor,
                data: this.props.barData,
                yAxisID: 'y-axis-1',
            },
            {
                label: this.props.lineLabel,
                type: 'line',
                data: this.props.lineData,
                fill: true,
                borderWidth: 1,
                lineTension: 0.1,
                backgroundColor: this.props.lineBgColor,
                borderColor: '#FF9800',
                borderCapStyle: 'butt',
                borderDashOffset: 0.0,
                pointRadius: 0,
                pointBorderColor: this.props.linePointBorderColor,
                pointBackgroundColor: this.props.linePointBackgroundColor,
                pointBorderWidth: 0.1,
                pointHoverRadius: 0.1,
                pointHoverBackgroundColor: this.props.linePointHoverBackgroundColor,
                pointHoverBorderColor: this.props.linePointHoverBorderColor,
                yAxisID: 'y-axis-1'
            }
            ]
        };

        let options = {
            title: {
                display: false,
            },
            maintainAspectRatio: false,
            responsive: true,
            tooltips: {
                mode: 'label'
            },
            legend: {
                display: false
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
                        // type: 'linear',
                        position: 'bottom',
                        scaleLabel: {
                            display: true,
                            labelString: this.props.xAxisText + '\xa0\xa0\xa0-->',
                            fontStyle: 'normal',
                            fontFamily: 'Ubuntu',
                            fontSize: 12,
                            fontColor: '#666F94'
                        },
                        gridLines: {
                            display: true,
                            color: 'rgb(60, 81, 133,0.1)'
                        },
                        ticks: {
                            fontColor: '#7F87A6',
                            autoSkip: true,
                            maxTicksLimit: 11,
                            stepSize: .5,
                            beginAtZero: true,
                            callback: function (value, index, values) {
                                return value + '%';
                            },
                        }
                    }
                ],
                yAxes: [
                    {
                        display: true,
                        position: 'left',
                        id: 'y-axis-1',
                        gridLines: {
                            display: true,
                            color: 'rgb(60, 81, 133,0.1)'
                        },
                        scaleLabel: {
                            display: true,
                            labelString: this.props.yAxisText + '\xa0\xa0\xa0-->',
                            fontStyle: 'normal',
                            fontFamily: 'Ubuntu',
                            fontSize: 12,
                            fontColor: '#666F94'
                        },
                        ticks: {
                            fontColor: '#7F87A6',
                            beginAtZero: true,
                            callback: function (value, index, values) {
                                return value + '%';
                            },
                        },
                    },
                ]
            }
        };

        return (
            <React.Fragment>
                <Bar
                    data={data}
                    options={options}
                />
            </React.Fragment>
        )
    }
}
