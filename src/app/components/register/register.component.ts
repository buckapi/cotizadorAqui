import { CommonModule } from '@angular/common';
import { Component,OnInit } from '@angular/core';
import { AuthPocketbaseService } from '@app/services/auth-pocketbase.service';
import { DeviceService } from '@app/services/device.service';
import { GlobalService } from '@app/services/global.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent  implements OnInit {
  isMobile: boolean = false;
  option: string = '';
  currentStep: number = 1; // Paso inicial
  circles: number[] = [1, 2, 3]; // Define la cantidad de círculos para el progreso
  
  constructor(public global: GlobalService,
    public auth:AuthPocketbaseService,
    public device:DeviceService
  ) {}
    // Método para avanzar al siguiente paso
    nextStep() {
      if (this.currentStep < this.circles.length) {
        this.currentStep++;
        this.updateProgress();
      }
    }
    updateProgress() {
      const indicator: HTMLElement | null = document.querySelector('.indicator');
      if (indicator) {
        const progressPercentage = ((this.currentStep - 1) / (this.circles.length - 1)) * 100;
        indicator.style.width = `${progressPercentage}%`;
      }
  
      // Actualiza las clases de los círculos
      const circles = document.querySelectorAll('.circle');
      circles.forEach((circle, index) => {
        if (index < this.currentStep) {
          circle.classList.add('active');
        } else {
          circle.classList.remove('active');
        }
      });
    }
    // Método para retroceder al paso anterior
    previousStep() {
      if (this.currentStep > 1) {
        this.currentStep--;
        this.updateProgress();
      }
    }
  
  setOption(option: string) {
    if (option!=''){this.nextStep();}else{this.previousStep();}
    this.global.option = option;
  }
  ngOnInit() {
    this.device.isMobile().subscribe(isMobile => {
      this.isMobile = isMobile;
    });
  }
}
