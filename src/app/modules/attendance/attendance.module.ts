import { NgModule } from "@angular/core";
import { AttendanceComponent } from "./components/attendance.component";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { NavigationModule } from "@shared/components/navigation/navigation.module";
import { LoaderModule } from "@shared/components/loader/loader.module";
import { DropdownModule } from "@shared/components/dropdown/dropdown.module";
import { ButtonModule } from "@shared/components/button/button.module";

@NgModule({
    declarations: [
        AttendanceComponent,
    ],
    imports: [
        CommonModule,
        FormsModule,
        // Components
        NavigationModule,
        LoaderModule,
        DropdownModule,
        ButtonModule,
    ],
    exports: [
        AttendanceComponent,
    ]
})
export class AttendanceModule {}