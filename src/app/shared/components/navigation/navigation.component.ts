import { ChangeDetectorRef, Component, EventEmitter, OnInit, Output } from "@angular/core";
import { PersonalService } from "@modules/personal/services/personal.service";
import { menuItemsConstant } from "@shared/constants/menu.constant";
import { MenuItemsInterface } from "@shared/interfaces/navigation/menu-items.interface";
import { UserModel } from "@shared/models/user.model";
import { LoggerService } from "@shared/services/logger/logger.service";

@Component({
    selector: 'app-navigation',
    templateUrl: './navigation.component.html',
    styleUrl: './navigation.component.scss'
})
export class NavigationComponent implements OnInit{
    constructor (
        private personalService: PersonalService,
        private loggerService: LoggerService,
        private cdr: ChangeDetectorRef,
    ) {}

    @Output() navigationVisibility = new EventEmitter<boolean>();

    // Определяет раскрыто ли меню
    isNavigationOpened: boolean = false;

    // Элементы меню
    menuItems: MenuItemsInterface[] = [];

    // Определяет раскрыт ли список профиля
    isProfileListOpened: boolean = false;

    // Переменная, которая обозначает статус загрузки
    isDataLoading: boolean = false;

    // Данные о пользователе
    userData: UserModel | null = null;

    ngOnInit(): void {
        this.menuItems = menuItemsConstant;
    }

    // Метод для получения информации о пользователе
    getUserInformation(): void {
        if(this.personalService.getUser()) {
            this.userData = this.personalService.getUser();
        };
    };

    // Метод для выхода из аккаунта
    logout(): void {
        this.isDataLoading = true;

        this.personalService.logout().subscribe({
            next: (response) => {
                this.loggerService.message('backend', 'User was logout');
            },
            error: (err) => {
                this.loggerService.message('error', 'Error with user logout', err);

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
    toggleMenuVisibility(): void {
        this.isNavigationOpened = !this.isNavigationOpened;

        this.navigationVisibility.emit(this.isNavigationOpened);
    }

    // Метод скрывает/открывает список профиля
    toggleProfileListVisibility(): void {
        this.isProfileListOpened = !this.isProfileListOpened;
    }
}