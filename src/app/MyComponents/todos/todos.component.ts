import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, NgForm } from '@angular/forms';
import { ITask } from 'src/app/model/task';

@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.css']
})
export class TodosComponent implements OnInit {
  localItemToDo: string | null;
  localItemInProgress: string | null;
  localItemDone: string | null;
  todoForm !: FormGroup;
  tasks: ITask[] = [];
  inprogress: ITask[] = [];
  done: ITask[] = [];
  updateIndex !: any;
  isEditEnabled: boolean = false;

  constructor(private fb: FormBuilder) {
    this.localItemToDo = localStorage.getItem("tasks");
    this.localItemInProgress = localStorage.getItem("inprogress");
    this.localItemDone = localStorage.getItem("done");

    if (this.localItemToDo == null) {
      this.tasks = [];
    }
    else {
      this.tasks = JSON.parse(this.localItemToDo);
    }

    if (this.localItemInProgress == null) {
      this.inprogress = [];
    }
    else {
      this.inprogress = JSON.parse(this.localItemInProgress);
    }

    if (this.localItemDone == null) {
      this.done = [];
    }
    else {
      this.done = JSON.parse(this.localItemDone);
    }

  }

  ngOnInit(): void {
    this.todoForm = this.fb.group({
      item: ['', Validators.required]
    })
  }

  addTask() {
    this.tasks.push({
      description: this.todoForm.value.item,
      done: false,
      editMode: false
    });
    localStorage.setItem("tasks", JSON.stringify(this.tasks));
    this.todoForm.reset();
  }

  onEditTodoTask(item: ITask, i: number) {
    item.editMode = true;
    localStorage.setItem("tasks", JSON.stringify(this.tasks));
  }

  updateTodoTask(todoForm: NgForm, item: ITask) {
    item.editMode = false
    item.description = todoForm.value.desc
    localStorage.setItem("tasks", JSON.stringify(this.tasks));
  }

  deleteTask(i: number) {
    this.tasks.splice(i, 1);
    localStorage.setItem("tasks", JSON.stringify(this.tasks));

  }

  deleteInProgressTask(i: number) {
    this.inprogress.splice(i, 1);
    localStorage.setItem("inprogress", JSON.stringify(this.inprogress));

  }

  deleteDoneTask(i: number) {
    this.done.splice(i, 1);
    localStorage.setItem("done", JSON.stringify(this.done));
  }

  drop(event: CdkDragDrop<ITask[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
      localStorage.setItem("tasks", JSON.stringify(this.tasks));
      localStorage.setItem("inprogress", JSON.stringify(this.inprogress));
      localStorage.setItem("done", JSON.stringify(this.done));

    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
      localStorage.setItem("tasks", JSON.stringify(this.tasks));
      localStorage.setItem("inprogress", JSON.stringify(this.inprogress));
      localStorage.setItem("done", JSON.stringify(this.done));
    }
  }
}
