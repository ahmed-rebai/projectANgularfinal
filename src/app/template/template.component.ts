import { Component, OnInit, NgZone, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { AuthService } from 'src/service/AuthService';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-template',
  templateUrl: './template.component.html',
  styleUrls: ['./template.component.css']
})
export class TemplateComponent implements OnInit {
  user!: any;
  isNavbarVisible: boolean = true;
  @ViewChild('drawer') drawer!: MatSidenav;

  constructor(
    private authService: AuthService,
    private router: Router,
    private ngZone: NgZone
  ) {
    // Move the router events subscription to constructor
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        // Hide navbar when at root path '/' or specific paths
        const hiddenNavbarPaths = ['/', '/#services', '/#overview', '/#achievements', '/#about'];
        this.isNavbarVisible = !hiddenNavbarPaths.includes(event.url);
      }
      
    });
  }

  ngOnInit(): void {
    // Fetch user claims
    this.authService.getUserClaims().then((u) => {
      this.user = u;
      console.log(this.user.displayName);
      console.log(this.user.photoURL);
    });
  }

  tryLogout(): void {
    this.authService.doLogout().then(() => {
      this.successRedirect();
    });
  }

  successRedirect(): void {
    this.ngZone.run(() => this.router.navigate(['/login']));
  }

  toggleSidenav(): void {
    this.drawer.toggle();
  }
}