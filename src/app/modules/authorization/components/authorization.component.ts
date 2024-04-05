import { Component, OnInit } from "@angular/core";
import { TabmenuInterface } from "../shared/interfaces/tabmenu.interface";

@Component({
    selector: 'app-authorization',
    templateUrl: './authorization.component.html',
    styleUrl: './authorization.component.scss'
})
export class AuthorizationComponent implements OnInit{
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

    ngOnInit(): void {
        // Устанавливаем по умолчанию выбранный Tabmenu
        this.selectedTabmenuElement = this.tabmenuConfig[0]; 
    }

    // Метод для смены Tabmenu
    tabmenuHandler(item: TabmenuInterface): void {
        this.selectedTabmenuElement = item;
        
        if(item.value === this.tabmenuConfig[0].value) {
            this.clearPersonalForm();
        }
        else if(item.value === this.tabmenuConfig[1].value) {
            this.clearStudentForm();
        }
    }

    // Метод для входа персонала в аккаунт
    personalLoginHandler(): void {
        if(this.personalLogin.length > 0 && this.personalPassword.length > 0) {
            this.personalError = '';

            console.log('Success');
        }
        else {
            this.personalError = 'Заполните данные';
        }
    }

    // Метод для входа студента в аккаунт
    studentLoginHandler(): void {
        if(this.studentLogin.length > 0 && this.studentPassword.length > 0) {
            this.studentError = '';

            console.log('Success');
        }
        else {
            this.studentError = 'Заполните данные';
        }
    }

    // Метод для очистки данных формы при переходе на Tabview для персонала
    clearPersonalForm(): void {
        this.personalLogin = '';
        this.personalPassword = '';
        this.personalError = '';
    }

    // Метод для очистки данных формы при переходе на Tabview для студентов
    clearStudentForm(): void {
        this.studentLogin = '';
        this.studentPassword = '';
        this.studentError = '';
    }
}