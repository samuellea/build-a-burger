import React, { Component } from 'react';
import { connect } from 'react-redux'
import * as authActionCreators from '../../../store/actions/index';
import { Redirect } from 'react-router-dom'

class Logout extends Component {
  render() {
    return <Redirect to='/' />;
  };

  componentDidMount() {
    const { onLogout } = this.props;
    onLogout();
  }
};

const mapDispatchToProps = dispatch => {
  return {
    onLogout: () => dispatch(authActionCreators.logOut())
  }
};
export default connect(null, mapDispatchToProps)(Logout);