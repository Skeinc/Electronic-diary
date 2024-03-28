import { environment } from "@environments/environment";

// Формирование URL
export function getURL(endPoint: string): string {
    return `${environment.protocol}://${environment.domain}/${endPoint}`;
}