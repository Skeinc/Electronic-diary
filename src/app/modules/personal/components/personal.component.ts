import { Component } from "@angular/core";

@Component({
    selector: 'app-personal',
    templateUrl: './personal.component.html',
    styleUrl: './personal.component.scss',
})
export class PersonalComponent {
    // Определяет открыта ли меню
    isNavigationOpened: boolean = false;

    // Метод скрывает/открывает меню
    onNavigationOpenedChange(isOpened: boolean) {
        this.isNavigationOpened = isOpened;
    }
}