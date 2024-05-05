import { Component, OnInit } from "@angular/core";
import { PersonalSubjectsMocks } from "../mocks/personal-subjects.mocks";
import { PersonalThemesMocks } from "../mocks/personal-themes.mocks";
import { animate, style, transition, trigger } from "@angular/animations";

@Component({
    selector: 'app-personal',
    templateUrl: './personal.component.html',
    styleUrl: './personal.component.scss',
    animations: [
        trigger('fadeInOut', [
            transition(':enter', [
                style({ opacity: 0 }),
                animate('300ms', style({ opacity: 1 })),
            ]),
            transition(':leave', [
                animate('300ms', style({ opacity: 0 }))
            ]),
        ]),
    ],
})
export class PersonalComponent implements OnInit {
    // Определяет открыта ли меню
    isNavigationOpened: boolean = false;

    // Переменная, контролирует редактируемость данных
    isPersonalDataEditable: boolean = false;

    // Медиафайл превью, который мы выбрали для загрузки
    selectedImageURL: string | null = null;

    // Медиафайл, который мы выбрали для загрузки
    selectedImage: File | null = null;

    // Предметы, закрепленные за преподавателем
    lecturerSubjects: any[] = [];

    // Массив булевых переменных, отвечающие за видимость контента у предметов
    subjectsVisibleFlags: boolean[] = [];

    // Массив булевых переменных, отвечающие за видимость контента у тем
    subjectsThemesVisibleFlags: boolean[] = [];

    // Список тем по выбранному предмету
    subjectThemes: any[] = [];

    // Переменная, контролирующая видимость окна добавления темы
    isAddingThemeDialogVisible: boolean = false;

    // Данные для окна добавления группы
    dialogThemeName: string = '';

    // Сообщение ошибки для окна добавления темы
    dialogErrorMessage: string | null = null;

    // Mocks
    userData = {
        id: 1,
        surname: 'Ануфриев',
        name: 'Дмитрий',
        patronymic: 'Олегович',
        email: 'iamskezy@gmail.com',
        phone: '+79108765249',
        password: 'qwerty123',
        role: 'Преподаватель',
    };

    ngOnInit(): void {
        // Устанавливаем предметы, закрепленные за преподавателем
        if (this.userData.role === 'Преподаватель') {
            this.setLecturerConfiguration();
        };
    }

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

    // Метод для конфигурации данных, если пользователь преподаватель
    setLecturerConfiguration(): void {
        this.lecturerSubjects = PersonalSubjectsMocks;

        // Заполняем значения флагов для видимости контента предметов
        for (let index = 0; index < this.lecturerSubjects.length; index++) {
            this.subjectsVisibleFlags.push(false);
        }
    }

    // Метод для смены видимости контента предметов
    toggleSubjectVisible(index: number): void {
        this.subjectThemes = PersonalThemesMocks;

        for (let index = 0; index < this.subjectThemes.length; index++) {
            this.subjectsThemesVisibleFlags.push(false);
        }

        this.subjectsVisibleFlags[index] = !this.subjectsVisibleFlags[index];
    }

    // Метод для смены видимости окна добавления темы
    toggleAddingThemeVisible(index: number): void {
        // Очищаем предыдущие данные
        this.dialogThemeName = '';

        this.isAddingThemeDialogVisible = !this.isAddingThemeDialogVisible;
    }

    // Метод для смены видимости контента темы
    toggleSubjectThemeVisible(index: number): void {
        this.subjectsThemesVisibleFlags[index] = !this.subjectsThemesVisibleFlags[index];
    }
}