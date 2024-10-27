import { Component, inject } from '@angular/core';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';
import { map } from 'rxjs/operators';
import { AsyncPipe } from '@angular/common';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-dash',
  templateUrl: './dash.component.html',
  styleUrl: './dash.component.scss',
  standalone: true,
  imports: [
    AsyncPipe,
    MatGridListModule,
    MatMenuModule,
    MatIconModule,
    MatButtonModule,
    MatCardModule
  ]
})
export class DashComponent {
  private breakpointObserver = inject(BreakpointObserver);

  /** Based on the screen size, switch from standard to one column per row */
  cards = this.breakpointObserver.observe(Breakpoints.Handset).pipe(
    map(({ matches }) => {
      if (matches) {
        return [
          { title: 'Card 1', cols: 4, rows: 1 },
          { title: 'Card 2', cols: 4, rows: 1 },
          { title: 'Card 3', cols: 4, rows: 1 },
          { title: 'Card 4', cols: 4, rows: 1 },
          { title: 'Card 5', cols: 4, rows: 2 },
          { title: 'Card 6', cols: 4, rows: 1 },
          { title: 'Card 7', cols: 4, rows: 1 },
          { title: 'Card 8', cols: 4, rows: 1 },
          { title: 'Card 9', cols: 4, rows: 1 },
          { title: 'Card 10', cols: 4, rows: 1 },
          { title: 'Card 11', cols: 4, rows: 1 },
          { title: 'Card 12', cols: 4, rows: 1 },
          { title: 'Card 13', cols: 4, rows: 1 },
        ];
      } else {
        return [
          { title: 'Card 1', cols: 1, rows: 1 },
          { title: 'Card 2', cols: 1, rows: 1 },
          { title: 'Card 3', cols: 1, rows: 1 },
          { title: 'Card 4', cols: 1, rows: 1 },
          { title: 'Card 5', cols: 4, rows: 1 },
          { title: 'Card 6', cols: 1, rows: 1 },
          { title: 'Card 7', cols: 1, rows: 1 },
          { title: 'Card 8', cols: 1, rows: 1 },
          { title: 'Card 9', cols: 1, rows: 1 },
          { title: 'Card 10', cols: 1, rows: 1 },
          { title: 'Card 11', cols: 1, rows: 1 },
          { title: 'Card 12', cols: 1, rows: 1 },
          { title: 'Card 13', cols: 1, rows: 1 },
        ];
      }
    })
  );
}
