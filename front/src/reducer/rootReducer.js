const initialState = {    
    player: {
        isLoggedIn: false,
        isGuest: true,
        pseudo: 'Guest_' + new Date().getTime(),
        email: '',
        money: 0,
        lootboxes: 0,
        skinId: 0,
        availableSkins: [],
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
                    email: state.player.email,
                    lootboxes: state.player.lootboxes,
                    skinId: state.player.skinId,
                    availableSkins: state.player.availableSkins, 
                },                                   
            }
        case 'UPADTE_PLAYER_NAME':                        
            return {
                player: {
                    isLoggedIn: state.player.isLoggedIn,
                    isGuest: state.player.isGuest,
                    pseudo: action.value,
                    money: state.player.money,
                    email: state.player.email,
                    lootboxes: state.player.lootboxes,
                    skinId: state.player.skinId,
                    availableSkins: state.player.availableSkins, 
                },                                   
            } 
        case 'UPADTE_PLAYER_MONEY':                    
        return {
            player: {
                isLoggedIn: state.player.isLoggedIn,
                isGuest: state.player.isGuest,
                money: action.value,
                pseudo: state.player.pseudo,
                email: state.player.email,
                lootboxes: state.player.lootboxes,
                skinId: state.player.skinId,
                availableSkins: state.player.availableSkins, 
            },                                   
        }
        case 'UPADTE_PLAYER_EMAIL':                    
        return {
            player: {
                isLoggedIn: state.player.isLoggedIn,
                isGuest: state.player.isGuest,
                money: state.player.money,
                pseudo: state.player.pseudo,
                email: action.value,
                lootboxes: state.player.lootboxes,
                skinId: state.player.skinId,
                availableSkins: state.player.availableSkins, 
            },                                   
        }    
        case 'UPADTE_PLAYER_LOOTBOXES':                    
        return {
            player: {
                isLoggedIn: state.player.isLoggedIn,
                isGuest: state.player.isGuest,
                money: state.player.money,
                pseudo: state.player.pseudo,
                email: state.player.email,
                lootboxes: action.value,
                skinId: state.player.skinId,
                availableSkins: state.player.availableSkins, 
            },                                   
        }   
        case 'UPADTE_PLAYER_SKINID':                    
        return {
            player: {
                isLoggedIn: state.player.isLoggedIn,
                isGuest: state.player.isGuest,
                money: state.player.money,
                pseudo: state.player.pseudo,
                email: state.player.email,
                lootboxes: state.player.lootboxes,
                skinId: action.value,
                availableSkins: state.player.availableSkins, 
            },                                   
        }
        case 'UPADTE_PLAYER_SKINS':                    
        state.player.availableSkins.push(action.value);
        return {
            player: {
                isLoggedIn: state.player.isLoggedIn,
                isGuest: state.player.isGuest,
                money: state.player.money,
                pseudo: state.player.pseudo,
                email: state.player.email,
                lootboxes: state.player.lootboxes,
                skinId: state.player.skinId,
                availableSkins: state.player.availableSkins,                
            },                                   
        }              
        default:
            return state;
    }
}

export default rootReducer;