import React, { Component } from 'react';
import axios from '../../../axios-orders';
import Button from '../../../components/UI/Button/Button';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Input from '../../../components/UI/Input/Input'
import './ContactData.css';
import { object } from 'prop-types';
import { connect } from 'react-redux';
import * as orderActionCreators from '../../../store/actions/index'
import ErrorHandler from '../../../hoc/ErrorHandler/ErrorHandler';

class ContactData extends Component {
  state = {
    orderForm: {
      name: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Your name'
        },
        value: '',
        validation: { required: true },
        valid: false,
        touched: false
      },

      street: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Your street'
        },
        value: '',
        validation: { required: true },
        valid: false,
        touched: false
      },

      postCode: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Your post code'
        },
        value: '',
        validation: { required: true, minLength: 5, maxLength: 6 },
        valid: false,
        touched: false
      },

      country: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Your country'
        },
        value: '',
        validation: { required: true },
        valid: false,
        touched: false
      },

      email: {
        elementType: 'input',
        elementConfig: {
          type: 'email',
          placeholder: 'Your e-mail'
        },
        value: '',
        validation: { required: true },
        valid: false,
        touched: false
      },

      deliveryMethod: {
        elementType: 'select',
        elementConfig: {
          options: [{ value: 'fastest', displayValue: 'Fastest' }, { value: 'cheapest', displayValue: 'Cheapest' }],
        },
        value: 'fastest',
        validation: { required: false },
        valid: true,
        touched: false
      },
    },
    formCompleted: false,
    loading: false
  };



  orderHandler = () => {
    const { onOrderBurger } = this.props;
    if (this.state.formCompleted) {

      const formData = {}; // compose all the form data as exists in state in an object ready for form submission to the db.
      for (let formElementId in this.state.orderForm) {
        formData[formElementId] = this.state.orderForm[formElementId].value;
      };

      const order = {
        ingredients: this.props.ings,
        totalPrice: this.props.price,
        contactData: formData
      };

      onOrderBurger(order);
    };
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

    return isValid;
  };

  inputChangedHandler = (event, key) => {
    console.log(event.target.value)
    this.setState({
      ...this.state,
      orderForm: {
        ...this.state.orderForm,
        [key]: {
          ...this.state.orderForm[key],
          value: event.target.value,
          valid: this.checkValidity(event.target.value, this.state.orderForm[key].validation),
          touched: true
        }
      }
    })
  }

  render() {
    const { orderForm, formCompleted } = this.state;

    let formButtonType;
    if (!formCompleted) { formButtonType = "Disabled" } else { formButtonType = "Success" }

    if (this.state.loading) {
      return (<Spinner />)
    } else {
      return (
        <div className="ContactData">
          <h4>Enter your Contact Data</h4>
          <form onSubmit={(event) => event.preventDefault()}>
            {Object.entries(orderForm).map(([key, { elementType, elementConfig, value, valid, validation, touched }]) => {
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
            <Button btnType={formButtonType} buttonAction={this.orderHandler}>ORDER</Button>
          </form>
        </div>
      )
    };
  };

  componentDidMount() {
    // console.log(this.props.ingredients, ' <- this.props.ingredients in ContactData componentDidMount!')
  };

  componentDidUpdate(prevProps, prevState) {
    // check that all properties of this.state.orderForm have a property 'touched' with value 'true' and property 'valid' with value 'true'
    const { orderForm } = this.state;
    let formValidity = Object.entries(orderForm).every(el => el[1].touched && el[1].valid);
    if (formValidity && prevState.formCompleted === false) this.setState({ formCompleted: true });
  };

};

const mapStateToProps = state => {
  return {
    // ings: state.brgr.ingredients,
    // totPri: state.brgr.totalPrice
    ings: state.ingredients,
    totPri: state.totalPrice
  }
};

const mapDispatchToProps = dispatch => {
  return {
    onOrderBurger: (orderData) => dispatch(orderActionCreators.purchaseBurgerStart(orderData))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ErrorHandler(ContactData, axios));