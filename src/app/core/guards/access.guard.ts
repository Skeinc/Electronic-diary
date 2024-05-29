import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { PersonalService } from '@modules/personal/services/personal.service';

@Injectable({
    providedIn: 'root'
})
export class AccessGuard implements CanActivate {
    constructor(
        private personalService: PersonalService,
        private router: Router
    ) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        const userRole = this.personalService.getUser()?.role;

        // Проверяем роль пользователя и разрешаем или запрещаем доступ в зависимости от нее
        switch (userRole) {
            case '1': // Супер-администратор
                return true;
            case '2': // Администратор
                return true; // Разрешаем доступ ко всем страницам
            case '3': // Преподаватель
                // Разрешаем доступ только к персоналу, расписанию
                return state.url.includes('personal') || state.url.includes('schedule') || state.url.includes('subject-page');
            case '4': // Студент
                // Разрешаем доступ только к персоналу и расписанию
                return state.url.includes('personal') || state.url.includes('schedule');
            default:
                // В случае неопределенной роли перенаправляем на страницу "undefined"
                this.router.navigate(['/undefined']);
                return false;
        }
    }
}