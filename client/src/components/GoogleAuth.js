import React from 'react';

class GoogleAuth extends React.Component {
  state = {
    isSignedIn: null
  };

  componentDidMount(){
    window.gapi.load('client:auth2', () => {
      window.gapi.client.init({
        clientId: '938601639593-oai3qknov7uv64gkrpt02djdaq4g6mg0.apps.googleusercontent.com',
        scope: 'email'
      }).then(() => {
        this.auth = window.gapi.auth2.getAuthInstance();
        this.setState({ isSignedIn: this.auth.isSignedIn.get() });
        this.auth.isSignedIn.listen(this.onAuthchange);
      });
    });
  }

  onAuthChange = () => {
    this.setState({ isSignedIn: this.auth.isSignedIn.get() });
  };

  // Some Helper methods
  onSignIn = () => {
    this.auth.signIn();
  };

  onSignOut = () => {
    this.auth.signOut();
  };

  renderAuthButton(){
    if (this.state.isSignedIn === null ){
      return null;
    } else if (this.state.isSignedIn){
      return (
        <button onClick={this.onSignOut} className="ui red google button">
          <i className="goggle icon"/>
          Sign Out
        </button>
      )
    } else {
      return (
        <button onClick={this.onSignIn} className="ui red google button">
          <i className="google icon"/>
          Sign In with Google
        </button>
      )
    }
  }

  render(){
    return (
      <div>{this.renderAuthButton()} </div>
    )
  }
}

export default GoogleAuth;