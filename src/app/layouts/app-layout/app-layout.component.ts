import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { Router, RouterModule, RouterOutlet } from '@angular/router';
import { MaterialModule } from '../../material.module';
import { CommonModule } from '@angular/common';
import { BreakpointObserver } from '@angular/cdk/layout';
import { AuthService } from '../../core/services/auth.service';
import { MatSidenav } from '@angular/material/sidenav';

@Component({
  selector: 'app-main-layout',
  standalone: true,
  imports: [RouterOutlet, MaterialModule, CommonModule, RouterModule],
  templateUrl: './app-layout.component.html',
  styleUrl: './app-layout.component.scss',
})
export class AppLayoutComponent implements AfterViewInit {
  @ViewChild(MatSidenav)
  sidenav!: MatSidenav;
  isMobile= false;
  navActivado = false;
  menuItems = [
    { name: 'Dashboard', fragment: 'home', 'icon':'public'  },
    { name: 'Monitoreo global', fragment: 'monitoreo', 'icon':'videocam' },
    { name: 'Plantas', fragment: 'plantas', 'icon':'villa' },
    { name: 'Parametros', fragment: 'parametros', 'icon':'wifi_tethering' },
  ];


  constructor(private observer: BreakpointObserver, private authService: AuthService, private router:Router) {}

  ngAfterViewInit() {
    this.observer.observe(['(max-width: 800px)']).subscribe((screenSize) => {
      this.isMobile = screenSize.matches;

      if (this.isMobile) {
        this.navActivado = false;
        this.sidenav.close();
      } else {
        this.navActivado = true;
        this.sidenav.open();
      }
    });
  }

  togleMenu() {
    if (this.isMobile) {
      this.sidenav.toggle();
    }
  }

  logout() {
    this.authService.logout();
  }

  navigateTo(section: string): void {
    this.router.navigate(['/dashboard'], { fragment: section });
  }

}
