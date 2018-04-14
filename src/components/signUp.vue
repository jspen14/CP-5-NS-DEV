<template>
  <div class="container">
  <form v-on:submit.prevent="register" class="form-horizontal" role="form" method="POST" action="/register">
      <div class="row">
          <div class="col-md-3"></div>
          <div class="col-md-6">
              <h2>Sign-Up New User</h2>
              <hr>
          </div>
      </div>


      <!-- Beginning of name section -->
      <div class="row">
          <div class="col-md-3 field-label-responsive">
              <label>Name</label>
          </div>
          <div class="col-md-6">
              <div class="form-group">
                  <div class="input-group mb-2 mr-sm-2 mb-sm-0">
                      <div class="input-group-addon" style="width: 2.6rem"><i class="fa fa-user"></i></div>
                      <input type="text" v-model="name" class="form-control"
                             placeholder="John Doe" required autofocus>
                  </div>
              </div>
          </div>
          <div class="col-md-3">
              <div class="form-control-feedback">
                      <span class="text-danger align-middle">
                          <!-- Put name validation error messages here -->
                      </span>
              </div>
          </div>
      </div>

      <!-- Beginning of username -->
      <div class="row">
          <div class="col-md-3 field-label-responsive">
              <label>Username</label>
          </div>
          <div class="col-md-6">
              <div class="form-group">
                  <div class="input-group mb-2 mr-sm-2 mb-sm-0">
                      <div class="input-group-addon" style="width: 2.6rem"><i class="fa fa-user"></i></div>
                      <input type="text"  v-model="username" class="form-control"
                        placeholder="user1234" required autofocus>
                  </div>
              </div>
          </div>
          <div class="col-md-3">
              <div class="form-control-feedback">
                      <span class="text-danger align-middle">
                          <!-- Put name validation error messages here -->
                      </span>
              </div>
          </div>
      </div>


      <!-- beginning of email section -->
      <div class="row">
          <div class="col-md-3 field-label-responsive">
              <label>E-Mail Address</label>
          </div>
          <div class="col-md-6">
              <div class="form-group">
                  <div class="input-group mb-2 mr-sm-2 mb-sm-0">
                      <div class="input-group-addon" style="width: 2.6rem"><i class="fa fa-at"></i></div>
                      <input type="text"  v-model="email" class="form-control"
                        placeholder="you@example.com" required autofocus>
                  </div>
              </div>
          </div>

      </div>


      <!-- Beginning of password -->
      <div class="row">
          <div class="col-md-3 field-label-responsive">
              <label>Password</label>
          </div>
          <div class="col-md-6">
              <div class="form-group has-danger">
                  <div class="input-group mb-2 mr-sm-2 mb-sm-0">
                      <div class="input-group-addon" style="width: 2.6rem"><i class="fa fa-key"></i></div>
                      <input type="password" v-model="password" class="form-control"
                             placeholder="Password" required>
                  </div>
              </div>
          </div>
      </div>


    <div class="row">
        <div class="col-md-3 field-label-responsive">
            <label>Age</label>
        </div>
        <div class="col-md-6">
            <div class="form-group">
                <div class="input-group mb-2 mr-sm-2 mb-sm-0">
                    <div class="input-group-addon" style="width: 2.6rem"><i class="fa fa-user"></i></div>
                    <input type="text" v-model="age" class="form-control"
                           placeholder="21" required autofocus>
                </div>
            </div>
        </div>
    </div>

    <div class="row">
        <div class="col-md-3 field-label-responsive">
            <label>Hometown</label>
        </div>
        <div class="col-md-6">
            <div class="form-group">
                <div class="input-group mb-2 mr-sm-2 mb-sm-0">
                    <div class="input-group-addon" style="width: 2.6rem"><i class="fa fa-user"></i></div>
                    <input type="text" v-model="hometown" class="form-control"
                          placeholder="Long Beach" required autofocus>
                </div>
            </div>
        </div>
    </div>

    <div class="row">
        <div class="col-md-3 field-label-responsive">
            <label>Who Do You Sale For?</label>
        </div>
        <div class="col-md-6">
            <div class="form-group">
                <div class="input-group mb-2 mr-sm-2 mb-sm-0">
                    <div class="input-group-addon" style="width: 2.6rem"><i class="fa fa-user"></i></div>
                    <input type="text" v-model="salesCompany" class="form-control"
                           placeholder="Vivint" required autofocus>
                </div>
            </div>
        </div>
    </div>



    <div class="row">
        <div class="col-md-3 field-label-responsive">
            <label>What Sports Do You Play?</label>
        </div>
        <div class="col-md-6">
            <div class="form-group">
                <div class="input-group mb-2 mr-sm-2 mb-sm-0">
                    <div class="input-group-addon" style="width: 2.6rem"><i class="fa fa-user"></i></div>
                    <input type="text" v-model="sports" class="form-control"
                           placeholder="Lacrosse" required autofocus>
                </div>
            </div>
        </div>
    </div>

    <div class="row">
        <div class="col-md-3 field-label-responsive">
            <label>What Are You Studying In The Business School?</label>
        </div>
        <div class="col-md-6">
            <div class="form-group">
                <div class="input-group mb-2 mr-sm-2 mb-sm-0">
                    <div class="input-group-addon" style="width: 2.6rem"><i class="fa fa-user"></i></div>
                    <input type="text" v-model="major" class="form-control"
                           placeholder="Entrepreneurship" required autofocus>
                </div>
            </div>
        </div>
    </div>


      <!-- Start of sign_up buuton !-->
      <div class="row">
          <div class="col-md-3"></div>
          <div class="col-md-6">
              <button type="submit" class="btn btn-success"><i class="fa fa-user-plus"></i> Sign-Up</button>
          </div>
      </div>
  </form>
  </div>
</template>

<script>
 export default {
     name: 'SignUpPage',
     data () {
    	 return {
          name: '',
          username: '',
          email: '',
          password: '',
          age: '',
          hometown: '',
          salesCompany: '',
          sports: '',
          major: '',

    	 }
     },
     methods:{
      register: function(){
        this.$store.dispatch('register', {email: this.email, password: this.password,
        username: this.username, age: this.age, hometown: this.hometown,
        salesCompany: this.salesCompany, sports: this.sports,
        major: this.major, name: this.name});

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
