export class DigitalClock {
    private intervalId: ReturnType<typeof setInterval> | null = null;
    private targetElement: HTMLElement | null = null;

    mount = async (target: HTMLElement): Promise<void> => {
        this.targetElement = target;

        this.updateTimeDisplay();

        this.intervalId = setInterval(() => {
            this.updateTimeDisplay();
        }, 1000);
    };

    unmount = async (): Promise<void> => {
        if (this.intervalId) {
            clearInterval(this.intervalId);
            this.intervalId = null;
        }

        // if (this.targetElement) {
        //     this.targetElement.innerHTML = '';
        //     this.targetElement = null;
        // }
    };

    private updateTimeDisplay = (): void => {
        if (this.targetElement) {
            const currentTime = new Date();
            this.targetElement.innerText = currentTime.toLocaleTimeString('pl-PL');
        }
    };
}