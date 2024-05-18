import { ChangeDetectorRef, Component, HostListener, OnInit } from "@angular/core";
import { generateRandomCode } from "@shared/utilities/generateRandomCode.util";
import { GroupsService } from "../services/groups.service";
import { LoggerService } from "@shared/services/logger/logger.service";
import { GroupModel } from "@shared/models/group.model";
import { LecturersService } from "@modules/lecturers/services/lecturers.service";
import { SubjectModel } from "@shared/models/subject.model";
import { SubjectsService } from "@modules/subjects/services/subjects.service";
import { ScheduleMocks } from "@modules/schedule/mocks/schedule.mocks";
import { ScheduleModel } from "@shared/models/schedule.model";
import { LecturerShortInformationInterface } from "@shared/interfaces/lecturers/lecturer.interface";
import { ScheduleService } from "@modules/schedule/services/schedule.service";

@Component({
    selector: 'app-groups',
    templateUrl: './groups.component.html',
    styleUrl: './groups.component.scss',
})
export class GroupsComponent implements OnInit {
    constructor(
        private lecturersService: LecturersService,
        private subjectsService: SubjectsService,
        private scheduleService: ScheduleService,
        private groupsService: GroupsService,
        private loggerService: LoggerService,
        private cdr: ChangeDetectorRef,
    ) { }

    // Определяет открыта ли меню
    isNavigationOpened: boolean = false;

    // Переменная, контролирующая видимость окна подверждения
    isConfirmDialogVisible: boolean = false;

    // Переменная, контролирующая видимость окна добавления группы
    isAddingGroupDialogVisible: boolean = false;

    // Переменная, контролирующая видимость окна изменения группы
    isEditingGroupDialogVisible: boolean = false;

    // Переменная, контролирующая видимость окна редактирования расписания группы
    isEditingScheduleDialogVisible: boolean = false;

    // Переменная, контролирующая возможность редактирования расписания
    isEditingSchedule: boolean = false;

    // Высота скрола таблицы
    tableScrollHeight: number = 0;

    // Доступные колонки таблицы
    tableColumns: any = null;

    // Данные для окна добавления группы
    dialogGroupName: string = '';
    dialogGroupShortName: string = '';
    dialogGroupNumber: string = '';
    dialogGroupCourse: string = '';
    dialogGroupCode: string = '';

    // Данные для окна изменения группы
    dialogEditGroupName: string = '';
    dialogEditGroupShortName: string = '';
    dialogEditGroupNumber: string = '';
    dialogEditGroupCourse: string = '';

    // Сообщение ошибки для окна добавления группы
    dialogErrorMessage: string | null = null;

    // Сообщение ошибки для окна изменения группы
    dialogEditErrorMessage: string | null = null;

    // Данные для расписания группы
    groupSchedule: ScheduleModel = ScheduleMocks;

    // Данные о группах
    groupsData: GroupModel[] | null = null;

    // Данные о кодировок групп
    groupsCodeData: string[] | null = null;

    // Переменная, обозначающая статус загрузки данных
    isDataLoading: boolean = false;

    // Переменная, хранящая ID группы, которую пытаются удалить
    deleteGroupID: number | null = null;

    // Переменная, хранящая ID группы, которую пытаются редактировать
    editGroupID: number | null = null;

    // Доступные преподаватели
    avaliableLecturers: LecturerShortInformationInterface[] | null = null;

    // Выбранный преподаватель
    selectedLecturer: LecturerShortInformationInterface | null = null;

    // Доступные предметы
    avaliableSubjects: SubjectModel[] | null = null;

    // Выбранный предмет
    selectedSubject: SubjectModel | null = null;

    // ID группы, у которой пытаются изменить расписание
    scheduleChangeGroupID: number | null = null;

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

        // Получаем данные о группах
        this.getAllGroupsData();

        // Получаем данные о доступных преподавателях
        this.getShortLecturersInformation();

        // Получаем данные о доступных предметах
        this.getAllSubjects();
    }

    // Метод для получения всех групп
    getAllGroupsData(): void {
        this.isDataLoading = true;

        this.groupsService.getAllGroups().subscribe({
            next: (response: GroupModel[]) => {
                this.groupsData = response;

                this.loggerService.message('backend', 'Groups data was received', response);
            },
            error: (err) => {
                this.loggerService.message('error', 'Error with get groups data', err);

                this.isDataLoading = false;

                this.cdr.detectChanges();
            },
            complete: () => {
                this.isDataLoading = false;

                this.cdr.detectChanges();
            },
        });
    };

    // Метод для получения всех кодировок
    getAllGroupCodesData(): void {
        this.isDataLoading = true;

        this.groupsService.getAllGroupCodes().subscribe({
            next: (response: string[]) => {
                this.groupsCodeData = response;

                this.loggerService.message('backend', 'Group codes data was received', response);
            },
            error: (err) => {
                this.loggerService.message('error', 'Error with get group codes data', err);

                this.isDataLoading = false;

                this.cdr.detectChanges();
            },
            complete: () => {
                this.isDataLoading = false;

                this.generateGroupCode();

                this.cdr.detectChanges();
            },
        });
    };

    // Метод для добавления группы
    async addGroup(): Promise<void> {
        if (this.validateAddingGroupData()) {
            this.isDataLoading = true;

            // Формируем тело запроса
            const request: GroupModel = {
                name: this.dialogGroupName,
                numberSpec: this.dialogGroupNumber,
                nameShortly: this.dialogGroupShortName,
                course: Number(this.dialogGroupCourse),
                coding: this.dialogGroupCode,
            };

            this.groupsService.addGroup(request).subscribe({
                next: (response: any) => {
                    this.getAllGroupsData();

                    this.loggerService.message('backend', 'Group was added', response);
                },
                error: (err) => {
                    this.loggerService.message('error', 'Error with add group', err);

                    this.isDataLoading = false;

                    this.cdr.detectChanges();
                },
                complete: () => {
                    this.isDataLoading = false;

                    this.toggleAddingGroupDialogVisible();

                    this.cdr.detectChanges();
                },
            });
        }
        else {
            this.dialogErrorMessage = 'Заполните все данные';

            this.loggerService.message('error', 'Error with validate group data');
        };
    };

    // Метод для изменения группы
    editGroup(): void {
        this.dialogEditErrorMessage = '';

        if (this.validateEditingGroupData()) {
            this.isDataLoading = true;

            // Формируем тело запроса
            const request: GroupModel = {
                id: this.editGroupID!,
                name: this.dialogEditGroupName,
                numberSpec: this.dialogEditGroupNumber,
                nameShortly: this.dialogEditGroupShortName,
                course: Number(this.dialogEditGroupCourse),
            };


            this.groupsService.editGroup(request).subscribe({
                next: (response: any) => {
                    this.getAllGroupsData();

                    this.loggerService.message('backend', 'Group was edited', response);
                },
                error: (err) => {
                    this.loggerService.message('error', 'Error with edit group', err);

                    this.dialogEditErrorMessage = 'Не удалось изменить данные';

                    this.isDataLoading = false;

                    this.cdr.detectChanges();
                },
                complete: () => {
                    this.isDataLoading = false;

                    this.isEditingGroupDialogVisible = !this.isEditingGroupDialogVisible;

                    this.cdr.detectChanges();
                },
            });
        }
        else {
            this.dialogEditErrorMessage = 'Заполните все данные';

            this.loggerService.message('error', 'Error with validate group data');
        };
    };

    // Метод для удаления по ID
    deleteGroupByID(groupID: number): void {
        this.isDataLoading = true;

        this.groupsService.deleteGroupByID(groupID).subscribe({
            next: (response: any) => {
                this.getAllGroupsData();

                this.loggerService.message('backend', `Group with id = ${groupID} was deleted`, response);
            },
            error: (err) => {
                this.loggerService.message('error', 'Error with delete group', err);

                this.isDataLoading = false;

                this.cdr.detectChanges();
            },
            complete: () => {
                this.isDataLoading = false;

                this.cdr.detectChanges();
            },
        });
    };

    // Метод для получения доступных преподавателей
    getShortLecturersInformation(): void {
        this.isDataLoading = true;

        this.lecturersService.getShortLecturersInformation().subscribe({
            next: (response: LecturerShortInformationInterface[]) => {
                this.avaliableLecturers = response;

                this.loggerService.message('backend', `Lecturers data was received`, response);
            },
            error: (err) => {
                this.loggerService.message('error', 'Error with get all lecturers', err);

                this.isDataLoading = false;

                this.cdr.detectChanges();
            },
            complete: () => {
                this.isDataLoading = false;

                this.cdr.detectChanges();
            },
        });
    };

    // Метод для получения доступных предметов
    getAllSubjects(): void {
        this.isDataLoading = true;

        this.subjectsService.getAllSubjects().subscribe({
            next: (response: SubjectModel[]) => {
                this.avaliableSubjects = response;

                this.loggerService.message('backend', `Subjects data was received`, response);
            },
            error: (err) => {
                this.loggerService.message('error', 'Error with get all subjects', err);

                this.isDataLoading = false;

                this.cdr.detectChanges();
            },
            complete: () => {
                this.isDataLoading = false;

                this.cdr.detectChanges();
            },
        });
    };

    // Метод для получения расписания группы
    getScheduleByGroupID(id: number): void {
        this.isDataLoading = true;

        this.scheduleService.getScheduleByGroupID(id).subscribe({
            next: (response: ScheduleModel) => {
                this.groupSchedule = response;

                this.loggerService.message('backend', `Schedule data was received`, response);
            },
            error: (err) => {
                this.loggerService.message('error', 'Error with get schedule data', err);

                this.isDataLoading = false;

                this.cdr.detectChanges();
            },
            complete: () => {
                this.isDataLoading = false;

                this.cdr.detectChanges();
            },
        });
    };

    // Метод для обновления расписания группы
    updateScheduleByGroupID(id: number, request: ScheduleModel): void {
        this.isDataLoading = true;

        this.scheduleService.updateScheduleByGroupID(id, request).subscribe({
            next: (response: ScheduleModel) => {
                this.getScheduleByGroupID(id);

                this.loggerService.message('backend', `Schedule data was updated`, response);
            },
            error: (err) => {
                this.loggerService.message('error', 'Error with update schedule data', err);

                this.isDataLoading = false;

                this.cdr.detectChanges();
            },
            complete: () => {
                this.isDataLoading = false;

                this.cdr.detectChanges();
            },
        });
    };

    // Метод для валидации данных группы
    validateAddingGroupData(): boolean {
        if (this.dialogGroupName.length === 0 || this.dialogGroupNumber.length === 0 || this.dialogGroupShortName.length === 0 || this.dialogGroupCourse.length === 0) {
            return false;
        };

        return true;
    };

    // Метод для валидации данных группы
    validateEditingGroupData(): boolean {
        if (this.dialogEditGroupName.length === 0 || this.dialogEditGroupNumber.length === 0 || this.dialogEditGroupShortName.length === 0 || this.dialogEditGroupCourse.length === 0) {
            return false;
        };

        return true;
    };

    // Метод генерации рандомного кода
    generateGroupCode(): void {
        this.dialogGroupCode = generateRandomCode(10);

        while (this.groupsCodeData?.includes(this.dialogGroupCode)) {
            this.dialogGroupCode = generateRandomCode(10);
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
                label: 'Наименование',
                field: 'name',
            },
            {
                label: 'Сокращение',
                field: 'nameShortly'
            },
            {
                label: 'Номер группы',
                field: 'numberSpec',
            },
            {
                label: 'Курс',
                field: 'course'
            },
            {
                label: 'Кол-во студентов',
                field: 'studentsAmount'
            },
            {
                label: 'Кодировка',
                field: 'coding'
            },
        ];
    };

    // Метод для смены видимости окна добавления группы
    toggleAddingGroupDialogVisible(): void {
        this.getAllGroupCodesData();

        this.dialogGroupName = '';
        this.dialogGroupShortName = '';
        this.dialogGroupNumber = '';
        this.dialogGroupCourse = '';

        this.isAddingGroupDialogVisible = !this.isAddingGroupDialogVisible;
    };

    // Метод для смены видимости окна изменения группы
    toggleEditingGroupDialogVisible(data: any): void {
        this.editGroupID = data.id;
        this.dialogEditGroupName = data.name;
        this.dialogEditGroupShortName = data.nameShortly;
        this.dialogEditGroupNumber = data.numberSpec;
        this.dialogEditGroupCourse = data.course;

        this.isEditingGroupDialogVisible = !this.isEditingGroupDialogVisible;
    };

    // Метод для смены видимости окна редактирования расписания группы
    toggleEditingScheduleDialogVisible(id: number): void {
        this.isEditingScheduleDialogVisible = !this.isEditingScheduleDialogVisible;

        this.scheduleChangeGroupID = id;

        this.getScheduleByGroupID(id);
    };

    // Метод для смены значения переменной, контролирующей возможность редактирования расписания группы
    toggleEditingShedule(): void {
        this.isEditingSchedule = !this.isEditingSchedule;
    };

    // Метод для сохранения расписания
    saveSchedule(): void {
        this.updateScheduleByGroupID(this.scheduleChangeGroupID!, this.groupSchedule);

        // Изменяем возможность редактирования расписания группы
        this.toggleEditingShedule();
    };

    // Метод для смены видимости окна подверждения
    toggleConfirmDialogVisible(id?: number): void {
        this.isConfirmDialogVisible = !this.isConfirmDialogVisible;

        if (id) {
            this.deleteGroupID = id;
        };
    };

    // Логика для события "Далее"
    handleConfirmDialogNext(): void {
        this.toggleConfirmDialogVisible();

        if (this.deleteGroupID) {
            this.deleteGroupByID(this.deleteGroupID);
        };
    };

    // Логика для события "Отмена"
    handleConfirmDialogCancel(): void {
        this.toggleConfirmDialogVisible();
    };
}