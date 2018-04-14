<template>
  <div class="container">
    <div>
      <a target="_top" href="http://www.flamingtext.com/" ><img src="https://blog.flamingtext.com/blog/2018/03/01/flamingtext_com_1519939719_856800845.png" border="0" alt="Logo Design by FlamingText.com" title="Logo Design by FlamingText.com"></a>
    </div
    <br><br>
    <div class="row">
      <div class="col-lg-3 col-md-3 .d-none .d-sm-block .d-none .d-xs-block links" style="border: 3px solid #1E8BFF; max-height: 35vh; overflow: scroll; margin-bottom: 3vh;">
      <h2>You might also like: </h2>
        <a href="https://tinder.com/?lang=en"><h3>Tinder</h3></a>
        <a href="https://mutualapp.co/"><h3>Mutual</h3></a>
        <a href="https://www.audiusa.com/?ds_kid=43700022088266026&CSREF=SEM%7C10770960%7C3118667%7C144106565%7C315947276%7C0&gclid=Cj0KCQiA5t7UBRDaARIsAOreQtihfJs820H6-4kFHL5v0o0mvbUNB8TfB_jcxupqXRX_eryvc66GjicaAoz8EALw_wcB&gclsrc=aw.ds"><h3>Audi</h3></a>
        <a href="http://www.thevillageatsouthcampus.com/"><h3>The Village</h3></a>
        <a href="https://www.vivint.com/ppc/brand?utm_medium=cpc&utm_term=vivint&utm_source=google&c_ps=s.google_k.vivint_m.e_n.g_po.1t1_ex._d.c&exid=117156&creative=&offer=&gclid=Cj0KCQiA5t7UBRDaARIsAOreQtjTsCQV45-5aMN2nHxr5rSVV5n4l5dFzski2nRFxDhHEEDJOFXDOzMaAv4uEALw_wcB"><h3>Vivint</h3></a>
        <a href="https://www.amazon.com/s/?ie=UTF8&keywords=white+snap+back+hat&tag=googhydr-20&index=aps&hvadid=229014731036&hvpos=1t1&hvnetw=g&hvrand=2163040130956501757&hvpone=&hvptwo=&hvqmt=b&hvdev=c&hvdvcmdl=&hvlocint=&hvlocphy=9060033&hvtargid=kwd-319052300602&ref=pd_sl_95msqa2fhy_b_p38"><h3>Snap Backs</h3></a>
        <a href="https://www.amazon.com/s/?ie=UTF8&keywords=tank+tops+men&tag=googhydr-20&index=apparel&hvadid=228966039104&hvpos=1t1&hvnetw=g&hvrand=11421760396093789814&hvpone=&hvptwo=&hvqmt=b&hvdev=c&hvdvcmdl=&hvlocint=&hvlocphy=9029857&hvtargid=kwd-296604948442&ref=pd_sl_93lowwtnbf_b_p38"><h3>Tool T's</h3></a>
      </div>

      <div class="col-lg-1 col-md-1 col-sm-1 col-xs-1"></div>
      <div class="col-lg-6 col-md-6 col-sm-6 col-xs-6" >

      <div class="row">
        <form v-on:submit.prevent="addComment">
          <input v-model="username" placeholder="Name" style="display: flex; width: 100%;"><br>
            <textarea v-model="text"></textarea><br>
                <button type="button submit" class="btn btn-primary"> Post</button>
        </form>
      </div>

      <div v-for="comment in sortedItems" style="text-align: left; word-wrap: break-word;">
              <hr>
          	  <h3><div style="text-align: left">{{comment.username}}: {{comment.text}}</div> <div></div></h3>
              <button type="button" class="btn btn-outline-primary" v-on:click ="addLike(comment)">Likes: {{comment.likes}}</button>

      </div>
        <!--this is where the code for messenger goes-->
      </div> <!--v-for close div-->
      <div class="col-lg-2 col-md-2 col-sm-2 col-xs-2">
        <div class="btn-group" data-toggle="buttons">
          <label class="btn btn-primary active">
            <input type="radio" name="options" id="option1" autocomplete="off" checked v-on:click ="sortDate">&nbspShow by Date</label>
          <label class="btn btn-primary">
            <input type="radio" name="options" id="option2" autocomplete="off" v-on:click ="sortLike">&nbspShow by Likes</label>
          </div>
      </div>


    </div>
  </div>



</template>

<script>
import axios from 'axios';
 export default {
   name: 'Profile',
   data () {
     return {
      comments: [],
      text: '',
      username: '',
      date: '',
      likes: 0,
      thisNum: 0,
      sorted: false,
      i: 0,
     }
   },
   computed: {
    sortedItems: function() {
      //console.log(this.comments);

      var temp = this.comments;  //copy comments array into temp array
      if (this.sorted === true) {
        var temp_size = temp.length
        var changed = false;
        while (!changed) {
          changed = true;
          for (var i=0; i < temp_size-1; i++) {
            if (temp[i].likes < temp[i+1].likes) {
              var regresso = temp[i];
              temp[i] = temp[i+1];
              temp[i+1] = regresso;
              changed = false;
            }//end if

          }//end for
        }//end while


        //console.log(temp);
        //console.log(this.comments);
        this.comments = temp;//has the new array copied into the comments array
        return this.comments;
      }//close outer if
      else {
        if (this.comments.length < 1) {
          return this.comments;
        }//end inner if
        else {
          var temp = this.comments;  //copy comments array into temp array
          if (this.sorted === false) {
            temp_size = temp.length
            changed = false;
            while (!changed) {
              changed = true;
              for (var i=0; i < temp_size-1; i++) {
                if (temp[i].id > temp[i+1].id) {
                  var regresso = temp[i];
                  temp[i] = temp[i+1];
                  temp[i+1] = regresso;
                  changed = false;
                  }//end if

                }//end for
              }//end while
          }//end if
          this.comments = temp;//has the new array copied into the comments array
          return this.comments;

      }//end else

    }
    }
   },
   created: function(){
    this.getComments();
   },
   methods:{
   getComments: function() {
       axios.get("/api/comments").then(response => {
     this.comments = response.data;
     return true;
       }).catch(err => {
       });
     },
     getDate: function() {
        var today = new Date();
        var hour = today.getHours();
        var minute = today.getMinutes();
        var dd = today.getDate();
        var mm = today.getMonth()+1;
        var yyyy = today.getFullYear();
        if(dd<10) {
          dd = '0'+dd
        }
        if(mm<10) {
          mm = '0'+mm
        }
        if (minute<10) {
          minute = '0'+minute
        }
        today = hour + ":" + minute + " on " + mm + '-' + dd + '-' + yyyy;
        return today;
    },
    addComment(){
      this.date = this.getDate();
      console.log(this.date);
      axios.post("/api/comments", {
        username: this.username,
        text: this.text,
        likes: 0,
        date: this.date,
        sorted: this.sorted,
        }).then(response=>{
          this.text = "";
          this.username = "";
          this.likes = 0;
          this.getComments();
          return true;
        }).catch(err=>{
        });
    },
    sortDate() {
      console.log(this.sorted);
      this.sorted = false;
      console.log(this.sorted);
    },
    sortLike() {
      console.log(this.sorted);
      this.sorted = true;

      /*console.log(this.sorted);
      var temp = this.comments;  //copy comments array into temp array
      this.sorted = true;
      var temp_size = temp.length
      var changed = false;
      while (!changed) {
        for (var i=0; i < temp_size-1; i++) {
        changed = true;
          if (temp[i].likes < temp[i+1].likes) {
            var regresso = temp[i];
            temp[i] = temp[i+1];
            temp[i+1] = regresso;
            changed = false;
          }//end if

        }//end for
      }//end while
      console.log(temp);
      this.comments = temp;//has the new array copied into the comments array
      this.sortedItems(this.comments);
*/

    },//end sort function
    addLike(comment){
      comment.likes += 1;

      axios.put("/api/comments/" + comment.id, {
        username: comment.username,
        text: comment.text,
        likes: comment.likes,
        sorted: this.sorted,
        }).then(response=>{
          return true;
        }).catch(err=>{
        });
    },
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
 a.active {
    color: gray;
 }

 a {
  color: black;
 }

 /*Hover state for top level links*/
 :hover a {

    color: black;

 }

.links {
  text-align: left;
    text-decoration: none;
    color: black;
}

h2 {
  font-size: 2vh;
  color: black;
}

</style>
