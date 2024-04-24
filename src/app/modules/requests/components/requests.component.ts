import { Component, HostListener, OnInit } from "@angular/core";

@Component({
    selector: 'app-requests',
    templateUrl: './requests.component.html',
    styleUrl: './requests.component.scss',
})
export class RequestsComponent implements OnInit {
    // Определяет открыта ли меню
    isNavigationOpened: boolean = false;

    // Переменная, контролирующая видимость окна подверждения заявки
    isConfirmDialogAcceptVisible: boolean = false;

    // Переменная, контролирующая видимость окна отклонения заявки
    isConfirmDialogCancelVisible: boolean = false;

    // Высота скрола таблицы
    tableScrollHeight: number = 0;

    // Доступные колонки таблицы
    tableColumns: any = null;

    // Mocks для заявок
    requestsMocks = [
        {
            id: 1,
            surname: 'Прусаков',
            name: 'Михаил',
            patronymic: 'Алексеевич',
            email: 'prusakov@gmail.com',
            phone: '+79109991234',
            group: '1-ИП',
            course: 1,
        },
        {
            id: 2,
            surname: 'Прусаков',
            name: 'Алексей',
            patronymic: 'Алексеевич',
            email: 'prusakov_alexey@gmail.com',
            phone: '+79109995678',
            group: '2-ИП',
            course: 2,
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
                label: 'Группа',
                field: 'group',
            },
            {
                label: 'Курс',
                field: 'course',
            }
        ];
    };

    // Метод для смены видимости окна подтверждения заявки
    toggleConfirmDialogAcceptVisible(): void {
        this.isConfirmDialogAcceptVisible = !this.isConfirmDialogAcceptVisible;
    }

    // Логика для события "Далее" окна подтверждения заявки
    handleConfirmDialogAcceptNext(): void {
        this.toggleConfirmDialogAcceptVisible();
    }

    // Логика для события "Отмена" окна подтверждения заявки
    handleConfirmDialogAcceptCancel(): void {
        this.toggleConfirmDialogAcceptVisible();
    }

    // Метод для смены видимости окна отклонения заявки
    toggleConfirmDialogCancelVisible(): void {
        this.isConfirmDialogCancelVisible = !this.isConfirmDialogCancelVisible;
    }

    // Логика для события "Далее" окна отклонения заявки
    handleConfirmDialogCancelNext(): void {
        this.toggleConfirmDialogCancelVisible();
    }

    // Логика для события "Отмена" окна отклонения заявки
    handleConfirmDialogCancelCancel(): void {
        this.toggleConfirmDialogCancelVisible();
    }
}