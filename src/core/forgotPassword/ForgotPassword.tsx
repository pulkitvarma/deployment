import React from 'react';
import { Link } from 'react-router-dom';
import './ForgotPassword.scss'
import logoWhite from '../../assets/logoWhite.svg'
import HttpService from '../http/httpService';

interface IState {
  emailfp: {
    value: string,
    valid: boolean,
    errorMessage: string
  },
  visib: boolean
}
interface IProps {

}
class ForgotPassword extends React.Component<IProps, IState>  {
  httpService = new HttpService();
  state: IState
  constructor(props: IProps) {
    super(props);
    this.state = {
      emailfp: {
        value: '',
        valid: false,
        errorMessage: ''
      },
      visib: true
    }
  }

  setValueInStateFp(fieldDatafp) {
    this.setState({
      emailfp: {
        ...this.state.emailfp,
        value: fieldDatafp,
      }
    }, () => { this.validateValueFp('changeHandler') })
  }
  validateValueFp(from: string) {
    const regExfp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!regExfp.test(this.state.emailfp.value)) {
      if (from === 'changeHandler') {
        this.setState({
          emailfp: {
            ...this.state.emailfp,
            valid: false,
            errorMessage: ''
          }
        })
      } else {
        this.setState({
          emailfp: {
            value: this.state.emailfp.value,
            valid: false,
            errorMessage: 'Enter Valid Email'
          }
        })
      }
    } else {
      this.setState({
        emailfp: {
          value: this.state.emailfp.value,
          valid: true,
          errorMessage: ''
        }
      })
    }
  }
  submit = async () => {
    this.validateValueFp('submit');
    if (this.state.emailfp.valid) {
      try {
        // const res = await this.httpService.forgotPassword(this.state.email.value)
        this.setState({ visib: false })
      } catch (error) {

      }

    } else {
      this.setState({
        emailfp: {
          value: this.state.emailfp.value,
          valid: false,
          errorMessage: 'Enter Valid Email'
        }
      })
    }
  };

  show = (): any => {
    if (this.state.visib) {
      return (
        <React.Fragment>
          <div className='fp-card'>
            <div className='formWrap1'>
              <span className='message'>Forgot Your Password?</span>
              <span className='sub-textfp'>Don’t worry! Enter your email address and we’ll send you a link to reset your password</span>
              <input id='emailfpInput' className='emailfp' placeholder='Email Address*' onChange={(e: any) => this.setValueInStateFp(e.target.value)} onBlur={e => this.validateValueFp('blur')} name='email' value={this.state.emailfp.value} type="email" />
              <span className="error">{this.state.emailfp.errorMessage}</span>
              <button
                onClick={() => { this.submit() }}
                className='send-button'
                id='forgotPwd'
                style={{ background: this.state.emailfp.valid ? 'radial-gradient(49.96% 50.8% at 49.96% 49.86%,#ff8800 0%,#f08800 100%)' : '#edae5d' }}
              >Send</button>
              <Link className='login' to='/'>Return to <span style={{ color: '#F08800', marginLeft: '2px' }}>Login</span></Link>
            </div>
          </div>
        </React.Fragment>
      )
    } else {
      return (
        <React.Fragment>
          <div className='fp-card1'>
            <span className="message">Check your mail !</span>
            <span className='sub-textfp'>We just emailed you with the instructions to reset your password </span>
            <span className='sub-text2'>For any questions or problems please email us at support@mindscribble.in</span>
            <Link className='cancel' to='/'>Cancel</Link>
          </div>
        </React.Fragment>
      )
    }
  }

  public render() {
    return (
      <React.Fragment>
        <section className="wrapper-container ">
          <div className='logo'>
            <img src={logoWhite} alt="logo" />
          </div>
          {this.show()}
        </section>
      </React.Fragment>
    );
  }
}

export default ForgotPassword;
