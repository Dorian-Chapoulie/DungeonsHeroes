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
import { loadSprites, spritesNumber, loadedSprites } from '../../game/graphics/assets';
import Loader from 'react-loader-spinner';

import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import './MainPage.scss';

class MainPage extends React.Component {
    constructor() {
        super();
        this.state = {
            drawAnimation: false,
            redirect: false,
            redirectShop: false,
            redirectProfile: false,
            imageClass: 'imgMainAnimation',
            animationSong: new Audio('/assets/sound/gameStart.mp3'),
            spritesLoaded: 0,
        };        
        document.body.classList.add('mainBody'); 
        document.body.classList.remove('bodyNext');                     
    }


    handleClickPlay = async () => {      
        document.body.classList.remove('mainBody');
        document.body.classList.add('bodyNext');
        this.setState({drawAnimation: true});     
  
        setTimeout(async () => {
            this.setState({imageClass: 'imgMainAnimationFadeIn'})
            const { animationSong } = this.state;
            animationSong.play();           
        }, 500);

        const interval = setInterval(() => {            
            if(loadedSprites === spritesNumber) {                
                clearInterval(interval);
            }
            this.setState({spritesLoaded: loadedSprites});
        }, 50);

        await loadSprites();        
        this.setState({redirect: true});       
    }    

    handleClickShop = () => {
        this.setState({redirectShop: true});
    }

    handleClickProfile = () => {        
        this.setState({redirectProfile: true});
    }
    
    getWidthFromPseudo = (pseudo, money) => {
        const moneyLength = money.toString().length * 20;        
        return 100 + moneyLength + 20 * pseudo.length;
    }

    
    render() {    
        const {
            drawAnimation,
            imageClass,
            redirect,
            redirectShop,
            redirectProfile,
            spritesLoaded,
        } = this.state; 
        const { pseudo, money, isGuest } = this.props; 
        return (               
                <div className="back-row-toggle splat-toggle">
                    {redirect && <Redirect push to="/game" />}
                    {redirectShop && <Redirect push to="/shop" />}
                    {redirectProfile && <Redirect push to="/profile" />}
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
                            <div className="bannierePseudo" style={{width: this.getWidthFromPseudo(pseudo, money)}} />
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
                                        onClick={this.handleClickProfile}
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
                                        onClick={this.handleClickShop}
                                    >
                                        Boutique
                                    </Button>
                                </Col> 
                            </Row>
                        </Container>
                    }
                    {drawAnimation &&
                        <div>
                            <img className={imageClass} src='/images/logo2.png'/>
                            <span className="loader">
                                <Loader
                                    type="Triangle"
                                    color="#D99E30"
                                    height={100}
                                    width={100}
                                    timeout={3000000}
                                />
                                <h3 className="mainPage">{spritesLoaded + "/" + spritesNumber}</h3>                                
                            </span>                            
                        </div>
                    }
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
