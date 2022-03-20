'use strict'

import '../css/style.css'
import './WebGL.js'

import * as THREE from 'three'
import * as TWEEN from '@tweenjs/tween.js'
import { Quaternion } from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import { Vector3 } from 'three'

export class World {

    constructor () {
    
        /* ---------------------- ROTATION ---------------------- */
        this.tw_time_rotation = 500;
        this.tw_easing_rotation = TWEEN.Easing.Exponential.Out;
        this.tw_rotation = new Vector3 ( 0, 0, 0 );
        this.tw_rotation_array = [
            new Vector3 ( 0.7, 0.5, 0.1 ),
            new Vector3 ( -0.6, 0.8, -0.4 ),
            new Vector3 ( 0.5, 0, 0 )
        ];

        /* ---------------------- SHAPE ---------------------- */
        this.tw_time_shape = 333;
        this.tw_easing_shape = TWEEN.Easing.Quadratic.InOut;
        this.tw_shape = new Vector3 ( 1, 1, 1 );
        this.tw_shape_array = [
            new Vector3 ( 1.4, 1.1, 8 ),
            new Vector3 ( -1, -1, 32 ),
            new Vector3 ( 0.125, 0.125, 0.125 )
        ];

        /* ---------------------- POSITION ---------------------- */
        this.tw_time_pos = 250;
        this.tw_easing_pos = TWEEN.Easing.Sinusoidal.InOut;
        this.tw_pos = new Vector3 ( 0, 0 );
        this.tw_pos_array = [
            new Vector3 ( 0.43, -0.63 ),
            new Vector3 ( 0.65, 0.5 ),
            new Vector3 ( -0.85, -1.6 )
        ];

         /* ---------------------- COLOUR (LOGO) ---------------------- */
         this.tw_time_colour = 125;
         this.tw_easing_colour = TWEEN.Easing.Elastic.InOut;
         this.tw_colour = new Vector3 ( 0.2, 0.2, 0.2 );
         this.tw_colour_array = [
             new Vector3 ( -2, 2, 1.25 ),
             new Vector3 (  -2, 2, 1.25 ),
             new Vector3 ( 0.2, 0.2, 0.2 )
         ];

        /* ---------------------- TWEEN ARRAYS ---------------------- */
        this.tw_init_vectors = [ 
            this.tw_rotation,
            this.tw_shape,
            this.tw_pos,
            this.tw_colour
        ];
        this.tw_arrays = [
            this.tw_rotation_array,
            this.tw_shape_array,
            this.tw_pos_array,
            this.tw_colour_array
        ];
        this.tw_easings = [
            this.tw_easing_rotation,
            this.tw_easing_shape,
            this.tw_easing_pos,
            this.tw_easing_colour
        ];
        this.tw_times = [ 
            this.tw_time_rotation,
            this.tw_time_shape,
            this.tw_time_pos,
            this.tw_time_colour
        ];

        this.tweens = [
            [],[],[],[]
        ];

        this.window_height = window.innerHeight;
        this.div = [
            'intro',
            'text',
            'miniweb'
        ];
        this.mouse = { x: 0, y: 0 };
        document.addEventListener ( 'mousemove', ( event ) => {
            event.preventDefault();
            this.mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
            this.mouse.y = - (event.clientY / window.innerHeight) * 2 + 1;
        });

        this.speed = { x: 0, y: 0 };
        this.depth = { x: 1, y: 1, z: 1 };
        this.rotate = { x: 0, y:0 };

        this.logoURL = './models/logo.glb';

        this.max_speed = { x: -0.025, y: 0.025 };
        this.max_rotation = Math.PI / 2;

        // this.r = 0, this.g = 0, this.b = 0;
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

        this.loadModel()
        this.tweenInit();
        this.trigger ( this.div );
        this.onScroll();
        this.loop();
    }

    loadModel() {
        this.loader.load(
            this.logoURL,
            ( o ) => {
                this.logo.add ( o.scene )
                this.scene.add ( this.logo )
                this.logo.traverse( ( child ) => {
                    if ( child instanceof THREE.Mesh ) {
                        child.material.color.setHex ( this.colours.orange );
                    }
                })
            }
        )
    }

    tweenInit() {
        for (var i = 0; i < this.tw_arrays.length; i++) {
            for (var j = 0; j < this.tw_arrays[i].length; j++ ) {
                const tween = new TWEEN.Tween ( this.tw_init_vectors[i] )
                    .to ( this.tw_arrays[i][j], this.tw_times[i] )
                    .easing ( this.tw_easings[i] )
                    .yoyo (true)
                    .repeat (1)
                    .onUpdate ( () => this.update() );
                    this.tweens[i].push ( tween );
            }
        }
    }

    trigger ( string_array ) {
        for (var i = 0; i < this.tweens.length; i++) {
            for (var j = 0; j < string_array.length; j++) {
                const time = this.tw_times[i];
                const e = string_array[j];
                const tween = this.tweens[i][j];
                if ( tween instanceof TWEEN.Tween ) {
                    const timeout = () => { tween.pause() };
                    const wp = new Waypoint ({
                        element: document.getElementById ( e ),
                        handler: ( d ) => {
                            for (var i = 0; i < string_array.length; i++) {
                                if ( e == string_array[i] ) {
                                    if ( d == 'down' ) {
                                        tween.start();
                                        setTimeout ( timeout, time );
                                    }
                                }
                                if ( d == 'up' ) { tween.resume() }
                            }
                        }, offset: this.window_height - 10
                    });
                }
            }
        }
    }

    onMouseMove ( event ) {
        event.preventDefault();
        this.mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
        this.mouse.y = - (event.clientY / window.innerHeight) * 2 + 1;
    }

    onScroll() {
        window.onscroll = ( event ) => {
            this.scroll = window.scrollY / document.body.scrollHeight;
            this.rgb = ( ( this.scroll * 12 ) % 0.66 ) + 0.25;
            this.scene.background.setRGB (this.rgb, this.rgb, this.rgb);
            this.color1.setRGB ( this.r, this.g, this.b );
        }
    }

    loop () {
        const id = requestAnimationFrame ( () => this.loop() );
        this.renderer.render ( this.scene, this.camera );

        TWEEN.update();

        this.logo.rotation.x = this.tw_init_vectors[0].y - this.mouse.y;
        this.logo.rotation.y = this.tw_init_vectors[0].x + this.mouse.x;
    }

    update() {
        this.logo.rotation.x = this.tw_init_vectors[0].y;
        this.logo.rotation.y = this.tw_init_vectors[0].x;

        this.logo.scale.set ( 
            this.tw_init_vectors[1].x, 
            this.tw_init_vectors[1].y, 
            this.tw_init_vectors[1].z 
        );

        this.logo.position.x = this.tw_init_vectors[2].y;
        this.logo.position.y = this.tw_init_vectors[2].x;

        // this.r = 1 - this.scroll * 12 + 0.25;
        // this.g = ( this.scroll * 12 + 0.25 ) / 2;
        // this.b = 0.5 + ( this.scroll * 12 + 0.25 ) / 2;

        this.logo.traverse ( ( child ) => {
            if (child instanceof THREE.Mesh) {
                child.material.color.setRGB (
                    this.tw_init_vectors[3].x,
                    this.tw_init_vectors[3].y,
                    this.tw_init_vectors[3].z
                );
            }
        });
    }
}