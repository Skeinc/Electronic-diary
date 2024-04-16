import { NgModule } from "@angular/core";
import { StudentsComponent } from "./components/students.component";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { NavigationModule } from "@shared/components/navigation/navigation.module";
import { ConfirmDialogModule } from "@shared/components/confirm-dialog/confirm-dialog.module";
import { TableModule } from "primeng/table";

@NgModule({
    declarations: [
        StudentsComponent,
    ],
    imports: [
        CommonModule,
        FormsModule,
        // Components
        NavigationModule,
        ConfirmDialogModule,
        // PrimeNg
        TableModule,
    ],
    exports: [
        StudentsComponent,
    ]
})
export class StudentsModule {}