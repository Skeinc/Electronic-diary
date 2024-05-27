import { ChangeDetectorRef, Component, OnInit } from "@angular/core";
import { LoggerService } from "@shared/services/logger/logger.service";
import { TopicsService } from "../services/topics.service";
import { TasksService } from "../services/tasks.service";
import { TopicModel } from "@shared/models/topic.model";
import { TaskModel } from "@shared/models/task.model";
import { animate, state, style, transition, trigger } from "@angular/animations";
import { MediaService } from "@shared/services/media/media.service";
import { UploadMediaInterface } from "@shared/interfaces/backend/media/media.interface";
import { ActivatedRoute } from "@angular/router";
import { SubjectModel } from "@shared/models/subject.model";
import { SubjectsService } from "@modules/subjects/services/subjects.service";
import { environment } from "@environments/environment";
import { GroupModel } from "@shared/models/group.model";
import { GroupsService } from "@modules/groups/services/groups.service";
import { StudentsService } from "@modules/students/services/students.service";
import { StudentModel } from "@shared/models/student.model";
import { TaskMarksMocks } from "../mocks/task-marks.mocks";

@Component({
    selector: 'app-subject-page',
    templateUrl: './subject-page.component.html',
    styleUrl: './subject-page.component.scss',
    animations: [
        trigger('expandCollapse', [
            state('collapsed', style({
                height: '0',
                overflow: 'hidden',
                opacity: '0'
            })),
            state('expanded', style({
                height: '*',
                overflow: 'visible',
                opacity: '1'
            })),
            transition('collapsed => expanded', [
                animate('300ms ease-out')
            ]),
            transition('expanded => collapsed', [
                animate('300ms ease-in')
            ])
        ]),
    ],
})
export class SubjectPageComponent implements OnInit {
    constructor(
        private subjectsService: SubjectsService,
        private studentsService: StudentsService,
        private topicsService: TopicsService,
        private loggerService: LoggerService,
        private groupsService: GroupsService,
        private tasksService: TasksService,
        private mediaService: MediaService,
        private cdr: ChangeDetectorRef,
        private route: ActivatedRoute
    ) { }

    // Определяет открыта ли меню
    isNavigationOpened: boolean = false;

    // ID предмета, на который произошла переадресация
    subjectID: number | null = null;

    // Информация о предмете, на который произошла переадресация
    subjectInformationData: SubjectModel | null = null;

    // Переменная, обозначающая статус загрузки данных
    isDataLoading: boolean = false;

    // Переменная, контролирующая видимость окна подверждения
    isConfirmDialogVisible: boolean = false;

    // Массив булевых значений, означающие видимость тем
    isTopicFlagsVisible: boolean[] = [];

    // Массив булевых значений, означающие видимость заданий
    isTaskFlagsVisible: boolean[] = [];

    // Переменная обозначает видимость окна добавления темы
    isAddingTopicDialogVisible: boolean = false;

    // Переменная обозначает видимость окна добавления задания
    isAddingTaskDialogVisible: boolean = false;

    // Переменная обозначает сообщение об ошибке для окна добавления темы
    dialogAddErrorMessage: string | null = null;

    // Переменная обозначает сообщение об ошибке для окна добавления задания
    dialogAddTaskErrorMessage: string | null = null;

    // Переменные для содержания данных окна добавление темы
    dialogAddTopicName: string = '';
    dialogAddTopicDescription: string = '';

    // Переменные для содержания данных окна добавления задания
    dialogAddTaskName: string = '';
    dialogAddTaskDescription: string = '';

    // Переменная обозначает видимость окна обновления темы
    isEditingTopicDialogVisible: boolean = false;

    // Переменная обозначает видимость окна обновления задания
    isEditingTaskDialogVisible: boolean = false;

    // Переменная обозначает сообщение об ошибке для окна обновления темы
    dialogEditErrorMessage: string | null = null;

    // Переменная обозначает сообщение об ошибке для окна обновления задания
    dialogEditTaskErrorMessage: string | null = null;

    // Переменные для содержания данных окна обновления темы
    dialogEditTopicName: string = '';
    dialogEditTopicDescription: string = '';

    // Переменные для содержания данных окна обновления задания
    dialogEditTaskName: string = '';
    dialogEditTaskDescription: string = '';

    // ID темы, для которой хотят создать задание
    addTopicID: number | null = null;

    // ID темы, которую хотят редактировать
    editTopicID: number | null = null;

    // ID задания, которого хотят редактировать
    editTaskID: number | null = null;

    // ID темы, которую хотят удалить
    deleteTopicID: number | null = null;

    // ID задания, которого хотят удалить
    deleteTaskID: number | null = null;

    // Доступные темы
    avaliableTopics: TopicModel[] | null = null;

    // Доступные задания
    avaliableTasks: TaskModel[] | null = null;

    // Данные загруженных файлов
    uploadedFile: File | null = null;
    uploadedFileID: string | null = null;
    selectedFileName: string | null = null;

    // Переменная определяет видимость окна выбора группы
    isSelectedGroupDialogVisible: boolean = false;

    // Переменная обозначает ошибку в окне выбора группы
    selectedGroupDialogError: string | null = null;

    // Доступные группы
    avaliableGroups: GroupModel[] | null = null;

    // Данные оценок по заданию и группе
    marksByGroupAndTasksData: any[] | null = null;

    // Выбранная группа
    selectedGroup: GroupModel | null = null;

    // Переменная обозначает видимость окна выставления оценок
    isRatingsDialogVisible: boolean = false;

    // Переменная обозначает к какому заданию выставляют оценки
    ratingsTaskID: number | null = null;

    // Переменная обозначает какой группе выставляют оценки
    ratingsGroupID: number | null = null;

    // Переменная, которая контролирует редактируемость окна выставления оценки
    isMarksByGroupAndTasksEditable: boolean = false;

    ngOnInit(): void {
        // Получаем subjectID из queryParams
        this.route.queryParams.subscribe(async params => {
            this.subjectID = params['id'] ?? '';
        });

        // Получаем информацию о предмете по ID
        if(this.subjectID !== null) {
            this.getSubjectInformationByID(this.subjectID);
        };

        // Получаем все темы предмета
        if(this.subjectID !== null) {
            this.getAllTopicsBySubjectID(this.subjectID!);
        };
    };

    // Метод для получения информации о предмете
    getSubjectInformationByID(id: number): void {
        this.isDataLoading = true;

        this.subjectsService.getSubjectByID(id).subscribe({
            next: (response: SubjectModel) => {
                this.subjectInformationData = response;

                this.loggerService.message('backend', 'Subject information data was received', response);

                this.cdr.detectChanges();
            },
            error: (err) => {
                this.loggerService.message('error', 'Error with get subject information data', err);

                this.isDataLoading = false;

                this.cdr.detectChanges();
            },
            complete: () => {
                this.isDataLoading = false;

                this.cdr.detectChanges();
            },
        });
    };

    // Метод для получения всех тем по ID предмета
    getAllTopicsBySubjectID(id: number): void {
        this.isDataLoading = true;

        this.topicsService.getAllTopicsBySubjectID(id).subscribe({
            next: (response: TopicModel[]) => {
                this.avaliableTopics = response;

                this.loggerService.message('backend', 'All topics information was received', response);

                this.cdr.detectChanges();
            },
            error: (err) => {
                this.loggerService.message('error', 'Error with get all topics information', err);

                this.isDataLoading = false;

                this.cdr.detectChanges();
            },
            complete: () => {
                for(let index = 0; index < this.avaliableTopics?.length!; index++) {
                    this.isTopicFlagsVisible.push(false);
                };

                this.isDataLoading = false;

                this.cdr.detectChanges();
            },
        });
    };

    // Метод для получения всех заданий по ID темы
    getAllTasksByTopicID(id: number): void {
        this.isDataLoading = true;

        this.tasksService.getAllTasksByTopicID(id).subscribe({
            next: (response: TaskModel[]) => {
                this.avaliableTasks = response.sort((a, b) => a.id - b.id);
                
                this.loggerService.message('backend', 'All tasks information was received', response);

                this.cdr.detectChanges();
            },
            error: (err) => {
                this.loggerService.message('error', 'Error with get all tasks information', err);

                this.isDataLoading = false;

                this.cdr.detectChanges();
            },
            complete: () => {
                for(let index = 0; index < this.avaliableTasks?.length!; index++) {
                    this.isTaskFlagsVisible.push(false);
                };

                this.isDataLoading = false;

                this.cdr.detectChanges();
            },
        });  
    };

    // Метод для создания темы
    createTopic(): void {
        this.dialogAddErrorMessage = '';

        if (this.validateAddingTopicData()) {
            this.isDataLoading = true;

            // Формируем тело запроса
            const body = {
                "name": this.dialogAddTopicName,
                "description": this.dialogAddTopicDescription,
                "subjectID": this.subjectID,
            };

            this.topicsService.createTopic(body).subscribe({
                next: (response: any) => {
                    this.loggerService.message('backend', 'Topic was created', response);

                    this.cdr.detectChanges();
                },
                error: (err) => {
                    this.loggerService.message('error', 'Error with create topic', err);

                    this.dialogAddErrorMessage = 'Не удалось создать тему';

                    this.isDataLoading = false;

                    this.cdr.detectChanges();
                },
                complete: () => {
                    this.toggleAddingTopicDialogVisible();

                    this.getAllTopicsBySubjectID(this.subjectID!);

                    this.isDataLoading = false;

                    this.cdr.detectChanges();
                },
            });
        }
        else {
            this.loggerService.message('error', 'Error with validate add topic data');

            this.dialogAddErrorMessage = 'Заполните все поля';
        }
    };

    // Метод для обработки кнопки создания задания
    createTaskHandler(): void {
        // Формируем тело запроса
        const body = {
            "name": this.dialogAddTaskName,
            "description": this.dialogAddTaskDescription,
            "topicID": this.addTopicID!,
            "mediaID": null,
        };

        // Проверяем есть ли загруженный файл
        if(this.uploadedFile) {
            // Вызываем метод для загрузки медиафайла
            this.uploadMediaFile(body, 'create');
        }
        else {
            // Отправляем запрос на создание задания
            this.createTask(body);
        }
    };

    // Метод для создания задания
    createTask(body: any): void {
        this.dialogAddTaskErrorMessage = '';

        if (this.validateAddingTaskData()) {
            this.isDataLoading = true;

            let topicID: number | null = null;

            this.tasksService.createTask(body).subscribe({
                next: (response: any) => {
                    topicID = response.topicID;

                    this.loggerService.message('backend', 'Task was created', response);

                    this.cdr.detectChanges();
                },
                error: (err) => {
                    this.loggerService.message('error', 'Error with create task', err);

                    this.dialogAddTaskErrorMessage = 'Не удалось создать задание';

                    this.isDataLoading = false;

                    this.cdr.detectChanges();
                },
                complete: () => {
                    this.toggleAddingTaskDialogVisible();

                    this.getAllTasksByTopicID(topicID!);

                    this.isDataLoading = false;

                    this.cdr.detectChanges();
                },
            });
        }
        else {
            this.loggerService.message('error', 'Error with validate add task data');

            this.dialogAddTaskErrorMessage = 'Заполните все поля';
        };
    };

    // Метод для редактирования темы
    updateTopic(): void {
        this.dialogEditErrorMessage = '';

        if (this.validateEditingTopicData()) {
            this.isDataLoading = true;

            // Формируем тело запроса
            const body = {
                "name": this.dialogEditTopicName,
                "description": this.dialogEditTopicDescription,
                "id": this.editTopicID,
            };

            this.topicsService.updateTopic(body).subscribe({
                next: (response: any) => {
                    this.loggerService.message('backend', 'Topic was updated', response);

                    this.cdr.detectChanges();
                },
                error: (err) => {
                    this.loggerService.message('error', 'Error with update topic', err);

                    this.dialogEditErrorMessage = 'Не удалось обновить тему';

                    this.isDataLoading = false;

                    this.cdr.detectChanges();
                },
                complete: () => {
                    this.toggleEditingTopicDialogVisible();

                    this.getAllTopicsBySubjectID(this.subjectID!);

                    this.isDataLoading = false;

                    this.cdr.detectChanges();
                },
            });
        }
        else {
            this.loggerService.message('error', 'Error with validate update topic data');

            this.dialogEditErrorMessage = 'Заполните все поля';
        }
    };

    // Метод для обработки кнопки обновления задания
    updateTaskHandler(): void {
        // Формируем тело запроса
        const body = {
            "name": this.dialogEditTaskName,
            "description": this.dialogEditTaskDescription,
            "id": this.editTaskID!,
            "mediaID": null,
        };

        // Проверяем есть ли загруженный файл
        if(this.uploadedFile) {
            // Вызываем метод для загрузки медиафайла
            this.uploadMediaFile(body, 'update');
        }
        else {
            // Отправляем запрос на создание задания
            this.updateTask(body);
        }
    };

    // Метод для редактирования задания
    updateTask(body: any): void {
        this.dialogEditTaskErrorMessage = '';

        if (this.validateEditingTaskData()) {
            this.isDataLoading = true;

            this.tasksService.updateTask(body).subscribe({
                next: (response: any) => {

                    this.loggerService.message('backend', 'Task was updated', response);

                    this.cdr.detectChanges();
                },
                error: (err) => {
                    this.loggerService.message('error', 'Error with update task', err);

                    this.dialogEditTaskErrorMessage = 'Не удалось обновить задачу';

                    this.isDataLoading = false;

                    this.cdr.detectChanges();
                },
                complete: () => {
                    // Обнуление данных загруженного файла
                    this.selectedFileName = null;
                    this.uploadedFileID = null;
                    this.uploadedFile = null;

                    this.isEditingTaskDialogVisible = !this.isEditingTaskDialogVisible;

                    for(let index = 0; index < this.isTopicFlagsVisible.length; index++) {
                        this.isTopicFlagsVisible[index] = false;
                    };

                    for(let index = 0; index < this.isTaskFlagsVisible.length; index++) {
                        this.isTaskFlagsVisible[index] = false;
                    };

                    this.isDataLoading = false;

                    this.cdr.detectChanges();
                },
            });
        }
        else {
            this.loggerService.message('error', 'Error with validate update task data');

            this.dialogEditTaskErrorMessage = 'Заполните все поля';
        }
    };

    // Метод для удаления темы по ID
    deleteTopic(id: number): void {
        this.isDataLoading = true;

        this.topicsService.deleteTopicByID(id).subscribe({
            next: (response: any) => {
                this.loggerService.message('backend', 'Topic was deleted', response);

                this.cdr.detectChanges();
            },
            error: (err) => {
                this.loggerService.message('error', 'Error with delete topic', err);

                this.isDataLoading = false;

                this.cdr.detectChanges();
            },
            complete: () => {
                this.getAllTopicsBySubjectID(this.subjectID!);

                for(let index = 0; index < this.avaliableTopics?.length!; index++) {
                    this.isTopicFlagsVisible[index] = false;
                };

                for(let index = 0; index < this.isTaskFlagsVisible.length; index++) {
                    this.isTaskFlagsVisible[index] = false;
                };

                this.isDataLoading = false;

                this.cdr.detectChanges();
            },
        });
    };

    // Метод для удаления задания по ID
    deleteTask(id: number): void {
        this.isDataLoading = true;

        this.tasksService.deleteTaskByID(id).subscribe({
            next: (response: any) => {
                this.loggerService.message('backend', 'Task was deleted', response);

                this.cdr.detectChanges();
            },
            error: (err) => {
                this.loggerService.message('error', 'Error with delete task', err);

                this.isDataLoading = false;

                this.cdr.detectChanges();
            },
            complete: () => {
                for(let index = 0; index < this.avaliableTopics?.length!; index++) {
                    this.isTopicFlagsVisible[index] = false;
                };

                for(let index = 0; index < this.isTaskFlagsVisible.length; index++) {
                    this.isTaskFlagsVisible[index] = false;
                };

                this.isDataLoading = false;

                this.cdr.detectChanges();
            },
        });
    };

    // Метод для загрузки медиафайла на сервер
    async uploadMediaFile(body: any, type: 'create' | 'update'): Promise<void> {
        this.isDataLoading = true;

        if(this.uploadedFile) {
            this.mediaService.uploadFile(this.uploadedFile).subscribe({
                next: (response: UploadMediaInterface) => {
                    this.uploadedFileID = response.id;

                    body.mediaID = this.uploadedFileID;

                    this.loggerService.message('backend', 'Mediafile was uploaded');
                },
                error: (err) => {
                    this.loggerService.message('error', 'Error with upload mediafile', err);

                    this.isDataLoading = false;

                    this.cdr.detectChanges();
                },
                complete: () => {
                    if(type === 'create') {
                        this.createTask(body);
                    };

                    if(type === 'update') {
                        this.updateTask(body);
                    };

                    for(let index = 0; index < this.isTopicFlagsVisible.length; index++) {
                        this.isTopicFlagsVisible[index] = false;
                    };

                    for(let index = 0; index < this.isTaskFlagsVisible.length; index++) {
                        this.isTaskFlagsVisible[index] = false;
                    };

                    this.isDataLoading = false;

                    this.cdr.detectChanges();
                },
            });
        };
    };

    // Метод для получения всех доступных групп
    getAllGroups(): void {
        this.isDataLoading = true;

        this.groupsService.getAllGroups().subscribe({
            next: (response: GroupModel[]) => {
                this.avaliableGroups = response;

                this.loggerService.message('backend', 'Groups data was received', response);
            },
            error: (err) => {
                this.loggerService.message('error', 'Error with get groups data', err);

                this.isDataLoading = false;

                this.cdr.detectChanges();
            },
            complete: () => {
                this.isDataLoading = false;

                this.cdr.detectChanges();
            },
        });
    };

    // Метод для получения всех доступных студентов
    getStudentsByGroupID(groupID: number): void {
        this.isDataLoading = true;

        this.studentsService.getAllStudents().subscribe({
            next: (response: any) => {
                this.marksByGroupAndTasksData = TaskMarksMocks;

                this.loggerService.message('backend', 'Students data was received', response);
            },
            error: (err) => {
                this.loggerService.message('error', 'Error with get students data', err);

                this.isDataLoading = false;

                this.cdr.detectChanges();
            },
            complete: () => {
                this.isDataLoading = false;

                this.cdr.detectChanges();
            },
        });
    };

    // Метод для открепления задания
    unpinTaskFile(data: any): void {
        // Формируем тело запроса
        const body = {
            "name": data.name,
            "description": data.description,
            "id": data.id!,
            "mediaID": null,
        };

        // Обновляем задание
        this.isDataLoading = true;

        this.tasksService.updateTask(body).subscribe({
            next: (response: any) => {

                this.loggerService.message('backend', 'Task was updated', response);

                this.cdr.detectChanges();
            },
            error: (err) => {
                this.loggerService.message('error', 'Error with update task', err);

                this.dialogEditTaskErrorMessage = 'Не удалось обновить задачу';

                this.isDataLoading = false;

                this.cdr.detectChanges();
            },
            complete: () => {
                for(let index = 0; index < this.isTopicFlagsVisible.length; index++) {
                    this.isTopicFlagsVisible[index] = false;
                };

                for(let index = 0; index < this.isTaskFlagsVisible.length; index++) {
                    this.isTaskFlagsVisible[index] = false;
                };

                this.isDataLoading = false;

                this.cdr.detectChanges();
            },
        });
    };

    // Метод для валидации данных окна добавления темы
    validateAddingTopicData(): boolean {
        if (this.dialogAddTopicName.length === 0 || this.dialogAddTopicDescription.length === 0) {
            return false;
        }

        return true;
    };

    // Метод для валидации данных окна добавления задания
    validateAddingTaskData(): boolean {
        if (this.dialogAddTaskName.length === 0 || this.dialogAddTaskDescription.length === 0) {
            return false;
        }

        return true;
    };

    // Метод для валидации данных окна обновления темы
    validateEditingTopicData(): boolean {
        if (this.dialogEditTopicName.length === 0 || this.dialogEditTopicDescription.length === 0) {
            return false;
        }

        return true;
    };

    // Метод для валидации данных окна обновления задания
    validateEditingTaskData(): boolean {
        if (this.dialogEditTaskName.length === 0 || this.dialogEditTaskDescription.length === 0) {
            return false;
        }

        return true;
    };

    // Метод для валидации данных окна выбора группы
    validateSelectGroupData(): boolean {
        if(this.selectedGroup === null) {
            return false;
        }

        return true;
    };

    // Метод скрывает/открывает меню
    onNavigationOpenedChange(isOpened: boolean) {
        this.isNavigationOpened = isOpened;
    };

    // Метод для смены видимости темы
    toggleTopicVisible(index: number, id?: number): void {
        for(let index = 0; index < this.isTopicFlagsVisible.length; index++) {
            this.isTopicFlagsVisible[index] = false;
        };

        this.isTopicFlagsVisible[index] = !this.isTopicFlagsVisible[index];

        if(id !== null) {
            this.getAllTasksByTopicID(id!);
        };
    };

    // Метод для обработки кнопки смены видимости темы
    toggleTopicVisibleHandler(index: number): void {
        this.isTopicFlagsVisible[index] = !this.isTopicFlagsVisible[index];
    };

    // Метод для смены видимости задания
    toggleTaskVisible(index: number): void {
        this.isTaskFlagsVisible[index] = !this.isTaskFlagsVisible[index];
    };

    // Метод для смены видимости окна добавления темы
    toggleAddingTopicDialogVisible(): void {
        this.dialogAddTopicName = '';
        this.dialogAddTopicDescription = '';

        this.isAddingTopicDialogVisible = !this.isAddingTopicDialogVisible;
    };

    // Метод для смены видимости окна добавления задания
    toggleAddingTaskDialogVisible(id?: number): void {
        // Обнуление данных загруженного файла
        this.selectedFileName = null;
        this.uploadedFileID = null;
        this.uploadedFile = null;

        this.dialogAddTaskName = '';
        this.dialogAddTaskDescription = '';

        this.isAddingTaskDialogVisible = !this.isAddingTaskDialogVisible;

        if(id !== null) {
            this.addTopicID = id!;
        };
    };

    // Метод для смены видимости окна редактирования темы
    toggleEditingTopicDialogVisible(id?: number | null, data?: any): void {
        this.isEditingTopicDialogVisible = !this.isEditingTopicDialogVisible;
        
        if (id !== null) {
            this.editTopicID = id!;
        };

        if(data !== null) {
            this.dialogEditTopicName = data.name;
            this.dialogEditTopicDescription = data.description;
        };
    };

    // Метод для смены видимости окна редактирования задания
    toggleEditingTaskDialogVisible(id?: number | null, task?: any ): void {
        // Обнуление данных загруженного файла
        this.selectedFileName = null;
        this.uploadedFileID = null;
        this.uploadedFile = null;

        this.isEditingTaskDialogVisible = !this.isEditingTaskDialogVisible;

        if(id !== null) {
            this.editTaskID = id!;
        };

        if(task !== null) {
            this.dialogEditTaskName = task.name;
            this.dialogEditTaskDescription = task.description;
        };
    };

    // Метод для смены видимости окна подверждения
    toggleConfirmDialogVisible(id?: number | null, type?: 'topic' | 'task'): void {
        this.isConfirmDialogVisible = !this.isConfirmDialogVisible;

        if (id !== null &&  type === 'topic') {
            this.deleteTopicID = id!;
        };

        if(id !== null && type === 'task') {
            this.deleteTaskID = id!;
        };
    };

    // Метод для смены видимости окна выбора группы
    toggleSelectGroupDialogVisible(taskID?: number): void {
        this.selectedGroup = null;

        if(taskID !== null) {
            this.getAllGroups();

            this.ratingsTaskID = taskID!;
        };

        this.isSelectedGroupDialogVisible = !this.isSelectedGroupDialogVisible;
    };

    // Логика для события "Далее"
    handleConfirmDialogNext(): void {
        this.toggleConfirmDialogVisible();

        if(this.deleteTopicID !== null) {
            this.deleteTopic(this.deleteTopicID);
        };

        if(this.deleteTaskID !== null) {
            this.deleteTask(this.deleteTaskID);
        };
    };

    // Логика для события "Отмена"
    handleConfirmDialogCancel(): void {
        this.toggleConfirmDialogVisible();
    };

    // Обработка загрузки файла
    onInputChange(event: Event): void {
        const input = event.target as HTMLInputElement;
        const file = input.files?.[0];
    
        if (file) {
            this.uploadedFile = file;
            this.selectedFileName = file.name;
        } else {
            this.selectedFileName = null;
        }
    };

    // Метод для получения URL к медиафайлу
    getURLForMediafile(): string {
        return `${environment.protocol}://${environment.domain}/media/file?id=`;
    };

    // Метод для перехода к окну выставления оценок
    navigateToRatingsDialog(): void {
        if(this.selectedGroup) {
            this.toggleRatingsDialogVisible(this.selectedGroup.id!);
        }
        else {
            this.selectedGroupDialogError = 'Выберите группу';
        }
    };

    // Метод для смены видимости окна выставления оценок
    toggleRatingsDialogVisible(groupID: number): void {
        this.isRatingsDialogVisible = !this.isRatingsDialogVisible;
        
        if(groupID !== null) {
            this.ratingsGroupID = groupID;

            this.getStudentsByGroupID(this.ratingsGroupID);
        }
    };

    // Метод для смены редактируемости оценок
    toggleMarksByGroupAndTaskEditable(): void {
        this.isMarksByGroupAndTasksEditable = !this.isMarksByGroupAndTasksEditable;
    };
}