import { NgModule } from "@angular/core";
import { PersonalComponent } from "./components/personal.component";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { NavigationModule } from "@shared/components/navigation/navigation.module";

@NgModule({
    declarations: [
        PersonalComponent,
    ],
    imports: [
        CommonModule,
        FormsModule,
        // Components
        NavigationModule,
    ],
    exports: [
        PersonalComponent,
    ]
})
export class PersonalModule {}