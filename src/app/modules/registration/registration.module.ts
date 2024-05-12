import { NgModule } from "@angular/core";
import { RegistrationComponent } from "./components/registration.component";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { LoaderModule } from "@shared/components/loader/loader.module";
import { TextFieldModule } from "@shared/components/text-field/text-field.module";
import { PhoneFieldModule } from "@shared/components/phone-field/phone-field.module";
import { PasswordFieldModule } from "@shared/components/password-field/password-field.module";
import { ButtonModule } from "@shared/components/button/button.module";
import { DropdownModule } from "@shared/components/dropdown/dropdown.module";

@NgModule({
    declarations: [
        RegistrationComponent,
    ],
    imports: [
        CommonModule,
        FormsModule,
        // Components
        LoaderModule,
        TextFieldModule,
        PhoneFieldModule,
        PasswordFieldModule,
        DropdownModule,
        ButtonModule,
    ],
    exports: [
        RegistrationComponent,
    ],
})
export class RegistrationModule {}