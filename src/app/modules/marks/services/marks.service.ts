import { HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { HttpService } from "@core/services/http.service";
import { Observable } from "rxjs";

@Injectable({
    providedIn: 'root',
})
export class MarksService {
    constructor (
        private httpService: HttpService,
    ) {}

    // Метод для получения оценок по ID группы и ID задания
    public getMarksByGroupIDAndTaskID(groupID: number, taskID: number): Observable<any> {
        const body: HttpParams = new HttpParams().set('taskID', taskID).set('groupID', groupID);

        return this.httpService.get('marks/getMarksByTaskAndGroup', body);
    };

    // Метод для обновления оценок по ID группы и ID задания
    public updateMarksByGroupIDAndTaskID(request: any): Observable<any> {
        const body = request;

        return this.httpService.put('marks/updateMarksByTaskAndGroup', body);
    };
};