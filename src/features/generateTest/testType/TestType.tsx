import React, { useEffect } from 'react';
import './TestType.scss';
import { connect } from 'react-redux';
import * as actionTypes from '../redux/types'
import radio_checked from '../../../assets/radio_checked.png';
import radio_unchecked from '../../../assets/radio_unchecked.svg';
import GatTestType from './gat/Gat'
import BptTestType from './bpt/Bpt';
interface IProps {
    testType: string,
    setTestType: Function
}
function TestType(props: IProps) {
    useEffect(() => {
        testTypeSelection(props.testType, 'load')
    }, []);

    const testTypeSelection = async (value: string, type: string) => {
        await selectType(value);
        if (type === 'update') {
            props.setTestType(value)
        }
    }
    return (
        <div className="test-generation-flow">
            <div className='box'>1. Test Type</div>
            <div className="test-type-wrapper">
                <p className="test-type-heading">Select a test type</p>
                <div className="test-type-options">
                    <div className="test-type">
                        <GatTestType selectType={(value,type)=>testTypeSelection(value,type)} />
                    </div>
                    <div className="test-type">
                        <BptTestType selectType={(value,type)=>testTypeSelection(value,type)} />
                    </div>
                </div>
                <div className="dashed-line-for-send-test"></div>
            </div>
        </div>
    )
}

export const selectType = (value: string): void => {
    let elements = document.querySelectorAll('#gatTitle,#bptTitle');
    if (value === 'gat') {
        document.getElementById('gat').classList.add('test-type-title-selected');
        document.getElementById('bpt').classList.remove('test-type-title-selected');
        document.getElementById('gatImage').setAttribute("src", radio_checked);
        (elements[0] as HTMLDivElement).style.color = '#FF9800';
        (elements[1] as HTMLDivElement).style.color = '#999fb7';
        document.getElementById('bptImage').setAttribute("src", radio_unchecked);
    } else if (value === 'bpt') {
        document.getElementById('bpt').classList.add('test-type-title-selected');
        document.getElementById('gat').classList.remove('test-type-title-selected');
        document.getElementById('bptImage').setAttribute("src", radio_checked);
        (elements[0] as HTMLDivElement).style.color = '#999fb7';
        (elements[1] as HTMLDivElement).style.color = '#FF9800';
        document.getElementById('gatImage').setAttribute("src", radio_unchecked);
    }
}

const mapDispatchToProps = (dispatch: Function) => {
    return {
        setTestType: (testType: string) => {
            dispatch({
                type: actionTypes.SET_TEST_TYPE,
                payload: testType
            })
        },
    }
}
const mapStateToProps = (state: { generateTest: { testType: string } }): { testType: {} } => {
    return {
        testType: state.generateTest.testType,
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(TestType)
