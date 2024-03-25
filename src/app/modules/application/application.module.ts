import { NgModule } from "@angular/core";
import { RouterOutlet } from "@angular/router";
import { ApplicationComponent } from "./components/application.component";

@NgModule({
    declarations: [
        ApplicationComponent,
    ],
    imports: [
        RouterOutlet,
    ],
    exports: [
        ApplicationComponent,
    ]
})
export class ApplicationModule {}