import { HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { HttpService } from "@core/services/http.service";
import { Observable } from "rxjs";

@Injectable({
    providedIn: 'root',
})
export class AttendaceService {
    constructor (
        private httpService: HttpService,
    ) {}

    // Метод для получения посещаемости по ID группы и ID предмета
    public getAttendanceByGroupIDAndSubjectID(groupID: number, subjectID: number): Observable<any> {
        const body: HttpParams = new HttpParams().set('subjectID', subjectID).set('groupID', groupID);

        return this.httpService.get('attendance/getAttendanceBySubjectAndGroup', body);
    };

    // Метод для получения посещаемости по ID группы и ID темы
    public getAttendanceByGroupIDAndTopicID(groupID: number, topicID: number): Observable<any> {
        const body: HttpParams = new HttpParams().set('topicID', topicID).set('groupID', groupID);

        return this.httpService.get('attendance/getAttendanceByTopicAndGroup', body);
    };

    // Метод для обновления посещаемости по ID группы и ID темы
    public updateAttendanceByGroupIDAndTopicID(request: any): Observable<any> {
        const body = request;

        return this.httpService.put('attendance/updateAttendanceByTopicAndGroup', body);
    };
}