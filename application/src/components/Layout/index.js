import Axios from 'axios'
import {
  Observable
} from 'rxjs';
import router from '../../utilities/router/index'
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
    let subscription = observable$.subscribe({
      next: (data) => {
        console.log('[data] => ', data);
        context.$cookie.set('token', data.token, '1D')
        context.validLogin = true
        this.user.authenticated = true
        if (data.success) {
          context.$refs.myModalRef.hide();
          context.wrongCredentialAlert = '';
          context.messegeAlert = data.message
          context.dismissCountDown = context.dismissSecs
        }
      },
      error: (err) => {
        console.log(err)
        context.wrongCredentialAlert = 'Не вірно сказано логін або пароль'
        context.dismissCountDown = context.dismissSecs
      },
      complete: (data) => {
        console.log('[complete]', data);
      }
    });
  },

  signup(context, credentials, redirect) {
    Axios.post(`${BudgetManagerAPI}/api/v1/signup`, credentials)
      .then(({
        data: {
          token
        }
      }) => {
        context.$cookie.set('token', token, '1D')
        context.validSignUp = true
        this.user.authenticated = true
        console.log({
          data: {
            token
          }
        })

        if (redirect) router.push(redirect)
      }).catch(({
        response: {
          data
        }
      }) => {
        context.snackbar = true
        context.message = data.message
      })
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