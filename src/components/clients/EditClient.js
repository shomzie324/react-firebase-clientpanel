import React, { Component } from "react";
import { Link } from "react-router-dom";
import { compose } from "redux";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import Spinner from "../layout/Spinner";
import PropTypes from "prop-types";

class EditClient extends Component {
  constructor(props) {
    super(props);
    // create refs
    this.firstNameInput = React.createRef();
    this.lastNameInput = React.createRef();
    this.emailInput = React.createRef();
    this.phoneInput = React.createRef();
    this.balanceInput = React.createRef();
  }

  onSubmit = e => {
    e.preventDefault();

    const { client, firestore } = this.props;

    // construct updated client
    const updClient = {
      firstName: this.firstNameInput.current.value,
      lastName: this.lastNameInput.current.value,
      email: this.emailInput.current.value,
      phone: this.phoneInput.current.value,
      balance:
        this.balanceInput.current.value === ""
          ? 0
          : this.balanceInput.current.value
    };

    // Update client in firestore
    firestore
      .update({ collection: "clients", doc: client.id }, updClient)
      .then(this.props.history.push("/"));
  };

  render() {
    const { client } = this.props;
    if (client) {
      return (
        <div>
          <div className='row'>
            <div className='col-md-6'>
              <Link to='/' className='btn btn-primary'>
                <i className='fas fa-arrow-circle-left' /> Back To Dashboard
              </Link>
            </div>
          </div>

          <br />

          <div className='card'>
            <div className='card-header'>Edit Client</div>
            <div className='card-body'>
              <form onSubmit={this.onSubmit}>
                <div className='form-group'>
                  <label htmlFor='firstName'>First Name</label>
                  <input
                    type='text'
                    className='form-control'
                    name='firstName'
                    minLength='2'
                    required
                    ref={this.firstNameInput}
                    defaultValue={client.firstName}
                  />
                </div>

                <div className='form-group'>
                  <label htmlFor='lastName'>Last Name</label>
                  <input
                    type='text'
                    className='form-control'
                    name='lastName'
                    minLength='2'
                    required
                    ref={this.lastNameInput}
                    defaultValue={client.lastName}
                  />
                </div>

                <div className='form-group'>
                  <label htmlFor='email'>Email</label>
                  <input
                    type='email'
                    className='form-control'
                    name='email'
                    ref={this.emailInput}
                    defaultValue={client.email}
                  />

                  <div className='form-group'>
                    <label htmlFor='phone'>phone</label>
                    <input
                      type='text'
                      className='form-control'
                      name='phone'
                      minLength='10'
                      required
                      ref={this.phoneInput}
                      defaultValue={client.phone}
                    />

                    <div className='form-group'>
                      <label htmlFor='balance'>Balance</label>
                      <input
                        type='text'
                        className='form-control'
                        name='balance'
                        ref={this.balanceInput}
                        defaultValue={client.balance}
                      />

                      <br />

                      <input
                        type='submit'
                        value='Submit'
                        className='btn btn-primary btn-block'
                      />
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      );
    } else {
      return <Spinner />;
    }
  }
}

EditClient.propTypes = {
  firestore: PropTypes.object.isRequired
};

// need to save client as something else when getting it
// need to specify which doc/record, which will match the id in the url
export default compose(
  firestoreConnect(props => [
    { collection: "clients", storeAs: "client", doc: props.match.params.id }
  ]),
  connect(({ firestore: { ordered } }, props) => ({
    client: ordered.client && ordered.client[0]
  }))
)(EditClient);