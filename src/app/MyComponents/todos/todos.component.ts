import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, NgForm } from '@angular/forms';
import { ITask } from 'src/app/model/task';
import { Todo } from "../../Todo";

@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.css']
})
export class TodosComponent implements OnInit {
  localItem: string | null;
 // todos: Todo[];
  todoForm !: FormGroup;
  tasks : ITask [] = [];
  inprogress : ITask [] = [];
  done : ITask [] = [];
  updateIndex !: any;
  isEditEnabled : boolean = false ;

  constructor( private fb : FormBuilder) {
    // this.localItem = localStorage.getItem("todos");
    // if (this.localItem == null) {
    //   this.todos = [];
    // }
    // else {
    //   this.todos = JSON.parse(this.localItem);
    // }
    this.localItem = localStorage.getItem("tasks");
    if (this.localItem == null) {
      this.tasks = [];
    }
    else {
      this.tasks = JSON.parse(this.localItem);
    }
  }

  ngOnInit(): void {
    this.todoForm = this.fb.group({
      item : ['', Validators.required]
    })
  }

  addTask(){
    this.tasks.push({
      description:this.todoForm.value.item,
      done:false,
      editMode: false
    });
    localStorage.setItem("tasks", JSON.stringify(this.tasks));
    this.todoForm.reset();
  }

  onEditTodoTask(item : ITask, i: number){
    item.editMode = true
    // this.todoForm.controls['item'].setValue(item.description);
    // this.updateIndex = i;
    // this.isEditEnabled = true;
    localStorage.setItem("tasks", JSON.stringify(this.tasks));
  }

  updateTodoTask(f: NgForm, item: ITask) {
  item.editMode = false
  item.description = f.value.desc

    // this.tasks[this.updateIndex].description = this.todoForm.value.item;
    // this.tasks[this.updateIndex].done = false;
    // this.todoForm.reset();
    // this.updateIndex = undefined;
    // this.isEditEnabled = false;
    localStorage.setItem("tasks", JSON.stringify(this.tasks));
  }

  // onEditInProgressTask(item : ITask, i: number){
  //   this.todoForm.controls['item'].setValue(item.description);
  //   this.updateIndex = i;
  //   this.isEditEnabled = true;
  // }

  // updateInProgressTask() {
  //   console.log(this.inprogress)
  //   this.inprogress[this.updateIndex].description = this.todoForm.value.item;
  //   this.inprogress[this.updateIndex].done = false;
  //   this.todoForm.reset();
  //   this.updateIndex = undefined;
  //   this.isEditEnabled = false;
  // }

  deleteTask(i: number){
    this.tasks.splice(i,1);
    localStorage.setItem("tasks", JSON.stringify(this.tasks));

  }

  deleteInProgressTask(i: number){
    this.inprogress.splice(i,1);
    localStorage.setItem("tasks", JSON.stringify(this.tasks));

  }

  deleteDoneTask(i: number){
    this.done.splice(i,1);
    localStorage.setItem("tasks", JSON.stringify(this.tasks));
  }


  drop(event: CdkDragDrop<ITask[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
    }
  }

  // deleteTodo(todo: Todo) {
  //   console.log(todo);
  //   const index = this.todos.indexOf(todo);
  //   this.todos.splice(index, 1);
  //   localStorage.setItem("todos", JSON.stringify(this.todos));
  // }
  // addTodo(todo: Todo) {
  //   console.log(todo);
  //   this.todos.push(todo);
  //   localStorage.setItem("todos", JSON.stringify(this.todos));
  // }
  // toggleTodo(todo: Todo) {
  //   console.log(todo);
  //   const index = this.todos.indexOf(todo);
  //   this.todos[index].active = !this.todos[index].active;
  //   localStorage.setItem("todos", JSON.stringify(this.todos));
  // }
}
