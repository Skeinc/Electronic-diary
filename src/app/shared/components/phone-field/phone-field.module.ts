import { NgModule } from "@angular/core";
import { PhoneFieldComponent } from "./phone-field.component";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { PhoneNumberPatternDirective } from "../../directives/phone-number-patterns.directive";

@NgModule({
    declarations: [
        PhoneFieldComponent,
        PhoneNumberPatternDirective,
    ],
    imports: [
        CommonModule,
        FormsModule,
    ],
    exports: [
        PhoneFieldComponent,
    ]
})
export class PhoneFieldModule {}