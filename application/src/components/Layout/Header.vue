<template>
  <div>
    <b-navbar toggleable="md" type="dark" variant="info">
      <b-navbar-toggle target="nav_collapse"></b-navbar-toggle>

      <b-navbar-brand to="/">
        <img src="../../assets/logo.png" style="height:30px;">
      </b-navbar-brand>

      <b-collapse is-nav id="nav_collapse">
        <b-navbar-nav>
          <b-nav-item to="/workplace">Продаж</b-nav-item>
          <b-nav-item to="/diagram">Графіки</b-nav-item>
        </b-navbar-nav>

        <!-- Right aligned nav items -->
        <b-navbar-nav class="ml-auto">
          <b-nav-form>
            <!-- <b-form-input size="sm" class="mr-sm-2" type="text" placeholder="Найти..."/> -->
            <b-button size="sm" class="my-2 my-sm-0" @click="showModal">Логін</b-button>
          </b-nav-form>

          <!-- <b-nav-item-dropdown text="Lang" right>
            <b-dropdown-item href="#">EN</b-dropdown-item>
            <b-dropdown-item href="#">ES</b-dropdown-item>
            <b-dropdown-item href="#">RU</b-dropdown-item>
            <b-dropdown-item href="#">FA</b-dropdown-item>
          </b-nav-item-dropdown>-->
          <b-nav-item-dropdown right>
            <!-- Using button-content slot -->
            <template slot="button-content">
              <em>userName</em>
            </template>
            <b-dropdown-item href="#">Profile</b-dropdown-item>
            <b-dropdown-item to="cart">Корзина</b-dropdown-item>
            <b-dropdown-item href="#">Выйти</b-dropdown-item>
          </b-nav-item-dropdown>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>

    <b-modal ref="myModalRef" hide-footer  title id="auth" no-close-on-backdrop>
      <b-form>
        <div v-if="!signUpVisible">
          <b-form-group
            id="exampleInputGroup1"
            label="Username"
            label-for="exampleInput1"
            description="We'll never share your username with anyone else."
          >
            <b-form-input
              id="exampleInput1"
              type="text"
              v-model="form.credentials.username"
              required
              placeholder="Enter email"
            ></b-form-input>
          </b-form-group>
          <b-form-group id="exampleInputGroup2" label="password" label-for="exampleInput2">
            <b-form-input
              id="exampleInput2"
              type="password"
              v-model="form.credentials.password"
              required
              placeholder="Enter password"
            ></b-form-input>
          </b-form-group>
          <p>{{wrongCredentialAlert}}</p>
          <b-button variant="primary" @click="submitAuthentication()">Логін</b-button>
          <b-button variant="primary" @click="signUpVisible = true">Реєстрація</b-button>
          <!-- <b-button type="reset" variant="danger">Reset</b-button> -->
        </div>
        <div v-if="signUpVisible">
          <b-form-group
            id="exampleInputGroup1"
            label="Username"
            label-for="exampleInput1"
            description="We'll never share your username with anyone else."
          >
            <b-form-input
              id="exampleInput1"
              type="text"
              v-model="form.newUser.username"
              required
              placeholder="Enter email"
            ></b-form-input>
          </b-form-group>
          <b-form-group id="exampleInputGroup2" label="password" label-for="exampleInput2">
            <b-form-input
              id="exampleInput2"
              type="password"
              v-model="form.newUser.password"
              required
              placeholder="Enter password"
            ></b-form-input>
          </b-form-group>
          <b-button variant="primary" @click="submitSignUp()">Створити акаунт</b-button>
        </div>
      </b-form>
    </b-modal>

    <b-alert :show="dismissCountDown"
             dismissible
             variant="warning"
             @dismissed="dismissCountDown=0"
             @dismiss-count-down="countDownChanged">
      <p>{{messegeAlert}}</p>
    </b-alert>
  </div>
</template>

<script>
import Authentication from './index.js'
export default {
  data() {
    return {
      snackbar: false,
      signUpVisible: false,
      dismissSecs: 5,
      dismissCountDown: 0,
      messegeAlert: '',
      wrongCredentialAlert:'',
      form: {
        credentials: {
          username: "",
          password: ""
        },
        newUser: {
          username: "",
          password: ""
        },
        name: "",
        password: "",
        checked: []
      },
      show: true
    };
  },
  methods: {
    showModal() {
      this.$refs.myModalRef.show();
    },

    submitAuthentication() {
      Authentication.authenticate(this, this.form.credentials, "/", this.$refs.myModalRef);
      console.log(Authentication.user.authenticated)
      // if ()
    },

    submitSignUp() {
      Authentication.signup(this, this.form.newUser, "/");
    },

    countDownChanged (dismissCountDown) {
      this.dismissCountDown = dismissCountDown
    },
    // onSubmit(evt) {
    //   evt.preventDefault();
    //   alert(JSON.stringify(this.form));
    // },
    // onReset(evt) {
    //   evt.preventDefault();
    //   /* Reset our form values */
    //   this.form.password = "";
    //   this.form.name = "";
    //   /* Trick to reset/clear native browser form validation state */
    //   this.show = false;
    //   this.$nextTick(() => {
    //     this.show = true;
    //   });
    // }
  }
};
</script>

<style scoped lang="scss" >
@import "../../assets/styles.scss";
// .navbar {background: #94b0b7 !important;}
// .form-control-sm,.btn-sm {border-radius: 0rem;}
</style>


