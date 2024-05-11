export interface AddSubjectRequestInterface {
    name: string;
    code: string;
    lecturersId: number[];
    groupsId: number[];
};

export interface EditSubjectRequestInterface {
    id: number;
    name: string;
    code: string;
    lecturersId: number[];
    groupsId: number[];
};