import { Injectable } from "@angular/core";
import { HttpService } from "@core/services/http.service";
import { Observable } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class AuthorizationService {
    constructor(
        private httpService: HttpService,
    ) {}

    // Метод для авторизации персонала
    public authorizationPersonal(login: string, password: string): Observable<any> {
        const body = {
            login,
            password,
        };

        return this.httpService.post('authPersonal', body);
    };

    // Метод для авторизации студента
    public authorizationStudent(login: string, password: string): Observable<any> {
        const body = {
            login,
            password,
        };

        return this.httpService.post('authStudent', body);
    };
};