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

export const addMoneyAction = (money) => ({
    type: 'UPADTE_ADD_PLAYER_MONEY',
    value: money,
});

export const setEmailAction = (email) => ({
    type: 'UPADTE_PLAYER_EMAIL',
    value: email,
});

export const setLootBoxesAction = (lootBoxes) => ({
    type: 'UPADTE_PLAYER_LOOTBOXES',
    value: lootBoxes,
});

export const setSkinIdAction = (skinId) => ({
    type: 'UPADTE_PLAYER_SKINID',
    value: skinId,
});

export const addSkinAction = (skinId) => ({
    type: 'UPADTE_PLAYER_SKINS',
    value: skinId,
});

export const setIsSpritesLoaded = (isSpriteLoaded) => ({
    type: 'UPADTE_PLAYER_LOADED_SPRITES',
    value: isSpriteLoaded,
});