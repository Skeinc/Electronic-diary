import { NgModule } from "@angular/core";
import { SubjectsComponent } from "./components/subjects.component";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";

@NgModule({
    declarations: [
        SubjectsComponent,
    ],
    imports: [
        CommonModule,
        FormsModule,
    ],
    exports: [
        SubjectsComponent,
    ]
})
export class SubjectsModule {}