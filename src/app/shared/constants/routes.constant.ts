import { Routes } from "@angular/router";
import { ApplicationComponent } from "../../modules/application/components/application.component";
import { AuthorizationComponent } from "../../modules/authorization/components/authorization.component";

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
        path: '**',
        redirectTo: '/',
    }
];