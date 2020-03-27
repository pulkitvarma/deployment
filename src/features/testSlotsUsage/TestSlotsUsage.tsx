import './TestSlotsUsage.scss';
import React, { ReactElement } from 'react';
import Table from '../../shared/table/Table';

interface IProps {
    history: { push: Function },
    location: {},
    match: {
        path: string
    }
}

export default function TestSlotsUsage(props: IProps): ReactElement {

    const legendData = [
        {
            title: "Test Slots Added",
            description: "Number of test slots purchased on mentioned date"
        },
        {
            title: "Test Slots Available",
            description: "Total test balance available on that date before scheduling any test"
        },
        {
            title: "Tests Scheduled",
            description: "Tests scheduled by the admin on that date"
        },
        {
            title: "Tests Completed",
            description: "Tests completed by the candidate on that date"
        },
        {
            title: "Tests Pending",
            description: "Tests scheduled by the admin but not yet completed by the candidate"
        },
        {
            title: "Test Slots Remaining",
            description: "Total available tests which can be used. This is calculated as Cummulative balance minus the tests scheduled on that date"
        },
    ]

    const apiColumns = ["Date", "Test Slots Added", "Test Slots Available", "Tests Scheduled", "Tests Completed", "Tests Pending", "Test Slots Remaining"];

    const rows: Array<{}> = generateData();

    return (
        <div className="test-slots-wrapper">
            <div className="test-slots-main">
                <div className="vertical-line"></div>
                <div className="test-slots-main-area">
                    <div className="flex-area1">
                        <label className="heading">
                            Test Slots Usage
                        </label>
                        <label className="sub-heading">
                            View your test slots usage and buying behaviour, scheduling history and slots availability.
                        </label>
                    </div>
                    <div className="test-slots-main-description">
                        <div className="test-slots-fact">
                            <div className="facts fact1">
                                <label className="fact-heading">
                                    Total Tests Purchased
                            </label>
                                <label className="fact-score">
                                    50
                            </label>
                            </div>
                            <div className="facts fact2">
                                <label className="fact-heading">
                                    Total Tests Scheduled
                            </label>
                                <label className="fact-score">
                                    42
                            </label>
                            </div>
                            <div className="facts fact3">
                                <label className="fact-heading">
                                    Tests Pending
                            </label>
                                <label className="fact-score">
                                    03
                            </label>
                            </div>
                            <div className="facts fact4">
                                <label className="fact-heading">
                                    Test Slots Remaining
                            </label>
                                <label className="fact-score">
                                    06
                            </label>
                            </div>
                        </div>
                        <button onClick={() => { props.history.push('/application/buyTests') }} className="link">Get More Test Slots  &nbsp; <i className="chevron-left bold"></i></button>
                    </div>
                </div>
                <div className="table-wrapper">
                    <div className="table-data">
                        <Table
                            className={"test-slots-main-table"}
                            columns={apiColumns}
                            rows={rows}
                            pagingPermission={false}
                            searchingPermission={false}
                            sortablePermission={false}
                        ></Table>
                        <div className="dashed-horizontal-line"></div>
                        <div className="table-legends">
                            {legendData.map((data, index) => {
                                return (
                                    <div key={index} className="table-legend-data">
                                        <span className="table-heading">{data.title}</span>
                                        <span className="table-colon">:</span>
                                        <span className="table-description">{data.description}</span>
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export const generateData = (): Array<{}> => {
    const date = ["02/11/2020, 01:23 PM",
        "11/17/2019, 12:00 PM",
        "11/18/2019, 11:23 AM",
        "11/19/2019, 10:20 PM",
        "11/20/2019, 08:23 AM"];
    const added = ["0", "20", "30", "10", "5"];
    const available = ["02", "05", "28", "35", "42"];
    const scheduled = ["10", "20", "30", "40", "5"];
    const completed = ["50", "60", "70", "80", "90", "100"];
    const pending = ["5", "3", "4", "6", "8"];
    const remaining = ["2", "5", "8", "2", "9"];

    let rows = [];

    date.forEach((element, index) => {
        rows.push({
            date: element,
            added: added[index],
            available: available[index],
            scheduled: scheduled[index],
            completed: completed[index],
            pending: pending[index],
            remaining: remaining[index]
        })
    });
    return rows;
}
