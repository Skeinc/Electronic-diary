import { ChangeDetectorRef, Component, OnInit } from "@angular/core";
import { TabmenuInterface } from "../shared/interfaces/tabmenu.interface";
import { AuthorizationService } from "../services/authorization.service";
import { LoggerService } from "@shared/services/logger/logger.service";
import { Router } from "@angular/router";
import { PersonalService } from "@modules/personal/services/personal.service";
import { UserModel } from "@shared/models/user.model";
import { convertPhoneNumber } from "@shared/utilities/converPhoneNumber.util";

@Component({
    selector: 'app-authorization',
    templateUrl: './authorization.component.html',
    styleUrl: './authorization.component.scss'
})
export class AuthorizationComponent implements OnInit {
    constructor(
        private authorizationService: AuthorizationService,
        private personalService: PersonalService,
        private loggerService: LoggerService,
        private cdr: ChangeDetectorRef,
        private router: Router,
    ) { }

    // Конфигурация Tabmenu
    tabmenuConfig: TabmenuInterface[] = [
        {
            id: 1,
            icon: 'school',
            label: 'Студент',
            value: 'student',
        },
        {
            id: 2,
            icon: 'person',
            label: 'Персонал',
            value: 'personal',
        }
    ];

    // Выбранный Tabmenu элемента
    selectedTabmenuElement: TabmenuInterface | null = null;

    // Данные входа для персонала
    personalLogin: string = '';
    personalPassword: string = '';

    // Ошибка входа для персонала
    personalError: string = '';

    // Данные входа для студентов
    studentLogin: string = '';
    studentPassword: string = '';

    // Ошибка входа для студентов
    studentError: string = '';

    // Переменная, обозначающая статус загрузки данных
    isDataLoading: boolean = false;

    ngOnInit(): void {
        // Устанавливаем по умолчанию выбранный Tabmenu
        this.selectedTabmenuElement = this.tabmenuConfig[0];
    }

    // Метод для авторизации пользователя
    authorizationHandler(requestType: 'student' | 'personal'): void {
        this.personalError = '';
        this.studentError = '';
        this.isDataLoading = true;

        if (requestType === 'personal') {
            this.authorizationService.authorizationPersonal(this.personalLogin, this.personalPassword).subscribe({
                next: (response: number) => {
                    // Получаем данные об авторизированном пользователе
                    this.getUserInformation(response);
                },
                error: (err) => {
                    this.loggerService.message('error', 'Error with personal authorization', err);

                    this.personalError = 'Неверные данные';

                    this.isDataLoading = false;

                    this.cdr.detectChanges();
                },
                complete: () => {
                    this.isDataLoading = false;

                    this.cdr.detectChanges();
                }
            });
        };
        if(requestType === 'student') {
            this.authorizationService.authorizationStudent(convertPhoneNumber(this.studentLogin), this.studentPassword).subscribe({
                next: (response: number) => {
                    // Получаем данные об авторизированном пользователе
                    this.getUserInformation(response);
                },
                error: (err) => {
                    this.loggerService.message('error', 'Error with student authorization', err);

                    this.studentError = 'Неверные данные';

                    this.isDataLoading = false;

                    this.cdr.detectChanges();
                },
                complete: () => {
                    this.isDataLoading = false;

                    this.cdr.detectChanges();
                }
            });
        };
    };

    // Метод для получения информации об авторизированном пользователе
    getUserInformation(id: number): void {
        this.isDataLoading = true;

        this.personalService.getUserInformation(id).subscribe({
            next: (response: UserModel) => {
                this.personalService.setUser(response);

                this.router.navigateByUrl('/personal');
            },
            error: (err) => {
                this.loggerService.message('error', 'Error with get user information', err);

                this.isDataLoading = false;

                this.cdr.detectChanges();
            },
            complete: () => {
                this.isDataLoading = false;

                this.cdr.detectChanges();
            },
        });
    };

    // Метод для смены Tabmenu
    tabmenuHandler(item: TabmenuInterface): void {
        this.selectedTabmenuElement = item;

        if (item.value === this.tabmenuConfig[0].value) {
            this.clearPersonalForm();
        }
        else if (item.value === this.tabmenuConfig[1].value) {
            this.clearStudentForm();
        }
    }

    // Метод для входа персонала в аккаунт
    personalLoginHandler(): void {
        if (this.personalLogin.length > 0 && this.personalPassword.length > 0) {
            this.personalError = '';

            this.authorizationHandler('personal');
        }
        else {
            this.personalError = 'Заполните данные';
        }
    };

    // Метод для входа студента в аккаунт
    studentLoginHandler(): void {
        if (this.studentLogin.length > 0 && this.studentPassword.length > 0) {
            this.studentError = '';

            this.authorizationHandler('student');
        }
        else {
            this.studentError = 'Заполните данные';
        }
    };

    // Метод для очистки данных формы при переходе на Tabview для персонала
    clearPersonalForm(): void {
        this.personalLogin = '';
        this.personalPassword = '';
        this.personalError = '';
    };

    // Метод для очистки данных формы при переходе на Tabview для студентов
    clearStudentForm(): void {
        this.studentLogin = '';
        this.studentPassword = '';
        this.studentError = '';
    };

    // Метод для перехода на регистрацию
    navigateToRegistration(): void {
        this.router.navigateByUrl('/signup');
    };
}