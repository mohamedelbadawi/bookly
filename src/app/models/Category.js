const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

class Category {

    static async getAll() {
        const categories = await prisma.category.findMany();

        return categories;
    }
    static async createCategory(data) {
        const category = await prisma.category.create({
            data: {
                image: data['image'],
                name: data['name']
            }
        })
        return category;
    }
    static async deleteCategoryById(id) {
        const category = await prisma.category.delete({
            where: {
                id: Number(id),
            },
        })
        return category;
    }

    static async getCategoryById(id) {
        const category = await prisma.category.findFirst({
            where: {
                id: Number(id),
            }
        })
        return category;
    }

    static async updateCategory(data) {

        if (data['image']) {

            const category = await prisma.category.update({
                where: {
                    id: Number(data['id'])
                },
                data: {
                    name: data['name'],
                    image: data['image']
                }
            });
        }
        else {
            const category = await prisma.category.update({
                where: {
                    id: Number(data['id'])
                },
                data: {
                    name: data['name']
                }
            });
        }


    }

}

module.exports = Category