import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ConfigService } from '@app/services/config.service';
import { GlobalService } from '@app/services/global.service';

@Component({
  selector: 'app-categories',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.css'
})
export class CategoriesComponent {
  // categories: any[] = [];
  get categories() {
    return Object.entries(this.config.defaultConfig.categories);
  }
constructor(  public config: ConfigService,public global:GlobalService){
  
}
selectCategory(categoryKey: string) {
  this.config.selectCategory(categoryKey as keyof typeof this.config.defaultConfig.categories);
}
}
