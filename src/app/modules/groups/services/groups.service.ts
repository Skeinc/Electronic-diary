import { HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { HttpService } from "@core/services/http.service";
import { GroupModel } from "@shared/models/group.model";
import { Observable } from "rxjs";

@Injectable({
    providedIn: 'root',
})
export class GroupsService {
    constructor (
        private httpService: HttpService,
    ) {}

    // Метод на получение всех групп
    public getAllGroups(): Observable<GroupModel[]> {
        return this.httpService.get('groups/getGroups');
    };

    // Метод на получение группы по кодировке
    public getGroupByCode(code: string): Observable<any> {
        const body: HttpParams = new HttpParams().set('code', code);

        return this.httpService.get('groups/getGroupByCode', body);
    };

    // Метод на получение групп по ID предмета
    public getGroupsBySubjectID(id: number): Observable<any> {
        const body: HttpParams = new HttpParams().set('subjectID', id);

        return this.httpService.get('groups/getGroupsBySubjectID', body);
    };

    // Метод на получение всех кодировок групп
    public getAllGroupCodes(): Observable<string[]> {
        return this.httpService.get('groups/getAllGroupCodes');
    };

    // Метод на добавление группы
    public addGroup(request: GroupModel): Observable<any> {
        const body = request;

        return this.httpService.post('groups/addGroup', body);
    };

    // Метод на изменение группы
    public editGroup(request: any): Observable<any> {
        const body = request;

        return this.httpService.put('groups/editGroup', body);
    };

    // Метод на удаление группы по ID
    public deleteGroupByID(id: number): Observable<any> {
        const body = { id };

        return this.httpService.delete('groups/deleteGroupByID', body);
    };
};