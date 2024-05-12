import { HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { HttpService } from "@core/services/http.service";
import { Observable } from "rxjs";

@Injectable({
    providedIn: 'root',
})
export class ScheduleService {
    constructor (
        private httpService: HttpService,
    ) {}

    // Метод для получения расписания по ID группы
    public getScheduleByGroupID(id: number): Observable<any> {
        const body: HttpParams = new HttpParams().set('id', id);

        return this.httpService.get('schedule/getScheduleByGroupID', body);
    };

    // Метод для изменения расписания по ID группы
    public updateScheduleByGroupID(id: number): Observable<any> {
        const body = { "groupID": id };

        return this.httpService.put('schedule/updateScheduleByGroupID', body);
    };
};