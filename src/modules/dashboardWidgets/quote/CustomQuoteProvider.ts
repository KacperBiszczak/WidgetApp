import type { IQuoteProvider, Quote } from "./IQuoteProvider";

export class CustomQuoteProvider implements IQuoteProvider {
    readonly providerName = "Własne cytaty";

    private readonly storageKey = "customQuotes";
    private readonly currentIndexKey = "customQuotesCurrentIndex";

    async getRandomQuote(): Promise<Quote> {
        const quotes = this.getQuotes();

        if (quotes.length === 0) {
            return this.getEmptyQuote();
        }

        const randomIndex = Math.floor(Math.random() * quotes.length);

        localStorage.setItem(
            this.currentIndexKey,
            randomIndex.toString()
        );

        return quotes[randomIndex];
    }

    async getNextQuote(): Promise<Quote> {
        const quotes = this.getQuotes();

        if (quotes.length === 0) {
            return this.getEmptyQuote();
        }

        const currentIndex = this.getCurrentIndex();
        const nextIndex = (currentIndex + 1) % quotes.length;

        localStorage.setItem(
            this.currentIndexKey,
            nextIndex.toString()
        );

        return quotes[nextIndex];
    }

    addQuote(quote: Quote): void {
        const quotes = this.getQuotes();

        quotes.push(quote);

        localStorage.setItem(
            this.storageKey,
            JSON.stringify(quotes)
        );

        if (quotes.length === 1) {
            localStorage.setItem(this.currentIndexKey, "0");
        }
    }

    getQuotes(): Quote[] {
        const rawQuotes = localStorage.getItem(this.storageKey);

        return rawQuotes
            ? JSON.parse(rawQuotes)
            : [];
    }

    private getCurrentIndex(): number {
        const rawIndex = localStorage.getItem(this.currentIndexKey);

        if (rawIndex === null) {
            return -1;
        }

        const index = Number(rawIndex);

        return Number.isNaN(index)
            ? -1
            : index;
    }

    private getEmptyQuote(): Quote {
        return {
            quote: "Nie dodano jeszcze żadnego własnego cytatu.",
            author: "WidgetApp",
        };
    }
}