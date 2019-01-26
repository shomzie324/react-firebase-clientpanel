import React, { Component } from "react";
import { Link } from "react-router-dom";
// import { compose } from "redux";
// import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import PropTypes from "prop-types";

class AddClient extends Component {
  state = {
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    balance: ""
  };

  // every input will call this function:
  // [e.target.name] resolves to input name
  onChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  // construct client to add to firestore
  //
  onSubmit = e => {
    e.preventDefault();
    // get all fields from state
    const newClient = this.state;
    const { firestore } = this.props;

    // turn balance into a number if it is blank
    if (newClient.balance === "") {
      newClient.balance = 0;
    }

    // Adding to firestore:
    // param 1: options object that specifies which collection to add to
    // param 2: the object to add
    // returns: a promise
    firestore.add({ collection: "clients" }, newClient).then(() => {
      this.props.history.push("/");
    });
  };

  render() {
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
          <div className='card-header'>Add CLient</div>
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
                  onChange={this.onChange}
                  value={this.state.firstName}
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
                  onChange={this.onChange}
                  value={this.state.lastName}
                />
              </div>

              <div className='form-group'>
                <label htmlFor='email'>Email</label>
                <input
                  type='email'
                  className='form-control'
                  name='email'
                  onChange={this.onChange}
                  value={this.state.email}
                />

                <div className='form-group'>
                  <label htmlFor='phone'>phone</label>
                  <input
                    type='text'
                    className='form-control'
                    name='phone'
                    minLength='10'
                    required
                    onChange={this.onChange}
                    value={this.state.phone}
                  />

                  <div className='form-group'>
                    <label htmlFor='balance'>Balance</label>
                    <input
                      type='text'
                      className='form-control'
                      name='balance'
                      onChange={this.onChange}
                      value={this.state.balance}
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
  }
}

AddClient.propTypes = {
  firestore: PropTypes.object.isRequired
};

// if nothing is needed from the state then only the firestore connect is needed not redux connect
// firestore connect exposes this.props.firestore to the component to allow adding to firestore
export default firestoreConnect()(AddClient);
