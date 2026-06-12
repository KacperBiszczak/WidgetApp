import { AuthProvider } from "./AuthProvider";

export class BackendAuthService {
    private readonly baseUrl = "https://wiboard-backend.runasp.net";
    private readonly authProvider = new AuthProvider();

    async login(login: string, password: string): Promise<void> {
        const response = await fetch(`${this.baseUrl}/api/auth/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                login,
                password,
            }),
        });

        if (!response.ok) {
            throw new Error("Nieprawidłowy login lub hasło.");
        }

        const data = await response.json();

        const token = data.token ?? data.accessToken ?? data.jwt;

        if (!token) {
            throw new Error("Backend nie zwrócił tokena.");
        }

        this.authProvider.setToken(token);
        location.reload();
    }

    logout(): void {
        this.authProvider.logout();
        location.reload();
    }

    isAuthenticated(): boolean {
        return this.authProvider.isAuthenticated();
    }
}