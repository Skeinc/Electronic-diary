import { NgModule } from "@angular/core";
import { RequestsComponent } from "./components/requests.component";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { NavigationModule } from "@shared/components/navigation/navigation.module";
import { TableModule } from "primeng/table";
import { ConfirmDialogModule } from "@shared/components/confirm-dialog/confirm-dialog.module";
import { LoaderModule } from "@shared/components/loader/loader.module";

@NgModule({
    declarations: [
        RequestsComponent,
    ],
    imports: [
        CommonModule,
        FormsModule,
        // Components
        NavigationModule,
        ConfirmDialogModule,
        LoaderModule,
        // PrimeNG
        TableModule,
    ],
    exports: [
        RequestsComponent,
    ]
})
export class RequestsModule {}