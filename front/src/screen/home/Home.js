import React from 'react';
import {
    Card,
    CardBody,
    CardHeader,
    CardTitle,
    CardText,
    Button,
    CardFooter,
} from 'reactstrap';

import './Home.scss';

class Home extends React.Component {
    render() {      
      return (
        <div className="home">
            <img className="imgHome" src='/images/logo.png' />
            <div className="d-flex justify-content-center">            
                <Card className="mr-5" style={{width: '18em'}}>
                    <CardHeader>
                        <CardTitle>
                            <h5>Connection</h5>
                        </CardTitle>
                    </CardHeader>

                    <CardBody>                                    
                        <CardText>Connectez vous pour jouer.</CardText>                   
                    </CardBody>

                    <CardFooter>
                        <Button href="/login" color="primary">Se connecter</Button>
                    </CardFooter>
                </Card>

                <Card className="mr-5" style={{width: '18em'}}>    
                    <CardHeader>
                        <CardTitle>
                            <h5>Inscription</h5>
                        </CardTitle>                    
                    </CardHeader>
                    <CardBody>                    
                        <CardText>Créez votre compte pour affronter des milliers de joueurs !</CardText>                   
                    </CardBody>
                    <CardFooter>
                        <Button href="/inscription" color="primary">S'inscrire</Button>
                    </CardFooter>
                </Card>

                <Card style={{width: '18em'}}>    
                    <CardHeader>
                        <CardTitle>
                            <h5>Invité</h5>
                        </CardTitle>                    
                    </CardHeader>
                    <CardBody>                    
                        <CardText>Jouez en tant qu'invité</CardText>                   
                    </CardBody>
                    <CardFooter>
                        <Button href="/main" color="primary">Jouer</Button>
                    </CardFooter>
                </Card>
            </div>
        </div>
      );
    }
}

export default Home;
