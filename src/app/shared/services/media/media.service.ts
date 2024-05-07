import { HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { HttpService } from "@core/services/http.service";
import { Observable } from "rxjs";

@Injectable({
    providedIn: 'root',
})
export class MediaService {
    constructor(
        private httpService: HttpService,
    ) {}

    // Метод для загрузки медиафайла на сервер
    uploadFile(file: File): Observable<any> {
        const body: FormData = new FormData();

        body.append("file", file);

        return this.httpService.post('media/uploadFile', body);
    }

    // Метод для получения медиафайла по ID
    getMediaByID(id: string): Observable<any> {
        const body: HttpParams = new HttpParams().set('id', id);

        return this.httpService.get('media/file', body);
    }
}