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

class ComponentInscription extends React.Component {
    constructor() { 
      super();
      this.state = {
        email: '',
        passwd: '',
        pseudo: '',
      };
    }

    hanldeEmailChange = (e) => {            
      this.setState({email: e.target.value});
    }

    hanldePasswordChange = (e) => {            
      this.setState({passwd: e.target.value});
    }

    hanldePseudoChange = (e) => {            
      this.setState({pseudo: e.target.value});
    }

    render() {
      const { email, pseudo, passwd, isButtonDisabled } = this.state;
      const { handleClickRegister, isError, isErrorEmail, isErrorPseudo } = this.props;
      return (
        <Card className="login mt-5" style={{width: '18em'}}>
          <CardHeader>
            <h5>Inscription</h5>
            { isError && <p className="text-danger">Une erreur s'est produite</p> }
            { isErrorEmail && <p className="text-danger">Email déjà utilisé</p> }
            { isErrorPseudo && <p className="text-danger">Pseudo déjà utilisé</p> }
          </CardHeader>

          <CardBody>
            <Form>
              <FormGroup>
                <Label for="email">Email</Label>
                <Input type="email" onChange={this.hanldeEmailChange} name="email" id="email" placeholder="Entrez votre email" />
              </FormGroup>

              <FormGroup>
                <Label for="passwd">Password</Label>
                <Input type="password" onChange={this.hanldePasswordChange} name="password" id="passwd" placeholder="Entrez votre mot de passe" />
              </FormGroup>

              <FormGroup>
                <Label for="pseudo">Pseudo</Label>
                <Input type="text" onChange={this.hanldePseudoChange} name="password" id="pseudo" placeholder="Entrez votre pseudo" />
              </FormGroup>

              <CardFooter>
                <Button color="success" disabled={isButtonDisabled} onClick={() => handleClickRegister(email, passwd, pseudo)}>S'inscrire'</Button>
              </CardFooter>              
            </Form>
          </CardBody>
      </Card>
      );
    }
}

ComponentInscription.propTypes = {
  handleClickRegister: PropTypes.func.isRequired,
  isButtonDisabled: PropTypes.bool.isRequired,
  isError: PropTypes.bool.isRequired,
  isErrorEmail: PropTypes.bool.isRequired,
  isErrorPseudo: PropTypes.bool.isRequired,
};

export default ComponentInscription;