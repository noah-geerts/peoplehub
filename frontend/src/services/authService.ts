import { Injectable, signal } from "@angular/core";

export type Role = 'admin' | 'creator' | 'viewer' | undefined;
type Account = {
    username: string,
    password: string,
    role: Role
};

@Injectable({ providedIn: 'root' })
export class AuthService {
    private readonly accounts: Account[] = [
        {
            username: 'admin',
            password: 'admin@123',
            role: 'admin'
        },
        {
            username: 'creator',
            password: 'creator@123',
            role: 'creator'
        },
        {
            username: 'viewer',
            password: 'viewer@123',
            role: 'viewer'
        }
    ]

    authenticated = signal(false);
    role = signal<Role>(undefined);

    login(username: string, password: string) {
        const existing: Account | undefined =
            this.accounts.find(
                account => account.username === username
                    && account.password === password
            );

        if (existing !== undefined) {
            this.authenticated.set(true);
            this.role.set(existing.role);
        } else {
            this.authenticated.set(false);
            this.role.set(undefined);
        }
    }

    logout() {
        this.role.set(undefined);
        this.authenticated.set(false);
    }
}