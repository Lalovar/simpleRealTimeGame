import ground1x32 from './../../assets/ground1x32.png';
import obstacle1x32 from './../../assets/obstacle1x32.png';
import loadResources from './../GetResources';

const f1 = {
    image : loadResources (ground1x32),
    color : 'gray',
    obstacle: false
};

const o1 = {
    image : loadResources (obstacle1x32),
    color : 'black',
    obstacle: true
};

export const Fields = {
    beta1 : [
        [ o1, f1, f1, f1, f1, f1, f1, f1, f1, f1, f1, f1, f1, f1, f1, o1],
        [ f1, f1, f1, f1, f1, f1, f1, f1, f1, f1, f1, f1, f1, f1, f1, f1],
        [ f1, f1, f1, f1, f1, f1, f1, f1, f1, f1, f1, f1, f1, f1, f1, f1],
        [ f1, f1, f1, f1, f1, f1, o1, f1, f1, o1, f1, f1, f1, f1, f1, f1],
        [ f1, f1, f1, f1, f1, f1, o1, f1, f1, o1, f1, f1, f1, f1, f1, f1],
        [ f1, f1, f1, f1, f1, f1, o1, f1, f1, o1, f1, f1, f1, f1, f1, f1],
        [ f1, f1, f1, f1, f1, f1, f1, f1, f1, f1, f1, f1, f1, f1, f1, f1],
        [ f1, f1, f1, f1, f1, f1, f1, f1, f1, f1, f1, f1, f1, f1, f1, f1],
        [ o1, f1, f1, f1, f1, f1, f1, f1, f1, f1, f1, f1, f1, f1, f1, o1],
    ]
};
