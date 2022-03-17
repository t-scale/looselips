import './style.css'
import './world.js'
import './keyframes.js'
import './user.js'
import { World } from './world.js'
import * as KF from './keyframes.js'
import * as USER from './user.js'

function main() {

  const div = [
    'text',
    'intro',
    'miniweb'
  ]
  
  const world = new World();
  world.init();
  KF.init ( div, world );

  if ( USER.userHandler() ) {
    // PROCEED TO MINI WEB DIV
    // console.log( navigator.userAgent );
  } else {
    // START FROM TOP
  }
}

main();