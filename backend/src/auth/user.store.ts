// Временное хранилище в памяти (потом заменим на Prisma)
export interface User {
    id: string;
    email: string;
    name?: string;
    password: string;
    createdAt: Date;
}

export class UserStore {
    private users: User[] = [];

    async findByEmail(email: string): Promise<User | undefined> {
        return this.users.find(user => user.email === email);
    }

    async create(user: Omit<User, 'id' | 'createdAt'>): Promise<User> {
        const newUser: User = {
            id: Math.random().toString(36).substring(2, 15),
            ...user,
            createdAt: new Date(),
        };
        this.users.push(newUser);
        return newUser;
    }

    async findAll(): Promise<User[]> {
        return this.users;
    }
}

// Синглтон для использования во всем приложении
export const userStore = new UserStore();