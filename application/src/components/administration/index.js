import Axios from 'axios'
import {Observable} from 'rxjs'
import Authentication from '../Layout/index'
const RetailAPI = `http://${window.location.hostname}:3001`

export default {
    getAllItems(context) {
        let observable$ = Observable.create((observer) => {
            Axios.get(`${RetailAPI}/api/v1/items`, {
                    headers: {
                        'Authorization': Authentication.getAuthenticationHeader(context),
                        'Content-Type': 'application/x-www-form-urlencoded'
                    }
                })
                .then((response) => {
                    observer.next(response);
                    observer.complete();
                })
                .catch((error) => {
                    observer.error(error);
                });
        });
        observable$.subscribe({
            next: (res) => {
                console.log('[data] => ', res);
                context.itemsList = res.data
            },
            error: err => console.log(err),
            complete: data => console.log('[complete]')
        });
    },
    getAllCategory(context) {
        let observable$ = Observable.create((observer) => {
            Axios.get(`${RetailAPI}/api/v1/category`, {
                    headers: {
                        'Authorization': Authentication.getAuthenticationHeader(context),
                        'Content-Type': 'application/x-www-form-urlencoded'
                    }
                })
                .then((response) => {
                    observer.next(response);
                    observer.complete();
                })
                .catch((error) => {
                    observer.error(error);
                });
        });
        observable$.subscribe({
            next: (res) => {
                console.log('[data] => ', res);
                context.itemsList = res.data
            },
            error: err => console.log(err),
            complete: data => console.log('[complete]')
        });
    }
}