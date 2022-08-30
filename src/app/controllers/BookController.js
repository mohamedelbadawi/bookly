const Book = require("../models/Book")
const Category = require("../models/Category")
const { renderFile } = require("ejs");
const fs = require("fs");


class BookController {
    static async index(req, res) {
        const books = await Book.getAllBooks();
        const categories = await Category.getAll();
        res.render("admin/book/index", { books: books, categories: categories, page: req.url });
    }

    static async store(req, res) {
        const data = {
            name: req.body.name,
            author: req.body.author,
            image: req.file.filename,
            description: req.body.description,
            link: req.body.link,
            categoryId: req.body.category
        }
        await Book.storeBook(data);
        res.redirect("/books/index")
    }

    static async update(req, res) {
        const data = {
            id: req.params.id,
            name: req.body.name,
            author: req.body.author,
            description: req.body.description,
            link: req.body.link,
            categoryId: req.body.category
        }
        const book = await Book.getBookById(req.params.id);

        if (req.file) {
            data['image'] = req.file.filename;
            try {
                fs.unlinkSync("public/images/" + book.image)
            } catch (err) {
                console.error(err)
            }
        }

        await Book.updateBook(data);
        res.redirect("/books/index")
    }


    static async delete(req, res) {
        const book = await Book.deleteBookById(req.params.id);
        try {
            fs.unlinkSync("public/images/" + book.image)
        } catch (err) {
            console.error(err)
        }
        res.redirect("/books/index")

    }

}
module.exports = BookController