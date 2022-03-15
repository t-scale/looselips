'use strict'

import './style.css'
import * as TWEEN from '@tweenjs/tween.js'

export function detectDivs ( window_height ) {
    var e;
    const introWP = new Waypoint ({
        element: document.getElementById ( 'intro' ),
        handler: ( direction ) => {
            e = document.getElementById ( 'intro' );
            console.log ( e );
            return e;
        },
        offset: window_height - 10
    });

    const textWP = new Waypoint ({
        element: document.getElementById ( 'text' ),
        handler: ( direction ) => {
            e = document.getElementById ( 'text' );
            console.log ( e );
            return e;
        },
        offset: window_height - 10
    });

    const bottomWP = new Waypoint ({
        element: document.getElementById ( 'bottom' ),
        handler: ( direction ) => {
            e = document.getElementById ( 'bottom' );
            console.log ( e );
            return e;
        },
        offset: window_height - 10
    });
}