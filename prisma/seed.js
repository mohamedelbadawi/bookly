const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const { hash } = require("../src/app/helpers/utils");
async function main() {
    await prisma.user.create({
        data: {
            name: "Mohamed",
            email: "Mohamed@gmail.com",
            password: await hash("123456789")
        }
    })
    await prisma.category.create({
        data: {
            name: "Programming",
            image: "Programming",
        }
    })
    await prisma.category.create({
        data: {
            name: "Drama",
            image: "Drama",

        }
    })


}
main()