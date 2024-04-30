import { RolesEnum } from "@shared/enums/roles/roles.enum";
import { MenuItemsInterface } from "@shared/interfaces/navigation/menu-items.interface";

export const menuItemsConstant: MenuItemsInterface[] = [
    {
        path: '/personal',
        label: 'Личный кабинет',
        icon: 'person',
        role: RolesEnum.ALL,
    },
    {
        path: '/students',
        label: 'Студенты',
        icon: 'school',
        role: RolesEnum.ADMINISTRATOR,
    },
    {
        path: '/lecturers',
        label: 'Преподаватели',
        icon: 'manage_accounts',
        role: RolesEnum.ADMINISTRATOR,
    },
    {
        path: '/groups',
        label: 'Группы',
        icon: 'groups',
        role: RolesEnum.ADMINISTRATOR,
    },
    {
        path: '/requests',
        label: 'Заявки',
        icon: 'person_add',
        role: RolesEnum.ADMINISTRATOR,
    },
    {
        path: '/subjects',
        label: 'Предметы',
        icon: 'book',
        role: RolesEnum.ADMINISTRATOR,
    }
];