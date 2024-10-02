import PocketBase from 'pocketbase';
import { Injectable, Inject, PLATFORM_ID, Renderer2 } from '@angular/core';
import { Observable, from } from 'rxjs';
import { UserInterface } from '@app/interfaces/user-interface'; // Asegúrate de que la ruta sea correcta
import { isPlatformBrowser } from '@angular/common';
import { GlobalService } from './global.service';

@Injectable({
  providedIn: 'root',
})
export class AuthPocketbaseService {
  private pb: PocketBase;

  constructor(public global: GlobalService) {
    this.pb = new PocketBase('https://db.buckapi.com:8090');
  }

  async saveCategor(categoryData: any): Promise<any> {
    try {
      const record = await this.pb
        .collection('camiwaCategories')
        .create(categoryData);
      console.log('Categoría guardada exitosamente:', record);

      return record; // Si necesitas devolver el registro creado
    } catch (error) {
      console.error('Error al guardar la categoría:', error);
      throw error; // Puedes lanzar el error para manejarlo en otro lugar
    }
  }

  async saveSpecialty(specialtyData: any): Promise<any> {
    try {
      const record = await this.pb
        .collection('camiwaSpecialties')
        .create(specialtyData);
      console.log('Especialidad guardada exitosamente:', record);
      // this.global.getSpecialties();
      return record; // Si necesitas devolver el registro creado
    } catch (error) {
      console.error('Error al guardar la especialidad:', error);
      throw error; // Puedes lanzar el error para manejarlo en otro lugar
    }
  }
  isLogin() {
    return localStorage.getItem('isLoggedin');
  }

  registerUser(
    email: string,
    password: string,
    type: string,
    name: string
  ): Observable<any> {
    const userData = {
      email: email,
      password: password,
      passwordConfirm: password,
      type: type,
      username: name,
      name: name,
    };

    // Crear usuario y luego crear el registro en camiwaTravelers
    return from(
      this.pb
        .collection('users')
        .create(userData)
        .then((user) => {
          const data = {
            name: name,
            address: '', // Agrega los campos correspondientes aquí
            phone: '', // Agrega los campos correspondientes aquí
            userId: user.id, // Utiliza el ID del usuario recién creado
            status: 'pending', // Opcional, establece el estado del cliente
            images: {}, // Agrega los campos correspondientes aquí
          };
          return this.pb.collection('camiwaTravelers').create(data);
        })
    );
  }

  onlyRegisterUser(
    email: string,
    password: string,
    type: string,
    name: string
  ): Observable<any> {
    const userData = {
      email: email,
      password: password,
      passwordConfirm: password,
      type: type,
      username: name,
      name: name,
    };

    // Crear usuario y devolver el observable con el usuario creado
    return from(
      this.pb
        .collection('users')
        .create(userData)
        .then((user) => {
          // No se necesita crear ningún registro adicional en camiwaTravelers aquí
          return user; // Devolver los datos del usuario creado
        })
    );
  }

  loginUser(email: string, password: string): Observable<any> {
    return from(this.pb.collection('users').authWithPassword(email, password));
  }

  logoutUser(): Observable<any> {
    // Limpiar la autenticación almacenada
    localStorage.removeItem('accessToken');
    localStorage.removeItem('currentUser');
    localStorage.removeItem('isLoggedin');
    localStorage.removeItem('dist');
    localStorage.removeItem('userId');
    localStorage.removeItem('type');
    localStorage.removeItem('clientCard');
    localStorage.removeItem('clientFicha');
    this.pb.authStore.clear();
    this.global.setRoute('home');
    // this.virtualRouter.routerActive = "home";
    return new Observable<any>((observer) => {
      observer.next(); // Indicar que la operación de cierre de sesión ha completado
      observer.complete();
    });
  }

  setToken(token: any): void {
    localStorage.setItem('accessToken', token);
  }

  setUser(user: UserInterface): void {
    let user_string = JSON.stringify(user);
    let type = JSON.stringify(user.type);
    localStorage.setItem('currentUser', user_string);
    localStorage.setItem('type', type);
  }
}
