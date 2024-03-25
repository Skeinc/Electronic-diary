import { Component, Input } from "@angular/core";
import { TextFieldInterface } from "../../interfaces/components/text-field.interface";

@Component({
    selector: 'app-text-field',
    templateUrl: './text-field.component.html',
    styleUrl: './text-field.component.scss',
})
export class TextFieldComponent {
    // Конфигурация компонента
    @Input() config!: TextFieldInterface;
}