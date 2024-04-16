import { Routes } from "@angular/router";
import { ApplicationComponent } from "../../modules/application/components/application.component";
import { AuthorizationComponent } from "../../modules/authorization/components/authorization.component";
import { PersonalComponent } from "../../modules/personal/components/personal.component";
import { LecturersComponent } from "../../modules/lecturers/components/lecturers.component";
import { StudentsComponent } from "../../modules/students/components/students.component";
import { GroupsComponent } from "../../modules/groups/components/groups.component";

export const ROUTES: Routes = [
    {
        path: '',
        component: ApplicationComponent,
    },
    {
        path: 'login',
        component: AuthorizationComponent,
    },
    {
        path: 'personal',
        component: PersonalComponent,
    },
    {
        path: 'lecturers',
        component: LecturersComponent,
    },
    {
        path: 'students',
        component: StudentsComponent,
    },
    {
        path: 'groups',
        component: GroupsComponent,
    },
    {
        path: '**',
        redirectTo: '/',
    }
];