import { ResponseInterface } from "@shared/interfaces/api/response.interface";

export function requestHandler<T>(response: ResponseInterface<T>): T {
    if(response.success) {
        return response.data!;
    }
    else {
        throw new Error(`Server error: ${response.message}`);
    }
}