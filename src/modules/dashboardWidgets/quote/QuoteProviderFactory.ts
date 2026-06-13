import type { QuoteProviderType } from "../IDashboardWidgetConfig"
import type { IQuoteProvider } from "./IQuoteProvider";
import { QuotableQuoteProvider } from "./QuotableQuoteProvider";

export class QuoteProviderFactory {
    static create(providerType: QuoteProviderType = "quotable"): IQuoteProvider {
        switch (providerType) {
            // case "dummy":
            //     return new DummyQuoteProvider();

            case "quotable":
            default:
                return new QuotableQuoteProvider();
        }
    }
}