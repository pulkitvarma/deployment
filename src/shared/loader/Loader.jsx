import React from 'react'
import loader from '../../assets/loader.svg'
import './Loader.scss'
export default function Loader() {
    return (
        <div className='container-fluid1'>
            <div className='container11'>
                <img src={loader} alt="" />
            </div>
        </div>
    )
}
