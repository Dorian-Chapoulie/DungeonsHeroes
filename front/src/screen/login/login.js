import React from 'react';
import  { Redirect } from 'react-router-dom';
import ComponentLogin from '../../component/login/login';
import { fetchLogin } from '../../lib/fetch';

class ScreenLogin extends React.Component {
  constructor(props) {
    super(props);  
    this.state = {
      isError: false,
      canRedirect: false,
    };
  }

  handleClickLogin = async (email, password) => {    
    const request = await fetchLogin(email, password);        
    if(request.connected) {      
      this.setState({canRedirect: true});
    } else {
      this.setState({isError: true});
    }
  }

  render() {
    const { isError, canRedirect } = this.state;
    return (
      <>
        { canRedirect && <Redirect to='/main'/> }
        <ComponentLogin handleClickLogin={this.handleClickLogin} isButtonDisabled={false} isError={isError} />
      </>
    );
  }
}

export default ScreenLogin;