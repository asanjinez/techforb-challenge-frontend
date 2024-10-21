import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MaterialModule } from './material.module';
import { DashboardComponent } from "./pages/dashboard/dashboard.component";


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    MaterialModule,
    DashboardComponent
],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'techforb-challenge';
}
