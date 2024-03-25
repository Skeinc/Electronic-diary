import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { TextFieldComponent } from "./text-field.component";

@NgModule({
    declarations: [
        TextFieldComponent,
    ],
    imports: [
        CommonModule,
        FormsModule,
    ],
    exports: [
        TextFieldComponent,
    ],
})
export class TextFieldModule {}