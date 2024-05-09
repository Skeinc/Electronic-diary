import { ChangeDetectorRef, Component, HostListener, OnInit } from "@angular/core";
import { LecturerModel } from "@shared/models/lecturer.model";
import { LecturersService } from "../services/lecturers.service";
import { LoggerService } from "@shared/services/logger/logger.service";

@Component({
    selector: 'app-lecturers',
    templateUrl: './lecturers.component.html',
    styleUrl: './lecturers.component.scss',
})
export class LecturersComponent implements OnInit{
    constructor(
        private lecturersService: LecturersService,
        private loggerService: LoggerService,
        private cdr: ChangeDetectorRef,
    ) { }

    // Определяет открыта ли меню
    isNavigationOpened: boolean = false;

    // Переменная, контролирующая видимость окна подверждения
    isConfirmDialogVisible: boolean = false;

    // Переменная, контролирующая видимость окна добавления преподавателя
    isAddingLecturerDialogVisible: boolean = false;

    // Высота скрола таблицы
    tableScrollHeight: number = 0;

    // Доступные колонки таблицы
    tableColumns: any = null; 

    // Данные для окна добавления преподавателя
    dialogLecturerSurname: string = '';
    dialogLecturerName: string = '';
    dialogLecturerPatronymic: string = '';
    dialogLecturerEmail: string = '';
    dialogLecturerPhone: string = '';
    dialogLecturerLogin: string = '';
    dialogLecturerPassword: string = '';

    // Сообщение ошибки для окна добавления преподавателя
    dialogErrorMessage: string | null = null;

    // Переменная обозначающая статус загрузки данных
    isDataLoading: boolean = false;

    // Данные о преподавателях
    lecturersData: LecturerModel[] | null = null;

    // Mocks для таблицы преподаватели
    lecturersMocks = [
        {
            id: 1,
            surname: 'Иванова',
            name: 'Мария',
            patronymic: 'Ивановна',
            email: 'ivanova@gmail.com',
            phone: '+79901002030',
            login: 'test',
            password: 'mivanova',
        },
        {
            id: 2,
            surname: 'Сидорова',
            name: 'Жанна',
            patronymic: 'Владимировна',
            email: 'sidorova@gmail.com',
            phone: '+79903009040',
            login: 'test',
            password: 'jsidorova',
        },
    ];

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

        // Получаем информацию о преподавателях
        this.getAllLecturersData();
    }

    // Метод для получения всех преподавателей
    getAllLecturersData(): void {
        this.isDataLoading = true;

        this.lecturersService.getAllLecturers().subscribe({
            next: (response: LecturerModel[]) => {
                this.lecturersData = response;

                this.loggerService.message('backend', 'All lecturers information was received', response);
            },
            error: (err) => {
                this.loggerService.message('error', 'Error with get all lecturers information', err);

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
                label: 'Логин',
                field: 'login',
            },
            {
                label: 'Пароль',
                field: 'password'
            },
        ];
    }

    // Метод для смены видимости окна добавления преподавателя
    toggleAddingLecturerDialogVisible(): void {
        this.isAddingLecturerDialogVisible = !this.isAddingLecturerDialogVisible;
    }

    // Метод для смены видимости окна подверждения
    toggleConfirmDialogVisible(): void {
        this.isConfirmDialogVisible = !this.isConfirmDialogVisible;
    }

    // Логика для события "Далее"
    handleConfirmDialogNext(): void {
        this.toggleConfirmDialogVisible();
    }

    // Логика для события "Отмена"
    handleConfirmDialogCancel(): void {
        this.toggleConfirmDialogVisible();
    }
}