import type { IQuoteProvider, Quote } from "./IQuoteProvider";

interface QuotableResponse {
    quote: string;
    author: string;
}

export class QuotableQuoteProvider implements IQuoteProvider {
    readonly providerName = "dummyjson";

    private readonly maxQuoteLength = 100;
    private readonly maxAttempts = 10;

    async getRandomQuote(): Promise<Quote> {
        for (let attempt = 0; attempt < this.maxAttempts; attempt++) {
            const quote = await this.fetchRandomQuote();

            if (quote.quote.length <= this.maxQuoteLength) {
                return quote;
            }
        }
        
        return {
            quote: "Nie udało się znaleźć cytatu. Spróbuj jeszcze raz.",
            author: "WidgetApp",
        };
    }

    private async fetchRandomQuote(): Promise<Quote> {
        const response = await fetch("https://dummyjson.com/quotes/random");

        if (!response.ok) {
            throw new Error("Nie udało się pobrać cytatu.");
        }

        const data = await response.json() as QuotableResponse;

        return {
            quote: data.quote,
            author: data.author,
        };
    }
}