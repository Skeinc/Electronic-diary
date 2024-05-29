import { Routes } from "@angular/router";
import { ApplicationComponent } from "../../modules/application/components/application.component";
import { AuthorizationComponent } from "../../modules/authorization/components/authorization.component";
import { PersonalComponent } from "../../modules/personal/components/personal.component";
import { LecturersComponent } from "../../modules/lecturers/components/lecturers.component";
import { StudentsComponent } from "../../modules/students/components/students.component";
import { GroupsComponent } from "../../modules/groups/components/groups.component";
import { RequestsComponent } from "../../modules/requests/components/requests.component";
import { UndefinedComponent } from "../../modules/undefined/components/undefined.component";
import { SubjectsComponent } from "../../modules/subjects/components/subjects.component";
import { AuthGuard } from "@core/guards/authorization.guard";
import { RegistrationComponent } from "@modules/registration/components/registration.component";
import { WaitingComponent } from "@modules/waiting/components/waiting.component";
import { OverviewComponent } from "@modules/overview/components/overview.component";
import { ScheduleComponent } from "@modules/schedule/components/schedule.component";
import { AccessGuard } from "@core/guards/access.guard";
import { SubjectPageComponent } from "@modules/subject-page/components/subject-page.component";

export const ROUTES: Routes = [
    {
        path: '',
        component: OverviewComponent,
    },
    {
        path: 'overview',
        component: OverviewComponent,
    },
    {
        path: 'login',
        component: AuthorizationComponent,
    },
    {
        path: 'signup',
        component: RegistrationComponent,
    },
    {
        path: 'personal',
        component: PersonalComponent,
        canActivate: [AuthGuard, AccessGuard],
    },
    {
        path: 'lecturers',
        component: LecturersComponent,
        canActivate: [AuthGuard, AccessGuard],
    },
    {
        path: 'students',
        component: StudentsComponent,
        canActivate: [AuthGuard, AccessGuard],
    },
    {
        path: 'groups',
        component: GroupsComponent,
        canActivate: [AuthGuard, AccessGuard],
    },
    {
        path: 'requests',
        component: RequestsComponent,
        canActivate: [AuthGuard, AccessGuard],
    },
    {
        path: 'subjects',
        component: SubjectsComponent,
        canActivate: [AuthGuard, AccessGuard],
    },
    {
        path: 'schedule',
        component: ScheduleComponent,
        canActivate: [AuthGuard, AccessGuard],
    },
    {
        path: 'subject-page',
        component: SubjectPageComponent,
        canActivate: [AuthGuard, AccessGuard],
    },
    {
        path: 'waiting',
        component: WaitingComponent,
    },
    {
        path: 'undefined',
        component: UndefinedComponent,
    },
    {
        path: '**',
        redirectTo: '/undefined',
    }
];