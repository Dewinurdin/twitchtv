import React from 'react';
import { connect } from 'react-redux';
import { signIn, signOut } from '../actions';

// https://developers.google.com/identity/sign-in/web/reference#authentication

class GoogleAuth extends React.Component {

  componentDidMount(){
    window.gapi.load('client:auth2', () => {
      window.gapi.client
      .init({
        clientId: '938601639593-oai3qknov7uv64gkrpt02djdaq4g6mg0.apps.googleusercontent.com',
        scope: 'email'
      })
      .then(() => {
        this.auth = window.gapi.auth2.getAuthInstance();
        this.onAuthChange(this.auth.isSignedIn.get());
        this.auth.isSignedIn.listen(this.onAuthchange);
      });
    });
  }

  onAuthChange = isSignedIn => {
    if (isSignedIn) {
      this.props.signIn(this.auth.currentUser.get().getId());
    } else {
      this.props.signOut();
    }
  };

  // Some Helper methods
  onSignInClick = () => {
    this.auth.signIn();
  };

  onSignOutClick = () => {
    this.auth.signOut();
  };

  renderAuthButton(){
    if (this.props.isSignedIn === null ){
      return null;
    } else if (this.props.isSignedIn){
      return (
        <button onClick={this.onSignOutClick} className="ui red google button">
          <i className="goggle icon" />
          Sign Out
        </button>
      )
    } else {
      return (
        <button onClick={this.onSignInClick} className="ui red google button">
          <i className="google icon"/>
          Sign In with Google
        </button>
      )
    }
  }

  render(){
    return <div>{this.renderAuthButton()} </div>;
  }
}

const mapStateToProps = (state) => {
  return { isSignedIn: state.auth.isSignedIn };
};

export default connect(
  mapStateToProps, 
  { signIn, signOut }
  )(GoogleAuth);