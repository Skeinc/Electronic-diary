import { Component, EventEmitter, Output } from "@angular/core";

@Component({
    selector: 'app-navigation',
    templateUrl: './navigation.component.html',
    styleUrl: './navigation.component.scss'
})
export class NavigationComponent {
    @Output() navigationVisibility = new EventEmitter<boolean>();

    // Определяет раскрыто ли меню
    isNavigationOpened: boolean = false;

    // Определяет раскрыт ли список профиля
    isProfileListOpened: boolean = false;

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