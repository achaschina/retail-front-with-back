<template>
  <div>
    <b-navbar toggleable="md" type="dark" variant="info">
      <b-navbar-toggle target="nav_collapse"></b-navbar-toggle>

      <b-navbar-brand to="/">
        <img src="../../assets/logo.png" style="height:30px;">
      </b-navbar-brand>

      <b-collapse is-nav id="nav_collapse">
        <b-navbar-nav v-if="currentUserName">
          <b-nav-item to="/workplace">Продаж</b-nav-item>
          <b-nav-item to="/diagram">Графіки</b-nav-item>
        </b-navbar-nav>

        <b-navbar-nav class="ml-auto">
          <b-nav-form>
            <b-button size="sm" class="my-2 my-sm-0" @click="showModal">{{loginBtn}}</b-button>
          </b-nav-form>
          <b-nav-item-dropdown right>
            <template slot="button-content">
              <em>{{currentUserName}}</em>
            </template>
            <b-dropdown-item href="#">Profile</b-dropdown-item>
            <b-dropdown-item @click="signout()">Вийти</b-dropdown-item>
          </b-nav-item-dropdown>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>

    <AuthComponent
      v-model="modal"
      :modal-show="modal.show"
      @updateCurrenUserName="updateUserName"
      @updateLoginButton="updateLoginButton"
    ></AuthComponent>

    <b-alert
      :show="dismissCountDown"
      dismissible
      variant="warning"
      @dismissed="dismissCountDown=0"
      @dismiss-count-down="countDownChanged"
    >
      <p>{{messegeAlert}}</p>
    </b-alert>
  </div>
</template>

<script>
import AuthComponent from "./authentication/Authentication.vue";
import Authentication from "./index.js";
export default {
  components: {
    AuthComponent
  },
  data() {
    return {
      modal: {
        show: false
      },
      loginBtn: "Логін",
      currentUserName: "",
      snackbar: false,
      dismissSecs: 5,
      dismissCountDown: 0,
      messegeAlert: "",
      show: true
    };
  },
  methods: {
    updateUserName(v) {
      this.currentUserName = v;
    },
    updateLoginButton(v) {
      this.loginBtn = v;
    },
    showModal() {
      this.modal.show = true;
    },

    countDownChanged(dismissCountDown) {
      this.dismissCountDown = dismissCountDown;
    },

    signout() {
      Authentication.signout(this, "/");
    }
  }
};
</script>

<style scoped lang="scss" >
// @import "../../assets/styles.scss";
// .navbar {background: #94b0b7 !important;}
// .form-control-sm, .btn-sm {border-radius: 0rem;}
// .buttons-wrap {display: flex; justify-content: space-between;}
</style>


