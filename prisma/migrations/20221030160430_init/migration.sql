-- CreateTable
CREATE TABLE `items` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `title` VARCHAR(255) NOT NULL,
    `image` VARCHAR(255) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
