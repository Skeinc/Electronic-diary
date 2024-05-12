import { Injectable } from "@angular/core";
import { CanActivate, Router } from "@angular/router";
import { PersonalService } from "@modules/personal/services/personal.service";

@Injectable({
    providedIn: 'root',
})
export class AuthGuard implements CanActivate {
    constructor(
        private personalService: PersonalService,
        private router: Router,
    ) {}

    canActivate(): boolean {
        const user = this.personalService.getUser();

        if (user) {
            switch (user.role) {
                case '1':
                    // Супер-администратору разрешаем доступ ко всем роутам
                    return true;
                case '2':
                    // Администратору разрешаем доступ ко всем роутам
                    return true;
                case '3':
                    // Преподавателю разрешаем доступ к указанным роутам
                    this.router.navigate(['/personal']);

                    return false;
                case '4':
                    // Студенту разрешаем доступ к указанным роутам
                    if(user.accStatus === 1) {
                        this.router.navigate(['/personal']);

                        return false;
                    }
                    else {
                        this.router.navigate(['/waiting']);

                        return false;
                    }

                default:
                    // Если роль неизвестна или неопределена, перенаправляем на страницу входа
                    this.router.navigate(['/login']);

                    return false;
            }
        } 
        else {
            // Пользователь не авторизован, перенаправляем на страницу входа
            this.router.navigate(['/login']);

            return false;
        };
    };
};