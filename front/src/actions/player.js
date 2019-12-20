export const setLoggedInAction = () => ({
    type: 'UPADTE_PLAYER_LOGIN',
    value: true,
});

export const setPseudoAction = (pseudo) => ({
    type: 'UPADTE_PLAYER_NAME',
    value: pseudo,
});

export const setMoneyAction = (money) => ({
    type: 'UPADTE_PLAYER_MONEY',
    value: money,
});