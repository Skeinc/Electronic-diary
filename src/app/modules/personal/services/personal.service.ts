import { HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { HttpService } from "@core/services/http.service";
import { UserModel } from "@shared/models/user.model";
import { Observable, Subject } from "rxjs";

@Injectable({
    providedIn: 'root',
})
export class PersonalService {
    constructor(
        private httpService: HttpService,
    ) {}

    // Переменная, которая хранит данные о пользователе
    private user: UserModel | null = null;

    onUserUpdate$: Subject<UserModel | null> = new Subject<UserModel | null>()

    // Метод для установки данных о пользователе
    public setUser(user: UserModel | null): void {
        this.user = user;

        this.onUserUpdate$.next(user);
    };

    // Метод для получения данных о пользователе
    public getUser(): UserModel | null {
        return this.user;
    };

    // Метод для получения данных о пользователе
    public getUserInformation(id: number): Observable<UserModel> {
        const body: HttpParams = new HttpParams().set('id', id);

        return this.httpService.get('user', body);
    };

    // Метод для обновления данных о пользователе
    public updateUserInformation(user: UserModel): Observable<any> {
        const body = user;

        return this.httpService.put('user/UpdateUser', body);
    };

    // Метод для выхода пользователя
    public logout(): Observable<any> {
        return this.httpService.post('user/logout');
    };
}