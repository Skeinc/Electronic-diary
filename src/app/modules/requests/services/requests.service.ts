import { Injectable } from "@angular/core";
import { HttpService } from "@core/services/http.service";
import { Observable } from "rxjs";

@Injectable({
    providedIn: 'root',
})
export class RequestsService {
    constructor (
        private httpService: HttpService,
    ) {}

    // Метод для принятия заявки на активацию пользователя
    public acceptRequest(id: number): Observable<any> {
        const body = { id };

        return this.httpService.put('requests/acceptActivateUser', body);
    } 

    // Метод для отклонения заявки на активацию пользователя
    public declineRequest(id: number): Observable<any> {
        const body = { id };

        return this.httpService.put('requests/declineActivateUser', body);
    }

    // Метод для получения всех заявок на активацию
    public getAllRequests(): Observable<any> {
        return this.httpService.get('requests/getUnactivatedUsers');
    }
}