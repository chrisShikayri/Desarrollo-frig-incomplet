import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() {
    this.authService.loginStatusChanged.subscribe((loggedIn: boolean) => {
      if (loggedIn) {
        this.router.navigate(['/users']);
      } else {
        this.router.navigate(['/login']);
      }
    });
  }
}
