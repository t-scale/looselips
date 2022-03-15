'use strict'

import './style.css'
import './WebGL.js'
import * as THREE from 'three'
import { Quaternion } from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'

class World {
    constructor() {

        const logoURL = './models/logo.glb';
        const max_speed = { x: -0.025, y: 0.025 };
        const max_rotation = Math.PI / 2;

        let r = 0, g = 0, b = 0;
        let rgb = 0;

        this.colours = { 
            black: 0x000000,
            dark: 0x444444, 
            white: 0xffffff, 
            orange: 0xff3337, 
            pink: 0xff00b0,
            purple: 0x2200ff
        };

        const logo = new THREE.Object3D();
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera (
            viewAngle, 
            screenWidth / screenHeight,
            nearDistance,
            farDistance
        );

        const renderer = new THREE.WebGLRenderer ({
            antialias:true
        });

        const light = new THREE.AmbientLight( colours.white, 0.5 );
        const dirLight = new THREE.PointLight(colours.orange, 1);
        const loader = new GLTFLoader();
        const color1 = new THREE.Color();

        // 3D KEYFRAMES
        const rotation_set = {
            init: new THREE.Quaternion ( 0, 0, 0, 0 ),
            first: new THREE.Quaternion ( 0.1, 0.2, 0.3, 0.4 ),
            second: new THREE.Quaternion ( 0.7, 0.8, 0.9, 0.3 ),
            twist1: new THREE.Quaternion ( 0.4, 1, 0.9, 0.3 ),
            twist2: new THREE.Quaternion ( 0.3, 0.49, 0.33, 0.9 ),
            bottom: new THREE.Quaternion ( 1.03, 1.09, 0.93, 6.9 )
        }

        // quaternion containers
        let q = new Quaternion (0, 0, 0, 0);
        let q_temp = new Quaternion (0, 0, 0, 0);
    }

    async init() {
    }
}

export { World }