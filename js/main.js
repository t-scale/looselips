'use strict'

import '../css/style.css'
import './world.js'
import './user.js'
import { World } from './world.js'
import * as USER from './user.js'

function main() {
  
  const world = new World();
  world.init();

  if ( USER.userHandler() ) {
    // PROCEED TO MINI WEB DIV
    // console.log( navigator.userAgent );
  } else {
    // START FROM TOP
  }
}

main();