import React from 'react';
import PropTypes from 'prop-types';
import {
  Button,
  Form,
  FormGroup,
  Label,
  Input,  
  Card,
  CardHeader,
  CardBody,
  CardFooter,
} from 'reactstrap';

import './login.scss';

class ComponentLogin extends React.Component {
    constructor(props) { 
      super(props);
      this.state = {
        email: '',
        passwd: '',        
      };      
    }

    hanldeEmailChange = (e) => {            
      this.setState({email: e.target.value});
    }

    handlePasswordChange = (e) => {
      this.setState({passwd: e.target.value});
    }
    

    render() {
      const { email, passwd } = this.state;
      const { handleClickLogin, isButtonDisabled, isError } = this.props;
      return (
        <Card className="login mt-5" style={{width: '18em'}}>
          <CardHeader>
            <h5>Connection</h5>
            { isError && <p className="text-danger">Email ou mot de passe erroné</p> }
          </CardHeader>

          <CardBody>
            <Form>
              <FormGroup>
                <Label for="email">Email</Label>
                <Input type="email" onChange={this.hanldeEmailChange} name="email" id="email" placeholder="Entrez votre email" />
              </FormGroup>

              <FormGroup>
                <Label for="passwd">Password</Label>
                <Input type="password" onChange={this.handlePasswordChange} name="password" id="passwd" placeholder="Entrez votre mot de passe" />
              </FormGroup>

              <CardFooter>
                <Button color="success" disabled={isButtonDisabled} onClick={() => handleClickLogin(email, passwd)}>Se connecter</Button>
              </CardFooter>              
            </Form>
          </CardBody>
      </Card>
      );
    }
}

ComponentLogin.propTypes = {
  handleClickLogin: PropTypes.func.isRequired,
  isButtonDisabled: PropTypes.bool.isRequired,
  isError : PropTypes.bool.isRequired,
};

export default ComponentLogin;