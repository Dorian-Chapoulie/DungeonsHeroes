import React from 'react';
import { Card, CardBody, CardHeader, CardImg, CardTitle, CardSubtitle, CardText, Button, CardFooter, Col, Row } from 'reactstrap';

import './MainPage.scss';

class MainPage extends React.Component {
    render() {      
      return (
        <>
            <img className="imgHome" src='/images/logo2.png' />
            <Row className="justify-content-md-center">            
                <Col sm={4}>
                    <Button outline className="mainPage" href="/login" color="warning">Jouer</Button>
                </Col>                
                <Col>
                    <Button outline className="mainPage" href="/login" color="warning">Boutique</Button>
                </Col>      
                <Col sm={2}>
                    <Button outline className="mainPage" href="/inscription" color="warning">Profil</Button>   
                </Col>
            </Row>
        </>
      );
    }
}

export default MainPage;
