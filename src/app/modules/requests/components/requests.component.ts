import { ChangeDetectorRef, Component, HostListener, OnInit } from "@angular/core";
import { RequestsService } from "../services/requests.service";
import { LoggerService } from "@shared/services/logger/logger.service";
import { StudentModel } from "@shared/models/student.model";

@Component({
    selector: 'app-requests',
    templateUrl: './requests.component.html',
    styleUrl: './requests.component.scss',
})
export class RequestsComponent implements OnInit {
    constructor (
        private requestsService: RequestsService,
        private loggerService: LoggerService,
        private cdr: ChangeDetectorRef,
    ) {}

    // Определяет открыта ли меню
    isNavigationOpened: boolean = false;

    // Переменная, контролирующая видимость окна подверждения заявки
    isConfirmDialogAcceptVisible: boolean = false;

    // Переменная, контролирующая видимость окна отклонения заявки
    isConfirmDialogCancelVisible: boolean = false;

    // Высота скрола таблицы
    tableScrollHeight: number = 0;

    // Доступные колонки таблицы
    tableColumns: any = null;

    // Переменная, обозначающая статус загрузки данных
    isDataLoading: boolean = false;

    // Данные по заявкам
    requestsData: StudentModel[] | null = null;

    // ID элементы с которым хотят произвести операцию
    requestID: number | null = null;

    @HostListener('window:resize', ['$event'])
    onResize(event: any): void {
        // Вызываем метод для обновления высоты скрола таблицы
        this.updateScrollHeight();
    }


    ngOnInit(): void {
        // Установка высоты скрола таблицы
        this.updateScrollHeight();

        // Установка конфигурации таблицы
        this.setConfigurationTable();

        // Получаем данные по заявкам
        this.getAllRequests();
    }

    // Метод для получения данных о заявок
    getAllRequests(): void {
        this.isDataLoading = true;

        this.requestsService.getAllRequests().subscribe({
            next: (response: StudentModel[]) => {
                this.requestsData = response;

                this.loggerService.message('backend', 'Requests data was received');
            },
            error: (err) => {
                this.loggerService.message('error', 'Error with get all requests', err);

                this.isDataLoading = false;

                this.cdr.detectChanges();
            },
            complete: () => {
                this.isDataLoading = false;

                this.cdr.detectChanges();
            },
        });
    };

    // Метод для принятия заявки
    acceptRequest(id: number): void {
        this.isDataLoading = true;

        this.requestsService.acceptRequest(id).subscribe({
            next: (response: any) => {
                this.getAllRequests();

                this.loggerService.message('backend', `Request with id = ${id} was accepted`);
            },
            error: (err) => {
                this.loggerService.message('error', 'Error with accept request', err);

                this.isDataLoading = false;

                this.cdr.detectChanges();
            },
            complete: () => {
                this.isDataLoading = false;

                this.cdr.detectChanges();
            },
        });
    };

    // Метод для отклонения заявки
    declineRequest(id: number): void {
        this.isDataLoading = true;

        this.requestsService.declineRequest(id).subscribe({
            next: (response: any) => {
                this.getAllRequests();

                this.loggerService.message('backend', `Request with id = ${id} was decline`);
            },
            error: (err) => {
                this.loggerService.message('error', 'Error with decline request', err);

                this.isDataLoading = false;

                this.cdr.detectChanges();
            },
            complete: () => {
                this.isDataLoading = false;

                this.cdr.detectChanges();
            },
        });
    };

    // Метод скрывает/открывает меню
    onNavigationOpenedChange(isOpened: boolean) {
        this.isNavigationOpened = isOpened;
    }

    // Метод для обновления высоты скрола таблицы
    updateScrollHeight(): void {
        this.tableScrollHeight = window.innerHeight - 80 - 40 - 40 - 60 - 40;
    }

    // Установка конфигурации таблицы
    setConfigurationTable(): void {
        this.tableColumns = [
            {
                label: 'ID',
                field: 'id'
            },
            {
                label: 'Фамилия',
                field: 'surname'
            },
            {
                label: 'Имя',
                field: 'name'
            },
            {
                label: 'Отчество',
                field: 'patronymic'
            },
            {
                label: 'E-mail',
                field: 'email'
            },
            {
                label: 'Телефон',
                field: 'phone'
            },
            {
                label: 'Группа',
                field: 'groupName',
            },
            {
                label: 'Курс',
                field: 'course',
            }
        ];
    };

    // Метод для смены видимости окна подтверждения заявки
    toggleConfirmDialogAcceptVisible(id?: number): void {
        this.isConfirmDialogAcceptVisible = !this.isConfirmDialogAcceptVisible;

        if(id) {
            this.requestID = id;
        }
    }

    // Логика для события "Далее" окна подтверждения заявки
    handleConfirmDialogAcceptNext(): void {
        this.toggleConfirmDialogAcceptVisible();

        if(this.requestID) {
            this.acceptRequest(this.requestID);
        }
    }

    // Логика для события "Отмена" окна подтверждения заявки
    handleConfirmDialogAcceptCancel(): void {
        this.toggleConfirmDialogAcceptVisible();
    }

    // Метод для смены видимости окна отклонения заявки
    toggleConfirmDialogCancelVisible(id?: number): void {
        this.isConfirmDialogCancelVisible = !this.isConfirmDialogCancelVisible;

        if(id) {
            this.requestID = id;
        }
    }

    // Логика для события "Далее" окна отклонения заявки
    handleConfirmDialogCancelNext(): void {
        this.toggleConfirmDialogCancelVisible();

        if(this.requestID) {
            this.declineRequest(this.requestID);
        }
    }

    // Логика для события "Отмена" окна отклонения заявки
    handleConfirmDialogCancelCancel(): void {
        this.toggleConfirmDialogCancelVisible();
    }
}