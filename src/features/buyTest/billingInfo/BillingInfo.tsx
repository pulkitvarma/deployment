import React, { Component } from 'react'
import './BillingInfo.scss'
interface IProps {
    buttonStatus: Function
}
interface billingInfo {
    fullName: string;
    contactEmail: string;
    addressLine1: string;
    addressLine2: string;
    zipCode: string;
    country: string;
    countryState: string;
    city: string;
}
interface billingInfoErrorsFields {
    fullName: string;
    addressLine1: string;
    zipCode: string;
    countryState: string;
    city: string;
}
interface State {
    states: Array<{}>
    countries: Array<{}>
    enteredInfo: billingInfo
    enteredInfoErrors: billingInfoErrorsFields
}


export default class BillingInfo extends Component<IProps, State> {
    constructor(props: IProps) {
        super(props)
        this.validate = this.validate.bind(this);
        this.state = {
            states: [''],
            countries: [{}],
            enteredInfo: {
                fullName: '',
                contactEmail: '',
                addressLine1: '',
                addressLine2: '',
                zipCode: '',
                country: '',
                countryState: '',
                city: ''
            },
            enteredInfoErrors: {
                fullName: '',
                addressLine1: '',
                zipCode: '',
                countryState: '',
                city: ''
            }

        }
    }
    componentDidMount() {
        this.setState({
            countries: [{ name: 'India', code: 'IN' }]
        })
        this.setState({
            states: [{ code: '', name: 'Select State' },
            { code: '1', name: 'Andhra Pradesh' },
            { code: '2', name: 'Arunachal Pradesh' },
            { code: '3', name: 'Assam' },
            { code: '4', name: 'Goa' },
            { code: '5', name: 'Chhattisgarh' },
            { code: '6', name: 'Gujarat' },
            { code: '7', name: 'Haryana' },
            { code: '9', name: 'Bihar' },
            { code: '10', name: 'Himachal Pradesh' },
            { code: '11', name: 'Jammu and Kashmir' },
            { code: '12', name: 'Jharkhand' },
            { code: '13', name: 'Karnataka' },
            { code: '14', name: 'Kerala' },
            { code: '15', name: 'Madhya Pradesh' },
            { code: '16', name: 'Maharashtra' },
            { code: '17', name: 'Manipur' },
            { code: '18', name: 'Meghalaya' },
            { code: '19', name: 'Mizoram' },
            { code: '20', name: 'Nagaland' },
            { code: '21', name: 'Odisha' },
            { code: '22', name: 'Punjab' },
            { code: '23', name: 'Rajasthan' },
            { code: '24', name: 'Sikkim' },
            { code: '25', name: 'Tamil Nadu' },
            { code: '26', name: 'Telangana' },
            { code: '27', name: 'Tripura' },
            { code: '28', name: 'Uttar Pradesh' },
            { code: '29', name: 'Uttarakhand' },
            { code: '30', name: 'West Bengal' },
            { code: '31', name: 'Andaman and Nicobar' },
            { code: '32', name: 'Chandigarh' },
            { code: '33', name: 'Dadra and Nagar Haveli' },
            { code: '34', name: 'Daman and Diu' },
            { code: '35', name: 'Lakshadweep' },
            { code: '36', name: 'Delhi' },
            { code: '37', name: 'Puducherry' }],
            enteredInfo: {
                fullName: '',
                contactEmail: 'contact@cisco.com',
                addressLine1: '',
                addressLine2: '',
                zipCode: '',
                country: 'IN',
                countryState: '',
                city: ''
            }
        })
    }
    componentDidUpdate() {
        let t = 1;
        for (let field in this.state.enteredInfo) {
            if (field !== 'addressLine2') {
                if (this.state.enteredInfo[field].length === 0) {
                    t = 0;
                    break
                }
            }
        }
        this.props.buttonStatus(t)
    }
    async validate() {
        let t = 1;
        for (let field in this.state.enteredInfoErrors) {
            let p = await this.validation({ name: field })
        }
        for (let field in this.state.enteredInfoErrors) {
            if (this.state.enteredInfoErrors[field].length > 0) {
                t = 0;
                break;
            }
        }
        return { valid: t, info: this.state.enteredInfo }
    }

    mapFunction = (index, el) => {
        return (
            <option key={index} value={el.code}>{el.name}</option>
        )
    }

    setInState(e: any) {
        if (e.target.name === 'zipCode') {
            if (/^[0-9]*$/.test(e.target.value)) {
                this.setState({
                    enteredInfo: {
                        ...this.state.enteredInfo,
                        [e.target.name]: e.target.value,
                    }
                })
            }
        } else {
            this.setState({
                enteredInfo: {
                    ...this.state.enteredInfo,
                    [e.target.name]: e.target.value,
                }
            })
        }
    }

    validation(fieldDataBt: { name: string }) {
        switch (fieldDataBt.name) {
            case "fullName":
                if (this.state.enteredInfo.fullName.length < 5) {
                    this.setState({
                        enteredInfoErrors: {
                            ...this.state.enteredInfoErrors,
                            fullName: 'Minimum 5 characters'
                        }
                    })
                } else {
                    this.setState({
                        enteredInfoErrors: {
                            ...this.state.enteredInfoErrors,
                            fullName: ''
                        }
                    })
                }
                break;
            case "addressLine1":
                if (this.state.enteredInfo.addressLine1.length < 5) {
                    this.setState({
                        ...this.state,
                        enteredInfoErrors: {
                            ...this.state.enteredInfoErrors,
                            addressLine1: 'Minimum 5 characters'
                        }
                    })
                }
                else {
                    this.setState({
                        enteredInfoErrors: {
                            ...this.state.enteredInfoErrors,
                            addressLine1: ''
                        }
                    })
                }
                break;
            case "zipCode":
                if (this.state.enteredInfo.zipCode.length != 6) {
                    this.setState({
                        enteredInfoErrors: {
                            ...this.state.enteredInfoErrors,
                            zipCode: 'Enter Valid Zip Code',

                        }
                    })
                } else {
                    this.setState({
                        enteredInfoErrors: {
                            ...this.state.enteredInfoErrors,
                            zipCode: '',
                        }
                    })
                }
                break;
            case "countryState":
                if (this.state.enteredInfo.countryState.length === 0) {
                    this.setState({
                        enteredInfoErrors: {
                            ...this.state.enteredInfoErrors,
                            countryState: 'This Field is required',
                        }
                    })
                } else {
                    this.setState({
                        enteredInfoErrors: {
                            ...this.state.enteredInfoErrors,
                            countryState: '',
                        }
                    })
                }
                break;
            case "city":
                if (this.state.enteredInfo.city.length === 0) {
                    this.setState({
                        enteredInfoErrors: {
                            ...this.state.enteredInfoErrors,
                            city: 'This Field is required'
                        }
                    })
                } else {
                    this.setState({
                        enteredInfoErrors: {
                            ...this.state.enteredInfoErrors,
                            city: ''
                        }
                    })
                }
                break;
            default:
                break;
        }
    }

    render() {
        return (
            <React.Fragment>
                <div className='addressWrapper'>
                    <div className="vertical-line line-bold"></div>
                    <div className='adressMainContentWrapper'>
                        <div className='addressTitle'>
                            Billing Information
                        </div>
                        <div className='addressFieldsSet' >
                            <label className='fieldType1'>
                                <input id='fNameInput' name='fullName' value={this.state.enteredInfo.fullName} onChange={e => { this.setInState(e) }} onBlur={e => { this.validation({ name: e.target.name }) }} type="text" placeholder="&nbsp;" />
                                <span className="label">Full Name</span>
                                <span className="border"></span>
                                <label className='error' htmlFor="">{this.state.enteredInfoErrors.fullName}</label>
                            </label>

                            <label className='fieldType1 margin_left'>
                                <input disabled={true} name='contactEmail' value={this.state.enteredInfo.contactEmail} type="text" placeholder="&nbsp;" />
                                <span className="label">Company Email</span>
                                <span className="border"></span>
                            </label>
                        </div>
                        <div className='addressFieldsSet'>
                            <label className='fieldType1'>
                                <input id='add1Input' name='addressLine1' value={this.state.enteredInfo.addressLine1} onChange={e => { this.setInState(e) }} onBlur={e => { this.validation({ name: e.target.name }) }} type="text" placeholder="&nbsp;" />
                                <span className="label">Address 1</span>
                                <span className="border"></span>
                                <label className='error' htmlFor="">{this.state.enteredInfoErrors.addressLine1}</label>
                            </label>
                            <label className='fieldType1 margin_left'>
                                <input id='add2Input' name='addressLine2' value={this.state.enteredInfo.addressLine2} onChange={e => { this.setInState(e) }} type="text" placeholder="&nbsp;" />
                                <span className="label">Address 2(Optional)</span>
                                <span className="border"></span>
                            </label>
                        </div>
                        <div className='addressFieldsSet' style={{ width: '99%' }}>
                            <label style={{ width: '23.5%' }} className='fieldType1'>
                                <input id='zipInput' name='zipCode' value={this.state.enteredInfo.zipCode} onChange={e => { this.setInState(e) }} onBlur={e => { this.validation({ name: e.target.name }) }} type="text" placeholder="&nbsp;" />
                                <span className="label">Zip Code</span>
                                <span className="border"></span>
                                <label className='error' htmlFor="">{this.state.enteredInfoErrors.zipCode}</label>
                            </label>
                            <label style={{ width: '23.5%' }} className='fieldType1'>
                                <select onChange={e => { this.setInState(e) }} onBlur={e => { this.validation({ name: e.target.name }) }} value={this.state.enteredInfo.countryState} style={{ height: '53px' }} name="countryState" id="stateInput">
                                    {
                                        this.state.states.map((el: { code: string, name: string }, index) => {
                                            return this.mapFunction(index, el);
                                        })
                                    }
                                </select>
                                <span className="label">State</span>
                                <span className="border"></span>
                                <label className='error' htmlFor="">{this.state.enteredInfoErrors.countryState}</label>
                            </label>
                            <label style={{ width: '23.5%' }} className='fieldType1'>
                                <input onChange={e => { this.setInState(e) }} onBlur={e => { this.validation({ name: e.target.name }) }} value={this.state.enteredInfo.city} type="text" name='city' id='cityInput' placeholder="&nbsp;" />
                                <span className="label">City</span>
                                <span className="border"></span>
                                <label className='error' htmlFor="">{this.state.enteredInfoErrors.city}</label>
                            </label>
                            <label style={{ width: '23.5%' }} className='fieldType1'>
                                <select value={this.state.enteredInfo.country} onChange={e => { this.setInState(e) }} name='country' style={{ height: '53px' }} id="countryInput">
                                    {
                                        this.state.countries.map((el: { code: string, name: string }, index) => {
                                            return this.mapFunction(index, el);
                                        })
                                    }

                                </select>
                                <span className="label">Country</span>
                                <span className="border"></span>
                            </label>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        )
    }
}
