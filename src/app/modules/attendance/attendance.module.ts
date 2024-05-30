import { NgModule } from "@angular/core";
import { AttendanceComponent } from "./components/attendance.component";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";

@NgModule({
    declarations: [
        AttendanceComponent,
    ],
    imports: [
        CommonModule,
        FormsModule,
    ],
    exports: [
        AttendanceComponent,
    ]
})
export class AttendanceModule {}