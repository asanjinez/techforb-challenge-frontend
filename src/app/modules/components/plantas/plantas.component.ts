import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MaterialModule } from '../../../material.module';
import { PlantasService } from '../../../core/services/plantas.service';
import { Planta } from '../../../core/models/planta';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { DialogPlantaComponent } from '../dialogs/dialog-planta/dialog-planta.component';
import { DialogConfirmComponent } from '../dialogs/dialog-confirm/dialog-confirm.component';

@Component({
  selector: 'app-plantas',
  standalone: true,
  imports: [MaterialModule],
  templateUrl: './plantas.component.html',
  styleUrl: './plantas.component.scss'
})
export class PlantasComponent implements OnInit, AfterViewInit{
  displayedColumns: string[] = ['pais', 'nombre', 'numeroLecturas', 'alertasMedias', 'alertasRojas', 'acciones'];

  plantas: Planta[] = [];

  dataSource: MatTableDataSource<Planta>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private plantasService: PlantasService, private dialog: MatDialog) { 
    this.dataSource = new MatTableDataSource(this.plantas);
  }

  ngOnInit(): void {
    this.plantasService.getPlantas().subscribe(response => {
      if(response.success){
        this.plantas = response.data!;
        this.dataSource.data = response.data!; 
        console.log(this.dataSource);
      }
    });
  
  }

  ngAfterViewInit(): void {
    if (this.paginator) {
      this.dataSource.paginator = this.paginator;
    }
    if (this.sort) {
      this.dataSource.sort = this.sort;
    }
  }

  openEditDialog(planta: Planta): void {
    this.dialog.open(DialogPlantaComponent,{
      width: '720px',
      height: '370px',
      data: {data: planta, editMode: true},
      autoFocus: true,
      hasBackdrop: true,
      panelClass: 'dialogContainer'
    }).afterClosed().subscribe((result) => {
      if (result) {
        this.plantas = this.plantas.map(p => p.id === result.id ? result : p);
        this.dataSource.data = this.plantas;
      }
    });
  }

  openDeleteDialog(planta: Planta): void {
    this.dialog.open(DialogConfirmComponent,{
      data: {id: planta.id},
    }).afterClosed().subscribe((result) => {
      if (result) {
        this.plantas = this.plantas.filter(p => p.id !== planta.id);
        this.dataSource.data = this.plantas;
      }
    });
  }

  openCreateDialog(): void {
    this.dialog.open(DialogPlantaComponent,{
      width: '380px',
      height: '300px',
      data: {data: {}, editMode: false},
      autoFocus: true,
      hasBackdrop: true,
    }).afterClosed().subscribe((result) => {
      if (result) {
        this.plantas = [...this.plantas, result];
        this.dataSource.data = this.plantas;
      }
    });
  }
}
