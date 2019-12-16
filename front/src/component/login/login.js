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

import './login.scss';

class ComponentLogin extends React.Component {
    constructor() { 
      super();
      this.state = {
        email: '',
        passwd: '',
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
            <h5>Connection</h5>
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

              <CardFooter>
                <Button color="success" disabled={isButtonDisabled} onClick={this.handleClickLogin}>Se connecter</Button>
              </CardFooter>              
            </Form>
          </CardBody>
      </Card>
      );
    }
}

export default ComponentLogin;