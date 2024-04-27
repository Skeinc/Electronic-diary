import { Component, HostListener, OnInit } from "@angular/core";
import { GroupScheduleInterface } from "@shared/interfaces/groups/schedule.interface";
import { generateRandomCode } from "@shared/utilities/generateRandomCode.util";

@Component({
    selector: 'app-groups',
    templateUrl: './groups.component.html',
    styleUrl: './groups.component.scss',
})
export class GroupsComponent implements OnInit{
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

    // Высота скрола таблицы
    tableScrollHeight: number = 0;

    // Доступные колонки таблицы
    tableColumns: any = null; 

    // Данные для окна добавления группы
    dialogGroupName: string = '';
    dialogGroupShortName: string = '';
    dialogGroupNumber: string = '';
    dialogGroupCourse: string = '';
    dialogGroupCode: string = generateRandomCode(10);

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
    groupSchedule: GroupScheduleInterface[] = [
        {
            name: 'Понедельник',
            data: [],
        },
        {
            name: 'Вторник',
            data: [],
        },
        {
            name: 'Среда',
            data: [],
        },
        {
            name: 'Четверг',
            data: [],
        },
        {
            name: 'Пятница',
            data: [],
        },
        {
            name: 'Суббота',
            data: [],
        },
        {
            name: 'Воскресенье',
            data: [],
        },
    ];

    // Mocks для таблицы группы
    groupsMocks = [
        {
            id: 1,
            name: 'Информационные системы и программирование',
            shortName: '4-ИСИП',
            number: '431-002',
            course: 4,
            studentsAmount: 20,
            code: generateRandomCode(10),
        },
        {
            id: 2,
            name: 'Прикладная информатика',
            shortName: '2-ПИ',
            number: '431-003',
            course: 2,
            studentsAmount: 17,
            code: generateRandomCode(10),
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
                label: 'Наименование',
                field: 'name',
            },
            {
                label: 'Сокращение',
                field: 'shortName'
            },
            {
                label: 'Номер группы',
                field: 'number',
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
                field: 'code'
            },
        ];
    }

    // Метод для смены видимости окна добавления группы
    toggleAddingGroupDialogVisible(): void {
        this.isAddingGroupDialogVisible = !this.isAddingGroupDialogVisible;
    }

    // Метод для смены видимости окна изменения группы
    toggleEditingGroupDialogVisible(data: any): void {
        this.dialogEditGroupName = data.name;
        this.dialogEditGroupShortName = data.shortName;
        this.dialogEditGroupNumber = data.number;
        this.dialogEditGroupCourse = data.course;

        this.isEditingGroupDialogVisible = !this.isEditingGroupDialogVisible;
    }

    // Метод для смены видимости окна редактирования расписания группы
    toggleEditingScheduleDialogVisible(): void {
        this.isEditingScheduleDialogVisible = !this.isEditingScheduleDialogVisible;
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