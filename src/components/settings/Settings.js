import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
// these functions return action objects and are passed to connect
import {
  setDisableBalanceOnAdd,
  setDisableBalanceOnEdit,
  setAllowRegistration
} from "../../actions/settingsActions";
import PropTypes from "prop-types";

class Settings extends Component {
  disableBalanceOnAddChange = e => {
    // get dispatch function from props
    const { setDisableBalanceOnAdd } = this.props;
    setDisableBalanceOnAdd();
  };

  disableBalanceOnEditChange = e => {
    const { setDisableBalanceOnEdit } = this.props;
    setDisableBalanceOnEdit();
  };

  allowRegistrationChange = e => {
    const { setAllowRegistration } = this.props;
    setAllowRegistration();
  };

  render() {
    const {
      disableBalanceOnAdd,
      disableBalanceOnEdit,
      allowRegistration
    } = this.props.settings;

    return (
      <div>
        <div className='row'>
          <div className='col-md-6'>
            <Link to='/' className='btn btn-primary'>
              <i className='fas fa-arrow-circle-left' /> Back To Dashboard
            </Link>
          </div>
        </div>

        <div className='card'>
          <div className='card-header'>Edit Settings</div>
          <div className='card-body'>
            <form>
              <div className='form-group'>
                <label>Allow Registration</label>
                <input
                  type='checkbox'
                  name='allowRegistration'
                  checked={!!allowRegistration}
                  onChange={this.allowRegistrationChange}
                />
              </div>

              <div className='form-group'>
                <label>Disable Balance on Add</label>
                <input
                  type='checkbox'
                  name='disableBalanceOnAdd'
                  checked={!!disableBalanceOnAdd}
                  onChange={this.disableBalanceOnAddChange}
                />
              </div>

              <div className='form-group'>
                <label>Disable Balance on Edit</label>
                <input
                  type='checkbox'
                  name='disableBalanceOnEdit'
                  checked={!!disableBalanceOnEdit}
                  onChange={this.disableBalanceOnEditChange}
                />
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

Settings.propTypes = {
  settings: PropTypes.object.isRequired,
  setDisableBalanceOnAdd: PropTypes.func.isRequired,
  setDisableBalanceOnEdit: PropTypes.func.isRequired,
  setAllowRegistration: PropTypes.func.isRequired
};

export default connect(
  (state, props) => ({
    auth: state.firebase.auth,
    settings: state.settings
  }),
  { setDisableBalanceOnAdd, setDisableBalanceOnEdit, setAllowRegistration }
)(Settings);
