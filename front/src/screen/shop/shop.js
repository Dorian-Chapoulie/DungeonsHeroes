import React from 'react';
import  { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import ComponentShop from '../../component/shop/shop';

class ScreenShop extends React.Component {
  constructor(props) {
    super(props);  
  }

  render() {
    const { isGuest } = this.props;    
    return (
      <>
        { isGuest && false && <Redirect to='/main'/> }
        <ComponentShop />
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isGuest: state.player.isGuest,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ScreenShop);