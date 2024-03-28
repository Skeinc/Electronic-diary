import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { getURL } from "../utilities/get-url.util";

@Injectable({
    providedIn: 'root',
})
export class HttpService {
    constructor (
        private http: HttpClient,
    ) {}

    // HTTP GET-запрос
    private get<T>(endPoint: string, params?: HttpParams): Observable<T> {
        const URL = getURL(endPoint);

        return this.http.get<T>(URL, { params });
    }

    // HTTP POST-запрос
    private post<T>(endPoint: string, body: any): Observable<T> {
        const URL = getURL(endPoint);

        return this.http.post<T>(URL, body);
    }

    // HTTP PUT-запрос
    private put<T>(endPoint: string, body: any): Observable<T> {
        const URL = getURL(endPoint);

        return this.http.put<T>(URL, body);
    }

    // HTTP PATCH-запрос
    private patch<T>(endPoint: string, body: any): Observable<T> {
        const URL = getURL(endPoint);

        return this.http.patch<T>(URL, body);
    }

    // HTTP DELETE-запрос
    private delete<T>(endPoint: string, params?: HttpParams): Observable<T> {
        const URL = getURL(endPoint);

        return this.http.delete<T>(URL, { params });
    }
}