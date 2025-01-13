import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { Usuario } from '../../models/Usuario';
import { roles } from '../../models/roles';
import { UsuarioService } from '../../services/usuario.service';
import { RolesService } from '../../services/roles.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-sing-up',
  imports: [MatInputModule, MatIconModule,ReactiveFormsModule],
  templateUrl: './sing-up.component.html',
  styleUrl: './sing-up.component.css'
})
export class SingUpComponent implements OnInit{
  form: FormGroup = new FormGroup({});
  usuario: Usuario = new Usuario();
  rol: roles = new roles();
  showPassword = false;

  constructor(
    private uS: UsuarioService,
    private rS: RolesService,
    private formBuilder: FormBuilder,
    private router: Router,

  ) {}

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      hnombre: ['', Validators.required],
      hpass: ['', [Validators.required, Validators.minLength(6)]],
      hmail: ['', [Validators.required, Validators.email]],
    });
  }

  insertar(): void {
    if (this.form.valid) {
      // Configuración inicial del objeto usuario
      this.usuario.username = this.form.value.hnombre;
      this.usuario.email = this.form.value.hmail;
      this.usuario.password = this.form.value.hpass;
      this.usuario.enabled = true;
      this.usuario.fecha_registro = new Date(); // Fecha actual
      this.usuario.fecha_modificacion = new Date(); // Fecha actual

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
