import { NgModule } from "@angular/core";
import { PersonalComponent } from "./components/personal.component";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { NavigationModule } from "@shared/components/navigation/navigation.module";
import { TextFieldModule } from "@shared/components/text-field/text-field.module";
import { PasswordFieldModule } from "@shared/components/password-field/password-field.module";
import { ButtonModule } from "@shared/components/button/button.module";
import { PhoneFieldModule } from "@shared/components/phone-field/phone-field.module";
import { DropdownModule } from "@shared/components/dropdown/dropdown.module";
import { DialogModule } from "primeng/dialog";

@NgModule({
    declarations: [
        PersonalComponent,
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
        DropdownModule,
        // PrimeNg
        DialogModule,
    ],
    exports: [
        PersonalComponent,
    ]
})
export class PersonalModule {}