import { ChangeDetectorRef, Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ColumnMode } from '@swimlane/ngx-datatable';
import { AddTaskDialogComponent } from './add-task-dialog/add-task-dialog.component';
import { DeleteTaskDialogComponent } from './delete-task-dialog/delete-task-dialog.component';

export interface Task {
  id: number;
  title: string;
  description: string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  tasks: Task[] = [{
    id: 0,
    title: 'task 0',
    description: 'desc 0'
  },
  {
    id: 1,
    title: 'task 1',
    description: 'desc 1'
  },
  {
    id: 2,
    title: 'task 2',
    description: 'desc 2'
  },
  {
    id: 3,
    title: 'task 3',
    description: 'desc 3'
  }];
  editing: any = {};
  ColumnMode = ColumnMode;

  constructor(private dialog: MatDialog, private snackBar: MatSnackBar, private cd: ChangeDetectorRef) { }

  public updateValue(rowIndex: number): void {
    const newTitle = this.editing[rowIndex + '-title'];
    const newDescription = this.editing[rowIndex + '-description'];

    if (newTitle && typeof newTitle === 'string') {
      this.tasks[rowIndex].title = newTitle;
    }
    if (newDescription && typeof newDescription === 'string') {
      this.tasks[rowIndex].description = newDescription;
    }
    this.editing[rowIndex + '-title'] = false;
    this.editing[rowIndex + '-description'] = false;
  }

  public adNewTask(): void {
    const dialogRef = this.dialog.open(AddTaskDialogComponent, {
      width: '450px'
    });

    dialogRef.afterClosed().subscribe(result => {
      const tempArr = [...this.tasks];
      tempArr.push({
        id: this.tasks.length,
        title: result.title,
        description: result.description
      });
      this.tasks = [...tempArr];
      this.cd.detectChanges();
      this.snackBar.open('Added Successfully !', 'Ok', {
        duration: 3000,
      });
    });
  }

  public deleteTask(index: number): void {
    const dialogRef = this.dialog.open(DeleteTaskDialogComponent, {
      width: '450px'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        const tempArr = [...this.tasks];
        tempArr.splice(index, 1);
        this.tasks = [...tempArr];
        this.cd.detectChanges();
        this.snackBar.open('Deleted Successfully !', 'Ok', {
          duration: 3000,
        });
      }
    });
  }
}
