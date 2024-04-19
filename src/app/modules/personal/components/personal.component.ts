import { Component } from "@angular/core";

@Component({
    selector: 'app-personal',
    templateUrl: './personal.component.html',
    styleUrl: './personal.component.scss',
})
export class PersonalComponent {
    // Определяет открыта ли меню
    isNavigationOpened: boolean = false;

    // Переменная, контролирует редактируемость данных
    isPersonalDataEditable: boolean = false;

    // Медиафайл превью, который мы выбрали для загрузки
    selectedImageURL: string | null = null;

    // Медиафайл, который мы выбрали для загрузки
    selectedImage: File | null = null;

    // Mocks
    userData = {
        id: 1,
        surname: 'Ануфриев',
        name: 'Дмитрий',
        patronymic: 'Олегович',
        email: 'iamskezy@gmail.com',
        phone: '+79108765249',
        password: 'qwerty123',
    };

    // Метод скрывает/открывает меню
    onNavigationOpenedChange(isOpened: boolean) {
        this.isNavigationOpened = isOpened;
    }

    // Метод для смены редактируемости данных
    togglePersonalDataEditable(): void {
        this.isPersonalDataEditable = !this.isPersonalDataEditable;
    }

    // Метод для загрузки выбранного изображения
    onImageChange(event: any) {
        const file = event.target.files[0];
        if (file) {
            this.selectedImage = file;
            this.selectedImageURL = URL.createObjectURL(file);
        }
    }
}