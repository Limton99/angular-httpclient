import {Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {delay} from "rxjs/operators";
import {Todo, TodosService} from "./todos.service";



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  todos: Todo[] = [];
  todoTitle = '';
  loading = false;
  error = '';

  constructor(private todosService: TodosService) {
  }

  ngOnInit() {
    this.fetchTodos();
  }

  addTodo() {
    if (!this.todoTitle.trim()) {
      return ;
    }

    const newTodo: Todo = {
      title: this.todoTitle,
      completed: false
    };

    this.todosService.addTodo(newTodo)
        .subscribe(res => {
          console.log(res);
          this.todos.push(res);
          this.todoTitle = '';
    });

  }

  fetchTodos() {
    this.loading = true;

    this.todosService.fetchTodos()
        .subscribe(res => {
          console.log(res);
          this.todos = res;
          this.loading = false;
        }, err => {
          this.error = err.message;
        });
  }

  removeTodo(id: number) {
    this.todosService.removeTodo(id)
        .subscribe(() => {
          this.todos = this.todos.filter(t => t.id !== id);
        });
  }

  completeTodo(id: number) {
    this.todosService.completeTodo(id)
        .subscribe(res => {
          this.todos.find(t => t.id === res.id).completed = true;
        }, err => {
          this.error = err.message;
        });
  }
}

