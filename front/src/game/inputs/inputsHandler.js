const pressedKeys = [
    {
        state: false,
        canSend: true,
        value: 'z',
    },
    {
        state: false,
        canSend: true,
        value: 'q',
    },
    {
        state: false,
        canSend: true,
        value: 's',
    },
    {
        state: false,
        canSend: true,
        value: 'd',
    },
    {
        state: false,
        canSend: true,
        value: 'a',
    },
];

export var isInitialized = false;

export const initInputsEvent = () => {   
    isInitialized = true; 
    document.addEventListener('keypress', e => {
        pressedKeys.forEach(key => {
            if(e.key === key.value) {
                key.state = true;
            }
        });          
    });

    document.addEventListener('keyup', e => {
        pressedKeys.forEach(key => {
            if(e.key === key.value) {
                key.state = false;
                key.canSend = true;
            }
        });                  
    });
}

export const isKeyPressed = keyValue => {
    let keyState = false;    
    pressedKeys.map(key => {                        
        if(key.value === keyValue && key.state && key.canSend) {
            keyState = key.state;            
            key.canSend = false;
        }        
    });
    return keyState;
}

export const cansendNy = () => {    
    let canSend = true;
    pressedKeys.map(k => {        
        if(k.value === 'z' || k.value === 's') {                           
            if(k.state === true) {
                canSend = false;                
            }
        }
    })    
    return canSend;
}

export const cansendNx = () => {    
    let canSend = true;
    pressedKeys.map(k => {        
        if(k.value === 'q' || k.value === 'd') {
            if(k.state === true) {
                canSend = false;                
            }
        }
    })

    return canSend;
}