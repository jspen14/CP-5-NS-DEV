<template>
  <div class="container">
    <div>
      <h1 style="text-align: left;">Your Allstar Profile: </h1>
      <h2 style="text-align: left">{{ name }}</h2>
      <img v-bind:src="imagePath"/>
    </div>
    <div class="quals">
      <h1> Qualifications: </h1>
      <ul>
        <li> <div class="bText"> Age: </div> {{age}} </li>
        <li> <div class="bText"> Hometown: </div> {{hometown}} </li>
        <li> <div class="bText"> Who do you sell for: </div> {{salesCompany}} </li>
        <li> <div class="bText"> Where did you serve your mission: </div> {{missionLocation}} </li>
        <li> <div class="bText"> What was your biggest leadership calling: </div> {{mission}} </li>
        <li> <div class="bText"> What sports do you play: </div> {{sports}} </li>
        <li> <div class="bText"> What are you studying in the Marriott School: </div> {{major}} </li>
        <li> <div class="bText"> If applicable, why do you really attend UVU: </div> {{excuse}} </li>
      </ul>
      </div>
  </div>

</template>

<script>
 export default {
   name: 'Profile',
   data () {
     return {
       name: 'Big Arm Brock',
       imagePath: 'https://upload.wikimedia.org/wikipedia/commons/3/30/John_Basedow_Weight_Lifting.jpg',
       age: '22',
       hometown: "San Fran, Cali",
       salesCompany: 'Vivint',
       missionLocation: 'Brazil',
       mission: 'AP BABY!! :D',
       sports: 'Football and Lacrosse',
       major: 'Entrepreneurship',
       excuse: 'N/A',

     }
   }
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