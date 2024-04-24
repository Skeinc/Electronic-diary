import { RolesEnum } from "@shared/enums/roles/roles.enum";

export interface MenuItemsInterface {
    path: string;
    label: string;
    icon: string;
    role?: RolesEnum;
}