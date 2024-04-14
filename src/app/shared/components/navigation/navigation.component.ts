import { Component } from "@angular/core";

@Component({
    selector: 'app-navigation',
    templateUrl: './navigation.component.html',
    styleUrl: './navigation.component.scss'
})
export class NavigationComponent {
    // Определяет раскрыто ли меню
    isNavigationOpened: boolean = true;

    // Метод скрывает/открывает меню
    toggleMenuVisibility(): void {
        this.isNavigationOpened = !this.isNavigationOpened;
    }
}