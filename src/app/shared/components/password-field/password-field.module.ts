import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { PasswordFieldComponent } from "./password-field.component";

@NgModule({
    declarations: [
        PasswordFieldComponent,
    ],
    imports: [
        CommonModule,
        FormsModule,
    ],
    exports: [
        PasswordFieldComponent,
    ]
})
export class PasswordFieldModule {}