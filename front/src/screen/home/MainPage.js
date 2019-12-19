import React from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import {
    Button,
    Col,
    Row,
    Container,
} from 'reactstrap';

import './MainPage.scss';

class MainPage extends React.Component {
    constructor() {
        super();
        this.state = {
            drawAnimation: false,
            redirect: false,
            imageClass: 'imgMainAnimation',
            animationSong: new Audio('/assets/sound/gameStart.mp3'),
        };        
        document.body.classList.add('mainBody');               
    }


    handleClickPlay = () => {      
        document.body.classList.remove('mainBody');
        document.body.classList.add('bodyNext');
        this.setState({drawAnimation: true});     
  
        setTimeout(() => {
            this.setState({imageClass: 'imgMainAnimationFadeIn'})
            const { animationSong } = this.state;
            animationSong.play();
            setTimeout(() => {
                this.setState({redirect: true});
            }, 2000);
        }, 500);     
    }
    
    render() {    
        const { drawAnimation, imageClass, redirect } = this.state; 
        const { isProfileDisabled, isShopDisabled } = this.props; 
        return (               
                <div className="back-row-toggle splat-toggle">
                    {redirect && <Redirect push to="/game" />}
                    {!drawAnimation && <img className="imgMain" src='/images/logo2.png'/>}
                    {!drawAnimation &&                         
                        <Container className="jusitfy-content-center">
                            <Row>      
                                <Col lg="1" />  
                                <Col>
                                    <Button
                                        outline
                                        className="mainPage"
                                        color="warning"
                                        onClick={this.handleClickPlay}                                        
                                    >
                                        Jouer
                                    </Button>
                                </Col>                                         
                                <Col>
                                    <Button
                                        outline
                                        className="mainPage"
                                        color={isProfileDisabled ? "danger" : "warning"}
                                        disabled={isProfileDisabled}
                                    >
                                        Profil
                                    </Button>   
                                </Col>
                                <Col>
                                    <Button
                                        outline
                                        className="mainPage"
                                        color={isShopDisabled ? "danger" : "warning"}
                                        disabled={isShopDisabled}
                                    >
                                        Boutique
                                    </Button>
                                </Col> 
                            </Row>
                        </Container>
                    }
                    {drawAnimation && <img className={imageClass} src='/images/logo2.png'/>}
                </div>
        );
    }
}

MainPage.propTypes = {
    isShopDisabled: PropTypes.bool,
    isProfileDisabled : PropTypes.bool,
};

MainPage.defaultProps = {
    isShopDisabled: false,
    isProfileDisabled: false,
}

export default MainPage;
