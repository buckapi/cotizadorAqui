import { Injectable } from '@angular/core';
export interface Clinic {
  id: number;
  name: string;
  full_name: string;
  address: string;
  phoneNumber: string;
  images: string[]; // O el tipo adecuado para las imágenes
  services: string[]; // O el tipo adecuado para los servicios
  // Otros campos que sean necesarios
}

@Injectable({
  providedIn: 'root',
})
export class GlobalService {
  option: string = '';
  isScrollingDown = false;
  lastScrollTop = 0;
  scrollThreshold = 380;
  specialists: any[] = [];
  categories: any[] = [];
  clinicSelected: Clinic = {
    id: 0,
    name: '',
    full_name: '',
    address: '',
    phoneNumber: '',
    images: [], // Inicializa con un array vacío
    services: [],
  };
  activeRoute = 'home';
  modalType = 'filter';
  constructor() {}
  setRoute(route: string) {
    this.activeRoute = route;
  }
  setModalType(modalType: string) {
    this.modalType = modalType;
  }
  viewClinic(clinic: any) {
    this.clinicSelected = clinic;
    this.activeRoute = 'clinicdetail';
  }
}
