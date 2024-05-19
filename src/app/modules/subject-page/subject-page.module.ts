import { NgModule } from "@angular/core";
import { SubjectPageComponent } from "./components/subject-page.component";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";

@NgModule({
    declarations: [
        SubjectPageComponent,
    ],
    imports: [
        CommonModule,
        FormsModule,
    ],
    exports: [
        SubjectPageComponent,
    ]
})
export class SubjectPageModule {}