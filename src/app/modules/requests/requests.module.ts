import { NgModule } from "@angular/core";
import { RequestsComponent } from "./components/requests.component";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { NavigationModule } from "@shared/components/navigation/navigation.module";

@NgModule({
    declarations: [
        RequestsComponent,
    ],
    imports: [
        CommonModule,
        FormsModule,
        // Components
        NavigationModule,
    ],
    exports: [
        RequestsComponent,
    ]
})
export class RequestsModule {}