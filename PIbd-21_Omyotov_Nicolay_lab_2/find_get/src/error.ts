export class ProtocolError extends Error {
    public constructor(message: string, public readonly innerError?: Error) {
        super(message);
    }
}

export class ArgumentError extends ProtocolError {

    public constructor(argumentName: string = '', reason: string = 'is incorrect') {
        super(argumentName ? `argument ${argumentName} ${reason}` : 'one of arguments is incorrect');
    }

}

export class AlreadyExistsError extends ProtocolError {

    public constructor() {
        super('already exists');
    }

}

export class NotFoundError extends ProtocolError {

    public constructor(entity: string = '') {
        super(entity ? `${entity} is not found` : 'not found');
    }

}

export class UnexpectedDBError extends ProtocolError {

    public constructor() {
        super('fatal database operation error');
    }

}