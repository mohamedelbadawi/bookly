
const { renderFile } = require("ejs");
const Category = require("../models/Category")
const fs = require('fs')



class CategoryController {

    static async index(req, res) {
        const categories = await Category.getAll();
        res.render("admin/category/index", { categories: categories, page: req.url })
    }
    static async store(req, res) {

        const data = {
            name: req.body.name,
            image: req.file.filename
        }
        await Category.createCategory(data);
        res.redirect("/category/index");

    }
    static async update(req, res) {
        const data = {
            name: req.body.name,
            id: req.params.id
        }
        const category = await Category.getCategoryById(data['id']);

        if (req.file) {
            data['image'] = req.file.filename

            try {
                fs.unlinkSync("public/images/" + category.image)
            } catch (err) {
                console.error(err)
            }
        }
        Category.updateCategory(data);
        res.redirect("/category/index");
    }


    static async delete(req, res) {
        const category = await Category.deleteCategoryById(req.params.id);
        try {
            fs.unlinkSync("public/images/" + category.image)
        } catch (err) {
            console.error(err)
        }
        res.redirect("/category/index");

    }

}

module.exports = CategoryController