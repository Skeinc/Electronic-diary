import { NgModule } from "@angular/core";
import { WaitingComponent } from "./components/waiting.component";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { RouterLink } from "@angular/router";

@NgModule({
    declarations: [
        WaitingComponent,
    ],
    imports: [
        CommonModule,
        FormsModule,
        RouterLink,
    ],
    exports: [
        WaitingComponent,
    ],
})
export class WaitingModule {}