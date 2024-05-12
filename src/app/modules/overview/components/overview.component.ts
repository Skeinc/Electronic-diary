import { Component } from "@angular/core";
import { Router } from "@angular/router";

@Component({
    selector: 'app-overview',
    templateUrl: './overview.component.html',
    styleUrl: './overview.component.scss',
})
export class OverviewComponent {
    constructor (
        private router: Router,
    ) {}

    // Переадресация на страницу авторизации
    navigateToAuthorization(): void {
        this.router.navigateByUrl('/login');
    };

    // Переадресация на страницу с расписанием
    navigateToSchedule(): void {
        this.router.navigateByUrl('schedule');
    };
}