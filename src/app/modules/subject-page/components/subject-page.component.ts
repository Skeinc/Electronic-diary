import { ChangeDetectorRef, Component, OnInit } from "@angular/core";
import { LoggerService } from "@shared/services/logger/logger.service";
import { TopicsService } from "../services/topics.service";
import { TasksService } from "../services/tasks.service";
import { TopicModel } from "@shared/models/topic.model";
import { TaskModel } from "@shared/models/task.model";
import { animate, state, style, transition, trigger } from "@angular/animations";
import { MediaService } from "@shared/services/media/media.service";
import { UploadMediaInterface } from "@shared/interfaces/backend/media/media.interface";

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
        private topicsService: TopicsService,
        private loggerService: LoggerService,
        private tasksService: TasksService,
        private mediaService: MediaService,
        private cdr: ChangeDetectorRef,
    ) { }

    // Определяет открыта ли меню
    isNavigationOpened: boolean = false;

    // Переменная, обозначающая статус загрузки данных
    isDataLoading: boolean = false;

    // Переменная, контролирующая видимость окна подверждения
    isConfirmDialogVisible: boolean = false;

    // Массив булевых значений, означающие видимость тем
    isTopicFlagsVisible: boolean[] = [false];

    // Массив булевых значений, означающие видимость заданий
    isTaskFlagsVisible: boolean[] = [false];

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

    ngOnInit(): void {
        // Получаем все темы предмета
    }

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
                this.avaliableTasks = response;

                this.loggerService.message('backend', 'All tasks information was received', response);

                this.cdr.detectChanges();
            },
            error: (err) => {
                this.loggerService.message('error', 'Error with get all tasks information', err);

                this.isDataLoading = false;

                this.cdr.detectChanges();
            },
            complete: () => {
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
                "subjectID": null,
            };

            this.topicsService.createTopic(body).subscribe({
                next: (response: any) => {
                    this.loggerService.message('backend', 'Topic was created', response);

                    this.cdr.detectChanges();
                },
                error: (err) => {
                    this.loggerService.message('error', 'Error with create topic', err);

                    this.isDataLoading = false;

                    this.cdr.detectChanges();
                },
                complete: () => {
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

    // Метод для создания задания
    createTask(): void {
        this.dialogAddTaskErrorMessage = '';

        if (this.validateAddingTaskData()) {
            this.isDataLoading = true;

            // Формируем тело запроса
            const body = {
                "name": this.dialogAddTaskName,
                "description": this.dialogAddTaskDescription,
                "topicID": null,
            };

            this.tasksService.createTask(body).subscribe({
                next: (response: any) => {
                    this.loggerService.message('backend', 'Task was created', response);

                    this.cdr.detectChanges();
                },
                error: (err) => {
                    this.loggerService.message('error', 'Error with create task', err);

                    this.isDataLoading = false;

                    this.cdr.detectChanges();
                },
                complete: () => {
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

                    this.isDataLoading = false;

                    this.cdr.detectChanges();
                },
                complete: () => {
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

    // Метод для редактирования задания
    updateTask(): void {
        this.dialogEditTaskErrorMessage = '';

        if (this.validateEditingTaskData()) {
            this.isDataLoading = true;

            // Формируем тело запроса
            const body = {
                "name": this.dialogEditTaskName,
                "description": this.dialogEditTaskDescription,
                "id": this.editTaskID,
            };

            this.tasksService.updateTask(body).subscribe({
                next: (response: any) => {
                    this.loggerService.message('backend', 'Task was updated', response);

                    this.cdr.detectChanges();
                },
                error: (err) => {
                    this.loggerService.message('error', 'Error with update task', err);

                    this.isDataLoading = false;

                    this.cdr.detectChanges();
                },
                complete: () => {
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
                this.isDataLoading = false;

                this.cdr.detectChanges();
            },
        });
    };

    // Метод для загрузки медиафайла на сервер
    async uploadMediaFile(): Promise<void> {
        this.isDataLoading = true;

        if(this.uploadedFile) {
            this.mediaService.uploadFile(this.uploadedFile).subscribe({
                next: (response: UploadMediaInterface) => {
                    this.uploadedFileID = response.id;

                    this.loggerService.message('backend', 'Mediafile was uploaded');
                },
                error: (err) => {
                    this.loggerService.message('error', 'Error with upload mediafile', err);

                    this.isDataLoading = false;

                    this.cdr.detectChanges();
                },
                complete: () => {
                    this.isDataLoading = false;

                    this.cdr.detectChanges();
                },
            });
        };
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

    // Метод скрывает/открывает меню
    onNavigationOpenedChange(isOpened: boolean) {
        this.isNavigationOpened = isOpened;
    };

    // Метод для смены видимости темы
    toggleTopicVisible(index: number): void {
        this.isTopicFlagsVisible[index] = !this.isTopicFlagsVisible[index];
    };

    // Метод для смены видимости задания
    toggleTaskVisible(index: number): void {
        this.isTaskFlagsVisible[index] = !this.isTaskFlagsVisible[index];
    };

    // Метод для смены видимости окна добавления темы
    toggleAddingTopicDialogVisible(): void {
        this.isAddingTopicDialogVisible = !this.isAddingTopicDialogVisible;
    };

    // Метод для смены видимости окна добавления задания
    toggleAddingTaskDialogVisible(): void {
        this.isAddingTaskDialogVisible = !this.isAddingTaskDialogVisible;
    };

    // Метод для смены видимости окна редактирования темы
    toggleEditingTopicDialogVisible(id?: number | null): void {
        this.isEditingTopicDialogVisible = !this.isEditingTopicDialogVisible;

        if (id !== null) {
            this.editTopicID = id!;
        };
    };

    // Метод для смены видимости окна редактирования задания
    toggleEditingTaskDialogVisible(id?: number | null): void {
        this.isEditingTaskDialogVisible = !this.isEditingTaskDialogVisible;

        if(id !== null) {
            this.editTopicID = id!;
        }
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
}