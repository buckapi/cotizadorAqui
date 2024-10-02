import { CommonModule } from '@angular/common';
import { Component,OnInit } from '@angular/core';
import { GlobalService } from '@app/services/global.service';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { DeviceService } from '@app/services/device.service';

@Component({
  selector: 'app-clinicdetail',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './clinicdetail.component.html',
  styleUrl: './clinicdetail.component.css'
})
export class ClinicdetailComponent implements OnInit {
  isMobile: boolean = false;

  constructor(
    public device:DeviceService,
    public breakpointObserver: BreakpointObserver,
    public global:GlobalService,
  ){}
  ngOnInit() {
    this.device.isMobile().subscribe(isMobile => {
      this.isMobile = isMobile;
    });
  }
  }