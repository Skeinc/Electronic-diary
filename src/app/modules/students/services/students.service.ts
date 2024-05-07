import { Injectable } from "@angular/core";
import { HttpService } from "@core/services/http.service";
import { Observable } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class StudentsService {
    constructor (
        private httpService: HttpService,
    ) {}

    // Метод для получения всех студентов
    public getAllStudents(): Observable<any> {
        return this.httpService.get('students/getAllStudents');
    };

    // Метод для удаления студента по ID
    public deleteStudentByID(id: number): Observable<any> {
        const body = { id };

        return this.httpService.delete('students/deleteStudent', body);
    }
}