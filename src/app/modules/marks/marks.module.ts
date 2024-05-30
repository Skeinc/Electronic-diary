import { NgModule } from "@angular/core";
import { MarksComponent } from "./components/marks.component";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";

@NgModule({
    declarations: [
        MarksComponent,
    ],
    imports: [
        CommonModule,
        FormsModule,
    ],
    exports: [
        MarksComponent,
    ]
})
export class MarksModule {}