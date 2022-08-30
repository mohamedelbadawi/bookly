
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

class DashboardController {

    static async index(req, res) {
        const books = await prisma.book.count();
        const categories = await prisma.category.count();
        const downlaods = await prisma.book.aggregate({
            _sum: {
                downloads: true,
            }
        })
        res.render("admin/dashboard", { books: books, categories: categories, downlaods: downlaods._sum.downloads, page: req.url });
    }
}

module.exports=DashboardController