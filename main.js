import './style.css'
import './world.js'
import './keyframes.js'
import { World } from './world.js';
import * as KF from './keyframes.js';

let mouse = { x: 0, y: 0 };
let screenWidth = window.innerWidth,
			screenHeight = window.innerHeight,
			viewAngle = 89,
			nearDistance = 0.1,
			farDistance = 1000;

KF.detectDivs ( screenHeight );