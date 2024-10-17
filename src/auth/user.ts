import {
  UserRole,
  UserPermissions,
  Permission,
  Resource,
} from "../types/auth.types";

export const userPermissions: Record<UserRole, UserPermissions> = {
  [UserRole.ADMIN]: {
    role: UserRole.ADMIN,
    permissions: {
      [Resource.AUTHOR]: [
        Permission.READ,
        Permission.CREATE,
        Permission.UPDATE,
        Permission.DELETE,
      ],
      [Resource.BOOK]: [
        Permission.READ,
        Permission.CREATE,
        Permission.UPDATE,
        Permission.DELETE,
      ],
      [Resource.BOOK_COLLECTION]: [
        Permission.READ,
        Permission.CREATE,
        Permission.UPDATE,
        Permission.DELETE,
      ],
    },
  },
  [UserRole.MANAGER]: {
    role: UserRole.MANAGER,
    permissions: {
      [Resource.AUTHOR]: [
        Permission.READ,
        Permission.CREATE,
        Permission.UPDATE,
      ],
      [Resource.BOOK]: [Permission.READ, Permission.CREATE, Permission.UPDATE],
      [Resource.BOOK_COLLECTION]: [
        Permission.READ,
        Permission.CREATE,
        Permission.UPDATE,
        Permission.DELETE,
      ],
    },
  },
  [UserRole.USER]: {
    role: UserRole.USER,
    permissions: {
      [Resource.AUTHOR]: [Permission.READ],
      [Resource.BOOK]: [Permission.READ, Permission.CREATE],
      [Resource.BOOK_COLLECTION]: [Permission.READ],
    },
  },
};

export function hasPermission(
  role: UserRole,
  resource: Resource,
  permission: Permission
): boolean {
  const userPerms = userPermissions[role];
  return userPerms.permissions[resource]?.includes(permission) || false;
}
