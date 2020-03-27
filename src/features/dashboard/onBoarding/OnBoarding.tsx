import React, { ReactElement } from 'react'
import './OnBoarding.scss'
import onBoard from '../../../assets/onBoard.svg';
interface Props {

}

export default function OnBoarding(props: Props): ReactElement {
    const data = [{ text: 'Brand your account', subText: 'Make your brand visible - Your company logo appears on the test platform', done: true },
    { text: 'Buy your first test now', subText: 'Buy tests as low as 1 to start recruiting', done: true },
    { text: 'Send your first test now', subText: 'Start assessing your candidates and view their performance', done: false },
    { text: 'Know your cut-offs', subText: 'Make your shortlisting process efficient and faster', done: false },
    ]
    const click = () => {
        console.log('clicked');
    }
    return (
        <React.Fragment>
            <div className="onBoard_wrapper">
                <div className="vertical-line"></div>
                <div className="area">
                    <div className="flex-area1">
                        <label htmlFor="" className="heading">Get started with MindScribble</label>
                        <label htmlFor="" className="sub-heading">Set up your account and learn how to get the most from MindScribble.</label>
                    </div>
                </div>
                <div className="onBoard_content">
                    <div className="card_column">{
                        data.map((element: { text: string, subText: string, done: boolean }, index) => {
                            return (
                                <div onClick={element.done ? null : () => { click() }} style={element.done ? { cursor: 'auto' } : { cursor: 'pointer' }} key={index} className="card_Wrapper">
                                    {element.done ? <div className='fa-check'><i className="fa-check-regular"></i></div> : <div className='sno'>{index + 1}</div>}
                                    <div className='card_content_wrapper'>
                                        <div className='card_title'>{element.text}</div>
                                        <div className='card_text'>{element.subText}</div>
                                    </div>
                                    <div className='fa-left'><i className="chevron-left"></i></div>
                                </div>
                            )
                        })
                    }</div>
                    <div className="img_column">
                        <img className='onBoard_img' src={onBoard} alt="" />
                    </div>
                </div>
            </div>
        </React.Fragment>
    )
}
