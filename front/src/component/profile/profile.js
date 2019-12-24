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
import { setLootBoxesAction, setSkinIdAction } from '../../actions/player';
import { tryGetAllSkins, setActivatedSkin } from '../../lib/fetch';
import AwesomeSlider from 'react-awesome-slider';
import 'react-awesome-slider/dist/styles.css';

import './profile.scss';

class Profile extends React.Component {
    constructor(props) { 
      super(props); 
      this.state = {
          allSkins: [],
          mainViewSkinId: 0,
      }
      this.getAllSkins();
    }

    getAllSkins = async () => {
        const getAllSkins = await tryGetAllSkins();        
        this.setState({allSkins: getAllSkins.skins});        
        this.setState({mainViewSkinId: getAllSkins.skins[0].id});
    }

    handleClickActivate = async () => {
        const { email, setSkinId } = this.props;
        const { mainViewSkinId } = this.state;
        const setSkin = await setActivatedSkin(email, mainViewSkinId);
        if(setSkin.activatedSkin) {
            setSkinId(mainViewSkinId);
        }
    }

    render() {
        const { pseudo, money, lootboxes, skins, skinId } = this.props;        
        const { allSkins, mainViewSkinId } = this.state;                
        const slider = (
            <AwesomeSlider 
                onTransitionEnd={e => {
                    const str = e.currentSlide.innerHTML;
                    const startIndex = str.search('id="');
                    const endIndex = str.search('">');                    
                    this.setState({mainViewSkinId: parseInt(str.slice(startIndex + 4, endIndex))});
                }} 
                className={skins.find(e => e === mainViewSkinId) === undefined ? 'skin-img' : ''}
            >                                              
            {
                allSkins.length > 0 && allSkins.map(e => {                                   
                    return(<div data-src={e.path} key={e.id} id={e.id}/>)          
                })
            }  
            </AwesomeSlider> 
        );        
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
                { lootboxes > 0 && 
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

                <Card className="login mt-5 mb-5 mySkins">    
                    <CardHeader>
                        <h5>Mes skins</h5>
                    </CardHeader>

                    <CardBody>  
                        {allSkins.length > 0 && slider}
                    </CardBody>     
                    
                    <CardFooter className="mt-5">
                        <Button
                            color="success"
                            className="d-flex justify-content-center"
                            disabled={mainViewSkinId === skinId || (skins.find(e => e === mainViewSkinId) === undefined ? true : false)}
                            onClick={this.handleClickActivate}
                        >
                            Activer
                        </Button>
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
      email: state.player.email,
      lootboxes: state.player.lootboxes,
      skinId: state.player.skinId,
      skins: state.player.availableSkins,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {      
      setLootBoxes: lootBoxes => dispatch(setLootBoxesAction(lootBoxes)),
      setSkinId: id => dispatch(setSkinIdAction(id)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
