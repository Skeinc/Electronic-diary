import { ChangeDetectorRef, Component, HostListener, OnInit } from "@angular/core";
import { SubjectsService } from "../services/subjects.service";
import { LoggerService } from "@shared/services/logger/logger.service";
import { GroupsService } from "@modules/groups/services/groups.service";
import { LecturersService } from "@modules/lecturers/services/lecturers.service";
import { LecturerModel } from "@shared/models/lecturer.model";
import { GroupModel } from "@shared/models/group.model";
import { SubjectModel } from "@shared/models/subject.model";
import { AddSubjectRequestInterface, EditSubjectRequestInterface } from "@shared/interfaces/backend/subjects/subject.interface";
import { AvaliableGroupsInterface, AvaliableLecturersInterface } from "@shared/interfaces/subjects/subject.interface";

@Component({
    selector: 'app-subjects',
    templateUrl: './subjects.component.html',
    styleUrl: './subjects.component.scss',
})
export class SubjectsComponent implements OnInit {
    constructor(
        private lecturersService: LecturersService,
        private subjectsService: SubjectsService,
        private groupsService: GroupsService,
        private loggerService: LoggerService,
        private cdr: ChangeDetectorRef,
    ) { }

    // Определяет открыта ли меню
    isNavigationOpened: boolean = false;

    // Переменная, контролирующая видимость окна подверждения
    isConfirmDialogVisible: boolean = false;

    // Переменная, контролирующая видимость окна добавления предмета
    isAddingSubjectDialogVisible: boolean = false;

    // Переменная, контролирующая видимость окна изменения предмета
    isEditingSubjectDialogVisible: boolean = false;

    // Высота скрола таблицы
    tableScrollHeight: number = 0;

    // Доступные колонки таблицы
    tableColumns: any = null;

    // Данные для окна добавления предмета
    dialogSubjectName: string = '';
    dialogSubjectCode: string = '';

    // Данные для окна редактирования предмета
    dialogEditSubjectID: number | null = null;
    dialogEditSubjectName: string = '';
    dialogEditSubjectCode: string = '';

    // Сообщение об ошибке в окне добавления предмета
    dialogErrorMessage: string | null = null;

    // Сообщение ошибки для окна изменения предмета
    dialogEditErrorMessage: string | null = null;

    // Выбранные преподаватели для окна добавления предмета
    addSubjectSelectedLecturers: LecturerModel[] | null = null;

    // Выбранные группы для окна добавления предмета
    addSubjectSelectedGroups: GroupModel[] | null = null;

    // Выбранные преподаватели для окна редактирования предмета
    editSubjectSelectedLecturers: LecturerModel[] | null = null;

    // Выбранные группы для окна редактирования предмета
    editSubjectSelectedGroups: GroupModel[] | null = null;

    // Переменная, обозначающая статус загрузки данных
    isDataLoading: boolean = true;

    // Данные по предметам
    subjectsData: SubjectModel[] | null = null;

    // Данные по преподавателям
    lecturersData: LecturerModel[] | null = null;

    // Данные по доступным преподавателям
    avaliableLecturers: AvaliableLecturersInterface[] | null = null;

    // Данные по группам
    groupsData: GroupModel[] | null = null;

    // Данные по доступным группам
    avaliableGroups: AvaliableGroupsInterface[] | null = null;

    @HostListener('window:resize', ['$event'])
    onResize(event: any): void {
        // Вызываем метод для обновления высоты скрола таблицы
        this.updateScrollHeight();
    };

    ngOnInit(): void {
        // Установка высоты скрола таблицы
        this.updateScrollHeight();

        // Установка конфигурации таблицы
        this.setConfigurationTable();

        // Получаем данные по предметам
        this.getAllSubjects();

        // Получаем всех преподавателей
        this.getAllLecturers();

        // Получаем все группы
        this.getAllGroups();
    };

    // Метод для получения всех предметов
    getAllSubjects(): void {
        this.isDataLoading = true;

        this.subjectsService.getAllSubjects().subscribe({
            next: (response: SubjectModel[]) => {
                this.subjectsData = response;

                this.loggerService.message('backend', 'All subjects information was received', response);

                this.cdr.detectChanges();
            },
            error: (err) => {
                this.loggerService.message('error', 'Error with get all subjects information', err);

                this.isDataLoading = false;

                this.cdr.detectChanges();
            },
            complete: () => {
                this.isDataLoading = false;

                this.cdr.detectChanges();
            },
        });
    };

    // Метод для получения всех преподавателей
    getAllLecturers(): void {
        this.isDataLoading = true;

        this.lecturersService.getAllLecturers().subscribe({
            next: (response: LecturerModel[]) => {
                this.lecturersData = response;

                this.formatBackendLecturersData();

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

    // Метод для получения всех групп
    getAllGroups(): void {
        this.isDataLoading = true;

        this.groupsService.getAllGroups().subscribe({
            next: (response: GroupModel[]) => {
                this.groupsData = response;

                this.formatBackendGroupsData();

                this.loggerService.message('backend', 'All groups information was received', response);

                this.cdr.detectChanges();
            },
            error: (err) => {
                this.loggerService.message('error', 'Error with get all groups information', err);

                this.isDataLoading = false;

                this.cdr.detectChanges();
            },
            complete: () => {
                this.isDataLoading = false;

                this.cdr.detectChanges();
            },
        });
    };

    // Метод для добавления предмета
    addSubject(): void {
        this.dialogErrorMessage = '';

        if (this.validateAddingSubjectData()) {
            this.isDataLoading = true;

            // Формируем тело запроса
            const request: AddSubjectRequestInterface = {
                name: this.dialogSubjectName,
                code: this.dialogSubjectCode,
                lecturersId: [],
                groupsId: [],
            };

            this.addSubjectSelectedLecturers?.forEach((item) => {
                request.lecturersId.push(item.id!);
            });

            this.addSubjectSelectedGroups?.forEach((item) => {
                request.groupsId.push(item.id!);
            });

            this.subjectsService.addSubject(request).subscribe({
                next: (response) => {
                    this.getAllSubjects();

                    this.toggleAddingSubjectDialogVisible();

                    this.loggerService.message('backend', `Subject with name = ${request.name} was added`);

                    this.cdr.detectChanges();
                },
                error: (err) => {
                    this.loggerService.message('error', 'Error with add subject', err);

                    this.dialogErrorMessage = 'Не удалось добавить предмет';

                    this.isDataLoading = false;

                    this.cdr.detectChanges();
                },
                complete: () => {
                    this.isDataLoading = false;

                    this.cdr.detectChanges();
                },
            });
        }
        else {
            this.dialogErrorMessage = 'Заполните данные';

            this.loggerService.message('error', 'Error with validate data');
        };
    };

    // Метод для редактирования данных предмета
    editSubject(id: number): void {
        this.dialogEditErrorMessage = '';

        if(this.validateEditingSubjectData()) {
            this.isDataLoading = true;

            // Формируем тело запроса
            const request: EditSubjectRequestInterface = {
                id: id,
                name: this.dialogSubjectName,
                code: this.dialogSubjectCode,
                lecturersId: [],
                groupsId: [],
            };

            this.editSubjectSelectedLecturers?.forEach((item) => {
                request.lecturersId.push(item.id!);
            });

            this.editSubjectSelectedGroups?.forEach((item) => {
                request.groupsId.push(item.id!);
            });

            this.subjectsService.editSubject(request).subscribe({
                next: (response) => {
                    this.getAllSubjects();

                    this.loggerService.message('backend', `Subject with id = ${request.id} was edit`);

                    this.cdr.detectChanges();
                },
                error: (err) => {
                    this.loggerService.message('error', 'Error with edit subject', err);

                    this.isDataLoading = false;

                    this.cdr.detectChanges();
                },
                complete: () => {
                    this.isDataLoading = false;

                    this.cdr.detectChanges();
                },
            });
        }
        else {
            this.dialogErrorMessage = 'Заполните данные';

            this.loggerService.message('error', 'Error with validate data');
        }
    }

    // Метод для валидации данных добавления предмета
    validateAddingSubjectData(): boolean {
        if (this.dialogSubjectName.length === 0 || this.dialogSubjectCode.length === 0 || this.addSubjectSelectedLecturers?.length === 0 || this.addSubjectSelectedGroups?.length === 0) {
            return false;
        };

        return true;
    };

    // Метод для валидации данных редактирования предмета
    validateEditingSubjectData(): boolean {
        if(this.dialogEditSubjectName.length === 0 || this.dialogEditSubjectCode.length === 0 || this.editSubjectSelectedLecturers?.length === 0 || this.editSubjectSelectedGroups?.length === 0) {
            return false;
        };

        return true;
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
                label: 'Наименование',
                field: 'name',
            },
            {
                label: 'Кодировка',
                field: 'code',
            },
            {
                label: 'Преподаватели',
                field: 'lecturers'
            },
            {
                label: 'Группы',
                field: 'groups',
            },
        ];
    };

    // Метод для форматирования данных преподавателей с бекенда
    formatBackendLecturersData(): void {
        this.lecturersData?.forEach((item) => {
            const id = item.id;
            const name = item.surname + ' ' + item.name + ' ' + item.patronymic;
            const lecturer: AvaliableLecturersInterface = {
                id: id!,
                name: name,
            };

            if(!this.avaliableLecturers) {
                this.avaliableLecturers = [];
            }

            this.avaliableLecturers.push(lecturer);
        });

        console.log(this.avaliableLecturers);
    };

    // Метод для форматирования данных групп с бекенда
    formatBackendGroupsData(): void {
        this.groupsData?.forEach((item) => {
            const id = item.id;
            const name = item.nameShortly;
            const group: AvaliableGroupsInterface = {
                id: id!,
                name: name!,
            };

            if(!this.avaliableGroups) {
                this.avaliableGroups = [];
            }

            this.avaliableGroups?.push(group);
        });
    };

    // Метод для форматирования данных для таблицы
    formatTableData(data: any, key?: string): string {
        if (typeof data === 'object' && key) {
            if (Array.isArray(data)) {
                let formattedString: string = '';

                for (let index = 0; index < data.length; index++) {
                    if (index === data.length - 1) {
                        formattedString += data[index][key];
                    }
                    else {
                        formattedString += data[index][key] + ', ';
                    };
                };

                return formattedString;
            };

            return data[key];
        };

        return data;
    };

    // Метод для смены видимости окна добавления предмета
    toggleAddingSubjectDialogVisible(): void {
        this.isAddingSubjectDialogVisible = !this.isAddingSubjectDialogVisible;

        this.dialogSubjectName = '';
        this.dialogSubjectCode = '';
        this.addSubjectSelectedLecturers = [];
        this.addSubjectSelectedGroups = [];
    };

    // Метод для смены видимости окна изменения предмета
    toggleEditingSubjectDialogVisible(data: any): void {
        this.dialogEditSubjectID = data.id;
        this.dialogEditSubjectName = data.name;
        this.dialogEditSubjectCode = data.code;
        this.editSubjectSelectedLecturers = data.lecturers;
        this.editSubjectSelectedGroups = data.groups;

        this.isEditingSubjectDialogVisible = !this.isEditingSubjectDialogVisible;
    };

    // Метод для смены видимости окна подверждения
    toggleConfirmDialogVisible(): void {
        this.isConfirmDialogVisible = !this.isConfirmDialogVisible;
    };

    // Логика для события "Далее"
    handleConfirmDialogNext(): void {
        this.toggleConfirmDialogVisible();
    };

    // Логика для события "Отмена"
    handleConfirmDialogCancel(): void {
        this.toggleConfirmDialogVisible();
    };
}