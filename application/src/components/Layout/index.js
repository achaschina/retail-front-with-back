import Axios from 'axios'
import {
  Observable
} from 'rxjs';
const BudgetManagerAPI = `http://${window.location.hostname}:3001`

export default {
  user: {
    authenticated: false
  },

  authenticate(context, credentials, redirect) {
    let observable$ = Observable.create((observer) => {
      Axios.post(`${BudgetManagerAPI}/api/v1/auth`, credentials)
        .then((response) => {
          observer.next(response.data);
          observer.complete();
        })
        .catch((error) => {
          observer.error(error);
        });
    });
    observable$.subscribe({
      next: (data) => {
        console.log('[data] => ', data);
        context.$cookie.set('token', data.token, '1D')
        context.$cookie.set('user_id', data.user._id, '1D')
        context.validLogin = true
        this.user.authenticated = true
        if (data.success) {
          context.$refs.myModalRef.hide();
          context.$emit('updateCurrenUserName', data.user.username);
          context.$emit('updateLoginButton', 'Кабінет');
          context.wrongCredentialAlert = '';
          context.messegeAlert = data.message
          context.dismissCountDown = context.dismissSecs
        }
      },
      error: (err) => {
        console.log(err)
        context.wrongCredentialAlert = 'Не вірно вказано логін або пароль'
      },
      complete: (data) => {
        console.log('[complete]', data);
      }
    });
  },

  signup(context, credentials, redirect) {
    let observable$ = Observable.create((observer) => {
      Axios.post(`${BudgetManagerAPI}/api/v1/signup`, credentials)
        .then((response) => {
          observer.next(response.data);
          observer.complete();
        })
        .catch((error) => {
          observer.error(error);
        });
    });

    observable$.subscribe({
      next: (data) => {
        console.log('[data] => ', data);
        context.validSignUp = true
        this.user.authenticated = true
        if (data.success) {
          context.$refs.myModalRef.hide();
          context.wrongCredentialAlert = '';
          context.messegeAlert = data.message
          context.dismissCountDown = context.dismissSecs
          this.authenticate(context, credentials, redirect)
        }
      },
      error: (err) => {
        console.log(err)
        context.wrongCredentialAlert = 'Не вдалось зареєструвати користувача'
        context.dismissCountDown = context.dismissSecs
      },
      complete: (data) => {
        console.log('[complete]');
      }
    });
  },

  signout(context, redirect) {
    context.$cookie.delete('token')
    context.$cookie.delete('user_id')
    this.user.authenticated = false

    if (redirect) {
      context.$router.push(redirect)
      context.currentUserName = '';
      context.loginBtn = 'Логін';
    }
  },

  checkAuthentication() {
    const token = document.cookie

    if (token) this.user.authenticated = true
    else this.user.authenticated = false
  },

  getAuthenticationHeader(context) {
    return `Bearer ${context.$cookie.get('token')}`
  }
}