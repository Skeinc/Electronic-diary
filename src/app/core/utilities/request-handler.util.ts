import { ResponseInterface } from "@shared/interfaces/api/response.interface";

export function requestHandler<T>(response: ResponseInterface<T>): T {
    const { success, data, message} = response;

    if(success) {
        return data!;
    }
    else {
        throw new Error(`Server error: ${message}`);
    }
}