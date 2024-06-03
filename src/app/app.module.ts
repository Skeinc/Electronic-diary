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
import { RegistrationModule } from "@modules/registration/registration.module";
import { WaitingModule } from "@modules/waiting/waiting.module";
import { OverviewModule } from "@modules/overview/overview.module";
import { ScheduleModule } from "@modules/schedule/schedule.module";
import { SubjectPageModule } from "@modules/subject-page/subject-page.module";
import { MarksModule } from "@modules/marks/marks.module";
import { AttendanceModule } from "@modules/attendance/attendance.module";
import { RecoveryModule } from "@modules/recovery/recovery.module";

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
        OverviewModule,
        UndefinedModule,
        WaitingModule,
        PersonalModule,
        AuthorizationModule,
        RegistrationModule,
        LecturersModule,
        StudentsModule,
        GroupsModule,
        RequestsModule,
        SubjectsModule,
        ScheduleModule,
        SubjectPageModule,
        MarksModule,
        AttendanceModule,
        RecoveryModule,
    ],
    providers: [

    ],
    bootstrap: [
        AppComponent,
    ],
})
export class AppModule {}