import { ChangeDetectorRef, Component, HostListener, OnInit } from "@angular/core";
import { LecturerModel } from "@shared/models/lecturer.model";
import { LecturersService } from "../services/lecturers.service";
import { LoggerService } from "@shared/services/logger/logger.service";
import { convertPhoneNumber } from "@shared/utilities/converPhoneNumber.util";

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

    // Переменная, хранящая ID преподавателя, которого пытаются удалить
    deleteLecturerID: number | null = null;

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

                this.cdr.detectChanges();
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

    // Метод для удаления преподавателя по ID
    deleteLecturerByID(id: number): void {
        this.isDataLoading = true;

        this.lecturersService.deleteLecturerByID(id).subscribe({
            next: (response: any) => {
                this.getAllLecturersData();

                this.loggerService.message('backend', `Lecturer with ID = ${id} was deleted`, response);
            },
            error: (err) => {
                this.loggerService.message('error', 'Error with delete lecturer by ID', err);

                this.isDataLoading = false;

                this.cdr.detectChanges();
            },
            complete: () => {
                this.isDataLoading = false;

                this.cdr.detectChanges();
            },
        });
    };

    // Метод для валидации добавления преподавателя
    validateLecturerData(): boolean {
        if(this.dialogLecturerSurname.length === 0 || this.dialogLecturerName.length === 0 || this.dialogLecturerPatronymic.length === 0 || this.dialogLecturerLogin.length === 0 || this.dialogLecturerPassword.length === 0  || this.dialogLecturerPhone.length === 0 || this.dialogLecturerEmail.length === 0) {
            return false;
        }

        return true;
    };

    // Метод для добавления преподавателя
    addLecturer(): void {
        if(this.validateLecturerData()) {
            this.isDataLoading = true;

            // Формируем тело запроса
            const request: LecturerModel = {
                surname: this.dialogLecturerSurname,
                name: this.dialogLecturerName,
                patronymic: this.dialogLecturerPatronymic,
                email: this.dialogLecturerEmail,
                phone: convertPhoneNumber(this.dialogLecturerPhone),
                login: this.dialogLecturerLogin,
                password: this.dialogLecturerPassword,
            };

            this.lecturersService.addLecturer(request).subscribe({
                next: (response: any) => {
                    this.getAllLecturersData();

                    this.loggerService.message('backend', `Lecturer was added`, response);
                },
                error: (err) => {
                    this.loggerService.message('error', 'Error with add lecturer', err);

                    this.isDataLoading = false;

                    this.cdr.detectChanges();
                },
                complete: () => {
                    this.isDataLoading = false;

                    this.toggleAddingLecturerDialogVisible();

                    this.cdr.detectChanges();
                },
            });
        }
        else {
            this.dialogErrorMessage = 'Заполните все поля';

            this.loggerService.message('error', 'Error with validation lecturer data');
        }
    };

    // Метод скрывает/открывает меню
    onNavigationOpenedChange(isOpened: boolean) {
        this.isNavigationOpened = isOpened;
    };

    // Метод для обновления высоты скрола таблицы
    updateScrollHeight(): void {
        this.tableScrollHeight = window.innerHeight - 80 - 40 - 40 - 60 - 40;
    };

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
    };

    // Метод для смены видимости окна добавления преподавателя
    toggleAddingLecturerDialogVisible(): void {
        this.isAddingLecturerDialogVisible = !this.isAddingLecturerDialogVisible;

        this.dialogLecturerSurname = '';
        this.dialogLecturerName = '';
        this.dialogLecturerPatronymic = '';
        this.dialogLecturerEmail = '';
        this.dialogLecturerPhone = '';
        this.dialogLecturerLogin = '';
        this.dialogLecturerPassword = '';
    };

    // Метод для смены видимости окна подверждения
    toggleConfirmDialogVisible(id?: number): void {
        this.isConfirmDialogVisible = !this.isConfirmDialogVisible;

        if(id) {
            this.deleteLecturerID = id;
        }
    };

    // Логика для события "Далее"
    handleConfirmDialogNext(): void {
        this.toggleConfirmDialogVisible();

        if(this.deleteLecturerID) {
            this.deleteLecturerByID(this.deleteLecturerID);
        };
    };

    // Логика для события "Отмена"
    handleConfirmDialogCancel(): void {
        this.toggleConfirmDialogVisible();
    };
}