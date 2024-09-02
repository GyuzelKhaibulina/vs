
const KeyRandome = (length) => {
    let code = '';    
    let x;
    const words = '0123456789qwertyuiopasdfghjklzxcvbnmQWERTYUIOPASDFGHJKLZXCVBNM';
    const max_position = words.length - 1;
        for( let i = 0; i < length; ++i ) {
            x = Math.floor ( Math.random() * max_position );
            code = code + words.substring(x, x + 1);
        }
    return code;
}

export default KeyRandome;