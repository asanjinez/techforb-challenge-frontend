import { AfterViewInit, Component, HostListener, ViewChild } from '@angular/core';
import { MaterialModule } from '../../../material.module';
import { MatDrawer } from '@angular/material/sidenav';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [MaterialModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {
  // menuValue:boolean=false;
  // menu_icon :string ='bi bi-list';
  // @ViewChild('drawer') drawer!: MatDrawer;

  // ngAfterViewInit() {
  //   if (window.innerWidth > 900)
  //     this.drawer.open()
  // }
  // openMenu(){
  //    this.menuValue =! this.menuValue ;
  //    this.menu_icon = this.menuValue ? 'bi bi-x' : 'bi bi-list';
  //  }
  //   closeMenu() {
  //    this.menuValue = false;
  //    this.menu_icon = 'bi bi-list';
  //  }

  //  @HostListener("window:resize", []) toogleSideBar() {
  //   if (window.innerWidth >= 900)
  //      this.drawer.open()
  //     else
  //      this.drawer.close()
  // }

}
