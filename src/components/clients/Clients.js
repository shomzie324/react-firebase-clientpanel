import React, { Component } from "react";
import { Link } from "react-router-dom";
import { compose } from "redux";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import PropTypes from "prop-types";

class Clients extends Component {
  render() {
    const { clients } = this.props;
    if (clients) {
      return (
        <div>
          <div className='row'>
            <div className='col-md-6'>
              <h2>
                {" "}
                <i className='fas fa-users' /> Clients
              </h2>
            </div>
            <div className='col-md-6'>
              <h2>Total</h2>
            </div>
            <table className='table table-stripped'>
              <thead className='thead-inverse'>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Balance</th>
                  <th />
                </tr>
              </thead>
              <tbody>
                {clients.map(client => (
                  <tr key={client.id}>
                    <td>
                      {client.firstName} {client.lastName}
                    </td>
                    <td>{client.email}</td>
                    <td>${parseFloat(client.balance).toFixed(2)}</td>
                    <td>
                      <Link
                        to={`/client/${client.id}`}
                        className='btn btn-secondary btn-sm'
                      >
                        {" "}
                        <i className='fas fa-arrow-circle-right' /> Details
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      );
    } else {
      return <h1>Loading...</h1>;
    }
  }
}

// PROP TYPES
Clients.propTypes = {
  firestore: PropTypes.object.isRequired,
  clients: PropTypes.array
};

// with firebase and redux an extra step is needed
// 1. connect firestore state to redux state
// 2. connect redux state to props in component as usual
export default compose(
  firestoreConnect([{ collection: "clients" }]),
  connect(state => ({
    clients: state.firestore.ordered.clients
  }))
)(Clients);
