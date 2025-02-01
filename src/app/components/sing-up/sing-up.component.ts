import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { Usuario } from '../../models/Usuario';

import { UsuarioService } from '../../services/usuario.service';
import { RolesService } from '../../services/roles.service';
import { ActivatedRoute, Router, RouterLink, RouterOutlet } from '@angular/router';
import { roles } from '../../models/roles';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-sing-up',
  imports: [
    MatInputModule, 
    MatIconModule,
    ReactiveFormsModule,
    MatInputModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatButtonModule,
    ReactiveFormsModule,
    CommonModule,
  ],
  templateUrl: './sing-up.component.html',
  styleUrl: './sing-up.component.css'
})
export class SingUpComponent {
  form: FormGroup = new FormGroup({});
  usuario: Usuario = new Usuario();
  rol: roles = new roles();
  showPassword = false;

  listapaises: { value: string; viewValue: string }[] = [
    { value: 'Peru', viewValue: 'Peru' },
    { value: 'Argentina', viewValue: 'Argentina' },
    { value: 'Chile', viewValue: 'Chile' },
    { value: 'Colombia', viewValue: 'Colombia' },
    { value: 'Venezuela', viewValue: 'Venezuela' },
    { value: 'España', viewValue: 'España' },
    { value: 'Portugal', viewValue: 'Portugal' },
    { value: 'Brazil', viewValue: 'Brazil' },
    { value: 'Paraguay', viewValue: 'Paraguay' },
    { value: 'Ecuador', viewValue: 'Ecuador' },
  
  ];

  constructor(
    private uS: UsuarioService,
    private rS: RolesService,
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,

  ) {}

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      hid: [],
      hnombre: ['', Validators.required],
      hpass: ['', [Validators.required, Validators.minLength(6)]],
      hmail: ['', [Validators.required, Validators.email]],
      hpais: ['', Validators.required],
      henabled: [true],
      hfecha_registro: [new Date(Date.now())],
      hfecha_modificacion: [new Date(Date.now())],
   
    });
  }

  redirectToLanding() {
    this.router.navigate(['']);
  }


  createRoleForUser(userId: number): void {

    const newRole = new roles();
    newRole.rol = 'USUARIO'; 
    newRole.user = { id: userId } as Usuario;

    this.rS.insert(newRole).subscribe((data) => {
      this.rS.list().subscribe((data) => {
        this.rS.setList(data);
      });
    });
  }

  insertar(): void {
    if (this.form.valid) {

      this.usuario.id= this.usuario.id;
      this.usuario.username = this.form.value.hnombre;
      this.usuario.email = this.form.value.hmail;
      this.usuario.password = this.form.value.hpass;
      this.usuario.pais=this.form.value.hpais;
      this.usuario.enabled = this.form.value.henabled;;
      this.usuario.fecha_registro = this.form.value.hfecha_registro; // Fecha actual
      this.usuario.fecha_modificacion = this.form.value.hfecha_modificacion; // Fecha actual


      
      // Insertar el usuario y esperar la respuesta antes de continuar
      this.uS.insert(this.usuario).subscribe((newUser: Usuario) => {
        if (newUser && newUser.id) {
          console.log('Usuario creado:', newUser);
          this.createRoleForUser(newUser.id); // Crear rol para el usuario
          this.uS.list().subscribe((data) => {
            this.uS.setList(data);
          });
          this.router.navigate(['login']);
        } 
        else {
          console.error('Error: Usuario no creado correctamente');
        }
      }, error => {
        console.error('Error al crear usuario:', error);
      });
    }
  
  }

  
  
}
