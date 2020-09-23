import React, { Component } from 'react';
import Modal from '../../components/UI/Modal/Modal';


const ErrorHandler = (WrappedComponent, axios) => {
  return class extends Component {

    state = {
      error: null
    };

    errorConfirmedHandler = () => {
      this.setState({ error: null });
    }

    render() {
      const { error } = this.state;

      this.reqInterceptor = axios.interceptors.request.use(req => {
        this.setState({ error: null });
        return req;
      });
      this.resInterceptor = axios.interceptors.response.use(res => res, error => {
        this.setState({ error: error });
      });

      return (
        <>
          <Modal show={error} modalClosed={this.errorConfirmedHandler}>
            {error ? error.message : null}
          </Modal>
          <WrappedComponent {...this.props} />
        </>
      )
    };

    componentWillUnmount() { // because we want this ErrorHandler component to be re-usable throught our app, we need to remove our axios interceptors each time it unmounts.
      // why? Because otherwise every single time this component is instantiate, we will be opening adding interceptors to our axios instance, not closing them,
      // so they'll continue listening to all our axios requests and responses ... this will at best be a waste of app memory, and at worse, cause all kinds of weird errors or
      // unexpected state changes.
      axios.interceptors.request.eject(this.reqInterceptor);
      axios.interceptors.response.eject(this.resInterceptor);
    }

  };
};

export default ErrorHandler;
