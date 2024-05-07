import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, catchError, map, timeout } from "rxjs";
import { getURL } from "../utilities/get-url.util";
import { ResponseInterface } from "@shared/interfaces/api/response.interface";
import { requestHandler } from "../utilities/request-handler.util";

@Injectable({
    providedIn: 'root',
})
export class HttpService {
    constructor (
        private httpClient: HttpClient,
    ) {}

    // Тайм-аут по умолчанию
    private defaultTimeout: number = 20_000;

    // HTTP GET-запрос
    public get<T>(
        endPoint: string,
        params?: HttpParams,
        config: { [key: string]: string } = {},
        responseType: 'json' = 'json',
        headers?: HttpHeaders,
    ): Observable<T> {
        const URL = getURL(endPoint);

        return this.httpClient.get<ResponseInterface<T>>(URL, {
            headers,
            withCredentials: true,
            responseType,
            params,
            ...config,
        }).pipe(timeout(this.defaultTimeout), catchError(err => {
            throw new Error(err, {
                cause: { text: 'Timeout is over' },
            });
        }),
            map(response => requestHandler(response)),
        );
    };

    // HTTP POST-запрос
    public post<T, D>(
        endPoint: string,
        data?: D,
        params?: {
            [key: string]: string;
        },
        config: {} = {},
        responseType: 'json' = 'json',
    ): Observable<T> {
        const URL = getURL(endPoint);

        return this.httpClient.post<ResponseInterface<T>>(URL, data, {
            withCredentials: true,
            responseType,
            ...(params ? { params } : {}),
            ...config,
        }).pipe(timeout(this.defaultTimeout), catchError(err => {
            throw new Error(err, {
                cause: { text: 'Timeout is over' },
            });
        }),
            map(response => requestHandler(response)),
        );
    };

    // HTTP PUT-запрос
    public put<T, D>(
        endPoint: string,
        data?: D,
        params?: {
           [key: string]: string;
        },
        config: {} = {},
        responseType: 'json' = 'json', 
    ): Observable<T> {
        const URL = getURL(endPoint);

        return this.httpClient.put<ResponseInterface<T>>(URL, data, {
            withCredentials: true,
            responseType,
            ...(params ? { params } : {}),
            ...config,
        }).pipe(timeout(this.defaultTimeout), catchError(err => {
            throw new Error(err, {
                cause: { text: 'Timeout is over' },
            });
        }),
            map(response => requestHandler(response)),
        );
    };

    // HTTP PATCH-запрос
    public patch<T,D>(
        endPoint: string,
        data?: D,
        params?: {
           [key: string]: string;
        },
        config: {} = {},
        responseType: 'json' = 'json',
    ): Observable<T> {
        const URL = getURL(endPoint);

        return this.httpClient.patch<ResponseInterface<T>>(URL, data, {
            withCredentials: true,
            responseType,
            ...(params ? { params } : {}),
            ...config,
        }).pipe(timeout(this.defaultTimeout), catchError(err => {
            throw new Error(err, {
                cause: { text: 'Timeout is over' },
            });
        }),
            map(response => requestHandler(response)),
        );
    };

    // HTTP DELETE-запрос
    public delete<T>(
        endPoint: string,
        body: any = {},
        params: HttpParams = new HttpParams(),
        config: { [key: string]: string } = {},
        responseType: 'json' = 'json',
        headers?: HttpHeaders,
    ): Observable<T> {
        const URL = getURL(endPoint);

        return this.httpClient.delete<ResponseInterface<T>>(URL, {
            params,
            headers,
            withCredentials: true,
            body,
            responseType,
            ...config,
        }).pipe(timeout(this.defaultTimeout), catchError(err => {
            throw new Error(err, {
                cause: { text: 'Timeout is over' },
            });
        }),
            map(response => requestHandler(response)),
        );
    };
}