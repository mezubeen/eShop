import { UserService } from './user.service';
import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase';
import { ActivatedRoute } from '@angular/router';
import { AppUser } from './models/app-user';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/observable/of'; 


@Injectable()
export class AuthService {
	user$: Observable<firebase.User>;

  constructor(
    private UserService: UserService,
    private afAuth: AngularFireAuth, 
    private route: ActivatedRoute) { 
    // afAuth.authState.subscribe(user => {
      this.user$ = afAuth.authState;
  		// console.log(user);
  	// });
  }

    login(){
      let returnUrl = this.route.snapshot.queryParamMap.get('returnUrl') || '/';
      localStorage.setItem('returnUrl', returnUrl);

      this.afAuth.auth.signInWithRedirect(new firebase.auth.GoogleAuthProvider());
    }

    logout(){
      this.afAuth.auth.signOut();
    }

    get appUser$(): Observable<AppUser>{
      return this.user$
      .switchMap(user => {
        if(user) return this.UserService.get(user.uid)
        
        return Observable.of(null);
      })
    }
}
