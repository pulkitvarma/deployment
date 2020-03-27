import React, { ReactElement } from 'react'
import CustomTabs from '../tabs/CustomTabs'
import nodata from '../../assets/nodata.png'
import './NoDataWithTabs.scss'
interface Props {
    apiColumns: Array<string>
}

export default function NoDataWithTabs(props: Props): ReactElement {
    const generateElement = () => {
        return (<React.Fragment>
            <div className='nodata'>
                {props.apiColumns.map((e, i) => {
                    return <div className={`nodata${i}`} key={i}>{e}</div>
                })}
            </div>
            <hr style={{ marginTop: '15px' }} />
            <div className='nodataImgWrapper'>
                <img src={nodata} alt="" />
            </div>
        </React.Fragment>)
    }
    return (
        <div>
            <CustomTabs
                data={[
                    {
                        label: "General Aptitude Test",
                        element:generateElement()
                    },
                    {
                        label: "Basic Programming Test",
                        element:generateElement()
                    }
                ]}
                activeTab={0}
            />
        </div>
    )
}
