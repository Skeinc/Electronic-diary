import { NgModule } from "@angular/core";
import { LecturersComponent } from "./components/lecturers.component";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { NavigationModule } from "@shared/components/navigation/navigation.module";
import { ButtonModule } from "@shared/components/button/button.module";
import { TableModule } from 'primeng/table';
import { DialogModule } from 'primeng/dialog';
import { ConfirmDialogModule } from "@shared/components/confirm-dialog/confirm-dialog.module";
import { TextFieldModule } from "@shared/components/text-field/text-field.module";
import { PhoneFieldModule } from "@shared/components/phone-field/phone-field.module";
import { PasswordFieldModule } from "@shared/components/password-field/password-field.module";

@NgModule({
    declarations: [
        LecturersComponent,
    ],
    imports: [
        CommonModule,
        FormsModule,
        // Components
        NavigationModule,
        TextFieldModule,
        PhoneFieldModule,
        PasswordFieldModule,
        ButtonModule,
        ConfirmDialogModule,
        // PrimeNg
        TableModule,
        DialogModule,
    ],
    exports: [
        LecturersComponent,
    ]
})
export class LecturersModule {}