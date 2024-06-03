import { NgModule } from "@angular/core";
import { RecoveryComponent } from "./components/recovery.component";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { RouterLink } from "@angular/router";

@NgModule({
    declarations: [
        RecoveryComponent,
    ],
    imports: [
        CommonModule,
        FormsModule,
        RouterLink,
    ],
    exports: [
        RecoveryComponent,
    ]
})
export class RecoveryModule {}