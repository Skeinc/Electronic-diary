import { NgModule } from "@angular/core";
import { AuthorizationComponent } from "./components/authorization.component";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { TextFieldModule } from "@shared/components/text-field/text-field.module";
import { PasswordFieldModule } from "@shared/components/password-field/password-field.module";
import { ButtonModule } from "@shared/components/button/button.module";
import { PhoneFieldModule } from "@shared/components/phone-field/phone-field.module";

@NgModule({
    declarations: [
        AuthorizationComponent,
    ],
    imports: [
        CommonModule,
        FormsModule,
        // Components
        TextFieldModule,
        PhoneFieldModule,
        PasswordFieldModule,
        ButtonModule,
    ],
    exports: [
        AuthorizationComponent,
    ],
})
export class AuthorizationModule {}