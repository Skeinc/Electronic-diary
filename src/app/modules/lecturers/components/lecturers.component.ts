import { Component, HostListener, OnInit } from "@angular/core";

@Component({
    selector: 'app-lecturers',
    templateUrl: './lecturers.component.html',
    styleUrl: './lecturers.component.scss',
})
export class LecturersComponent implements OnInit{
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
    dialogLecturerPassword: string = '';

    // Сообщение ошибки для окна добавления преподавателя
    dialogErrorMessage: string | null = null;

    // Mocks для таблицы преподаватели
    lecturersMocks = [
        {
            id: 1,
            surname: 'Иванова',
            name: 'Мария',
            patronymic: 'Ивановна',
            email: 'ivanova@gmail.com',
            phone: '+79901002030',
            password: 'mivanova',
        },
        {
            id: 2,
            surname: 'Сидорова',
            name: 'Жанна',
            patronymic: 'Владимировна',
            email: 'sidorova@gmail.com',
            phone: '+79903009040',
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
        this.setConfigurationTable()
    }

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