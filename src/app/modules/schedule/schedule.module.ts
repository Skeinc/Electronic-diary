import { NgModule } from "@angular/core";
import { ScheduleComponent } from "./components/schedule.component";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { DropdownModule } from "@shared/components/dropdown/dropdown.module";
import { ButtonModule } from "@shared/components/button/button.module";
import { LoaderModule } from "@shared/components/loader/loader.module";
import { NavigationModule } from "@shared/components/navigation/navigation.module";
import { TextFieldModule } from "@shared/components/text-field/text-field.module";

@NgModule({
    declarations: [
        ScheduleComponent,
    ],
    imports: [
        CommonModule,
        FormsModule,
        // Components
        NavigationModule,
        DropdownModule,
        ButtonModule,
        LoaderModule,
        TextFieldModule,
    ],
    exports: [
        ScheduleComponent,
    ],
})
export class ScheduleModule {}