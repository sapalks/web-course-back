import { ConnectionOptions } from 'typeorm';
import { Author } from './author';
import { Book } from './book';

export const Entities = [
    Author, Book
];

export const config = {
    "type": "postgres",
    "host": "localhost",
    "port": 5432,
    "username": "rest_user",
    "password": "rest_pass",
    "database": "rest_db",
    "synchronize": true,
    "logging": false,
    "entities": Entities
} as ConnectionOptions;


export {
    Author, Book
}