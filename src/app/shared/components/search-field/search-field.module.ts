import { NgModule } from "@angular/core";
import { SearchFieldComponent } from "./search-field.component";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";

@NgModule({
    declarations: [
        SearchFieldComponent,
    ],
    imports: [
        CommonModule,
        FormsModule,
    ],
    exports: [
        SearchFieldComponent,
    ]
})
export class SearchFieldModule {}