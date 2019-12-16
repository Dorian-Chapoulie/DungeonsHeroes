import React from 'react';
import { Card, CardBody, CardHeader, CardImg, CardTitle, CardSubtitle, CardText, Button, CardFooter } from 'reactstrap';

import './Home.scss';

class Home extends React.Component {
    render() {      
      return (
        <>
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

                <Card style={{width: '18em'}}>    
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
            </div>
        </>
      );
    }
}

export default Home;
