'use strict'

import './style.css'
import * as TWEEN from '@tweenjs/tween.js'
import { World } from './world';

function detectDiv ( el, obj3d ) {;
    const window_height = window.innerHeight;
    const wp = new Waypoint ({
        element: document.getElementById ( el ),
        handler: ( direction ) => {
            var dir = direction;
            trigger.apply ( this, [el, dir, obj3d] );
        },
        offset: window_height - 10
    });
}

function trigger( e, d, o ) {
    if ( o instanceof World ) {
        if ( e == 'intro' ) {
            if ( d == 'up' ) {
                o.q.slerpQuaternions ( o.rotation_set.twist1, o.rotation_set.init, 1 );
            } else {
                o.q.slerpQuaternions ( o.rotation_set.init, o.rotation_set.twist1, 1 );
            }
        } else if ( e == 'text' ) {
            if ( d == 'up' ) {
                o.q.slerpQuaternions ( o.rotation_set.twist2, o.rotation_set.twist1, 1 );
            } else {
                o.q.slerpQuaternions ( o.rotation_set.twist1, o.rotation_set.twist2, 1 );
            }
        } else if ( e == 'miniweb' ) {
            if ( d == 'up' ) {
                o.q.slerpQuaternions ( o.rotation_set.bottom, o.rotation_set.twist2, 1 );
            } else {
                o.q.slerpQuaternions ( o.rotation_set.twist2, o.rotation_set.bottom, 1 );
            }
        }
    }
}

export function init ( string_array, object_3d ) {
    for (var i = 0; i < string_array.length; i++) {
        detectDiv.apply ( this, [string_array[i], object_3d] );
      }
}