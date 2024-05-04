import { Component, HostListener, OnInit } from "@angular/core";

@Component({
    selector: 'app-subjects',
    templateUrl: './subjects.component.html',
    styleUrl: './subjects.component.scss',
})
export class SubjectsComponent implements OnInit{
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

    // Mocks для таблицы предметы
    subjectsMocks = [
        {
            id: 1,
            name: 'История',
            code: '103-203',
            lecturers: 'Иванова Марина Николаевна, Сидорова Виктория Петровна',
            groups: '4-ИСиП, 3-ИП',
        },
        {
            id: 2,
            name: 'Русский язык',
            code: '103-204',
            lecturers: 'Иванова Марина Николаевна, Сидорова Виктория Петровна',
            groups: '4-ИСиП, 3-ИП',
        },
    ];

    // Mocks для доступных преподавателей
    lecturersMocks = [
        {
            id: 1,
            name: 'Иванова Мария Николаевна'
        },
        {
            id: 2,
            name: 'Сидорова Татьяна Петровна'
        },
        {
            id: 3,
            name: 'Петрова Юлия Ивановна'
        }
    ];

    // Mocks для доступных групп
    groupsMocks = [
        {
            id: 1,
            name: '4-ИСиП'
        },
        {
            id: 2,
            name: '3-ИП'
        },
        {
            id: 3,
            name: '2-ИБ'
        }
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
    }

    // Метод для смены видимости окна добавления предмета
    toggleAddingSubjectDialogVisible(): void {
        this.isAddingSubjectDialogVisible = !this.isAddingSubjectDialogVisible;
    }

    // Метод для смены видимости окна изменения предмета
    toggleEditingSubjectDialogVisible(): void {
        this.isEditingSubjectDialogVisible = !this.isEditingSubjectDialogVisible;
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