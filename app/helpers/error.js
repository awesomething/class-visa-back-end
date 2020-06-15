class ErrorHandler extends Error {
    constructor(statusCode, message, errors = []) {
        super();
        this.statusCode = statusCode;
        this.message = message;
        this.errors = errors;
    }
}

class BadRequestError extends ErrorHandler {
    constructor(message, errors) {
        super(400, message, errors);
    }
}

class NotFoundError extends ErrorHandler {
    constructor(message) {
        super(404, message);
    }
}

const handleError = (err, res) => {
    const {
        statusCode = 500,
        message = "Unexpected error occured.",
        errors = [],
    } = err;

    res.status(statusCode).json({
        status: "error",
        statusCode,
        message,
        errors,
    });
};

module.exports = {
    ErrorHandler,
    BadRequestError,
    NotFoundError,
    handleError,
};
