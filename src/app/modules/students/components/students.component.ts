import { ChangeDetectorRef, Component, HostListener, OnInit } from "@angular/core";
import { StudentsService } from "../services/students.service";
import { LoggerService } from "@shared/services/logger/logger.service";
import { StudentModel } from "@shared/models/student.model";

@Component({
    selector: 'app-students',
    templateUrl: './students.component.html',
    styleUrl: './students.component.scss',
})
export class StudentsComponent implements OnInit{
    constructor(
        private studentsService: StudentsService,
        private loggerService: LoggerService,
        private cdr: ChangeDetectorRef,
    ) { }

    // Определяет открыта ли меню
    isNavigationOpened: boolean = false;

    // Переменная, контролирующая видимость окна подверждения
    isConfirmDialogVisible: boolean = false;

    // Высота скрола таблицы
    tableScrollHeight: number = 0;

    // Доступные колонки таблицы
    tableColumns: any = null; 

    // Переменная, обозначающая статус загрузки данных
    isDataLoading: boolean = false;

    // Данные о студентах
    studentsData: StudentModel[] | null = null;

    // Переменная, хранящая ID студента, которого пытаются удалить
    deleteUserID: number | null = null;

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

        // Получаем информацию о всех студентах
        this.getAllStudents();
    }

    // Метод для получения всех студентов
    getAllStudents(): void {
        this.isDataLoading = true;

        this.studentsService.getAllStudents().subscribe({
            next: (response: StudentModel[]) => {
                this.studentsData = response;

                this.loggerService.message('backend', 'All students information was received', response);

                this.cdr.detectChanges();
            },
            error: (err) => {
                this.loggerService.message('error', 'Error with get all students information', err);

                this.isDataLoading = false;

                this.cdr.detectChanges();
            },
            complete: () => {
                this.isDataLoading = false;

                this.cdr.detectChanges();
            },
        });
    };

    // Метод для удаления студента по ID
    deleteStudentByID(id: number): void {
        this.isDataLoading = true;

        this.studentsService.deleteStudentByID(id).subscribe({
            next: (response: any) => {
                this.getAllStudents();

                this.loggerService.message('backend', `Student with ID = ${id} was deleted`, response);
            },
            error: (err) => {
                this.loggerService.message('error', 'Error with delete student by ID', err);

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
                field: 'password',
            },
        ];
    }

    // Метод для смены видимости окна подверждения
    toggleConfirmDialogVisible(id?: number): void {
        this.isConfirmDialogVisible = !this.isConfirmDialogVisible;

        if(id) {
            this.deleteUserID = id;
        }
    }

    // Логика для события "Далее"
    handleConfirmDialogNext(): void {
        this.toggleConfirmDialogVisible();

        if(this.deleteUserID) {
            this.deleteStudentByID(this.deleteUserID);
        }
    }

    // Логика для события "Отмена"
    handleConfirmDialogCancel(): void {
        this.toggleConfirmDialogVisible();
    }
}