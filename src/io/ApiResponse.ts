export class ApiResponse {
    constructor(
        public error: boolean = false,
        public success: boolean = false,
        public payload: any = {}
    ) { }
}