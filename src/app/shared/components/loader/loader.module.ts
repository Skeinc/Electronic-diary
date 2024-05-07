import { NgModule } from "@angular/core";
import { LoaderComponent } from "./loader.component";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";

@NgModule({
    declarations: [
        LoaderComponent,
    ],
    imports: [
        CommonModule,
        FormsModule,
    ],
    exports: [
        LoaderComponent,
    ]
})
export class LoaderModule {}