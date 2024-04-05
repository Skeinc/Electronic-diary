import { NgModule } from "@angular/core";
import { CodeFieldComponent } from "./code-field.component";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";

@NgModule({
    declarations: [
        CodeFieldComponent,
    ],
    imports: [
        CommonModule,
        FormsModule,
    ],
    exports: [
        CodeFieldComponent,
    ]
})
export class CodeFieldModule {}