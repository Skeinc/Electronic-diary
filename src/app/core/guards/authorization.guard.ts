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
            return true;
        } 
        else {
            // Пользователь не авторизован, перенаправляем на страницу входа
            this.router.navigate(['/login']);

            return false;
        };
    };
};