import { NgModule } from "@angular/core";
import { UndefinedComponent } from "./components/undefined.component";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { RouterLink } from "@angular/router";

@NgModule({
    declarations: [
        UndefinedComponent,
    ],
    imports: [
        CommonModule,
        FormsModule,
        RouterLink,
    ],
    exports: [
        UndefinedComponent,
    ]
})
export class UndefinedModule {}