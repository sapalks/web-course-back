export class ResponseDto {
    public constructor(
        public status: 'ok' | 'error',
        public data?: object
    ) { }
}