import { ChangeDetectorRef, Component, HostListener, OnInit } from "@angular/core";
import { GroupsService } from "@modules/groups/services/groups.service";
import { SubjectsService } from "@modules/subjects/services/subjects.service";
import { GroupModel } from "@shared/models/group.model";
import { MarkModel } from "@shared/models/mark.model";
import { SubjectModel } from "@shared/models/subject.model";
import { LoggerService } from "@shared/services/logger/logger.service";
import { MarksService } from "../services/marks.service";
import { MarkDataInterface } from "@shared/interfaces/marks/mark.interface";

@Component({
    selector: 'app-marks',
    templateUrl: './marks.component.html',
    styleUrl: './marks.component.scss',
})
export class MarksComponent implements OnInit {
    constructor(
        private subjectsService: SubjectsService,
        private loggerService: LoggerService,
        private groupsService: GroupsService,
        private marksService: MarksService,
        private cdr: ChangeDetectorRef,
    ) { }

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
    marksData: MarkModel[] | null = null;

    // Имена всех заданий
    taskNames: string[] = [];

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
    };

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

    // Метод для получения оценок по ID группы и ID предмета
    getAllMarksByGroupIDAndSubjectID(): void {
        this.marksData = null;

        if (this.validateGroupAndSubjectData()) {
            this.isDataLoading = true;

            this.marksService.getAllMarksByGroupIDAndTaskID(this.selectedGroup?.id!, this.selectedSubject?.id!).subscribe({
                next: (response: MarkModel[]) => {
                    this.marksData = response;

                    this.extractTaskNames();

                    this.loggerService.message('backend', 'Marks data was received', response);

                    this.cdr.markForCheck();
                },
                error: (err) => {
                    this.loggerService.message('error', 'Error with get marks data', err);

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

    // Метод для извлечения всех уникальных имен заданий
    extractTaskNames(): void {
        const tasksSet = new Set<string>();
        if (this.marksData && this.marksData.length > 0) {
            this.marksData.forEach(item => {
                if (item.marks && item.marks.length > 0) {
                    item.marks.forEach(mark => {
                        tasksSet.add(mark.taskName);
                    });
                }
            });
        }
        this.taskNames = Array.from(tasksSet);
    };

    // Метод для получения значения отметки для конкретного задания
    getMarkValue(marks: MarkDataInterface[], taskName: string): number | string {
        const mark = marks.find(m => m.taskName === taskName);
        return mark && mark.value !== null ? mark.value : '-';
    };

    // Метод для обновления высоты скрола таблицы
    updateScrollHeight(): void {
        this.tableScrollHeight = window.innerHeight - 80 - 40 - 40 - 60 - 40;
    };
}