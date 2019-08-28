import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase/app';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    public afAuth: AngularFireAuth,
    private router: Router
  ) { }

  login() {
    const googleAuthProvider = new auth.GoogleAuthProvider();
    googleAuthProvider.setCustomParameters({
      prompt: 'select_account'
   });
    this.afAuth.auth.signInWithPopup(googleAuthProvider).then(() => {
      this.router.navigate(['']);
    });
  }

  logout() {
    this.afAuth.auth.signOut().then(() => {
      this.router.navigate(['login']);
    });
  }

  deleteAccount() {
    return this.afAuth.auth.currentUser.delete().then(() => {
      this.router.navigate(['login']);
    });
  }
}
