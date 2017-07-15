import { Injectable } from '@angular/core';
import { Headers, Http, RequestOptions, Response} from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { IUser } from './user.model';

@Injectable()
export class AuthService {
  public currentUser: IUser;
  
  constructor(private http: Http) {}

  public loginUser(userName: string, password: string) {
    const headers = new Headers({ 'Content-Type': 'application/json'});
    const options = new RequestOptions({headers});
    const loginInfo = { username: userName, password };

    return this.http.post('/api/login', JSON.stringify(loginInfo), options)
    .do((resp) => { // do sgnifies we do not change the data returned (like a .map)
      if(resp) {
        // tslint:disable-next-line:no-console
        console.log(resp);
        this.currentUser = resp.json().user as IUser;
      }
    }).catch((error) => {
      return Observable.of(false);
    });
  }

  public isAuthenticated() {
    return !!this.currentUser;
  }

  public checkAuthenticationStatus() {
    return this.http.get('/api/currentIdentity').map((response: any) => {
      console.log(response);
      if(response._body) {
        return response.json();
      } else {
        return {};
      }
    })
    .do((currentUser) => {
      if(!!currentUser.userName) {
        this.currentUser = currentUser;
      }
    })
    .subscribe();
  }

  public updateCurrentUser(firstName: string, lastName: string) {
    this.currentUser.firstName = firstName;
    this.currentUser.lastName = lastName;

    const headers = new Headers({ 'Content-Type': 'application/json'});
    const options = new RequestOptions({headers});
    
    return this.http.put(`/api/users/${this.currentUser.id}`, JSON.stringify(this.currentUser), options);
  }

  public logout() {
    this.currentUser = undefined;
    
    const headers = new Headers({ 'Content-Type': 'application/json'});
    const options = new RequestOptions({headers});
    
    // this is not self-subscribing => user-profile client caller will subscribe!
    return this.http.post('/api/logout', JSON.stringify({}), options);
  }
}
