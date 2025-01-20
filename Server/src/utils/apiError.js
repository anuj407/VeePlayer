class apiError extends Error {
    constructor(message, status,errors = [],stack ='') {
        super(message);
        this.status = status;
        this.errors = errors;
        this.stack = stack;
        this.data = null;
        this.success = false;

        if (stack) {
            this.stack = stack;
        }
        else{
            Error.captureStackTrace(this, this.constructor);
        }
    }
}

export {apiError}