import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ConfigService } from '@app/services/config.service';
import { CategoriesComponent } from '../categories/categories.component';
import { ServicesComponent } from '../services/services.component';
import { GlobalService } from '@app/services/global.service';
import { ReelsComponent } from '../reels/reels.component';
import { BannerComponent } from '../sections/banner/banner.component';
import { DeviceService } from '@app/services/device.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    BannerComponent,
    CommonModule,
    CategoriesComponent,
    ServicesComponent,
    ReelsComponent,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  specialists: any[] = [];

  activeRoute = 'home';isListView: boolean = true;  // Por defecto, vista lista

  constructor(
    public device:DeviceService,
    public global: GlobalService,
    public configService: ConfigService
  ) {}
  toggleView(view: string): void {
    this.isListView = (view === 'list');
  }
}
