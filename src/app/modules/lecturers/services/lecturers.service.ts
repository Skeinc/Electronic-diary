import { Injectable } from "@angular/core";
import { HttpService } from "@core/services/http.service";
import { LecturerModel } from "@shared/models/lecturer.model";
import { Observable } from "rxjs";

@Injectable({
    providedIn: 'root',
})
export class LecturersService {
    constructor (
        private httpService: HttpService,
    ) {}

    // Метод для получения всех преподавателей
    public getAllLecturers(): Observable<LecturerModel[]> {
        return this.httpService.get('teachers/getAllTeachers');
    };

    // Метод для добавления преподавателя
    public addLecturer(request: LecturerModel): Observable<any> {
        const body = request;

        return this.httpService.post('teachers/addTeacher', body);
    };

    // Метод для удаления преподавателя по ID
    public deleteLecturerByID(id: number): Observable<any> {
        const body = { id };

        return this.httpService.delete('teachers/deleteTeacher', body);
    };
};