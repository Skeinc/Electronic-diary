import { HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { HttpService } from "@core/services/http.service";
import { Observable } from "rxjs";

@Injectable({
    providedIn: 'root',
})
export class SubjectsService {
    constructor (
        private httpService: HttpService,
    ) {}

    // Метод для получения предмета по ID
    public getSubjectByID(id: number): Observable<any> {
        const body: HttpParams = new HttpParams().set('id', id);

        return this.httpService.get('subjects/getSubjectByID', body);
    };

    // Метод для получения всех предметов
    public getAllSubjects(): Observable<any> {
        return this.httpService.get('subjects/getAllSubjects');
    };

    // Метод для создания предмета
    public addSubject(request: any): Observable<any> {
        const body = request;

        return this.httpService.post('subjects/addSubject', body);
    };

    // Метод для редактирования предмета
    public editSubject(request: any): Observable<any> {
        const body = request;

        return this.httpService.put('subjects/editSubject', body);
    };

    // Метод для удаления предмета по ID
    public deleteSubject(id: number): Observable<any> {
        const body = { id };

        return this.httpService.delete('subjects/deleteSubjectByID', body);
    };

    // Метод для получения предметов по ID преподавателя
    public getAllSubjectsByLecturerID(id: number): Observable<any> {
        const body: HttpParams = new HttpParams().set('id', id);

        return this.httpService.get('subjects/getSubjectsByTeacherID', body);
    };

    // Метод для получения предметов по ID студента
    public getAllSubjectsByStudentID(groupID: number, studentID: number): Observable<any> {
        const body: HttpParams = new HttpParams().set('groupID', groupID).set('studentID', studentID);

        return this.httpService.get('subjects/getStudentAnalytics', body);
    };

    // Метод для получения предметов по ID группы
    public getAllSubjectsByGroupID(id: number): Observable<any> {
        const body: HttpParams = new HttpParams().set('id', id);

        return this.httpService.get('subjects/getSubjectsByGroupID', body);
    };
}