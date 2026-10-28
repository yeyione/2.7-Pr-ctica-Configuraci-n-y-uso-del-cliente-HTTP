import { Component, OnInit, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';

interface Usuario {
  id: number;
  name: string;
  email: string;
  phone: string;
}


@Component({
  selector: 'app-usuarios',
  standalone: true,
  styleUrl: './usuarios.component.css',
  templateUrl: './usuarios.component.html',
})
export class UsuariosComponent implements OnInit {
  private url = 'https://jsonplaceholder.typicode.com/users';

  usuarios = signal<Usuario[]>([]);
  cargando = signal<boolean>(true);
  error = signal('');

  constructor(private http: HttpClient) {}

  ngOnInit(){
    this.cargarUsuarios();
  }

  cargarUsuarios() {
    this.cargando.set(true);
    this.error.set('');

    this.http.get<Usuario[]>(this.url).subscribe({
      next:(datos) => {
        this.usuarios.set(datos);
        this.cargando.set(false);
      },
      error:() => {
        this.error.set('Error al cargar los usuarios, intentalo de nuevo');
        this.cargando.set(false);
      }
    });
  }
}

