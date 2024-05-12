import { NgModule } from "@angular/core";
import { OverviewComponent } from "./components/overview.component";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { ButtonModule } from "@shared/components/button/button.module";

@NgModule({
    declarations: [
        OverviewComponent,
    ],
    imports: [
        CommonModule,
        FormsModule,
        // Components
        ButtonModule,
    ],
    exports: [
        OverviewComponent,
    ],
})
export class OverviewModule {}