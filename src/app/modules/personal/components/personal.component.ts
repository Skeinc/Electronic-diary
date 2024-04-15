import { Component } from "@angular/core";

@Component({
    selector: 'app-personal',
    templateUrl: './personal.component.html',
    styleUrl: './personal.component.scss',
})
export class PersonalComponent {
    // Определяет открыта ли меню
    isNavigationOpened: boolean = false;

    // Значение нового пароля
    newPasswordValue: string = '';

    // Значение нового пароля (подтверждение)
    confirmNewPasswordValue: string = '';

    // Mocks
    userData = {
        id: 1,
        surname: 'Ануфриев',
        name: 'Дмитрий',
        patronymic: 'Олегович',
        email: 'iamskezy@gmail.com',
        phone: '+79108765249',
        password: 'qwerty123'
    };

    // Метод скрывает/открывает меню
    onNavigationOpenedChange(isOpened: boolean) {
        this.isNavigationOpened = isOpened;
    }
}