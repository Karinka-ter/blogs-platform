export class DomainError extends Error {
    constructor(
        detail: string,
        public readonly code: string, // POST_ON_MODERATION
        public readonly source?: string,
    ) {
        super(detail);
    }
}