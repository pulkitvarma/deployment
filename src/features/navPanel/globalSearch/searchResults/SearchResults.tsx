import React, { ReactElement } from 'react'
import './SearchResults.scss'
interface Props {
    scheduledContent: { data: Array<{}>, more: boolean };
    reportsContent: { data: Array<{}>, more: boolean };
    count: {
        total: number;
        scheduled: number;
        reports: number;
    };
    redirect: Function;
    // applyFilter: Function;
    showMoreRows: Function
}

export default function searchResults(props: Props): ReactElement {
    const mapRows = (category: string) => {
        return props[category].data.map(
            (e, i) => {
                return (
                    <div id={`${category}`} onClick={() => {
                        props.redirect(e, category);
                    }} className="emailNtype">
                        <div className="searchedEmail">
                            <span>
                                {e.email}
                            </span>
                        </div>
                        <div className='otherInfoWrapper'>
                            <div className="type">{e.type}</div>
                            {category === 'reportsContent' ?
                                <React.Fragment>
                                    <div className='dot'></div>
                                    <div className="type"><span className='property'>Test Date </span><span className='value'>{e.date}</span></div>
                                </React.Fragment>
                                :
                                <React.Fragment>
                                    <div className='dot'></div>
                                    <div className="type"><span className='property'>Scheduled Date </span><span className='value'>{e.scheduledDate}</span></div>
                                    <div className='dot'></div>
                                    <div className="type"><span className='property'>Expiry Date </span><span className='value'>{e.expiryDate}</span></div>
                                    <div className='dot'></div>
                                    <div style={e.teststatus === 'Unattempted' ? { color: 'red' } : e.teststatus === 'In Progress' ? { color: '#27AE60' } : e.testStatus === 'Scheduled' ? { color: '#FF9800' } : { color: '#999FB7' }} className="type">{e.teststatus}</div>
                                </React.Fragment>}
                        </div>
                    </div>
                );
            }
        );
    }
    return (
        <React.Fragment>
            <div id='searchPanel'>
                <div>
                    {props.count.total > 0 ? (
                        <span>
                            {/* <div className='searchFilters'>
                                <span onClick={() => props.applyFilter({ target: { value: 'clear' } })} className='clearFilters'>Clear</span>
                                <span id='reportTagWrapper' onChange={(e) => { props.applyFilter(e) }} className='tagsSearchResults'>
                                    <input value='reports' className='radioBtn' type="radio" name="filter" id="reportMaster" />
                                    <span id='reportSlave' className='text'>Reports</span>
                                </span>
                                <span id='scheduleTagWrapper' onChange={(e) => { props.applyFilter(e) }} className='tagsSearchResults'>
                                    <input value='scheduled' className='radioBtn' type="radio" name="filter" id="scheduleMaster" />
                                    <span id='scheduleSlave' className='text'>Scheduled Tests</span>
                                </span>
                            </div> */}
                            <div className="count">
                                {props.count.total} Results Found
                            </div>
                            <div style={{ border: "1px solid #F2F4FA" }}></div>
                            <div className="contentSearch">
                                {props.count.reports > 0 ? (
                                    <div>
                                        <div className="categoryHeading">Reports({props.count.reports})</div>
                                        <div>
                                            {mapRows("reportsContent")}
                                        </div>
                                        <div>
                                            {props.reportsContent.more ? <div id='showMoreReports' onClick={() => props.showMoreRows('reports')} className='showMore'>Show More&nbsp;&nbsp;<i className="chevron-down"></i></div> : <span></span>}
                                        </div>
                                    </div>
                                ) : (
                                        <span></span>
                                    )}
                                {props.count.scheduled > 0 ? (
                                    <div>
                                        <div className="categoryHeading">
                                            Scheduled Tests({props.count.scheduled})
                                    </div>
                                        <div>{mapRows("scheduledContent")}</div>
                                        <div>
                                            {props.scheduledContent.more ? <div id='showMoreScheduled' onClick={() => props.showMoreRows('scheduled')} className='showMore'>Show More&nbsp;&nbsp;<i className="chevron-down"></i></div> : <span></span>}
                                        </div>
                                    </div>

                                ) : (
                                        <span></span>
                                    )}
                            </div>
                        </span>
                    ) : (
                            <div className="noResult">No Results Found</div>
                        )}
                </div>
            </div>

        </React.Fragment>
    )
}

