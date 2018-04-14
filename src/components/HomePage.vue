<template>
    <div class="hero">
    <div style="min-height: 4vh;"></div>
	<h1>Welcome Provo Allstars!</h1>
    <div style="min-height: 1vh;"></div>

    <div class="container">
	<img  class="img-thumbnail" v-bind:src="imagePath"/>
    </div>
    <div style="min-height: 4vh;"></div>
    <div style="min-height: 4vh; text-align: center;"><h1>Sponsors!</h1></div>
    <div style="min-height: 2vh;"></div>
    <div class="container">
    <div class="row">
    <div class="col-lg-3 col-md-3 col-sm-3 col-xs-3"></div>

    <div class="col-lg-2 col-md-2 col-sm-2 col-xs-2">
        <img class="img-thumbnail sponsorPic" src="https://pbs.twimg.com/profile_images/420696817773199360/kjQefsxa_400x400.png"/>
    </div>

    <div class="col-lg-2 col-md-2 col-sm-2 col-xs-2">
        <img class="img-thumbnail sponsorPic" src="https://pbs.twimg.com/profile_images/921405351009726464/W7-hwCIQ_400x400.jpg"/>
    </div>

    <div class="col-lg-2 col-md-2 col-sm-2 col-xs-2">
        <img class="img-thumbnail sponsorPic" src="https://i.pinimg.com/736x/9a/33/4c/9a334cfb66191544139ab9aabc91a31e--window-wall-audi.jpg"/>
    </div>

    <div class="col-lg-3 col-md-3 col-sm-3 col-xs-3"></div>

    </div> <!--class row-->
    </div> <!--class container -->
    </div> <!--class hero -->
</template>

<script>
 export default {
     name: 'HomePage',
     data () {
	 return {
	     imagePath: 'https://utahvalley360.com/wp-content/uploads/2015/02/image7.jpg'
	 }
     }
 }
</script>

<style scoped>
 body {
    padding: 0px;
    margin: 0px;
 }
 .hero {
     text-align: center;
 }
 h1 {
     font-size: 2.5em;
     letter-spacing: .2rem;
     color: #999;
     margin-bottom: 2px;
 }
 img {
     width: 100%;
 }
 .sponsorPic{
    max-height: 10vh;
    max-width: 10vh;
 }
</style>
