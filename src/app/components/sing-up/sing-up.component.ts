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
export class SingUpComponent implements OnInit{
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
      hnombre: ['', Validators.required],
      hpass: ['', [Validators.required, Validators.minLength(6)]],
      hmail: ['', [Validators.required, Validators.email]],
      hpais: ['', Validators.required],
    });
  }

  insertar(): void {
    if (this.form.valid) {
      // Configuración inicial del objeto usuario
      this.usuario.username = this.form.value.hnombre;
      this.usuario.email = this.form.value.hmail;
      this.usuario.password = this.form.value.hpass;
      this.usuario.pais=this.form.value.hpais;
      this.usuario.enabled = true;
      this.usuario.fecha_registro = new Date(Date.now()); // Fecha actual
      this.usuario.fecha_modificacion = new Date(Date.now()); // Fecha actual

      // Insertar el usuario y esperar la respuesta antes de continuar
      this.uS.insert(this.usuario).subscribe({
        next: () => {
          this.uS.listNoAuth(this.usuario.email).subscribe(response => {
            console.log("El id del nuevo usuario es ", response.id);
            const insert = new roles();
            const idU = new Usuario();
            idU.id = response.id;

            insert.rol = 'USUARIO';
            insert.user = idU;

            this.rS.insert(insert).subscribe({
              next: () => {
                this.router.navigate(['/login']);
              },
              error: (err) => {
                console.error('Error inserting role:', err);
              }
            });
          });
        },
        error: (err) => {
          console.error('Error inserting user:', err);
        }
      });
    } else {
      console.log('Form is invalid');
    }
  }
}
