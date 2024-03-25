import { CommonModule } from "@angular/common";
import { HttpClientModule } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppComponent } from "./app.component";
import { ApplicationModule } from "./modules/application/application.module";
import { AppRoutingModule } from "./app-routing.module";

@NgModule({
    declarations: [
        AppComponent,
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        CommonModule,
        FormsModule,
        HttpClientModule,
        // Modules
        AppRoutingModule,
        ApplicationModule,
    ],
    providers: [

    ],
    bootstrap: [
        AppComponent,
    ],
})
export class AppModule {}