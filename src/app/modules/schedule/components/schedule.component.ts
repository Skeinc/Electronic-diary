import { ChangeDetectorRef, Component, OnInit } from "@angular/core";
import { GroupsService } from "@modules/groups/services/groups.service";
import { GroupModel } from "@shared/models/group.model";
import { LoggerService } from "@shared/services/logger/logger.service";
import { ScheduleService } from "../services/schedule.service";
import { LessonsTimeConstant } from "@shared/constants/lessons-time.constant";
import { ScheduleModel } from "@shared/models/schedule.model";
import { ScheduleMocks } from "../mocks/schedule.mocks";

@Component({
    selector: 'app-schedule',
    templateUrl: './schedule.component.html',
    styleUrl: './schedule.component.scss',
})
export class ScheduleComponent implements OnInit{
    constructor (
        private scheduleService: ScheduleService,
        private groupsService: GroupsService,
        private loggerService: LoggerService,
        private cdr: ChangeDetectorRef,
    ) {}

    // Определяет открыта ли меню
    isNavigationOpened: boolean = false;

    // Переменная, обозначающая статус загрузки данных
    isDataLoading: boolean = false;

    // Данные по расписанию группы
    scheduleData: ScheduleModel = ScheduleMocks;

    // Данные по доступным группам
    avaliableGroup: GroupModel[] | null = null;

    // Данные по выбранной группе
    selectedGroup: GroupModel | null = null;

    // Время уроков
    lessonsTime = LessonsTimeConstant;

    ngOnInit(): void {
        // Получаем данные по доступным группам
        this.getAllGroups();
    };

    // Метод для получения всех групп
    getAllGroups(): void {
        this.groupsService.getAllGroups().subscribe({
            next: (response: GroupModel[]) => {
                this.avaliableGroup = response;

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

    // Метод для получения расписания по ID группы
    getScheduleByGroupID(id: number): void {
        this.isDataLoading = true;

        this.scheduleService.getScheduleByGroupID(id).subscribe({
            next: (response) => {
                this.scheduleData = response

                this.loggerService.message('backend', 'Schedule data was received', response);
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

    // Метод для обработки поиска расписания группы
    searchScheduleHandler(): void {
        if(this.selectedGroup) {
            this.getScheduleByGroupID(this.selectedGroup.id!);
        }
        else {
            this.loggerService.message('error', 'Group was not selected');
        }
    }

    // Метод скрывает/открывает меню
    onNavigationOpenedChange(isOpened: boolean) {
        this.isNavigationOpened = isOpened;
    }
}