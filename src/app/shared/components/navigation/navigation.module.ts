import { NgModule } from "@angular/core";
import { NavigationComponent } from "./navigation.component";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { RouterLink } from "@angular/router";

@NgModule({
    declarations: [
        NavigationComponent,
    ],
    imports: [
        CommonModule,
        FormsModule,
        RouterLink,
    ],
    exports: [
        NavigationComponent,
    ]
})
export class NavigationModule {}