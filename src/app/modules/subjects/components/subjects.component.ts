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

    // Данные для окна добавления предмета
    dialogSubjectName: string = '';
    dialogSubjectCode: string = '';

    // Данные для окна редактирования предмета
    dialogEditSubjectName: string = '';
    dialogEditSubjectCode = '';

    // Сообщение об ошибке в окне добавления предмета
    dialogErrorMessage: string | null = null;

    // Сообщение ошибки для окна изменения предмета
    dialogEditErrorMessage: string | null = null;

    // Mocks для таблицы предметы
    subjectsMocks = [
        {
            id: 1,
            name: 'История',
            code: '103-203',
            lecturers: [
                {
                    id: 1,
                    name: 'Иванова Мария Николаевна'
                },
                {
                    id: 2,
                    name: 'Сидорова Татьяна Петровна'
                },
            ],
            groups: [
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
                },
            ],
        },
        {
            id: 2,
            name: 'Русский язык',
            code: '103-204',
            lecturers: [
                {
                    id: 2,
                    name: 'Сидорова Татьяна Петровна'
                },
                {
                    id: 3,
                    name: 'Петрова Юлия Ивановна'
                }
            ],
            groups: [
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
            ],
        },
    ];

    // Выбранные преподаватели для окна добавления предмета
    addSubjectSelectedLecturers: any[] | null = null;

    // Выбранные группы для окна добавления предмета
    addSubjectSelectedGroups: any[] | null = null;

    // Выбранные преподаватели для окна редактирования предмета
    editSubjectSelectedLecturers: any[] | null = null;

    // Выбранные группы для окна редактирования предмета
    editSubjectSelectedGroups: any[] | null = null;

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

    // Метод для форматирования данных для таблицы
    formatTableData(data: any, key?: string): string {
        if(typeof data === 'object' && key) {
            if(Array.isArray(data)) {
                let formattedString: string = '';

                for(let index = 0; index < data.length; index++) {
                    if(index === data.length - 1) {
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
    }

    // Метод для смены видимости окна изменения предмета
    toggleEditingSubjectDialogVisible(data: any): void {
        this.dialogEditSubjectName = data.name;
        this.dialogEditSubjectCode = data.code;
        this.editSubjectSelectedLecturers = data.lecturers;
        this.editSubjectSelectedGroups = data.groups;

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