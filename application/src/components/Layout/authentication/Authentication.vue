<template>
  <div>
    <b-modal v-model="value.show" ref="myModalRef" hide-footer title id="auth" no-close-on-backdrop>
      <b-form>
        <div v-if="!signUpVisible">
          <h6>Форма аутенитифікаціі</h6>
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
          <p style="color:red;">{{wrongCredentialAlert}}</p>
          <div class="buttons-wrap">
            <b-button variant="link" @click="signUpVisible = !signUpVisible">Створити аккаунт</b-button>
            <b-button variant="primary" @click="submitAuthentication()">Увійти</b-button>
          </div>
        </div>
        <div v-if="signUpVisible">
          <h6>Форма реєстрації</h6>
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
          <div class="buttons-wrap">
            <b-button variant="link" @click="signUpVisible = !signUpVisible">Увійти</b-button>
            <b-button variant="primary" @click="submitSignUp()">Створити акаунт</b-button>
          </div>
        </div>
      </b-form>
    </b-modal>
  </div>
</template>

<script>
import Authentication from "../index.js";
export default {
  name: "AuthComponent",
  props: ["value"],
  mixins: [],
  components: {},
  data() {
    return {
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
      signUpVisible: false,
      wrongCredentialAlert: ""
    };
  },
  methods: {
    submitAuthentication() {
      Authentication.authenticate(this, this.form.credentials, "/");
    },

    submitSignUp() {
      Authentication.signup(this, this.form.newUser, "/");
    },
  }
};
</script>
<style scoped>
</style>
