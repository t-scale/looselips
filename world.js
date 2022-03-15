'use strict'

import './style.css'
import './WebGL.js'
import * as THREE from 'three'
import { Quaternion } from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'

export class World {

    constructor () {

        this.logoURL = './models/logo.glb';

        this.max_speed = { x: -0.025, y: 0.025 };
        this.max_rotation = Math.PI / 2;

        this.r = 0, this.g = 0, this.b = 0;
        this.rgb = 0;

        this.colours = { 
            black: 0x000000,
            dark: 0x444444, 
            white: 0xffffff, 
            orange: 0xff3337, 
            pink: 0xff00b0,
            purple: 0x2200ff
        };

        this.screenWidth = window.innerWidth;
        this.screenHeight = window.innerHeight;
        this.viewAngle = 89;
        this.nearDistance = 0.1;
        this.farDistance = 1000;

        this.logo = new THREE.Object3D();
        this.scene = new THREE.Scene();
        this.camera = new THREE.PerspectiveCamera (
            this.viewAngle, 
            this.screenWidth / this.screenHeight,
            this.nearDistance,
            this.farDistance
        );

        this.renderer = new THREE.WebGLRenderer ({
            antialias:true
        });

        this.light = new THREE.AmbientLight( this.colours.white, 0.5 );
        this.dirLight = new THREE.PointLight(this.colours.orange, 1);
        this.loader = new GLTFLoader();
        this.color1 = new THREE.Color();
        
        // 3D KEYFRAMES
        this.rotation_set = {
            init: new THREE.Quaternion ( 0, 0, 0, 0 ),
            first: new THREE.Quaternion ( 0.1, 0.2, 0.3, 0.4 ),
            second: new THREE.Quaternion ( 0.7, 0.8, 0.9, 0.3 ),
            twist1: new THREE.Quaternion ( 0.4, 1, 0.9, 0.3 ),
            twist2: new THREE.Quaternion ( 0.3, 0.49, 0.33, 0.9 ),
            bottom: new THREE.Quaternion ( 1.03, 1.09, 0.93, 6.9 )
        }

        // quaternion containers
        this.q = new Quaternion (0, 0, 0, 0);
        this.q_temp = new Quaternion (0, 0, 0, 0);
    }

    init() {
        
        // SCENE
        this.scene.background = new THREE.Color (this.colours.dark);

        // CAMERA
        this.camera.position.set ( 0, 0, 1 );

        // WEBGL RENDERER
        this.renderer.setPixelRatio ( window.devicePixelRatio );
        this.renderer.setSize ( this.screenWidth, this.screenHeight );
        this.renderer.render ( this.scene, this.camera );
        document.body.appendChild ( this.renderer.domElement );

        // LIGHT
        this.scene.add (this.light);
        this.dirLight.position.set (0,1,0);
        this.dirLight.castShadow = false;
        this.scene.add ( this.dirLight );

        // LOAD MODEL
        this.loader.load (
            this.logoURL,
            ( glb ) => {
                console.log ('glb:', glb);
                this.logo.add ( glb.scene );
                this.scene.add ( this.logo );
                this.logo.traverse ( ( child ) => {
                    if ( child instanceof THREE.Mesh ) {
                        this.color1.setHex (this.colours.orange);
                        console.log (this.logo);
                    }
                });
            }
        );
    }
}