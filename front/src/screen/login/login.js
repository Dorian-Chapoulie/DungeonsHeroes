import React from 'react';
import  { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchLogin } from '../../lib/fetch';
import { setLoggedInAction, setPseudoAction, setMoneyAction } from '../../actions/player';
import ComponentLogin from '../../component/login/login';

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
      const { setLoggedIn, setPseudo, setMoney } = this.props;   
      setLoggedIn();
      setPseudo(request.pseudo);
      setMoney(request.money);
      this.setState({canRedirect: true});
    } else {
      this.setState({isError: true});
    }
  }

  render() {
    const { isError, canRedirect } = this.state;
    const { isAlreadyLoggedIn } = this.props;    
    return (
      <>
        { (canRedirect || isAlreadyLoggedIn) && <Redirect to='/main'/> }
        <ComponentLogin handleClickLogin={this.handleClickLogin} isButtonDisabled={false} isError={isError} />
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isAlreadyLoggedIn: state.player.isLoggedIn,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    setLoggedIn: () => dispatch(setLoggedInAction()),
    setPseudo: pseudo => dispatch(setPseudoAction(pseudo)),
    setMoney: money => dispatch(setMoneyAction(money)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ScreenLogin);