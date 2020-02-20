import React from 'react';
import { connect } from 'react-redux';
import { addUser, removeUser } from '../actions';
import Header from './Header';

class SecretSanta extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      name: '',
      email: '',
      partner: -1,
      errors: {
        name: '',
        email: ''
      },
      showNameError: false,
      showEmailError: false
    };
  }
  

  renderUserList = () => {
    if (this.props.users === null) {
      return null;
    } else {
      const users = this.props.users.map(user => 
        <div className="item" key={user.userId}>
          <div className="ui segment two column doubling stackable grid container">
            <div className="fourteen wide column">
              <h2>{user.username.toUpperCase()}</h2>
            </div>
            <div className="two wide column">
              <button className="ui icon button" onClick={this.onDeleteUser.bind(this, user.userId)}><i className="times icon"></i></button>
            </div>
          </div>
        </div>
      )

      return (
        <div className="ui list">
          {users}
        </div>
      ); // add in two button for editing
    }
  }

  renderUsers = () => {
    if (this.props.users.length > 0) {
      const users = this.props.users.map(user => 
        <option value={user.userId} key={user.userId}>{user.username}</option>
      );

      return users;
    } 
    return null;
  }

  inputValidation = () => {
    let { name, email } = this.state;
    let errors = {};
    let formIsValid = true;

    //Name
    if(!name){
      formIsValid = false;
      errors["name"] = "Cannot be empty";
      this.setState({
        showNameError: true
      });
    } else if(typeof name !== "undefined"){
      if(!name.match(/^[a-zA-Z -]+$/)){
        formIsValid = false;
        errors["name"] = "Only letters";
        this.setState({
          showNameError: true
        });
      }        
    }

    //Email
    if(!email){
      formIsValid = false;
      errors["email"] = "Cannot be empty";
      this.setState({
        showEmailError: true
      });
    } else if(typeof email !== "undefined"){
      let lastAtPos = email.lastIndexOf('@');
      let lastDotPos = email.lastIndexOf('.');

      if (!(lastAtPos < lastDotPos && lastAtPos > 0 && email.indexOf('@@') === -1 && lastDotPos > 2 && (email.length - lastDotPos) > 2)) {
        formIsValid = false;
        errors["email"] = "Email is not valid";
        this.setState({
          showEmailError: true
        });
      }
    } 
    
    this.setState({
      errors: errors
    });
    return formIsValid;
  }

  resetState = () => {
    this.setState({
      name: '',
      email: '',
      partner: -1,
      errors: {
        name: '',
        email: ''
      },
      showNameError: false,
      showEmailError: false
    }, console.log(this.state));
  }

  onDeleteUser = (userId, e) => {
    this.props.removeUser(userId);
  }

  onSubmit = (e) => {
    e.preventDefault();
    const isValid = this.inputValidation();

    if (isValid) {
      let { name, email, partner } = this.state;
      this.props.addUser(name, email);

      // check if pairing is valid
      //console.log(partner);
      this.resetState();
    }
  }

  handleInput = (e) => {
    const key = e.target.name;
    const value = e.target.value;

    this.setState({
      [key]: value
    });
  }

  onGeneratePairings = () => {
    // take the current list and send out the pairings

    // generate each user list

    // TODO add in partner logic


    const users = [];

    for (let user of this.props.users) {

      console.log(user);
    }

    console.log("generating pairings");
    return null;
  }

  render() { // extract out to be components
    return (
      <div>
        <Header title="Secret Santa">
          <button 
            className="ui button"
            onClick={this.onGeneratePairings}
          >Generate Pairings</button>
        </Header>
        <div className="ui raised very padded text container segment">
          <div>
            {this.renderUserList()}
          </div>
          <form className="ui form" onSubmit={this.onSubmit}>
            <div className="field">
              <label>Name</label>
              <input 
                type="text" 
                name="name" 
                placeholder="Name"
                value={this.state.name}
                onChange={this.handleInput}
              />
              { this.state.showNameError ? <div className="ui pointing red basic label">{this.state.errors.name}</div> : null }
            </div>
            <div className="field">
              <label>Email</label>
              <input 
                type="email" 
                name="email" 
                placeholder="Email"
                value={this.state.email}
                onChange={this.handleInput}
              />
              { this.state.showEmailError ? <div className="ui pointing red basic label">{this.state.errors.email}</div> : null }
            </div>
            <div className="field">
              <select 
                className="ui dropdown"
                name="partner"
                value={this.state.partner}
                onChange={this.handleInput}
              >{this.renderUsers()}</select>
            </div>
            <button className="ui button" type="submit">Add</button>
          </form>
        </div>
      </div>
    ); // select is causing a weird update issue
  }
}

// wire up redux to store redux state in the props
const mapStateToProps = (state) => {
  console.log(state);
  return {
    users: state.users.userList
  };
}

export default connect(
  mapStateToProps, 
  { addUser, removeUser }
)(SecretSanta);