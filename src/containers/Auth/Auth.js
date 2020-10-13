import React, { Component } from 'react';
import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';
import './Auth.css';
import { connect } from 'react-redux';
import * as authActionCreators from '../../store/actions/index'
import Spinner from '../../components/UI/Spinner/Spinner';
import ErrorHandler from '../../hoc/ErrorHandler/ErrorHandler';
import axios from '../../axios-orders';
import { Redirect } from 'react-router-dom';

class Auth extends Component {
  state = {
    controls: {
      email: {
        elementType: 'input',
        elementConfig: {
          type: 'email',
          placeholder: 'Email Address'
        },
        value: '',
        validation: { required: true, isEmail: true },
        valid: false,
        touched: false
      },
      password: {
        elementType: 'input',
        elementConfig: {
          type: 'password',
          placeholder: 'Password'
        },
        value: '',
        validation: { required: true, minLength: 6 },
        valid: false,
        touched: false
      },
    },
    isSignUp: true
  };

  inputChangedHandler = (event, key) => {
    console.log(event.target.value)
    this.setState({
      ...this.state,
      controls: {
        ...this.state.controls,
        [key]: {
          ...this.state.controls[key],
          value: event.target.value,
          valid: this.checkValidity(event.target.value, this.state.controls[key].validation),
          touched: true
        }
      }
    });
  };

  checkValidity = (value, rules) => {
    let isValid = true;
    if (rules.required) {
      isValid = value.trim() !== '' && isValid; // checks that the value of the input isn't blank
    };

    if (rules.minLength) {
      isValid = value.length >= rules.minLength && isValid;
    };

    if (rules.maxLength) {
      isValid = value.length <= rules.maxLength && isValid; // the additional '&& isValid' means ALL rules, should they exists, must be met for 'isValid' to be true.
    };

    if (rules.isEmail) {
      const emailIsValid = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
      isValid = emailIsValid(value) && isValid
    };

    return isValid;
  };

  submitHandler = () => {
    const { email, password } = this.state.controls;
    const { isSignUp } = this.state;
    this.props.onAuth(email.value, password.value, isSignUp);
  }

  switchAuthModeHandler = () => {
    this.setState(prevState => {
      return { isSignUp: !prevState.isSignUp }
    })
  };

  render() {
    const { controls, isSignUp } = this.state;

    let errorMessage = null;
    if (this.props.err) errorMessage = <p style={{ color: "red" }}>{this.props.err.message}</p>

    let formOrRedirect = null;
    if (this.props.isAuthenticated) {
      formOrRedirect = <Redirect to={this.props.authRedirectPath} />
    } else {
      formOrRedirect = <>
        <form onSubmit={(event) => event.preventDefault()}>
          {Object.entries(controls).map(([key, { elementType, elementConfig, value, valid, validation, touched }]) => {
            return (<Input
              key={key}
              label={key}
              elementType={elementType}
              elementConfig={elementConfig}
              value={value}
              invalid={!valid}
              shouldValidate={validation.required}
              touched={touched}
              changed={(event) => this.inputChangedHandler(event, key)} />)
          })}
          <Button btnType="Success" buttonAction={this.submitHandler}>{isSignUp ? 'SIGN UP' : 'SIGN IN'}</Button>
        </form>
        <Button btnType="Danger" buttonAction={this.switchAuthModeHandler}>{
          isSignUp ? 'SWITCH TO SIGN-IN' : 'SWITCH TO SIGN-UP'
        }</Button>
      </>
    }

    return (
      <div className="Auth">
        {errorMessage}
        {this.props.ldng ? <Spinner /> : formOrRedirect
        }
      </div>
    )
  }

  componentDidMount() {
    if (!this.props.buildingBurger && this.props.authRedirectPath !== '/') {
      this.props.onSetAuthRedirectPath('/');
    };
  };
};

const mapStateToProps = state => {
  return {
    ldng: state.auth.loading,
    err: state.auth.error,
    isAuthenticated: state.auth.token !== null,
    buildingBurger: state.brgr.building,
    authRedirectPath: state.auth.authRedirectPath
  }
};

const mapDispatchToProps = dispatch => {
  return {
    onAuth: (email, password, isSignUp) => dispatch(authActionCreators.auth(email, password, isSignUp)),
    onSetAuthRedirectPath: (path) => dispatch(authActionCreators.setAuthRedirectPath(path))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ErrorHandler(Auth, axios));