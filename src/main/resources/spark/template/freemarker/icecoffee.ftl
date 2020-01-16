
    <!-- This is a static file -->
    <!-- served from your routes in server.js -->

    <!DOCTYPE html>

    <html lang="en">



    <head>

        <title>Ambient Visualizer</title>
        <meta name="description" content="CS32 Term Project">
        <link id="favicon" rel="icon" href="https://glitch.com/edit/favicon-app.ico" type="image/x-icon">
        <meta charset="utf-8"
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1">



        <!-- import the webpage's stylesheet -->

        <link rel="stylesheet" href="/css/style.css">



        <!-- import the webpage's client-side javascript file -->


        <script src="/js/jquery-2.1.1.js" defer></script>
        <script src="/js/jquery-3.1.1.js" defer></script>
        <script src="/js/audio.js" defer></script>
        <script src="/js/AudioPlayer.js" defer></script>

        <script src="/js/whomst.js" defer></script>
        <script src="/js/worker.js" defer ></script>
        <script src="/js/shader.js" defer></script>
        <script src="https://aframe.io/releases/0.9.0/aframe.min.js" ></script>
        <script src="https://unpkg.com/aframe-particle-system-component@1.0.x/dist/aframe-particle-system-component.min.js"></script>
        <script src="https://rawgit.com/donmccurdy/aframe-extras/master/dist/aframe-extras.loaders.min.js"></script>
    </head>

    <body>
    <audio id="whomst" loop src="https://raw.githubusercontent.com/anars/blank-audio/master/1-hour-of-silence.mp3"></audio>
    <a onclick="play()" class="round-button">
        <div class="fav"><i id="player" class="fa fa-play fa-2x" style="font-size:100px"></i></div>
    </a>

    <a-scene update-html cursor="rayOrigin: mouse" raycaster="objects: .clickable">

        <!-- assets -->
        <a-assets timeout="50000">

            <img id="windowpic" crossorigin="anonymous"

                 src = "https://cdn.glitch.com/f3fd3c98-333c-4658-8ec6-8b77068f2a2b%2Fpvd%20sky.png?1556688705335">

            <img id="moonpic" crossorigin="anonymous"

                 src = "https://cdn.glitch.com/f3fd3c98-333c-4658-8ec6-8b77068f2a2b%2Fpvd%20moon.png?1556686291584">

            <img id="windowpicfront" crossorigin="anonymous"

                 src = "https://cdn.glitch.com/f3fd3c98-333c-4658-8ec6-8b77068f2a2b%2Fpvd%20blg.png?1556688302544">


            <img id="fireimg"

                 crossorigin="anonymous"

                 src="https://cdn.glitch.com/f3fd3c98-333c-4658-8ec6-8b77068f2a2b%2Ffire.png?1556684674707">

            <img id="painting-img"

                 crossorigin="anonymous"

                 src="https://cdn.glitch.com/f3fd3c98-333c-4658-8ec6-8b77068f2a2b%2Fsacred%20and%20profane.jpg?1556696265832">
                 
            <img id="painting-img-inv"

                 crossorigin="anonymous"

                 src="https://cdn.glitch.com/f3fd3c98-333c-4658-8ec6-8b77068f2a2b%2Fsacred%20and%20profane%20inv.png?1557090566673">

            <img id="rug-img"

                 crossorigin="anonymous"

                 src="https://cdn.glitch.com/e87e41b9-92f8-4a4d-9aa6-95d4807b3e95%2F718Q6xj3rPL._SY606_.jpg?1556754300304">

            <img id="chrome"

                 crossorigin="anonymous"

                 src="https://cdn.glitch.com/f3fd3c98-333c-4658-8ec6-8b77068f2a2b%2Fchrome.jpg?1556737092621">

            <img id="desktop"

                 crossorigin="anonymous"

                 src="https://cdn.glitch.com/f3fd3c98-333c-4658-8ec6-8b77068f2a2b%2Fwindowsdesktop.png?1556744687561">

            <img id="error"

                 crossorigin="anonymous"

                 src="https://cdn.glitch.com/f3fd3c98-333c-4658-8ec6-8b77068f2a2b%2Ferror.jpg?1556744848694">



            <a-asset-item id="sofa-obj"

                          src = "https://cdn.glitch.com/62b455b4-3dc2-400f-a508-670755162e18%2Fsofa2.obj?1555703488269" ></a-asset-item>



            <a-asset-item id="fireplace-obj"

                          src = "https://cdn.glitch.com/f3fd3c98-333c-4658-8ec6-8b77068f2a2b%2Ffireplace.obj?1556694484070" ></a-asset-item>

            <a-asset-item id="coffeetable-obj"

                          src = "https://cdn.glitch.com/f3fd3c98-333c-4658-8ec6-8b77068f2a2b%2FCoffeeTable.obj?1556736503794" ></a-asset-item>

            <a-asset-item id="laptop-obj"

                          src = "https://cdn.glitch.com/f3fd3c98-333c-4658-8ec6-8b77068f2a2b%2Fnotebook.obj?1556743346781" ></a-asset-item>



            <a-asset-item id="cat-gltf"

                          src="https://cdn.glitch.com/96f4962b-687e-412a-a80b-7f7261565599%2Fout.glb"></a-asset-item>





            <img id="low-freq" crossorigin="anonymous"

                 src="https://cdn.glitch.com/96f4962b-687e-412a-a80b-7f7261565599%2FScreen%20Shot%202019-04-23%20at%2013.09.49.png?1556039418722">

            <img id="med-freq" crossorigin="anonymous"

                 src="https://cdn.glitch.com/96f4962b-687e-412a-a80b-7f7261565599%2FScreen%20Shot%202019-04-23%20at%2013.09.55.png?1556039417569">

            <img id="high-freq" crossorigin = "anonymous"

                 src="https://cdn.glitch.com/96f4962b-687e-412a-a80b-7f7261565599%2FScreen%20Shot%202019-04-23%20at%2013.10.00.png?1556039420351">

            <img id="transparency-on" crossorigin = "anonymous"

                 src = "https://cdn.glitch.com/96f4962b-687e-412a-a80b-7f7261565599%2FScreen%20Shot%202019-04-23%20at%2013.52.04.png?1556041993285">

            <img id="transparency-off" crossorigin = "anonymous"

                 src = "https://cdn.glitch.com/96f4962b-687e-412a-a80b-7f7261565599%2FScreen%20Shot%202019-04-23%20at%2013.52.09.png?1556041994497">



            <img id="valmont"
                 crossorigin="anonymous"

                 src="https://cdn.glitch.com/f3fd3c98-333c-4658-8ec6-8b77068f2a2b%2Fplay.png?1557097838122">


            <img id="normal"

                 crossorigin="anonymous"

                 src="https://cdn.glitch.com/f3fd3c98-333c-4658-8ec6-8b77068f2a2b%2Fnormal.png?1557090263277">



            <img id="abnormal"

                 crossorigin="anonymous"

                 src="https://cdn.glitch.com/f3fd3c98-333c-4658-8ec6-8b77068f2a2b%2Fabmornal.png?1557090258082">





        </a-assets>


        <!-- walls -->



        <a-entity geometry="primitive: plane; height:7.5; width:10" id="floor" material="color: #d2ace2" rotation="-90 0 0" position="0 0 -1.25" shadow="cast: true; receive: true"></a-entity>

        <a-entity geometry="primitive: plane; height:7.5; width:10" id="ceiling" material="color: #d2ace2" rotation="90 0 0" position="0 5 -1.25" shadow="cast: true; receive: true"></a-entity>

        <a-entity geometry="primitive: plane; height:5; width:7.5" material="color: #d2ace2" rotation="0 90 0" position="-5 2.5 -1.25" shadow="receive: true; cast:true"></a-entity>

        <a-entity id="rightwall" geometry="primitive: plane; height:5; width:7.5"  material="color: #d2ace2" rotation="0 -90 0" position="5 2.5 -1.25" shadow="receive: true; cast:true"></a-entity>



        <a-entity id="painting" class="clickable" geometry="primitive: plane; height: 2; width: 4" material="src: #painting-img "

                  rotation="0 90 0" position="-4.5 3 -1.2"></a-entity>



        <a-entity id="rug" geometry="primitive: box; height: 3; width: 4.5; depth: 0.01" material="src: #rug-img"

                  rotation="-90 0 0" position="-0.73 0 -1.33"></a-entity>



        <!-- window view and moon -->



        <a-entity id="window" geometry="primitive: plane; height: 13; width: 13" material="src: #windowpic; opacity: 0.5; transparent: true; emissive:  #172b3c; "

                  rotation="" position="0 1.990 -5.2" shadow="" scale="1 0.6 0.6"></a-entity>

        <a-entity id="moon" geometry="primitive: plane; height: 10; width: 10" material="src: #moonpic; opacity: 0.5; transparent: true; emissive:  #172b3c; "

                  rotation="" position="0 1.990 -5.1" shadow="" scale="1 0.6 0.6"></a-entity>

        <a-entity id="window front" geometry="primitive: plane; height: 10; width: 10" material="src: #windowpicfront; opacity: 1; transparent: true; emissive:  #172b3c; "

                  rotation="" position="0 1.990 -5" shadow="" scale="1 0.6 0.6"></a-entity>



        <!-- fireplace -->



        <a-entity id= "fireplace"



                  obj-model = "obj: #fireplace-obj"

                  material = "color: white; opacity: 1.0"

                  position = "-4.98 0.887 -1.25"

                  rotation = "0 90 0"

                  shadow="cast: true; receive: true"

                  scale="0.00065 0.0008 0.00065"

        ></a-entity>



        <a-image id="fire" position= "-4.71 0.32 -1.3" height="1" width="1" rotation="0 90 0" src="#fireimg" ></a-image>





        <!-- objects -->



        <a-entity id= "coffeetable"



                  obj-model = "obj: #coffeetable-obj"

                  material = "src: #chrome; color: grey; opacity: 1.0; metallness: 1"

                  position = "1.6 0.002 -1.8"

                  rotation = "0 45 0"

                  shadow="cast: true; receive: true"

                  scale="0.01 0.01 0.02"

        ></a-entity>



        <a-entity id= "laptop"



                  obj-model = "obj: #laptop-obj"

                  material = "color: #d8d8d8; opacity: 1.0; metallness: 1"

                  position = "1.194 0.364 -2.112"

                  rotation = "0 0 0"



                  scale="0.01 0.01 0.01"

        ></a-entity>



        <a-entity id="laptopscreen" geometry="primitive: plane; height: 0.2; width: 0.3" 
                  material="shader: html; target: #htmlElement; fps: 4"
                  rotation="-13.8 0 0" position="1.194 0.476 -2.25"></a-entity>



        <a-entity class="clickable" geometry="primitive: cylinder; height:0.5; radius:0.2" id="cylinder" material="color: red; opacity: 0.5" position="-4 0.25 -3" shadow="cast: false; receive: false" onclick="toggleBallCloudSize()"></a-entity>

        <!-- <a-entity geometry="primitive: sphere; radius:1" id="orb" material="color: white; opacity: 0.1; transparent: true" position="-2 1 0" shadow="cast: false; receive: false"></a-entity> -->

        <a-entity geometry="primitive: sphere; radius:0.2" id="innerorb" material="color: yellow; opacity: 0.8; transparent: true" position="3 0.5 -2.23" shadow="cast: false; receive: false" animation="property: geometry.radius; from: 0.2; to: 0.18; dir: alternate; dur: 1000; easing: easeInOutQuad; loop: true"></a-entity>



        <a-entity id="ceilingLight" light="color: #ffffff; type:point; castShadow:true; intensity:0.5;" animation="property: position; to: 0 4 0; dur: 5000; easing: linear" ></a-entity>



        <a-sphere id="ball" position="-3 1.25 -5" radius="0.5" color="#ffba7f" animation="property: color; to: #f442dc; dur: 1500; dir:alternate; loop:true; easing: linear"></a-sphere>

        <a-sphere id="ball2" position="-3 0.25 -5" radius="0.5" color="#ffba7f" animation="property: color; from: #ffba7f; to: #ff7af6; loop:true; dur: 1500; dir:alternate; easing: linear"></a-sphere>



        <a-entity geometry="primitive: box; width: 1.8; height: 1; depth: 0.1" id = "poster-button" material="src: #valmont; opacity: 0.9" class = "clickable" position = "0 2 -2" ></a-entity> 

        <a-entity geometry="primitive: box; width: 0.6; height: 0.3; depth: 0.02" id = "normalsettings" material="src: #abnormal; opacity: 0.9" class = "clickable" position = "2 2 -2" ></a-entity> 

        <a-entity light="type:directional; castShadow:true;" position="1 1 1" ></a-entity>



        <a-entity id= "sofa"

                  class = "clickable"

                  obj-model = "obj: #sofa-obj"

                  material = "color: #f90250; opacity: 1.0; transparent: true"

                  position = "2.68 -0.2 -3"

                  rotation = "0 -126 0"

                  shadow="cast: true; receive: true"

        ></a-entity>



        <a-sky id="sky" color="#5a39fc"></a-sky>



        <a-gltf-model id="cat"

                      position = "2 0 -4"

                      rotation = "90 90 0"

                      scale="0.1 0.1 0.1"

                      shadow="cast: true; receive: true"

                      animation-mixer

                      src= "#cat-gltf"

                      animation="property: position; to: -2 0 -4; dur: 5000; easing: linear; autoplay: true"></a-gltf-model>





        <a-circle visible="false" id = "circle-shadow" color="#282828" opacity="0.85" radius="1.5" position = "1 .75 -3.5" rotation = "-90 0 0" ></a-circle>



        <a-image id="freq-settings" class="clickable"

                 width = "0.15" height = "0.15" position = "2.5 2 -2"

                 src="https://cdn.glitch.com/96f4962b-687e-412a-a80b-7f7261565599%2Fgear_2699.png?1556045531769"></a-image>

        <a-image id = "shadows-on" class="clickable" position= "1.7 1.4 -2"

                 width = "0.3" height = "0.15" visible="false"

                 src="https://cdn.glitch.com/e87e41b9-92f8-4a4d-9aa6-95d4807b3e95%2FScreen%20Shot%202019-05-01%20at%2013.41.04.png?1556741195536" ></a-image>

        <a-image id="R" position= "2 1.4 -2" color="red"

                 width = "0.1" height = "0.1" visible="false"

                 src="https://cdn.glitch.com/96f4962b-687e-412a-a80b-7f7261565599%2FScreen%20Shot%202019-04-23%20at%2013.02.12.png?1556038983838"></a-image>

        <a-image id="G" position= "2 1.2 -2" color="green"

                 width = "0.1" height = "0.1" visible="false"

                 src="https://cdn.glitch.com/96f4962b-687e-412a-a80b-7f7261565599%2FScreen%20Shot%202019-04-23%20at%2013.02.25.png?1556038985052"></a-image>

        <a-image id="B" position= "2 1 -2" color="blue"

                 width = "0.1" height = "0.1" visible="false"

                 src="https://cdn.glitch.com/96f4962b-687e-412a-a80b-7f7261565599%2FScreen%20Shot%202019-04-23%20at%2013.02.47.png?1556038986321"></a-image>

        <a-image id="R-val" position="2.25 1.4 -2" visible="false"

                 width="0.2" height ="0.1" class="clickable"

                 src="#low-freq"></a-image>

        <a-image id="G-val" position="2.25 1.2 -2" visible="false"

                 width="0.2" height ="0.1" class="clickable"

                 src="#med-freq"></a-image>

        <a-image id="B-val" position="2.25 1 -2" visible="false"

                 width="0.2" height ="0.1" class="clickable"

                 src="#high-freq"></a-image>

        <a-image id="transparency-val" position="2.7 1.4 -2" visible="false"

                 width="0.4" height ="0.1" class="clickable"

                 src="#transparency-on"></a-image>

    </a-scene>

    </body>
      
      <div style="width: 100%; height: 100%; position: fixed; left: 0; top: 0; z-index: -1; overflow: hidden">
        <canvas id="htmlElement"></canvas>
      </div>
      

    </html>