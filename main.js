import './style.css'
import './world.js'
import './keyframes.js'
import './user.js'
import { World } from './world.js'
import * as KF from './keyframes.js'
import * as USER from './user.js'

async function main() {
  
  let mouse = { x: 0, y: 0 };
  KF.detectDivs();
  const world = new World();
  world.init();

  if ( USER.userHandler() ) {
    // PROCEED TO MINI WEB DIV
    console.log( navigator.userAgent );
  } else {
    // START FROM TOP
  }

  function animate() {
    world.camera.updateMatrixWorld();
    console.log ( 'camera:', world.camera );
    world.renderer.render ( world.scene, world.camera );
  
    requestAnimationFrame ( animate );
  }
}

main();