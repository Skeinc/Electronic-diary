import { NgModule } from "@angular/core";
import { RequestsComponent } from "./components/requests.component";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";

@NgModule({
    declarations: [
        RequestsComponent,
    ],
    imports: [
        CommonModule,
        FormsModule,
    ],
    exports: [
        RequestsComponent,
    ]
})
export class RequestsModule {}