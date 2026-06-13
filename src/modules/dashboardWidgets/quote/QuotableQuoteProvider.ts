import type { IQuoteProvider, Quote } from "./IQuoteProvider";

interface QuotableResponse {
    quote: string;
    author: string;
}

export class QuotableQuoteProvider implements IQuoteProvider {
    readonly providerName = "dummyjson";

    async getRandomQuote(): Promise<Quote> {
        
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