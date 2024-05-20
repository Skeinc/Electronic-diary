import { HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { HttpService } from "@core/services/http.service";
import { Observable } from "rxjs";

@Injectable({
    providedIn: 'root',
})
export class TopicsService {
    constructor (
        private httpService: HttpService,
    ) {}

    // Метод для получения тем по ID предмета
    public getAllTopicsBySubjectID(id: number): Observable<any> {
        const body: HttpParams = new HttpParams().set("subjectID", id);

        return this.httpService.get('topics/getTopicsBySubjectID', body);
    };

    // Метод для добавления темы
    public createTopic(request: any): Observable<any> {
        const body = request;

        return this.httpService.post('topics/addTopic', body);
    };

    // Метод для редактирования темы
    public updateTopic(request: any): Observable<any> {
        const body = request;

        return this.httpService.put('topics/updateTopic', body);
    };

    // Метод для удаления темы
    public deleteTopicByID(id: number): Observable<any> {
        const body = {
            id,
        };

        return this.httpService.delete('topics/deleteTopic', body);
    };
}