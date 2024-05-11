import { NgModule } from "@angular/core";
import { NavigationComponent } from "./navigation.component";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { RouterLink } from "@angular/router";
import { LoaderModule } from "../loader/loader.module";

@NgModule({
    declarations: [
        NavigationComponent,
    ],
    imports: [
        CommonModule,
        FormsModule,
        RouterLink,
        // Components
        LoaderModule,
    ],
    exports: [
        NavigationComponent,
    ]
})
export class NavigationModule {}