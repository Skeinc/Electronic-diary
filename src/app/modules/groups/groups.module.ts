import { NgModule } from "@angular/core";
import { GroupsComponent } from "./components/groups.component";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { NavigationModule } from "@shared/components/navigation/navigation.module";
import { TextFieldModule } from "@shared/components/text-field/text-field.module";
import { ButtonModule } from "@shared/components/button/button.module";
import { ConfirmDialogModule } from "@shared/components/confirm-dialog/confirm-dialog.module";
import { TableModule } from "primeng/table";
import { DialogModule } from "primeng/dialog";
import { LoaderModule } from "@shared/components/loader/loader.module";

@NgModule({
    declarations: [
        GroupsComponent,
    ],
    imports: [
        CommonModule,
        FormsModule,
        // Components
        NavigationModule,
        TextFieldModule,
        ButtonModule,
        ConfirmDialogModule,
        LoaderModule,
        // PrimeNg
        TableModule,
        DialogModule,
    ],
    exports: [
        GroupsComponent,
    ]
})
export class GroupsModule {}