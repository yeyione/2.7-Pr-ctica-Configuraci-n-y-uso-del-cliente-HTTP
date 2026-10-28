import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { UsuariosComponent } from './usuarios.component';

describe('UsuariosComponent', () => {
  let fixture: ComponentFixture<UsuariosComponent>;
  let http: HttpTestingController;
  let el: HTMLElement;
  const url = 'https://jsonplaceholder.typicode.com/users';

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UsuariosComponent],
      providers: [provideHttpClient(), provideHttpClientTesting()]
    }).compileComponents();

    fixture = TestBed.createComponent(UsuariosComponent);
    http = TestBed.inject(HttpTestingController);
    el = fixture.nativeElement;
    fixture.detectChanges(); 
  });

  afterEach(() => {
    http.verify();
  });

  it('muestra el mensaje de carga mientras espera la respuesta', () => {
    http.expectOne(url);
    expect(el.textContent).toContain('Cargando usuarios...');
  });

  it('muestra ID, nombre y correo cuando la petición funciona', () => {
    http.expectOne(url).flush([
      { id: 1, name: 'Ana Lopez', email: 'ana@correo.com', phone: '123456' }
    ]);
    fixture.detectChanges();

    const texto = el.textContent ?? '';
    expect(texto).toContain('ID: 1');
    expect(texto).toContain('Ana Lopez');
    expect(texto).toContain('ana@correo.com');
    expect(texto).not.toContain('Cargando usuarios...');
  });

  it('muestra mensaje de error cuando la petición falla', () => {
    http.expectOne(url).flush('Error', { status: 500, statusText: 'Server Error' });
    fixture.detectChanges();

    expect(el.textContent).toContain('Error al cargar los usuarios');
  });
});