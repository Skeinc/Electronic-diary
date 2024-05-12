import { Injectable } from "@angular/core";
import { HttpService } from "@core/services/http.service";
import { Observable } from "rxjs";

@Injectable({
    providedIn: 'root',
})
export class RegistrationService {
    constructor (
        private httpService: HttpService,
    ) {}

    // Метод для регистрации пользователя
    public registrationUser(request: any): Observable<any> {
        const body = request;

        return this.httpService.post('registration', body);
    };
};