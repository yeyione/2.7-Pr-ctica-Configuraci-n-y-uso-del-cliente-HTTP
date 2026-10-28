import { Component } from '@angular/core';
import { UsuariosComponent } from './usuarios/usuarios.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [UsuariosComponent],
  templateUrl: './app.html',
  styleUrls: ['./app.css']
})
export class App {}