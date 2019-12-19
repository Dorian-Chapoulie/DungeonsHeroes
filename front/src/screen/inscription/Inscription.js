import React from 'react';
import ComponentInscription from '../../component/inscription/Inscription';
import { tryRegister } from '../../lib/fetch';
import  { Redirect } from 'react-router-dom';

class ScreenInscription extends React.Component {

  constructor() {
    super();
    this.state = {
      isErrorEmail: false,
      isErrorPseudo: false,
      isError: false,
      canRedirect: false,
    };
  }

  handleClickRegister = async (email, password, pseudo) => {    
    const request = await tryRegister(email, password, pseudo);             
    if(request.registered) {      
      this.setState({canRedirect: true});
    } else if(request.error) {
      if(request.error.search('pseudo') != -1) {
        this.setState({isErrorPseudo: true});
        this.setState({isErrorEmail: false});
      }else if(request.error.search('email') != -1) {
        this.setState({isErrorEmail: true});
        this.setState({isErrorPseudo: false});
      }else {
        console.log(request.error);
        this.setState({isError: true});
        this.setState({isErrorPseudo: false});
        this.setState({isErrorEmail: false});
      }      
    }
  }

  render() {
    const { isErrorEmail, isErrorPseudo, isError, canRedirect } = this.state;
    return (
      <>
        { canRedirect && <Redirect to='/login'/> }
        <ComponentInscription
          handleClickRegister={this.handleClickRegister}
          isButtonDisabled={false}
          isError={isError}
          isErrorPseudo={isErrorPseudo}
          isErrorEmail={isErrorEmail}
        />
      </>
    );
  }
}

export default ScreenInscription;