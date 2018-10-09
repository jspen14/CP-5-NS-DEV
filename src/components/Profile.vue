<template>
  <div class="container">
    <div>
      <div >
      <h1 style="text-align: left;">Your Allstar Profile: </h1>
      <h2 style="text-align: left">{{ user.name }}</h2>
      </div>
    </div>

    <div class="quals">
      <hr>
      <h1> Information: </h1>
      <ul>
        <li> <div class="bText"> Age: </div> {{ user.age }} </li>
        <li> <div class="bText"> Hometown: </div> {{ user.hometown }} </li>
        <li> <div class="bText"> Who do you sell for: </div> {{user.salesCompany}} </li>
        <li> <div class="bText"> What sports do you play: </div> {{user.sports}} </li>
        <li> <div class="bText"> What is your major: </div> {{user.major}} </li>
      </ul>
        <router-link to="/Update"><button style="float:right" class="btn btn-danger"><i class="fa fa-sign-in"></i> Update</button></router-link>

      </div>
  </div>

</template>

<script>
 export default {
   name: 'Profile',
   data () {
     return {
       imagePath: 'https://upload.wikimedia.org/wikipedia/commons/3/30/John_Basedow_Weight_Lifting.jpg',
     }
   },
   computed: {
     user: function() {
      //console.log(this.$store.getters.user);
       return this.$store.getters.user;
     },
     loggedIn: function() {
       return this.$store.getters.loggedIn;
     },
     loginError: function() {
       return this.$store.getters.loginError;
     },
   },

 }
</script>

<style scoped>
 img {
     max-width: 40vw;
     max-width: 40vh;
 }
.bText{
  font-weight: bold;
}
 .quals{
  text-align:left;
 }


</style>
