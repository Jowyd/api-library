export enum UserRole {
  ADMIN = "admin",
  MANAGER = "gerant",
  USER = "utilisateur",
}

export enum Permission {
  READ = "read",
  CREATE = "create",
  UPDATE = "update",
  DELETE = "delete",
}

export enum Resource {
  AUTHOR = "author",
  BOOK = "book",
  BOOK_COLLECTION = "bookCollection",
}

export interface UserPermissions {
  role: UserRole;
  permissions: {
    [key in Resource]?: Permission[];
  };
}
