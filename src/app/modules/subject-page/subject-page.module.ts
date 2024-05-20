import { NgModule } from "@angular/core";
import { SubjectPageComponent } from "./components/subject-page.component";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { LoaderModule } from "@shared/components/loader/loader.module";
import { NavigationModule } from "@shared/components/navigation/navigation.module";
import { ButtonModule } from "@shared/components/button/button.module";
import { DialogModule } from "primeng/dialog";
import { TextFieldModule } from "@shared/components/text-field/text-field.module";
import { ConfirmDialogModule } from "@shared/components/confirm-dialog/confirm-dialog.module";

@NgModule({
    declarations: [
        SubjectPageComponent,
    ],
    imports: [
        CommonModule,
        FormsModule,
        // Components
        LoaderModule,
        NavigationModule,
        ButtonModule,
        TextFieldModule,
        ConfirmDialogModule,
        // PrimeNG
        DialogModule,
    ],
    exports: [
        SubjectPageComponent,
    ]
})
export class SubjectPageModule {}