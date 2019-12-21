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
  CardImg,
  Col,
  Row,
} from 'reactstrap';
import { connect } from 'react-redux';
import { setLootBoxesAction } from '../../actions/player';

import './profile.scss';

class Profile extends React.Component {
    constructor(props) { 
      super(props);
      const { skinId } = this.props;
      this.state = {
          imgSrc: '/images/skin' + skinId + '.png',
      }       
    }

    render() {
        const { pseudo, money, lootboxes } = this.props;
        const { imgSrc } = this.state;
        return (
            <div>
                <Card className="login mt-5" style={{width: '18em'}}>    
                    <CardHeader>
                        <h5>{pseudo}</h5>
                    </CardHeader>

                    <CardBody>
                        <p>Argent: {money}</p>
                        <p>Loot boxes: {lootboxes}</p>
                    </CardBody>     
                </Card>
                { lootboxes == 0 && 
                    <Card className="login mt-5" style={{width: '18em'}}>    
                        <CardHeader>
                            <h5>Ouvrir mes loot boxes</h5>
                        </CardHeader>

                        <CardBody>
                            <CardImg src="/images/chest.png" />
                            <Button color="success" className="d-flex justify-content-center">Ouvrir</Button>
                        </CardBody>     
                    </Card>
                }

                <Card className="login mt-5 mySkins">    
                    <CardHeader>
                        <h5>Mes skins</h5>
                    </CardHeader>

                    <CardBody className="mySkins">
                        <Row>                        
                            <Col>
                                <Button color="success" className="d-flex">Précédent</Button>
                            </Col>                        
                            <Col>
                                <CardImg src={imgSrc} style={{width: 450, height: 150}} className="d-flex"/>                        
                            </Col>     
                            <Col>
                                <Button color="success" className="d-flex">Suivant</Button>
                            </Col> 
                        </Row>                                                              
                    </CardBody>     
                    
                    <CardFooter>
                        <Button color="success" className="d-flex justify-content-center">Activer</Button>
                    </CardFooter>
                </Card>
            </div>

        );
    }
}

const mapStateToProps = (state) => {
    return {
      pseudo: state.player.pseudo,
      money: state.player.money,
      lootboxes: state.player.lootboxes,
      skinId: state.player.skinId,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {      
      setLootBoxes: lootBoxes => dispatch(setLootBoxesAction(lootBoxes)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
