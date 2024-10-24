// database.js
/**
* resumeDatabase.js
*
* @author Edwin Cotto <cottosoftwaredevelopment@gmail.com>
* @copyright Edwin Cotto, All rights reserved.
*
* @version 2024-May-14 initial version
*/

/*
 This file holds the connection to the database and the definition of the sql queries.
*/
const mysql = require('mysql2');
const dotenv = require('dotenv');
const bcrypt = require('bcrypt');
dotenv.config();

class ProfessorsDatabase {
    constructor() {
        const connectionConfig = {
            //takes in the environment variables from service file.
            host: process.env.HOST,
            user: process.env.USERNAME,
            password: process.env.PASSWORD,
            database: process.env.DATABASE,
            port: process.env.DB_PORT
        };
        this.connection = mysql.createConnection(connectionConfig);
        this.connection.connect((err) => {
            if (err) throw err;
            console.log('Connected to resume database!');
        });
    }

    query(sql, args) {
        return new Promise((resolve, reject) => {
            this.connection.query(sql, args, (err, results) => {
                if (err) return reject(err);
                resolve(results);
            });
        });
    }
    async getAdminData(username) {
        try {
            if (this.connection.state === 'disconnected') this.connection.connect((err) => {
                if (err) throw err;
                console.log('Connected!');
            })
            const response = await new Promise((resolve, reject) => {
                const query = "SELECT * FROM users where username = ?;";
                this.connection.query(query, [username], (err, results) => {
                    if (err) reject(new Error(err.message));
                    resolve(results);
                })
            })
            return response;
        }
        catch (err) {
            console.log(err);
        }
    }

    async insertAdminData(username, password) {
        try {
            if (this.connection.state === 'disconnected') {
                this.connection.connect((err) => {
                    if (err) throw err;
                    console.log('Connected!');
                });
            }
            const hashedPassword = await bcrypt.hash(password, 10);

            const query = "INSERT INTO users (username, password) VALUES (?, ?)";
            const response = await new Promise((resolve, reject) => {
                this.connection.query(query, [username, hashedPassword], (err, results) => {
                    if (err) reject(new Error(err.message));
                    resolve(results);
                });
            });
            return response.affectedRows === 1 ? true : false;

        } catch (err) {
            console.log(err);
            return false;
        }
    }

    async updateAdminData(username, password) {
        try {
            if (this.connection.state === 'disconnected') {
                this.connection.connect((err) => {
                    if (err) throw err;
                    console.log('Connected!');
                });
            }
            const hashedPassword = await bcrypt.hash(password, 10);

            const query = "UPDATE users SET password = ? WHERE username = ?";
            const response = await new Promise((resolve, reject) => {
                this.connection.query(query, [hashedPassword, username], (err, results) => {
                    if (err) reject(new Error(err.message));
                    resolve(results);
                });
            });
            return response.affectedRows === 1 ? true : false;

        }
        catch (err) {
            console.log(err);
            return false;
        }
    }

    async deleteAdminData(username) {
        try {
            if (this.connection.state === 'disconnected') {
                this.connection.connect((err) => {
                    if (err) throw err;
                    console.log('Connected!');
                });
            }
            const query = "DELETE FROM users WHERE username = ?";
            const response = await new Promise((resolve, reject) => {
                this.connection.query(query, [username], (err, results) => {
                    if (err) reject(new Error(err.message));
                    resolve(results);
                });
            });
            return response.affectedRows === 1 ? true : false;

        } catch (err) {
            console.log(err);
            return false;
        }
    }


    async getProfessorData() {
        try {
            if (this.connection.state === 'disconnected') this.connection.connect((err) => {
                if (err) throw err;
                console.log('Connected!');
            })
            const response = await new Promise((resolve, reject) => {
                const query = "SELECT * FROM professors;";
                this.connection.query(query, (err, results) => {
                    if (err) reject(new Error(err.message));
                    resolve(results);
                })
            })
            return response;
        }
        catch (err) {
            console.log(err);
        }
    }
    async getAllProfessorsPublications(professorName) {
        try {
            if (this.connection.state === 'disconnected') this.connection.connect((err) => {
                if (err) throw err;
                console.log('Connected!');
            })
            const response = await new Promise((resolve, reject) => {
                const query = "SELECT * FROM publications where professorName = ?;";
                this.connection.query(query, [professorName], (err, results) => {
                    if (err) reject(new Error(err.message));
                    resolve(results);
                })
            })
            return response;
        }
        catch (err) {
            console.log(err);
        }
    }
    async getAllProfessorsCertifications(professorName) {
        try {
            if (this.connection.state === 'disconnected') this.connection.connect((err) => {
                if (err) throw err;
                console.log('Connected!');
            })
            const response = await new Promise((resolve, reject) => {
                const query = "SELECT * FROM certifications where professorName = ?;";
                this.connection.query(query, [professorName], (err, results) => {
                    if (err) reject(new Error(err.message));
                    resolve(results);
                })
            })
            return response;
        }
        catch (err) {
            console.log(err);
        }
    }

    async insertProfessorData(professor) {
        try {
            if (this.connection.state === 'disconnected') {
                this.connection.connect((err) => {
                    if (err) throw err;
                    console.log('Connected!');
                });
            }
            const query1 = "INSERT INTO professors (fullName, email, position, department, officeHours, imgLocation, shortBiography) VALUES (?, ?, ?, ?, ?, ?, ?)";
            const query2 = "INSERT INTO certifications(professorName, certifications) VALUES (?, ?)";
            const query3 = "INSERT INTO publications(professorName, books, articles, awards) VALUES (?, ?, ?, ?)";

            const insertIntoTable1 = new Promise((resolve, reject) => {
                this.connection.query(query1, [professor.fullName, professor.email, professor.position, professor.department, professor.officeHours, professor.imgLocation, professor.shortBio], (err, results) => {
                    if (err) reject(new Error(err.message));
                    resolve(results);
                });
            });

            const insertIntoTable2 = new Promise((resolve, reject) => {
                this.connection.query(query2, [professor.fullName, JSON.stringify(professor.certifications)], (err, results) => {
                    if (err) reject(new Error(err.message));
                    resolve(results);
                });
            });

            const insertIntoTable3 = new Promise((resolve, reject) => {
                this.connection.query(query3, [professor.fullName, JSON.stringify(professor.books), JSON.stringify(professor.articles), JSON.stringify(professor.awards)], (err, results) => {
                    if (err) reject(new Error(err.message));
                    resolve(results);
                });
            });
            const [result1, result2, result3] = await Promise.all([insertIntoTable1, insertIntoTable2, insertIntoTable3]);
            return result1.affectedRows === 1 && (result2.affectedRows === 1 && result3.affectedRows === 1) ? true : false;

        } catch (err) {
            console.log(err);
            return false;
        }
    }

    async updateProfessorData(professor, originalName) {
        try {
            if (this.connection.state === 'disconnected') {
                this.connection.connect((err) => {
                    if (err) throw err;
                    console.log('Connected!');
                });
            }
            const query1 = "UPDATE professors SET fullName = ?, email = ?, position = ?, department = ?, officeHours = ?, imgLocation = ?, shortBiography = ? WHERE fullName = ?";
            const query2 = "UPDATE certifications SET professorName = ? WHERE professorName = ?";
            const query3 = "UPDATE publications SET professorName = ? WHERE professorName = ?";

            const table1 = await new Promise((resolve, reject) => {
                this.connection.query(query1, [professor.fullName, professor.email, professor.position, professor.department, professor.officeHours, professor.imgLocation, professor.shortBio, originalName], (err, results) => {
                    if (err) reject(new Error(err.message));
                    resolve(results);
                });
            });
            const table2 = await new Promise((resolve, reject) => {
                this.connection.query(query2, [professor.fullName, originalName], (err, results) => {
                    if (err) reject(new Error(err.message));
                    resolve(results);
                });
            });
            const table3 = await new Promise((resolve, reject) => {
                this.connection.query(query3, [professor.fullName, originalName], (err, results) => {
                    if (err) reject(new Error(err.message));
                    resolve(results);
                });
            });
            const [result1, result2, result3] = await Promise.all([table1, table2, table3]);
            return result1.affectedRows === 1 && (result2.affectedRows === 1 && result3.affectedRows === 1) ? true : false;

        } catch (err) {
            console.log(err);
            return false;
        }
    }

    async updateBookData(professorName, bookArray) {
        try {
            if (this.connection.state === 'disconnected') this.connection.connect((err) => {
                if (err) throw err;
                console.log('Connected!');
            })
            const response = await new Promise((resolve, reject) => {
                const query = "update publications set books = ? where professorName = ?;";
                this.connection.query(query, [JSON.stringify(bookArray), professorName], (err, results) => {
                    if (err) reject(new Error(err.message));
                    resolve(results);
                })
            })
            return response
        }
        catch (err) {
            console.log(err);
        }
    }
    async updateArticleData(professorName, articleArray) {
        try {
            if (this.connection.state === 'disconnected') this.connection.connect((err) => {
                if (err) throw err;
                console.log('Connected!');
            })
            const response = await new Promise((resolve, reject) => {
                const query = "update publications set articles = ? where professorName = ?;";
                this.connection.query(query, [JSON.stringify(articleArray), professorName], (err, results) => {
                    if (err) reject(new Error(err.message));
                    resolve(results);
                })
            })
            return response
        }
        catch (err) {
            console.log(err);
        }
    }
    async updateAwardData(professorName, awardArray) {
        try {
            if (this.connection.state === 'disconnected') this.connection.connect((err) => {
                if (err) throw err;
                console.log('Connected!');
            })
            const response = await new Promise((resolve, reject) => {
                const query = "update publications set awards = ? where professorName = ?;";
                this.connection.query(query, [JSON.stringify(awardArray), professorName], (err, results) => {
                    if (err) reject(new Error(err.message));
                    resolve(results);
                })
            })
            return response
        }
        catch (err) {
            console.log(err);
        }
    }
    async updateCertData(professorName, certArray) {
        try {
            if (this.connection.state === 'disconnected') this.connection.connect((err) => {
                if (err) throw err;
                console.log('Connected!');
            })
            const response = await new Promise((resolve, reject) => {
                const query = "update certifications set certifications = ? where professorName = ?;";
                this.connection.query(query, [JSON.stringify(certArray), professorName], (err, results) => {
                    if (err) reject(new Error(err.message));
                    resolve(results);
                })
            })
            return response
        }
        catch (err) {
            console.log(err);
        }
    }

    async deleteProfessorData(professorName) {
        try {
            if (this.connection.state === 'disconnected') {
                this.connection.connect((err) => {
                    if (err) throw err;
                    console.log('Connected!');
                });
            }
            const query1 = "DELETE FROM professors WHERE fullName = ?";
            const query2 = "DELETE FROM certifications WHERE professorName = ?";
            const query3 = "DELETE FROM publications WHERE professorName = ?";

            const deletefromTable1 = new Promise((resolve, reject) => {
                this.connection.query(query1, [professorName], (err, results) => {
                    if (err) reject(new Error(err.message));
                    resolve(results);
                });
            });


            const deleteFromTable2 = new Promise((resolve, reject) => {
                this.connection.query(query2, [professorName], (err, results) => {
                    if (err) reject(new Error(err.message));
                    resolve(results);
                });
            });

            const deleteFromTable3 = new Promise((resolve, reject) => {
                this.connection.query(query3, [professorName], (err, results) => {
                    if (err) reject(new Error(err.message));
                    resolve(results);
                });
            });
            const [result1, result2, result3] = await Promise.all([deletefromTable1, deleteFromTable2, deleteFromTable3]);
            return result1.affectedRows === 1 && (result2.affectedRows === 1 && result3.affectedRows === 1) ? true : false;

        } catch (err) {
            console.log(err);
            return false;
        }
    }
}

module.exports = new ProfessorsDatabase();
