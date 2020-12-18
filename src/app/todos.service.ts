import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {delay, catchError, tap} from 'rxjs/operators';

export interface Todo {
    completed: boolean;
    title: string;
    id?: number;
}

@Injectable({providedIn: 'root'})
export  class TodosService {
    constructor(private http: HttpClient) {
    }

    addTodo(todo: Todo): Observable<Todo> {
        return this.http.post<Todo>('https://jsonplaceholder.typicode.com/todos', todo);
    }

    fetchTodos(): Observable<Todo[]> {
        return this.http.get<Todo[]>('https://jsonplaceholder.typicode.com/todos', {
            params: new HttpParams().set('_limit', '3')
        })
            .pipe(
                delay(500),
                catchError(err => {
                    console.log(err.message);
                    return throwError(err);
                })
            );
    }

    removeTodo(id: number): Observable<any> {
        return this.http.delete<void>(`https://jsonplaceholder.typicode.com/todos/${id}`, {
            observe: 'events'
        })
            .pipe(
                tap(e => {
                    console.log(e);
                })
            );
    }

    completeTodo(id: number): Observable<Todo> {
        return this.http.put<Todo>(`https://jsonplaceholder.typicode.com/todos/${id}`, {
            completed: true
        });
    }
}
