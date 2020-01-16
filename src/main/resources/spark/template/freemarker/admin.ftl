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
    <title>Admin Page</title>
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
    <script src="/js/admin.js" defer></script>

</head>
<body>
    <h1>Select audio device:</h1>
    <form action="/adminpost" id="deviceform">
        <select name="device" id="device">
        </select>
        <input type="submit">
    </form>
    

    <a href="/status"> Status.</a><br>
    <a href="/icecoffee">Visualizer.</a><br>
    <a href="/audio">Audio.</a><br>
</body>
</html>