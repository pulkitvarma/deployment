import React, { ReactElement, useState, useEffect } from 'react'
import ind from '../../../../assets/in.svg'
import id from '../../../../assets/id.svg'
import './CountrySelect.scss';

interface Props {

}

const countries = {
    IN: 'India',
    ID: 'Indonesia'
}
const flags = {
    IN: ind,
    ID: id
}



export default function CountrySelect(props): ReactElement {
    const [countryCode, setCountryCode] = useState(props.defaultCountry)
    const [disp, setDisp] = useState(false)
    let shownCountries = {}
    if (props.shownCountries) {
        props.shownCountries.forEach(country => {
            shownCountries[country] = countries[country];
        })
    } else {
        shownCountries = countries
    }

    useEffect(() => {
        window.addEventListener("click", closeOptions);
        return () => {
            window.removeEventListener('click', closeOptions);
        }
    }, []);
    const closeOptions = (e) => {
        let id = (e.target.id);
        if (id != 'dont') {
            setDisp(false)
        }
    }

    const countryToDisplay = (code: string, from: string, index?: number) => {
        return (
            <div key={index} onClick={from === 'all' ? () => setCountry(code) : null} className='countryDisplay'>
                <img id='dont' className='flag' src={flags[code.toUpperCase()]} alt="" />
                <div id='dont' className='countryName'>{shownCountries[code]}</div>
            </div>
        );
    }

    const setCountry = (code: string) => {
        setCountryCode(code)
        setDisp(false)
        props.onSelect(code);
    }

    const allCounties = () => {
        const arrayOfObj = Object.entries(shownCountries).map((e) => ({ code: e[0], name: e[1] }));
        return (arrayOfObj);
    }
    const showAllCountries = () => {
        setDisp(!disp)
    }

    return (
        <React.Fragment>
            <div id='dont' onMouseDown={() => showAllCountries()} className='countryDisplayWrapper'>
                {countryToDisplay(countryCode, 'default')}
                <div id='dont' className='downArrow'>▼</div>
            </div>
            {
                disp ?
                    <div className='allCountriesWrapper'>
                        {allCounties().map((country, index) => {
                            return countryToDisplay(country.code, 'all', index);
                        })}
                    </div>
                    :
                    <span></span>
            }
        </React.Fragment>
    )
}
