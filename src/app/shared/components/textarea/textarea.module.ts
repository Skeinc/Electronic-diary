import { NgModule } from "@angular/core";
import { TextareaComponent } from "./textarea.component";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";

@NgModule({
    declarations: [
        TextareaComponent,
    ],
    imports: [
        CommonModule,
        FormsModule,
    ],
    exports: [
        TextareaComponent,
    ]
})
export class TextareaModule {}