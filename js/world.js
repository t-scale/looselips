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
        
        this.trigger;
        this.tweenInit;
        this.onMouseMove;
        this.onScroll;
        this.update;
        this.loop;

        this.result;
        this.info;

        this.tween_default_and_intro;
        this.tween_intro_and_text;
        this.tween_text_and_bottom;
        this.tween_time = 500;
        this.easing_default = TWEEN.Easing.Exponential.Out;

        this.window_height = window.innerHeight;
        this.div = [
            'intro',
            'text',
            'miniweb'
          ]
        this.mouse = { x: 0, y: 0 };
        document.addEventListener ( 'mousemove', ( event ) => {
            event.preventDefault();
            this.mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
            this.mouse.y = - (event.clientY / window.innerHeight) * 2 + 1;
        } );

        this.speed = { x: 0, y: 0 };
        this.depth = { x: 1, y: 1, z: 1 };

        this.rotate = { x: 0, y:0 };

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
            init: new Vector3 ( 0, 0, 0 ),
            intro: new Vector3 ( -0.7, 0.5, 0.1 ),
            text: new Vector3 ( 0.6, -0.8, 0.4 ),
            bottom: new Vector3 ( 0.5, 0.2, 0.9 )
        }

        // VECTOR CONTAINERS
        this.v = new Vector3 (0, 0, 0, 0);
        // this.v = { x: 0, y: 0, rotation: 0 };
        this.v_tmp = new Vector3 (0, 0, 0, 0);
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
            (glb) => {
                console.log('glb:', glb)
                this.logo.add(glb.scene)
                this.scene.add(this.logo)
                this.logo.traverse( ( child ) => {
                    if (child instanceof THREE.Mesh) {
                        child.material.color.setHex ( this.colours.orange );
                    }
                })
            }
        )
    }

    tweenInit() {
        this.tween_default_and_intro = new TWEEN.Tween ( this.v )
            .to ( this.rotation_set.intro, this.tween_time )
            .easing ( this.easing_default )
            .yoyo (true)
            .repeat (1)
            .onUpdate ( () => this.update() );
        
        this.tween_intro_and_text = new TWEEN.Tween ( this.v )
            .to ( this.rotation_set.text, this.tween_time )
            .easing ( this.easing_default )
            .yoyo (true)
            .repeat (1)
            .onUpdate ( () => this.update() );

        this.tween_text_and_bottom = new TWEEN.Tween ( this.v )
            .to ( this.rotation_set.bottom, this.tween_time )
            .easing ( this.easing_default )
            .yoyo (true)
            .repeat (1)
            .onUpdate ( () => this.update() );
    }

    trigger ( string_array ) {
        for (var i = 0; i < string_array.length; i++) {
            const e = string_array[i];
            const wp = new Waypoint ({
                element: document.getElementById ( e ),
                handler: ( d ) => {
                    if ( e == string_array[0] ) {
                        if ( d == 'down' ) {
                            this.tween_default_and_intro.start();
                            setTimeout ( () => { this.tween_default_and_intro.pause() }, this.tween_time );
                        } else if ( d == 'up' ) {
                            this.tween_default_and_intro.resume();
                        }
                    } else if ( e == string_array[1] ) {
                        if ( d == 'down' ) {
                            this.tween_intro_and_text.start();
                            setTimeout ( () => { this.tween_intro_and_text.pause() }, this.tween_time );
                        } else if ( d == 'up' ) {
                            this.tween_intro_and_text.resume();
                        }
                    } else if ( e == string_array[2] ) {
                        if ( d == 'down' ) {
                            this.tween_text_and_bottom.start();
                            setTimeout ( () => { this.tween_text_and_bottom.pause() }, this.tween_time );
                        } else if ( d == 'up' ) {
                            this.tween_text_and_bottom.resume();
                        }
                    }
                },
                offset: this.window_height - 10
            });
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
    
            // this.depth.x = 1 + this.scroll * 1;
            // this.depth.y = 1 + this.scroll * 0.5;
            // this.depth.z = 1 + this.scroll * 5;
    
            this.rgb = this.scroll * 12 + 0.25;
            this.r = 1 - this.scroll * 12 + 0.25;
            this.g = ( this.scroll * 12 + 0.25 ) / 2;
            this.b = 0.5 + ( this.scroll * 12 + 0.25 ) / 2;
    
            this.scene.background.setRGB (this.rgb, this.rgb, this.rgb);
            this.logo.scale.set (this.depth.x, this.depth.y, this.depth.z);
            this.color1.setRGB ( this.r, this.g, this.b );
            this.logo.traverse ( ( child ) => {
                if (child instanceof THREE.Mesh) {
                    child.material.color.setRGB ( this.r, this.g, this.b );
                }
            });
        }
    }

    loop () {
        const id = requestAnimationFrame ( () => this.loop() );
        this.renderer.render ( this.scene, this.camera );

        this.result = TWEEN.update();
        // if (!result) cancelAnimationFrame (id);

        this.logo.rotation.x = this.v.y - this.mouse.y;
        this.logo.rotation.y = this.v.x + this.mouse.x;
    }

    update() {
        this.logo.rotation.x = this.v.y;
        this.logo.rotation.y = this.v.x;
    }
}