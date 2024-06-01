import { NgModule } from "@angular/core";
import { MarksComponent } from "./components/marks.component";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { NavigationModule } from "@shared/components/navigation/navigation.module";
import { LoaderModule } from "@shared/components/loader/loader.module";

@NgModule({
    declarations: [
        MarksComponent,
    ],
    imports: [
        CommonModule,
        FormsModule,
        // Components
        NavigationModule,
        LoaderModule,
    ],
    exports: [
        MarksComponent,
    ]
})
export class MarksModule {}