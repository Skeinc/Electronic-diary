import { Component, HostListener, OnInit } from "@angular/core";

@Component({
    selector: 'app-requests',
    templateUrl: './requests.component.html',
    styleUrl: './requests.component.scss',
})
export class RequestsComponent implements OnInit{
    // Определяет открыта ли меню
    isNavigationOpened: boolean = false;

    ngOnInit(): void {}

    // Метод скрывает/открывает меню
    onNavigationOpenedChange(isOpened: boolean) {
        this.isNavigationOpened = isOpened;
    }
}