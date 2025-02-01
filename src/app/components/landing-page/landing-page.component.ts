import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { Router, RouterLink, RouterModule } from '@angular/router';

@Component({
  selector: 'app-landing-page',
  imports: [
    RouterModule,
    RouterModule,
    MatIconModule,
   
  ],
  templateUrl: './landing-page.component.html',
  styleUrl: './landing-page.component.css'
})
export class LandingPageComponent {
  constructor(private router: Router) { }
  redirectToLogin() {
    this.router.navigate(['/login']);
  }
  redirectToRegister() {
    this.router.navigate(['/signUp']); 
  }
  redirectToContacto() {
    this.router.navigate(['/contacto']); 
  }
}
