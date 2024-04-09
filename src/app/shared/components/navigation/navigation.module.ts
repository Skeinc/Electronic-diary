import { NgModule } from "@angular/core";
import { NavigationComponent } from "./navigation.component";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";

@NgModule({
    declarations: [
        NavigationComponent,
    ],
    imports: [
        CommonModule,
        FormsModule,
    ],
    exports: [
        NavigationComponent,
    ]
})
export class NavigationModule {}