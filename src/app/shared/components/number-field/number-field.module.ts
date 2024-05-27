import { NgModule } from "@angular/core";
import { NumberFieldComponent } from "./number-field.component";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";

@NgModule({
    declarations: [
        NumberFieldComponent,
    ],
    imports: [
        CommonModule,
        FormsModule,
    ],
    exports: [
        NumberFieldComponent,
    ]
})
export class NumberFieldModule {}