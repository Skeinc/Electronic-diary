import { NgModule } from "@angular/core";
import { AuthorizationComponent } from "./components/authorization.component";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";

@NgModule({
    declarations: [
        AuthorizationComponent,
    ],
    imports: [
        CommonModule,
        FormsModule,
    ],
    exports: [
        AuthorizationComponent,
    ],
})
export class AuthorizationModule {}