import { HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { HttpService } from "@core/services/http.service";
import { Observable } from "rxjs";

@Injectable({
    providedIn: 'root',
})
export class TasksService {
    constructor (
        private httpService: HttpService,
    ) {}

    // Метод для получения заданий по ID темы
    public getAllTasksByTopicID(id: number): Observable<any> {
        const body: HttpParams = new HttpParams().set("topicID", id);

        return this.httpService.get('tasks/getTasksByTopicID', body);
    };

    // Метод для получения ответа на задания
    public getResponseToTask(taskID: number, userID: number): Observable<any> {
        const body: HttpParams = new HttpParams().set('taskID', taskID).set('userID', userID);

        return this.httpService.get('task-response/getResponseByTaskIDAndUserID', body);
    };

    // Метод для добавления задания
    public createTask(request: any): Observable<any> {
        const body = request;

        return this.httpService.post('tasks/addTask', body);
    };

    // Метод на добавление ответа на задание
    public addResponseToTask(request: any): Observable<any> {
        const body = request;

        return this.httpService.post('task-response/addTaskResponse', body);
    };

    // Метод для редактирования задания
    public updateTask(request: any): Observable<any> {
        const body = request;

        return this.httpService.put('tasks/updateTask', body);
    };

    // Метод для удаления задания
    public deleteTaskByID(id: number): Observable<any> {
        const body = {
            id,
        };

        return this.httpService.delete('tasks/deleteTask', body);
    };
}