<template>
  <div class="container">
  <form v-on:submit.prevent="login" class="form-horizontal" role="form" method="POST" action="/login">
      <div class="row">
          <div class="col-md-3"></div>
          <div class="col-md-6">
              <h2>Login</h2>
              <hr>
          </div>
      </div>

      <div class="row">
                  <div class="col-md-3"></div>
                  <div class="col-md-6">
                      <div class="form-group has-danger">
                          <label class="sr-only" for="email">Email</label>
                          <div class="input-group mb-2 mr-sm-2 mb-sm-0">
                              <div class="input-group-addon" style="width: 2.6rem"><i class="fa fa-at"></i></div>
                              <input type="text" v-model="email" class="form-control"
                                     placeholder="you@example.com" required autofocus>
                          </div>
                      </div>
                  </div>

              </div>
              <div class="row">
                  <div class="col-md-3"></div>
                  <div class="col-md-6">
                      <div class="form-group">
                          <label class="sr-only" for="password">Password</label>
                          <div class="input-group mb-2 mr-sm-2 mb-sm-0">
                              <div class="input-group-addon" style="width: 2.6rem"><i class="fa fa-key"></i></div>
                              <input type="password"  v-model="password" class="form-control"
                                     placeholder="Password" required>
                          </div>
                      </div>
                  </div>
                  <div class="col-md-3">
                      <div class="form-control-feedback">
                          <span class="text-danger align-middle">
                          <!-- Put password error message here -->
                          </span>
                      </div>
                  </div>
              </div>

              <div class="row">
                  <div class="col-lg-3 col-md-3"></div>
                  <div class="col-lg-6 col-md-6" style="text-align:center">
                        <button type="submit" class="btn btn-success"><i class="fa fa-sign-in"></i> Login</button>
                  </div>
              </div>


  </form>
  </div>
</template>

<script>
 export default {
     name: 'Login',
     data () {
    	 return {
          email: '',
          password: '',
    	 }
     },
     methods:{
      login: function(){
        this.$store.dispatch('login', {email: this.email, password: this.password})
          .then(location.replace("Newsfeed.vue#/newsfeed"));

      }

     }
 }
</script>

<style scoped>
  @media(min-width: 768px) {
    .field-label-responsive {
      padding-top: .5rem;
      text-align: right;
    }
  }
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
