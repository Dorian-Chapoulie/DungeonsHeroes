import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  Button,  
  Card,
  CardImg,
  CardHeader,
  CardBody,
  Row,
  Col,  
} from 'reactstrap';
import { Link } from 'react-router-dom';
import { setMoneyAction, setLootBoxesAction } from '../../actions/player';
import { tryBuyCase } from '../../lib/fetch';
import { store } from 'react-notifications-component';
import ReactNotification from 'react-notifications-component'

import './shop.scss';
import 'react-notifications-component/dist/theme.css'

class Shop extends React.Component {
    constructor(props) { 
      super(props);  
      this.state = {
        animationSong: [
            new Audio('/sounds/achete 1.mp3'),
            new Audio('/sounds/achete 2.mp3'),
            //new Audio('/sounds/achete 3.mp3'),
        ],
      }   
    }

    getWidthFromPseudo = (pseudo, money) => {
        const moneyLength = money.toString().length * 20;        
        return 100 + moneyLength + 20 * pseudo.length;
    }

    getRandomInt(max) {
        return Math.floor(Math.random() * Math.floor(max));
    }

    handleBuyChest = async (amount, price) => {        
        const { email, isGuest } = this.props;
        if(isGuest) {
            store.addNotification({
                title: "Achat",
                message: "Les invités ne peuvent pas acheter",
                type: "danger",
                insert: "top",
                container: "top-right",
                animationIn: ["animated", "fadeIn"],
                animationOut: ["animated", "fadeOut"],
                dismiss: {
                  duration: 2000,
                  onScreen: true
                }
            });
            return;
        }
        const requestBuy = await tryBuyCase(email, amount, price);
        if(requestBuy.error) {
            if(requestBuy.error === "money") {                
                store.addNotification({
                    title: "Achat",
                    message: "Transaction refusée: t'es trop pauve",
                    type: "danger",
                    insert: "top",
                    container: "top-right",
                    animationIn: ["animated", "fadeIn"],
                    animationOut: ["animated", "fadeOut"],
                    dismiss: {
                      duration: 2000,
                      onScreen: true
                    }
                });
            }else {
                store.addNotification({
                    title: "Achat",
                    message: "Transaction refusée: erreur interne",
                    type: "danger",
                    insert: "top",
                    container: "top-right",
                    animationIn: ["animated", "fadeIn"],
                    animationOut: ["animated", "fadeOut"],
                    dismiss: {
                      duration: 2000,
                      onScreen: true
                    }
                });
            }                
        }else {
            const { setLootBoxes, setMoney } = this.props;
            const { animationSong } = this.state;
            animationSong[this.getRandomInt(animationSong.length)].play();
            setLootBoxes(requestBuy.lootboxes);
            setMoney(requestBuy.money);
            store.addNotification({
                title: "Achat",
                message: "Transaction acceptée !",
                type: "success",
                insert: "top",
                container: "top-right",
                animationIn: ["animated", "fadeIn"],
                animationOut: ["animated", "fadeOut"],
                dismiss: {
                  duration: 2000,
                  onScreen: true
                }
            });
        }
    }

    render() {
        const { pseudo, money } = this.props;
        return (
            <>
                <ReactNotification />
                <div>                            
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
                </div>

                <div className="lootboxes d-flex justify-content-center">                    
                    <Card className="cardShop" style={{ width: '18rem' }}>                        
                        <CardImg src="/images/chest.png" />

                        <CardBody>
                            <CardHeader className="d-flex justify-content-center">
                                <h5>2 Coffres: 3€</h5>
                            </CardHeader>    

                            <Button color="secondary" className="d-flex justify-content-center" onClick={() => this.handleBuyChest(2, 3)} >Acheter</Button>                                                                                                                                        
                        </CardBody>
                    </Card> 
                    <Card className="cardShop" style={{ width: '18rem' }}>                        
                        <CardImg src="/images/chest.png" />

                        <CardBody>
                            <CardHeader className="d-flex justify-content-center">
                                <h5>5 Coffres: 5€</h5>
                            </CardHeader>                                                        
                            
                            <Button color="primary" className="d-flex justify-content-center" onClick={() => this.handleBuyChest(5, 5)}>Acheter</Button>
                        </CardBody>
                    </Card>    
                    <Card className="cardShop" style={{ width: '18rem' }}>                        
                        <CardImg src="/images/chest.png" />

                        <CardBody>
                            <CardHeader className="d-flex justify-content-center">
                                <h5>11 Coffres: 9€</h5>
                            </CardHeader>                                                        
                            
                            <Button color="success" className="d-flex justify-content-center" onClick={() => this.handleBuyChest(11, 9)}>Acheter</Button>
                        </CardBody>
                    </Card>    
                    <Card className="cardShop" style={{ width: '18rem' }}>                        
                        <CardImg src="/images/chest.png" />

                        <CardBody>
                            <CardHeader className="d-flex justify-content-center">
                                <h5>24 Coffres: 20€</h5>
                            </CardHeader>                                                        
                            
                            <Button color="info" className="d-flex justify-content-center" onClick={() => this.handleBuyChest(24, 20)}>Acheter</Button>
                        </CardBody>
                    </Card>    
                    <Card className="cardShop" style={{ width: '18rem' }}>                        
                        <CardImg src="/images/chest.png" />

                        <CardBody>
                            <CardHeader className="d-flex justify-content-center">
                                <h5>50 Coffres: 40€</h5>
                            </CardHeader>                                                        
                            
                            <Button color="warning" className="d-flex justify-content-center" onClick={() => this.handleBuyChest(50, 40)}>Acheter</Button>
                        </CardBody>
                    </Card>        
                </div>  
            </>
      );
    }
}

const mapStateToProps = (state) => {
    return {
      pseudo: state.player.pseudo,
      money: state.player.money,
      isGuest: state.player.isGuest,
      email: state.player.email,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
      setMoney: money => dispatch(setMoneyAction(money)),
      setLootBoxes: lootBoxes => dispatch(setLootBoxesAction(lootBoxes)),
    }
  }

export default connect(mapStateToProps, mapDispatchToProps)(Shop);
