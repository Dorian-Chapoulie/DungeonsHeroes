import React from 'react';
import {
  Button,
  Form,
  FormGroup,
  Label,
  Input,
  FormText,
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
        isButtonDisabled: false,
      };
    }

    handleClickLogin = () => {
      const { email, passwd } = this.state;
      this.setState({isButtonDisabled: true});
      console.log("attempt: ", email, passwd);
    }

    render() {
      const { email, passwd, isButtonDisabled } = this.state;
      return (
        <Card className="login mt-5" style={{width: '18em'}}>
          <CardHeader>
            <h5>Inscription</h5>
          </CardHeader>

          <CardBody>
            <Form>
              <FormGroup>
                <Label for="email">Email</Label>
                <Input type="email" name="email" id="email" placeholder="Entrez votre email" />
              </FormGroup>

              <FormGroup>
                <Label for="passwd">Password</Label>
                <Input type="password" name="password" id="passwd" placeholder="Entrez votre mot de passe" />
              </FormGroup>

              <FormGroup>
                <Label for="pseudo">Pseudo</Label>
                <Input type="password" name="password" id="pseudo" placeholder="Entrez votre pseudo" />
              </FormGroup>

              <CardFooter>
                <Button color="success" disabled={isButtonDisabled} onClick={this.handleClickLogin}>Se connecter</Button>
              </CardFooter>              
            </Form>
          </CardBody>
      </Card>
      );
    }
}

export default ComponentInscription;