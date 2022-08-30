
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

class Book {

    static async getAllBooks() {
        const books = await prisma.book.findMany();
        return books;
    }

    static async storeBook(data) {
        // console.log(data)
        const book = await prisma.book.create({
            data: {
                name: data['name'],
                author: data['author'],
                image: data['image'],
                description: data['description'],
                link: data['link'],
                categoryId: Number(data['categoryId'])
            }
        });

        return book;
    }

    static async getBookById(id) {
        return await prisma.book.findFirst({
            where: {
                id: Number(id),
            },
        });
    }

    static async updateBook(data) {
        
        if (!data['image']) {

            const book = await prisma.book.update({
                where: {
                    id: Number(data['id'])
                }
                , data: {
                    name: data['name'],
                    author: data['author'],

                    description: data['description'],
                    link: data['link'],
                    categoryId: Number(data['categoryId']),
                },

            });
        }
        else {

            const book = await prisma.book.update({
                where: {
                    id: Number(data['id'])
                }
                , data: {
                    name: data['name'],
                    author: data['author'],
                    image: data['image'],
                    description: data['description'],
                    link: data['link'],
                    categoryId: Number(data['categoryId']),
                }
            });
        }

    }

    static async deleteBookById(id) {
        const book = await prisma.book.delete({
            where: {
                id: Number(id),
            },
        })
        return book;
    }




}
module.exports = Book