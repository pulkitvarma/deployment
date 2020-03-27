import React from 'react';
import logoWhite from '../../assets/logoWhite.svg';
import './ResetPassword.scss';
import HttpService from '../http/httpService';
import eye from '../../assets/eye.svg';
import eyeClose from '../../assets/eyeClose.svg';
interface IState {
  passwordRp: { value: string, valid: boolean, errorMessage: string, type: boolean },
  visib: boolean,
  masterVisib: boolean
}
interface IProps {
  location: { search: string },
  history: { push: Function }
}
class ResetPassword extends React.Component<IProps, IState>  {
  httpService = new HttpService();
  state: IState
  reset_id: string | string[] = ''
  constructor(props: IProps) {
    super(props)
    this.state = {
      passwordRp: { value: '', valid: false, errorMessage: '', type: true },
      visib: true,
      masterVisib: false
    }
  }
  componentDidMount(): void {
    const urlParams = new URLSearchParams(this.props.location.search)
    let value = urlParams.get('reset_id')
    this.reset_id = value;
    if (this.reset_id && this.reset_id.length > 0) {
      this.setState({ masterVisib: true })
    } else {
      this.props.history.push('/')
    }
  }

  setValueInStateRp(value) {
    this.setState({
      passwordRp: {
        ...this.state.passwordRp,
        value: value,
      }
    }, () => { this.validateValueRp('changeHandler') })
  }
  validateValueRp(from: string) {
    if (this.state.passwordRp.value.length < 6) {
      if (from === 'changeHandler') {
        this.setState({
          passwordRp: {
            ...this.state.passwordRp,
            valid: false,
            errorMessage: ''
          }
        })
      } else {
        this.setState({
          passwordRp: {
            ...this.state.passwordRp,
            valid: false,
            errorMessage: 'Minimum 6 characters',
          }
        })
      }
    } else {
      this.setState({
        passwordRp: {
          ...this.state.passwordRp,
          valid: true,
          errorMessage: ''
        }
      })
    }
  }
  submit = async () => {
    this.validateValueRp('submit')
    if (this.state.passwordRp.valid) {
      try {
        // const res = await this.httpService.resetPassword(this.reset_id.toString(), this.state.password.value)
        this.setState({ visib: false })
      } catch (error) {

      }
    }
  };

  showPassword = (): void => {
    this.setState({
      passwordRp: {
        ...this.state.passwordRp,
        type: !this.state.passwordRp.type
      }
    })
  }

  redirect = (): void => {
    this.props.history.push("/");
  }

  show = (): any => {
    if (this.state.visib) {
      return (
        <div className="rp-card">
          <div className="formWrap1">
            <span className="message">Password</span>
            <span className="sub-textrp">What would you like your new password to be ?</span>
            <div className="contain">
              <input name='password' id='pwdInputRp' type={this.state.passwordRp.type ? 'password' : 'text'} onBlur={e => this.validateValueRp('blur')} value={this.state.passwordRp.value} onChange={(e) => { this.setValueInStateRp(e.target.value) }} placeholder='New Password' className="emailfp" />
              <img id='togglePwd' className="toggle" onClick={() => { this.showPassword() }} src={this.state.passwordRp.type ? eye : eyeClose} alt="eye" />
            </div>
            <span className="error">{this.state.passwordRp.errorMessage}</span>
            <button onClick={() => { this.submit() }}
              id='submitRp'
              style={{ background: this.state.passwordRp.valid ? 'radial-gradient(49.96% 50.8% at 49.96% 49.86%,#ff8800 0%,#f08800 100%)' : '#edae5d' }}
              className="send-button">Save</button>
            <span id='cancel' onClick={() => { this.props.history.push('/') }} className='cancel'>Cancel</span>
          </div>
        </div>)
    } else {
      return (
        <div className="rp-card1">
          <span className="message">You’ve got a new password</span>
          <span className="sub-textrp">You have successfully updated your password !</span>
          <button id='cont' className="continue" onClick={() => { this.redirect() }}>Continue</button>
        </div>)
    }
  }

  public render() {
    return (
      <React.Fragment>
        {this.state.masterVisib ? <section className="wrapper-container">
          <div className="logo">
            <img src={logoWhite} alt="" />
          </div>
          {this.show()}
        </section> : <div></div>}
      </React.Fragment>
    );
  }
}

export default ResetPassword;
