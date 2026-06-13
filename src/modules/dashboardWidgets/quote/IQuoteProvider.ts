export interface Quote {
    quote: string;
    author: string;
}

export interface IQuoteProvider {
    readonly providerName: string;
    
    getRandomQuote(): Promise<Quote>;
}