import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Redirect, Link } from 'react-router-dom';
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
        document.body.classList.remove('bodyNext');                     
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

    getWidthFromPseudo = pseudo => {
        return 120 + 20 * pseudo.length;
    }
    
    render() {    
        const { drawAnimation, imageClass, redirect } = this.state; 
        const { pseudo, money, isGuest } = this.props; 
        return (               
                <div className="back-row-toggle splat-toggle">
                    {redirect && <Redirect push to="/game" />}
                    {!drawAnimation &&
                        <>
                            <img className="imgMain" src='/images/logo2.png'/>

                            <img className="banniereImage" width={70} height={70} src='https://cdn.dribbble.com/users/15785/screenshots/4038010/sword.gif'/>                                                            
                            <div className="contenu">
                                <Row>
                                    <Col className="colContenu2">
                                        <Link to='/profile'>{pseudo}</Link>
                                    </Col>
                                    <Col className="colContenu">                                        
                                        <Link to='/shop'>{money}</Link>
                                    </Col>
                                </Row>                                                                
                            </div>                            
                            <div className="bannierePseudo" style={{width: this.getWidthFromPseudo(pseudo)}} />
                        </>
                    }
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
                                        color={isGuest ? "danger" : "warning"}
                                        disabled={isGuest}
                                    >
                                        Profil
                                    </Button>   
                                </Col>
                                <Col>
                                    <Button
                                        outline
                                        className="mainPage"
                                        color={isGuest ? "danger" : "warning"}
                                        disabled={isGuest}
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

const mapStateToProps = (state) => {
    return {
      pseudo: state.player.pseudo,
      money: state.player.money,
      isGuest: state.player.isGuest,
    }
}

export default connect(mapStateToProps)(MainPage);
