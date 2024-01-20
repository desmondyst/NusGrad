-- CreateTable
CREATE TABLE `Degree` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `Degree_name_key`(`name`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Batch` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `Batch_name_key`(`name`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `DegreeWithBatch` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `degreeId` INTEGER NOT NULL,
    `batchId` INTEGER NOT NULL,

    INDEX `DegreeWithBatch_degreeId_idx`(`degreeId`),
    INDEX `DegreeWithBatch_batchId_idx`(`batchId`),
    UNIQUE INDEX `DegreeWithBatch_degreeId_batchId_key`(`degreeId`, `batchId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `degreeRequirement` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `degreeWithBatchId` INTEGER NOT NULL,
    `requirementCourseId` INTEGER NOT NULL,

    INDEX `degreeRequirement_degreeWithBatchId_idx`(`degreeWithBatchId`),
    INDEX `degreeRequirement_requirementCourseId_idx`(`requirementCourseId`),
    UNIQUE INDEX `degreeRequirement_degreeWithBatchId_requirementCourseId_key`(`degreeWithBatchId`, `requirementCourseId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `RequirementCourse` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `requirementId` INTEGER NOT NULL,
    `courseId` INTEGER NOT NULL,

    INDEX `RequirementCourse_requirementId_idx`(`requirementId`),
    INDEX `RequirementCourse_courseId_idx`(`courseId`),
    UNIQUE INDEX `RequirementCourse_requirementId_courseId_key`(`requirementId`, `courseId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Requirement` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `Requirement_name_key`(`name`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Course` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `code` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `credit` INTEGER NOT NULL,
    `type` VARCHAR(191) NOT NULL,
    `level` INTEGER NOT NULL,

    UNIQUE INDEX `Course_code_key`(`code`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
