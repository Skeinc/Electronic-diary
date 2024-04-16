import { NgModule } from "@angular/core";
import { ConfirmDialogComponent } from "./confirm-dialog.component";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";

@NgModule({
    declarations: [
        ConfirmDialogComponent,
    ],
    imports: [
        CommonModule,
        FormsModule,
    ],
    exports: [
        ConfirmDialogComponent,
    ]
})
export class ConfirmDialogModule {}