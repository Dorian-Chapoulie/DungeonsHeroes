const initialState = {    
    player: {
        isLoggedIn: false,
        isGuest: true,
        pseudo: 'Guest_' + new Date().getTime(),
        money: 0,
    }
}

const rootReducer = (state = initialState, action) => {
    console.log(action.type, action.value);
    switch (action.type) {
        case 'UPADTE_PLAYER_LOGIN':                       
            return {
                player: {                    
                    isLoggedIn: action.value,
                    isGuest: false,                    
                    pseudo: state.player.pseudo,
                    money: state.player.money,
                },                                   
            }
        case 'UPADTE_PLAYER_NAME':                        
            return {
                player: {
                    isLoggedIn: state.player.isLoggedIn,
                    isGuest: state.player.isGuest,
                    pseudo: action.value,
                    money: state.player.money,
                },                                   
            } 
        case 'UPADTE_PLAYER_MONEY':                    
        return {
            player: {
                isLoggedIn: state.player.isLoggedIn,
                isGuest: state.player.isGuest,
                money: action.value,
                pseudo: state.player.pseudo,
            },                                   
        }        
        default:
            return state;
    }
}

export default rootReducer;