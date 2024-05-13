import { ChangeDetectorRef, Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { AuthorizationService } from "@modules/authorization/services/authorization.service";
import { GroupsService } from "@modules/groups/services/groups.service";
import { PersonalService } from "@modules/personal/services/personal.service";
import { GroupModel } from "@shared/models/group.model";
import { LoggerService } from "@shared/services/logger/logger.service";
import { RegistrationService } from "../services/registration.service";
import { convertPhoneNumber } from "@shared/utilities/converPhoneNumber.util";
import { UserModel } from "@shared/models/user.model";

@Component({
    selector: 'app-registration',
    templateUrl: './registration.component.html',
    styleUrl: './registration.component.scss',
})
export class RegistrationComponent implements OnInit {
    constructor(
        private authorizationService: AuthorizationService,
        private registrationService: RegistrationService,
        private personalService: PersonalService,
        private groupsService: GroupsService,
        private loggerService: LoggerService,
        private cdr: ChangeDetectorRef,
        private router: Router,
    ) { }
    
    // Переменная, обозначающая статус загрузки данных
    isDataLoading: boolean = false;

    // Ошибка регистрации
    signupError: string = '';

    // Данные для регистрации пользователя
    surname: string = '';
    name: string = '';
    patronymic: string = '';
    email: string = '';
    phone: string = '';
    password: string = '';
    selectedGroup: GroupModel | null = null;
    groupCode: string = '';

    // Доступные группы
    avaliableGroups: GroupModel[] | null = null;

    ngOnInit(): void {
        // Получаем все доступные группы
        this.getAllGroups();
    }

    // Метод для получения всех доступных групп
    getAllGroups(): void {
        this.isDataLoading = true;

        this.groupsService.getAllGroups().subscribe({
            next: (response: GroupModel[]) => {
                this.avaliableGroups = response;

                this.loggerService.message('backend', 'All groups was recevied', response);
            },
            error: (err) => {
                this.loggerService.message('error', 'Error with get all groups information', err);

                this.isDataLoading = false;

                this.cdr.detectChanges();
            },
            complete: () => {
                this.isDataLoading = false;

                this.cdr.detectChanges();
            },
        });
    };

    // Метод для регистрации пользователя
    registrationUser(): void {
        this.signupError = '';

        if(this.validateRegistrationData()) {
            this.isDataLoading = true;

            // Формируем тело запроса
            const request = {
                surname: this.surname,
                name: this.name,
                patronymic: this.patronymic,
                email: this.email,
                phone: convertPhoneNumber(this.phone),
                password: this.password,
                groupId: this.selectedGroup?.id,
                groupCode: this.groupCode,
            };

            this.registrationService.registrationUser(request).subscribe({
                next: (response: any) => {
                    this.loggerService.message('backend', 'User was registered', response);
                },
                error: (err) => {
                    this.loggerService.message('error', 'Error with user registration', err);
    
                    this.signupError = 'Не удалось зарегистрироваться';
                    
                    this.isDataLoading = false;
    
                    this.cdr.detectChanges();
                },
                complete: () => {
                    this.authorizationUser(convertPhoneNumber(this.phone), this.password);

                    this.isDataLoading = false;
    
                    this.cdr.detectChanges();
                },
            });
        }
        else {
            this.signupError = 'Заполните все данные';

            this.loggerService.message('error', 'Error with validate registration data');
        };
    };

    // Метод для авторизации пользователя
    authorizationUser(phone: string, password: string): void {
        this.isDataLoading = true;

        this.authorizationService.authorizationStudent(phone, password).subscribe({
            next: (response: number) => {
                // Получаем данные об авторизированном пользователе
                this.getUserInformation(response);
            },
            error: (err) => {
                this.loggerService.message('error', 'Error with student authorization', err);

                this.isDataLoading = false;

                this.cdr.detectChanges();
            },
            complete: () => {
                this.isDataLoading = false;

                this.cdr.detectChanges();
            }
        });
    }

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

    // Метод для валидации данных регистрации
    validateRegistrationData(): boolean {
        if(this.surname.length === 0 || this.name.length === 0 || this.patronymic.length === 0 || this.email.length === 0 || this.phone.length === 0 || this.password.length === 0 || !this.selectedGroup || this.groupCode.length === 0) {
            return false;
        }

        return true;
    };

    // Метод для перехода на авторизацию
    navigateToAuthorization(): void {
        this.router.navigateByUrl('/login');
    };
}