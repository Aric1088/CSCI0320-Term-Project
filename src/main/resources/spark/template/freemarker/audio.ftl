<!-- This is a static file -->

<!-- served from your routes in server.js -->



<!-- You might want to try something fancier: -->

<!-- html/nunjucks docs: https://mozilla.github.io/nunjucks/ -->

<!-- pug: https://pugjs.org/ -->

<!-- haml: http://haml.info/ -->

<!-- hbs(handlebars): http://handlebarsjs.com/ -->



<!DOCTYPE html>

<html lang="en">



<head>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
    <style>
        body {
            background: #666;
            background-repeat: no-repeat;
            background-size: cover;
        }

        body {
            background-color: #666;
        }

        .round-button {
            box-sizing: border-box;
            display: block;
            width: 200px;
            height: 200px;
            padding-top: 14px;
            padding-left: 8px;
            line-height: 20px;
            border: 6px solid #fff;
            border-radius: 50%;
            color: #f5f5f5;
            text-align: center;
            text-decoration: none;
            background-color: rgba(0, 0, 0, 0.5);
            font-size: 20px;
            font-weight: bold;
            transition: all 0.3s ease;
        }

        .round-button:hover {
            background-color: rgba(0, 0, 0, 0.8);
            box-shadow: 0 0 10px rgba(255, 255, 100, 1);
            text-shadow: 0 0 10px rgba(255, 255, 100, 1);
        }

        .round-button {
            top: 50%;
            left: 50%;
            margin-top: -110px;
            margin-left: -100px;
            position: fixed;
        }
        .fav {
            top: 50%;
            left: 50%;
            margin-top: -60px;
            margin-left: -30px;
            position: fixed;
        }

        audio {
            display: none;
        }
    </style>

    <title>Audio Stream</title>

    <meta name="description" content="CS32 Term Project">

    <link id="favicon" rel="icon" href="https://glitch.com/edit/favicon-app.ico" type="image/x-icon">

    <meta charset="utf-8">

    <meta http-equiv="X-UA-Compatible" content="IE=edge">

    <meta name="viewport" content="width=device-width, initial-scale=1">



    <!-- import the webpage's stylesheet -->

    <link rel="stylesheet" href="/css/style.css">



    <!-- import the webpage's client-side javascript file -->



    <script src="/js/jquery-2.1.1.js" defer></script>

    <script src="/js/jquery-3.1.1.js" defer></script>


    <script src="/js/AudioPlayer.js" defer></script>

    <script src="/js/whomst.js"></script>

    <script src="/js/worker.js"></script>




</head>

<body>
<audio id="whomst" loop src="https://raw.githubusercontent.com/anars/blank-audio/master/1-hour-of-silence.mp3"></audio>
<a onclick="play()" class="round-button">
    <div class="fav"><i id='player' class="fa fa-play fa-2x" style="font-size:100px"></i></div>
</a>

<a href="/admin"> Admin.</a><br>
<a href="/status"> Status.</a><br>
<a href="/icecoffee">Visualizer.</a><br>

</body>

</html>