import { Component } from '@angular/core';
import { GlobalService } from '@app/services/global.service';

@Component({
  selector: 'app-backheader',
  standalone: true,
  imports: [],
  templateUrl: './backheader.component.html',
  styleUrl: './backheader.component.css'
})
export class BackheaderComponent {
constructor(
  public global:GlobalService
){}
}
