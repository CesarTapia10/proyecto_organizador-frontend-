import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { LoginService } from '../../services/login.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { JwtRequest } from '../../models/JwtRequest';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    MatFormFieldModule,
    FormsModule,
    MatInputModule,
    MatButtonModule

  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit{
  constructor(
    private loginService: LoginService,
    private router: Router,
    private snakbar: MatSnackBar

  ){}
  username: string= '';
  password: string ='';
  mensaje: string='';
  ngOnInit(): void {}
  login(){
    let request= new JwtRequest();
    request.username = this.username;
    request.password= this.password;
    this.loginService.login(request).subscribe(
    (data:any) =>{
      sessionStorage.setItem('token', data.jwttoken);
      this.router.navigate(['homes']);

    },
    (error)=>{
      this.mensaje= 'Credenciales Incorrectas !!!';
      this.snakbar.open(this.mensaje, 'Aviso', {duration: 20000});
    }
    );
  }
  redirectToLanding() {
    this.router.navigate(['']);
  }
}
