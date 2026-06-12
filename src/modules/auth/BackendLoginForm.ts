import { BackendAuthService } from "./BackendAuthService";

export class BackendLoginForm {
    private authService = new BackendAuthService();
    private container: HTMLDivElement;

    constructor() {
        this.container = document.createElement("div");
        this.container.classList.add("backend-login-form");
        this.render();
    }

    mount(target: HTMLElement): void {
        target.prepend(this.container);
    }

    show(): void {
        this.container.classList.remove("hidden");
    }

    hide(): void {
        this.container.classList.add("hidden");
    }

    private render(): void {
        this.container.innerHTML = "";

        if (this.authService.isAuthenticated()) {
            const info = document.createElement("p");
            info.textContent = "Zalogowano do backendu";

            const logoutButton = document.createElement("button");
            logoutButton.textContent = "Wyloguj";

            logoutButton.addEventListener("click", () => {
                this.authService.logout();
                this.render();
            });

            this.container.append(info, logoutButton);
            return;
        }

        const loginInput = document.createElement("input");
        loginInput.type = "text";
        loginInput.placeholder = "Login";

        const passwordInput = document.createElement("input");
        passwordInput.type = "password";
        passwordInput.placeholder = "Hasło";

        const loginButton = document.createElement("button");
        loginButton.textContent = "Zaloguj";

        const message = document.createElement("p");

        loginButton.addEventListener("click", async () => {
            try {
                await this.authService.login(
                    loginInput.value,
                    passwordInput.value
                );

                message.textContent = "Zalogowano!";
                this.render();
            } catch (error) {
                message.textContent =
                    error instanceof Error
                        ? error.message
                        : "Błąd logowania.";
            }
        });

        this.container.append(
            loginInput,
            passwordInput,
            loginButton,
            message
        );
    }
}