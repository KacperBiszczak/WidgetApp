import { BackendAuthService } from "./BackendAuthService";
import { renderToast } from "../toast/renderToast";

export class BackendLoginForm {
    private authService = new BackendAuthService();
    private container: HTMLDivElement;

    constructor() {
        this.container = document.createElement("div");
        this.container.classList.add("backendLoginForm");
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

            const info = document.createElement("div");
            info.classList.add("loggedInInfo");
            info.textContent = "Zalogowano do backendu";

            const logoutButton = document.createElement("button");
            logoutButton.classList.add("logoutButton");
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
        
        const loginDiv = document.createElement("div");
        loginDiv.classList.add("backendLoginFormLogin");
        loginDiv.appendChild(loginInput);

        const passwordInput = document.createElement("input");
        passwordInput.type = "password";
        passwordInput.placeholder = "Hasło";

        const passwordDiv = document.createElement("div");
        passwordDiv.classList.add("backendLoginFormPassword");
        passwordDiv.appendChild(passwordInput);

        const loginButton = document.createElement("button");
        loginButton.textContent = "Zaloguj";

        loginButton.addEventListener("click", async () => {
            try {
                await this.authService.login(
                    loginInput.value,
                    passwordInput.value
                );

                renderToast("Zalogowano.")

                this.render();
            } catch (error) {
                const message =
                    error instanceof Error
                        ? error.message
                        : "Błąd logowania.";

                renderToast(message);
            }
        });

        this.container.append(
            loginDiv,
            passwordDiv,
            loginButton,
        );
    }
}