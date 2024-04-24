import { Component, EventEmitter, OnInit, Output } from "@angular/core";
import { menuItemsConstant } from "@shared/constants/menu.constant";
import { MenuItemsInterface } from "@shared/interfaces/navigation/menu-items.interface";

@Component({
    selector: 'app-navigation',
    templateUrl: './navigation.component.html',
    styleUrl: './navigation.component.scss'
})
export class NavigationComponent implements OnInit{
    @Output() navigationVisibility = new EventEmitter<boolean>();

    // Определяет раскрыто ли меню
    isNavigationOpened: boolean = false;

    // Элементы меню
    menuItems: MenuItemsInterface[] = [];

    // Определяет раскрыт ли список профиля
    isProfileListOpened: boolean = false;

    ngOnInit(): void {
        this.menuItems = menuItemsConstant;
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