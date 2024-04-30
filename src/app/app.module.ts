import { CommonModule } from "@angular/common";
import { HttpClientModule } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppComponent } from "./app.component";
import { ApplicationModule } from "./modules/application/application.module";
import { AppRoutingModule } from "./app-routing.module";
import { AuthorizationModule } from "./modules/authorization/authorization.module";
import { PersonalModule } from "./modules/personal/personal.module";
import { LecturersModule } from "./modules/lecturers/lecturers.module";
import { StudentsModule } from "./modules/students/students.module";
import { GroupsModule } from "./modules/groups/groups.module";
import { RequestsModule } from "./modules/requests/requests.module";
import { UndefinedModule } from "./modules/undefined/undefined.module";
import { SubjectsModule } from "./modules/subjects/subjects.module";

@NgModule({
    declarations: [
        AppComponent,
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        CommonModule,
        FormsModule,
        HttpClientModule,
        // Modules
        AppRoutingModule,
        ApplicationModule,
        UndefinedModule,
        PersonalModule,
        AuthorizationModule,
        LecturersModule,
        StudentsModule,
        GroupsModule,
        RequestsModule,
        SubjectsModule,
    ],
    providers: [

    ],
    bootstrap: [
        AppComponent,
    ],
})
export class AppModule {}