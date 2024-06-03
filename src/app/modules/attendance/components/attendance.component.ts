import { ChangeDetectorRef, Component, HostListener, OnInit } from "@angular/core";
import { GroupModel } from "@shared/models/group.model";
import { SubjectModel } from "@shared/models/subject.model";
import { LoggerService } from "@shared/services/logger/logger.service";
import { AttendaceService } from "../services/attendance.service";
import { SubjectsService } from "@modules/subjects/services/subjects.service";
import { GroupsService } from "@modules/groups/services/groups.service";
import { AttendanceDataInterface } from "@shared/interfaces/attendance/attendance.interface";
import { AttendanceModel } from "@shared/models/attendance.model";

@Component({
    selector: 'app-attendance',
    templateUrl: './attendance.component.html',
    styleUrl: './attendance.component.scss',
})
export class AttendanceComponent implements OnInit{
    constructor (
        private attendanceService: AttendaceService,
        private subjectsService: SubjectsService,
        private loggerService: LoggerService,
        private groupsService: GroupsService,
        private cdr: ChangeDetectorRef,
    ) {}

    // Определяет открыта ли меню
    isNavigationOpened: boolean = false;

    // Переменная, обозначающая статус загрузки данных
    isDataLoading: boolean = false;

    // Список всех групп
    groupsData: GroupModel[] | null = null;

    // Выбранная группа
    selectedGroup: GroupModel | null = null;

    // Список всех предметов
    subjectsData: SubjectModel[] | null = null;

    // Выбранный предмет
    selectedSubject: SubjectModel | null = null;

    // Переменная контролирует работу выпадающего списка предметов
    isSubjectDropdownDisabled: boolean = true;

    // Список данных об оценках
    attendanceData: AttendanceModel[] | null = null;

    // Имена всех тем
    topicNames: string[] = [];

    // Высота скрола таблицы
    tableScrollHeight: number = 0;

    @HostListener('window:resize', ['$event'])
    onResize(event: any): void {
        // Вызываем метод для обновления высоты скрола таблицы
        this.updateScrollHeight();
    }

    ngOnInit(): void {
        // Установка высоты скрола таблицы
        this.updateScrollHeight();


        // Получаем все данные о группах
        this.getAllGroupsData();
    }

    // Метод скрывает/открывает меню
    onNavigationOpenedChange(isOpened: boolean) {
        this.isNavigationOpened = isOpened;
    }

    // Метод для получения всех группы
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

    // Метод для получения предметов по ID группы
    getSubjectsByGroupID(): void {
        this.subjectsService.getAllSubjectsByGroupID(this.selectedGroup?.id!).subscribe({
            next: (response: SubjectModel[]) => {
                this.subjectsData = response;

                this.loggerService.message('backend', 'Subjects data was received', response);
            },
            error: (err) => {
                this.loggerService.message('error', 'Error with get subjects data', err);

                this.isDataLoading = false;

                this.cdr.detectChanges();
            },
            complete: () => {
                this.isDataLoading = false;

                this.cdr.detectChanges();
            },
        });
    };

    // Метод для получения посещаемости по ID группы и ID предмета
    getAttendanceByGroupIDAndSubjectID(): void {
        this.attendanceData = null;

        if (this.validateGroupAndSubjectData()) {
            this.isDataLoading = true;

            this.attendanceService.getAttendanceByGroupIDAndSubjectID(this.selectedGroup?.id!, this.selectedSubject?.id!).subscribe({
                next: (response: AttendanceModel[]) => {
                    this.attendanceData = response;

                    this.extractTopicNames();

                    this.loggerService.message('backend', 'Attendance data was received', response);

                    this.cdr.markForCheck();
                },
                error: (err) => {
                    this.loggerService.message('error', 'Error with get attendance data', err);

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
            this.loggerService.message('error', 'Error with validate group and subject data');
        }
    };

    // Метод для валидации данных
    validateGroupAndSubjectData(): boolean {
        if (this.selectedGroup === null || this.selectedSubject === null) {
            return false;
        }

        return true;
    };

    // Метод, который вызывается при изменении selectedGroup
    onSelectedGroupChange(newGroup: GroupModel | null): void {
        this.selectedGroup = newGroup;

        if (newGroup) {
            this.selectedSubject = null;
            this.isSubjectDropdownDisabled = false;
            this.getSubjectsByGroupID();
            this.cdr.detectChanges();
        }
        else {
            this.isSubjectDropdownDisabled = true;
            this.subjectsData = null;
        }
    }

    // Метод для извлечения всех уникальных имен тем
    extractTopicNames(): void {
        const topicsSet = new Set<string>();

        if (this.attendanceData && this.attendanceData.length > 0) {
            this.attendanceData.forEach(item => {
                if (item.attendance && item.attendance.length > 0) {
                    item.attendance.forEach(attendance => {
                        topicsSet.add(attendance.topicName);
                    });
                }
            });
        }
        this.topicNames = Array.from(topicsSet);
    };

    // Метод для получения значениядля конкретной темы
    getAttendanceValue(attendances: AttendanceDataInterface[], topicName: string): number | string {
        const attendance = attendances.find(item => item.topicName === topicName);
        return attendance && attendance.value !== null ? attendance.value : '-';
    };

    // Метод для обновления высоты скрола таблицы
    updateScrollHeight(): void {
        this.tableScrollHeight = window.innerHeight - 80 - 40 - 40 - 60 - 40;
    };
}