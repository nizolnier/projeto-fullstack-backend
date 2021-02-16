import { BaseDatabase } from "./data/BaseDatabase"

class Setup extends BaseDatabase {
    public async createTables() {
        try {
            await BaseDatabase.connection.raw(`
            CREATE TABLE IF NOT EXISTS Users_Labegram (
                id VARCHAR(255) PRIMARY KEY,
                name VARCHAR(255) NOT NULL,
                email VARCHAR(255) NOT NULL UNIQUE,
                nickname VARCHAR(255) NOT NULL UNIQUE,
                password VARCHAR(255) NOT NULL,
                profile_picture VARCHAR(500) NOT NULL
            );

        `)

            await BaseDatabase.connection.raw(`
            CREATE TABLE IF NOT EXISTS Posts_Labegram (
                id VARCHAR(255) PRIMARY KEY,
                subtitle TEXT NOT NULL,
                date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                file VARCHAR(500) NOT NULL,
                collection VARCHAR(255) NOT NULL,
                author_id VARCHAR(255) NOT NULL,
                author_username VARCHAR(255) NOT NULL,
                author_profile_picture VARCHAR(500) NOT NULL,
                FOREIGN KEY(author_id) REFERENCES Users_Labegram(id),
                FOREIGN KEY(author_username) REFERENCES Users_Labegram(id),
                FOREIGN KEY(author_profile_picture) REFERENCES Users_Labegram(id)
            );
        `)

            await BaseDatabase.connection.raw(`
            CREATE TABLE IF NOT EXISTS Tags_Labegram (
                id VARCHAR(255) PRIMARY KEY,
                author_id VARCHAR(255) NOT NULL,
                tag TEXT NOT NULL,
                FOREIGN KEY(author_id) REFERENCES Users_Labegram(id)
            );
        `)

            await BaseDatabase.connection.raw(`
            CREATE TABLE IF NOT EXISTS PostTags_Labegram (
                post_id VARCHAR(255),
                tag_id VARCHAR(255),
                PRIMARY KEY (post_id, tag_id),
                FOREIGN KEY (post_id) REFERENCES Posts_Labegram(id),
                FOREIGN KEY (tag_id) REFERENCES Tags_Labegram(id)
            );
        `)

            console.log("Setup completed!")
        } catch (error) {
            console.log(error)
        }
    }
}

new Setup().createTables()