import React from 'react';
import  { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import ComponentProfile from '../../component/profile/profile';

class ProfileShop extends React.Component {
  constructor(props) {
    super(props);  
  }

  render() {
    const { isGuest } = this.props;    
    return (
      <>
        { isGuest && false && <Redirect to='/main'/> }
        <ComponentProfile />
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

export default connect(mapStateToProps, mapDispatchToProps)(ProfileShop);