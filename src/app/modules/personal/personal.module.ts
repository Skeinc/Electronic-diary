import { NgModule } from "@angular/core";
import { PersonalComponent } from "./components/personal.component";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { NavigationModule } from "@shared/components/navigation/navigation.module";
import { TextFieldModule } from "@shared/components/text-field/text-field.module";
import { PasswordFieldModule } from "@shared/components/password-field/password-field.module";
import { ButtonModule } from "@shared/components/button/button.module";

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
        PasswordFieldModule,
        ButtonModule,
    ],
    exports: [
        PersonalComponent,
    ]
})
export class PersonalModule {}