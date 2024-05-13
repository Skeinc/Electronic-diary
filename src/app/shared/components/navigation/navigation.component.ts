import { ChangeDetectorRef, Component, EventEmitter, OnInit, Output } from "@angular/core";
import { Router } from "@angular/router";
import { environment } from "@environments/environment";
import { PersonalService } from "@modules/personal/services/personal.service";
import { menuItemsConstant } from "@shared/constants/menu.constant";
import { MenuItemsInterface } from "@shared/interfaces/navigation/menu-items.interface";
import { UserModel } from "@shared/models/user.model";
import { LoggerService } from "@shared/services/logger/logger.service";
import { MediaService } from "@shared/services/media/media.service";

@Component({
    selector: 'app-navigation',
    templateUrl: './navigation.component.html',
    styleUrl: './navigation.component.scss'
})
export class NavigationComponent implements OnInit{
    constructor (
        private personalService: PersonalService,
        private loggerService: LoggerService,
        private mediaService: MediaService,
        private cdr: ChangeDetectorRef,
        private router: Router,
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

    // Роль пользователя
    userRole: string = '';

    ngOnInit(): void {
        this.menuItems = menuItemsConstant;

        // Получаем данные о пользователе
        this.getUserInformation();
    }

    // Метод для получения информации о пользователе
    getUserInformation(): void {
        if(this.personalService.getUser()) {
            this.userData = this.personalService.getUser();

            this.userRole = this.displayUserRole(this.userData!.role ?? '');
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
                this.router.navigateByUrl('/login');

                this.isDataLoading = false;

                this.cdr.detectChanges();
            },
        });
    };

    // Метод для получения медиа файла
    getMediaFileByID(id: string): void {
        this.isDataLoading = true;

        this.mediaService.getMediaByID(id).subscribe({

        });
    };

    // Метод для получения URL к медиафайлу
    getURLForMediafile(): string {
        return `${environment.protocol}://${environment.domain}/media/file?id=`;
    };

    // Метод для отображения роли пользователя
    displayUserRole(roleID: string): string {
        if(roleID === '1') {
            return 'Супер-администратор';
        }
        else if(roleID === '2') {
            return 'Администратор';
        }
        else if(roleID === '3') {
            return 'Преподаватель';
        }
        else if(roleID === '4') {
            return 'Студент';
        }

        return '';
    }

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