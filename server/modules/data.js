import env from './env.js';
import * as db from './db.js'
import * as fs from "node:fs/promises";

const DATABASE_NAME = "project-1";
const IMAGE_COLLECTION = "images";
const USER_COLLECTION = "users";

const retrieveUsers = async () => {
    let users = [];

    let context = undefined;
    try {
        // Initialize the database
        context = await db.initDatabase(env.DB_URI);

        users = await db.findDocuments(context, DATABASE_NAME, USER_COLLECTION, {}, {});
    }
    catch (e) {
        console.error(e);
    }
    finally {
        context?.close();
    }

    return users;
}
const retrieveUser = async (user_id) => {
    let users = [];

    let context = undefined;
    try {
        // Initialize the database
        context = await db.initDatabase(env.DB_URI);

        //users = await db.findDocuments(context, DATABASE_NAME, USER_COLLECTION, {first_name: user.first_name, last_name: user.last_name}, {});
        users = await db.findDocument(context, DATABASE_NAME, USER_COLLECTION, {_id : user_id}, {});
    }
    catch (e) {
        console.error(e);
    }
    finally {
        context?.close();
    }

    return users;
}
const addUser = async (user) => {

    let context = undefined;
    try {
        // Initialize the database
        context = await db.initDatabase(env.DB_URI);

        let result = await db.insertDocument(context, DATABASE_NAME, USER_COLLECTION, user);
        //console.log(`${result.insertedCount} user loaded into ${USER_COLLECTION}`);
    }
    catch (e) {
        console.error(e);
    }
    finally {
        context?.close();
    }
}
const removeUser = async (user) => {

    let context = undefined;
    try {
        // Initialize the database
        context = await db.initDatabase(env.DB_URI);

        let result = await db.deleteDocument(context, DATABASE_NAME, USER_COLLECTION, {_id: user._id});
        //console.log(`${result.insertedCount} user removed from ${USER_COLLECTION}`);
    }
    catch (e) {
        console.error(e);
    }
    finally {
        context?.close();
    }
}
const updateUser = async (user) => {

    let context = undefined;
    try {
        // Initialize the database
        context = await db.initDatabase(env.DB_URI);

        let result = await db.replaceDocument(context, DATABASE_NAME, USER_COLLECTION, {_id : user._id}, user);
        //console.log(`${result.insertedCount} user removed from ${USER_COLLECTION}`);
    }
    catch (e) {
        console.error(e);
    }
    finally {
        context?.close();
    }
}
const addImage = async (image) => {

    let context = undefined;
    try {
        // Initialize the database
        context = await db.initDatabase(env.DB_URI);

        let result = await db.insertDocument(context, DATABASE_NAME, IMAGE_COLLECTION, image);
        //console.log(`${result.insertedCount} user loaded into ${USER_COLLECTION}`);
    }
    catch (e) {
        console.error(e);
    }
    finally {
        context?.close();
    }
}
const removeImage = async (image) => {

    let context = undefined;
    try {
        // Initialize the database
        context = await db.initDatabase(env.DB_URI);

        let result = await db.deleteDocument(context, DATABASE_NAME, IMAGE_COLLECTION, {_id: image});
        //console.log(`${result.insertedCount} user removed from ${USER_COLLECTION}`);
    }
    catch (e) {
        console.error(e);
    }
    finally {
        context?.close();
    }
}
const retrieveImages = async (user) => {
    let images = [];

    let context = undefined;
    try {
        // Initialize the database
        context = await db.initDatabase(env.DB_URI);

        images = await db.findDocuments(context, DATABASE_NAME, IMAGE_COLLECTION, {user_id: user}, {});
    }
    catch (e) {
        console.error(e);
    }
    finally {
        context?.close();
    }

    return images;
}
const retrieveImage = async (data) => {
    let image = [];

    let context = undefined;
    try {
        // Initialize the database
        context = await db.initDatabase(env.DB_URI);

        //users = await db.findDocuments(context, DATABASE_NAME, USER_COLLECTION, {first_name: user.first_name, last_name: user.last_name}, {});
        image = await db.findDocument(context, DATABASE_NAME, USER_COLLECTION, {_id : data}, {});
    }
    catch (e) {
        console.error(e);
    }
    finally {
        context?.close();
    }

    return image;
}
export {
    DATABASE_NAME,
    IMAGE_COLLECTION,
    USER_COLLECTION,
    retrieveUsers,
    retrieveUser,
    addUser,
    removeUser,
    updateUser,
    addImage,
    removeImage,
    retrieveImages,
    retrieveImage
};