import React from 'react';
import './Login.scss';
import { Link } from 'react-router-dom';
import eye from '../../assets/eye.svg';
import eyeClose from '../../assets/eyeClose.svg';
import logoWhite from '../../assets/logoWhite.svg'
import HttpService from '../http/httpService';
interface IState {
  formData: {
    email: {
      value: string,
      valid: boolean,
      errorMessage: string
    },
    password: {
      value: string,
      valid: boolean,
      errorMessage: string,
      type: boolean
    }
  }
}
interface IProps {
  history: any
}
class Login extends React.Component<IProps, IState>  {
  httpService = new HttpService();
  regExEmail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  state: IState
  constructor(props: IProps) {
    super(props)
    this.state = {
      formData: {
        email: {
          value: '',
          valid: false,
          errorMessage: ''
        },
        password: {
          value: '',
          valid: false,
          errorMessage: '',
          type: true
        }
      }
    }
  }

  setValueInState(data: { name: string, value: string }) {
    const updatedFormData = this.updateForm({ name: data.name, modify: [{ propertyName: 'value', value: data.value }] })
    this.setState({
      formData: updatedFormData
    }, () => this.validatingValue(data.name, 'changeHandler')
    )
  }

  updateForm(data: { name: string, modify: Array<{ propertyName: string, value: string | boolean }> }) {
    const updatedFormData = {
      ...this.state.formData
    }
    const updatedFormElement = {
      ...updatedFormData[data.name]
    }
    data.modify.forEach((element: { propertyName: string, value: string }) => {
      updatedFormElement[element.propertyName] = element.value
    });
    updatedFormData[data.name] = updatedFormElement
    return updatedFormData
  }

  validatingValue(field: string, from: string) {
    if (field === 'email') {
      if (!this.regExEmail.test(this.state.formData.email.value)) {
        let updatedFormData;
        if (from === 'changeHandler') {
          updatedFormData = this.updateForm({ name: field, modify: [{ propertyName: 'valid', value: false }] })
        } else {
          updatedFormData = this.updateForm({ name: field, modify: [{ propertyName: 'errorMessage', value: 'Enter Valid Email' }, { propertyName: 'valid', value: false }] })
        }
        this.setState({
          formData: updatedFormData
        })
      } else {
        const updatedFormData = this.updateForm({ name: field, modify: [{ propertyName: 'errorMessage', value: '' }, { propertyName: 'valid', value: true }] })
        this.setState({
          formData: updatedFormData
        })
      }
    } else {
      if (this.state.formData.password.value.length < 6) {
        let updatedFormData;
        if (from === 'changeHandler') {
          updatedFormData = this.updateForm({ name: field, modify: [{ propertyName: 'valid', value: false }] })
        } else {
          updatedFormData = this.updateForm({ name: field, modify: [{ propertyName: 'errorMessage', value: 'Enter Valid Password' }, { propertyName: 'valid', value: false }] })
        }
        this.setState({
          formData: updatedFormData
        })
      } else {
        const updatedFormData = this.updateForm({ name: field, modify: [{ propertyName: 'errorMessage', value: '' }, { propertyName: 'valid', value: true }] })
        this.setState({
          formData: updatedFormData
        })
      }
    }
  }

  submit = async () => {
    for (let field in this.state.formData) {
      await this.validatingValue(field, 'submit')
    }
    // let token;
    if (this.state.formData.email.valid && this.state.formData.password.valid) {
      try {
        // token = await this.httpService.login(this.state.email.value, this.state.password.value)
        this.props.history.push('/application')
      } catch (error) {

      }
    }
  };

  showPassword = (): void => {
    this.setState({
      formData: {
        ...this.state.formData,
        password: {
          ...this.state.formData.password,
          type: !this.state.formData.password.type
        }
      }
    })
  }

  public render() {
    return (
      <React.Fragment>
        <section className="wrapper-container">
          <div className='logo'>
            <a href="http://192.168.1.188:8080" target='_blank' rel="noopener noreferrer">
              <img src={logoWhite} alt="logo" />
            </a>
          </div>
          <div className='login-card'>
            <div className='formWrap'>
              <span className='welcome'>Welcome to MindScribble</span>
              <span className='sub-text'>Login to manage your account</span>
              <input autoComplete='helewofjewiufh' id='loginInput' className='email' onChange={(e: any) => this.setValueInState({ name: e.target.name, value: e.target.value })} onBlur={e => this.validatingValue(e.target.name, 'blur')} name='email' value={this.state.formData.email.value} placeholder='Email Address*' type="email" />
              <span className="error">{this.state.formData.email.errorMessage}</span>
              <div className="contain">
                <input id='passwordInput' autoComplete='helewofjewiufh' className='password' onChange={(e: any) => this.setValueInState({ name: e.target.name, value: e.target.value })} onBlur={e => this.validatingValue(e.target.name, 'blur')} name='password' value={this.state.formData.password.value} placeholder='Password*' type={this.state.formData.password.type ? 'password' : 'text'} />
                <img id='togglePwd' className="toggle" onClick={() => { this.showPassword() }} src={this.state.formData.password.type ? eye : eyeClose} alt="eye" />
              </div>
              <span className="error">{this.state.formData.password.errorMessage}</span>
              <Link className='forgot' to='/fp'>Forgot your password?</Link>
              <button
                id='login'
                className='login-button'
                onClick={() => { this.submit() }}
                style={{ background: this.state.formData.email.valid && this.state.formData.password.valid ? 'radial-gradient(49.96% 50.8% at 49.96% 49.86%,#ff8800 0%,#f08800 100%)' : '#edae5d' }}
              >Log In</button>
              <span>
                <span className='sm-label'>Don't have an account?</span>
              </span>
              <a target='_blank' rel="noopener noreferrer" className='register' href='http://192.168.1.188:8080/#register'>Register</a>
            </div>
          </div></section>
      </React.Fragment>
    );
  }
}

export default Login;
