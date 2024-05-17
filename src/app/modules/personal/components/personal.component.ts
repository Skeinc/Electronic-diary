import { ChangeDetectorRef, Component, OnInit } from "@angular/core";
import { PersonalSubjectsMocks } from "../mocks/personal-subjects.mocks";
import { animate, style, transition, trigger } from "@angular/animations";
import { LoggerService } from "@shared/services/logger/logger.service";
import { PersonalService } from "../services/personal.service";
import { UserModel } from "@shared/models/user.model";
import { convertPhoneNumber } from "@shared/utilities/converPhoneNumber.util";
import { MediaService } from "@shared/services/media/media.service";
import { UploadMediaInterface } from "@shared/interfaces/backend/media/media.interface";
import { environment } from "@environments/environment";

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
    constructor(
        private personalService: PersonalService,
        private loggerService: LoggerService,
        private mediaService: MediaService,
        private cdr: ChangeDetectorRef,
    ) { }

    // Определяет открыта ли меню
    isNavigationOpened: boolean = false;

    // Переменная, контролирует редактируемость данных
    isPersonalDataEditable: boolean = false;

    // Медиафайл превью, который мы выбрали для загрузки
    selectedImageURL: string | null = null;

    // Медиафайл, который мы выбрали для загрузки
    selectedImage: File | null = null;

    // ID загруженного медиафайла
    uploadedImageID: string | null = null;

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

    // Переменная, обозначающая статус загрузки данных
    isDataLoading: boolean = false;

    // Mocks
    userData: UserModel | null = null;

    ngOnInit(): void {
        // Получаем данные о пользователе
        this.getUserInformation();
    }

    // Метод для получения данных о пользователе
    getUserInformation(): void {
        this.userData = this.personalService.getUser();
    };

    // Метод для обновления данных о пользователе
    async saveUserInformationHandler(): Promise<void> {
        this.togglePersonalDataEditable();

        // Формируем тело запроса
        const user: UserModel = {
            id: this.userData!.id,
            name: this.userData?.name,
            surname: this.userData?.surname,
            patronymic: this.userData?.patronymic,
            email: this.userData?.email,
            phone: convertPhoneNumber(this.userData?.phone ?? ''),
            password: this.userData?.password,
            id_media: null,
        };

        // Проверяем есть ли загруженный файл
        if(this.selectedImage) {
            // Вызываем метод для загрузки медиафайла
            await this.uploadMediaFile(user);
        }
        else {
            // Отправляем запрос на изменение данных пользователя
            await this.updateUserInformation(user);
        }
    }

    // Метод для обновления данных о пользователе
    async updateUserInformation(user: UserModel): Promise<void> {
        this.isDataLoading = true;

        this.personalService.updateUserInformation(user).subscribe({
            next: (response) => {
                this.loggerService.message('backend', 'User information was updated');
            },
            error: (err) => {
                this.loggerService.message('error', 'Error with update user information', err);

                this.isDataLoading = false;

                this.cdr.detectChanges();
            },
            complete: () => {
                this.isDataLoading = false;

                this.cdr.detectChanges();
            },
        });
    }

    // Метод для загрузки медиафайла на сервер
    async uploadMediaFile(user: UserModel): Promise<void> {
        this.isDataLoading = true;

        if(this.selectedImage) {
            this.mediaService.uploadFile(this.selectedImage).subscribe({
                next: (response: UploadMediaInterface) => {
                    this.uploadedImageID = response.id;

                    user.id_media = this.uploadedImageID;

                    this.loggerService.message('backend', 'Mediafile was uploaded');
                },
                error: (err) => {
                    this.loggerService.message('error', 'Error with upload mediafile', err);

                    this.isDataLoading = false;

                    this.cdr.detectChanges();
                },
                complete: () => {
                    this.isDataLoading = false;

                    this.cdr.detectChanges();

                    // Обновление данных о пользователе
                    this.updateUserInformation(user);
                },
            });
        };
    };

    // Метод для получения URL к медиафайлу
    getURLForMediafile(): string {
        return `${environment.protocol}://${environment.domain}/media/file?id=`;
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