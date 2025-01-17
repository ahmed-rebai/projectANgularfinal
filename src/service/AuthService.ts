import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth'; // Firebase authentication
import { HttpClient } from '@angular/common/http'; // For fetching user data from JSON server
import { Router } from '@angular/router'; // For redirecting after login
import * as auth from 'firebase/auth'; // Firebase authentication providers

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  public userClaims: any; // Stores user claims (e.g., user info after login)

  constructor(
    public afAuth: AngularFireAuth, // Firebase authentication
    private http: HttpClient, // For fetching user data from JSON server
    private router: Router // For redirecting after login
  ) {}

  // Method to get user claims (e.g., user info)
  getUserClaims(): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      this.afAuth.onAuthStateChanged((user) => {
        if (!!user) {
          this.setUserClaims(user); // Set user claims
          resolve(user); // Resolve with user data
        } else {
          reject('No user logged in'); // Reject if no user is logged in
        }
      });
    });
  }

  // Method to get the user's Firebase ID token
  getUserToken(): Promise<string> {
    return new Promise<string>((resolve, reject) => {
      this.afAuth.onAuthStateChanged((user) => {
        if (!!user) {
          user
            .getIdToken()
            .then((token) => resolve(token)) // Resolve with the token
            .catch(() => reject('No token available.'));
        } else {
          reject('No user logged in');
        }
      });
    });
  }

  // Method to set user claims (e.g., store user info)
  setUserClaims(user: any): void {
    this.userClaims = user;
  }

  // Method for Google login
  doGoogleLogin(): Promise<any> {
    return this.afAuth.signInWithPopup(new auth.GoogleAuthProvider());
  }

  // Method for email/password login
  doLogin(email: string, password: string): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      // Step 1: Verify email and password against JSON server
      this.http.get(`http://localhost:3000/members?email=${email}`).subscribe(
        (users: any) => {
          // Find the user with matching email and password
          const user = users.find((u: any) => u.email === email && u.password === password);
          if (user) {
            // Step 2: If credentials match, proceed with Firebase authentication
            this.afAuth
              .signInWithEmailAndPassword(email, password)
              .then((res) => {
                this.setUserClaims(res.user); // Set user claims
                resolve(res); // Resolve the promise
              })
              .catch((err) => {
                console.error('Firebase login failed:', err);
                reject(err);
              });
          } else {
            reject('User not found or password incorrect');
          }
        },
        (error) => {
          console.error('Error fetching user data:', error);
          reject(error);
        }
      );
    });
  }

  // Method for logout
  doLogout(): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      if (!!this.afAuth.currentUser) {
        this.afAuth
          .signOut()
          .then(() => {
            this.setUserClaims(null); // Clear user claims
            resolve();
          })
          .catch((err) => reject(err));
      } else {
        reject();
      }
    });
  }
}