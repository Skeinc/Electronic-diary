import { ChangeDetectorRef, Component } from "@angular/core";
import { LoggerService } from "@shared/services/logger/logger.service";

@Component({
    selector: 'app-attendance',
    templateUrl: './attendance.component.html',
    styleUrl: './attendance.component.scss',
})
export class AttendanceComponent {
    constructor (
        private loggerService: LoggerService,
        private cdr: ChangeDetectorRef,
    ) {}

    // Определяет открыта ли меню
    isNavigationOpened: boolean = false;

    // Переменная, обозначающая статус загрузки данных
    isDataLoading: boolean = false;

    // Метод скрывает/открывает меню
    onNavigationOpenedChange(isOpened: boolean) {
        this.isNavigationOpened = isOpened;
    }
}