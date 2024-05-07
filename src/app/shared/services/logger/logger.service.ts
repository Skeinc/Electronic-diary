import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root',
})
export class LoggerService {
    public message(type: 'message' | 'warning' | 'error' | 'debug' | 'backend', message: string, data?: any): void {
        const typeStyle = 'padding: 6px; font-weight: 700; font-size: 10px; color: white; border-radius: 6px; font-family: Montserrat, sans-serif;';

        const messageStyle = 'margin: 10px 6px; font-weight: 600; font-size: 11px; color: rgba(32, 32, 32, 1); font-family: Montserrat, sans-serif;';

        switch (type) {
            case 'message':
                if(data) {
                    console.groupCollapsed(
                        "%c%s%c%s",
                        `${typeStyle} background-color: rgba(34, 197, 94, 1)`,
                        type.toUpperCase(),
                        `${messageStyle}`,
                        message,
                    );
                    console.log(data);
                    console.groupEnd();  
                }
                else {
                    console.log(
                        "%c%s%c%s",
                        `${typeStyle} background-color: rgba(34, 197, 94, 1)`,
                        type.toUpperCase(),
                        `${messageStyle}`,
                        message,
                    );
                }
                break;

            case 'warning':
                if(data) {
                    console.groupCollapsed(
                        "%c%s%c%s",
                        `${typeStyle} background-color: rgba(255, 207, 36)`,
                        type.toUpperCase(),
                        `${messageStyle}`,
                        message,
                    );
                    console.warn(data);
                    console.groupEnd();  
                }
                else {
                    console.log(
                        "%c%s%c%s",
                        `${typeStyle} background-color: rgba(255, 207, 36)`,
                        type.toUpperCase(),
                        `${messageStyle}`,
                        message,
                    );
                }
                break;

            case 'error':
                if(data) {
                    console.groupCollapsed(
                        "%c%s%c%s",
                        `${typeStyle} background-color: rgba(255, 70, 70, 1)`,
                        type.toUpperCase(),
                        `${messageStyle}`,
                        message,
                    );
                    console.error(data);
                    console.groupEnd();  
                }
                else {
                    console.log(
                        "%c%s%c%s",
                        `${typeStyle} background-color: rgba(255, 70, 70, 1)`,
                        type.toUpperCase(),
                        `${messageStyle}`,
                        message,
                    );
                }
                break;

            case 'debug':
                if(data) {
                    console.groupCollapsed(
                        "%c%s%c%s",
                        `${typeStyle} background-color: rgba(200, 200, 200, 1)`,
                        type.toUpperCase(),
                        `${messageStyle}`,
                        message,
                    );
                    console.log(data);
                    console.groupEnd();  
                }
                else {
                    console.log(
                        "%c%s%c%s",
                        `${typeStyle} background-color: rgba(200, 200, 200, 1)`,
                        type.toUpperCase(),
                        `${messageStyle}`,
                        message,
                    );
                }
                break;

            case 'backend':
                if(data) {
                    console.groupCollapsed(
                        "%c%s%c%s",
                        `${typeStyle} background-color: rgba(129, 48, 179, 1)`,
                        type.toUpperCase(),
                        `${messageStyle}`,
                        message,
                    );
                    console.dir(data);
                    console.groupEnd();
                }
                else {
                    console.log(
                        "%c%s%c%s",
                        `${typeStyle} background-color: rgba(129, 48, 179, 1)`,
                        type.toUpperCase(),
                        `${messageStyle}`,
                        message,
                    );
                }
                break;

            default:
                break;
        }
    }
}