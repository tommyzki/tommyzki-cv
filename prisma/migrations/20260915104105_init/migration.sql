-- CreateEnum
CREATE TYPE "ContactGroup" AS ENUM ('FORMAL', 'SOCIAL');

-- CreateEnum
CREATE TYPE "ProjectStatus" AS ENUM ('DEPLOYED', 'PUBLISHED', 'COMING_SOON');

-- CreateTable
CREATE TABLE "Hero" (
    "id" INTEGER NOT NULL DEFAULT 1,
    "name" TEXT NOT NULL,
    "tagline" TEXT NOT NULL,
    "aspirations" TEXT NOT NULL,
    "imageSrc" TEXT NOT NULL,
    "imageAlt" TEXT NOT NULL,
    "imageAiHint" TEXT NOT NULL,
    "buttons" JSONB NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Hero_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "HeaderConfig" (
    "id" INTEGER NOT NULL DEFAULT 1,
    "logoText" TEXT NOT NULL,
    "siteTitle" TEXT NOT NULL,
    "navItems" JSONB NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "HeaderConfig_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "About" (
    "id" INTEGER NOT NULL DEFAULT 1,
    "title" TEXT NOT NULL,
    "paragraphs" TEXT[],
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "About_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Footer" (
    "id" INTEGER NOT NULL DEFAULT 1,
    "copyrightName" TEXT NOT NULL,
    "rightsReservedText" TEXT NOT NULL,
    "designNote" TEXT NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Footer_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ContactLink" (
    "id" SERIAL NOT NULL,
    "group" "ContactGroup" NOT NULL,
    "order" INTEGER NOT NULL,
    "href" TEXT NOT NULL,
    "iconName" TEXT NOT NULL,
    "label" TEXT NOT NULL,
    "ariaLabel" TEXT NOT NULL,
    "target" TEXT,

    CONSTRAINT "ContactLink_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Experience" (
    "id" SERIAL NOT NULL,
    "order" INTEGER NOT NULL,
    "role" TEXT NOT NULL,
    "company" TEXT NOT NULL,
    "period" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "iconName" TEXT NOT NULL,
    "highlights" TEXT[],

    CONSTRAINT "Experience_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Education" (
    "id" SERIAL NOT NULL,
    "order" INTEGER NOT NULL,
    "institution" TEXT NOT NULL,
    "period" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "details" TEXT[],
    "iconName" TEXT NOT NULL,

    CONSTRAINT "Education_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SkillCategory" (
    "id" SERIAL NOT NULL,
    "order" INTEGER NOT NULL,
    "title" TEXT NOT NULL,
    "categoryIconName" TEXT NOT NULL,

    CONSTRAINT "SkillCategory_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Skill" (
    "id" SERIAL NOT NULL,
    "order" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "iconName" TEXT NOT NULL,
    "categoryId" INTEGER NOT NULL,

    CONSTRAINT "Skill_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ProjectCategory" (
    "id" SERIAL NOT NULL,
    "order" INTEGER NOT NULL,
    "categoryTitle" TEXT NOT NULL,
    "showGithubButton" BOOLEAN NOT NULL DEFAULT false,
    "showMediumButton" BOOLEAN NOT NULL DEFAULT false,
    "mediumLink" TEXT,

    CONSTRAINT "ProjectCategory_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Project" (
    "id" SERIAL NOT NULL,
    "order" INTEGER NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "link" TEXT,
    "repo" TEXT,
    "status" "ProjectStatus" NOT NULL,
    "tags" TEXT[],
    "imagePlaceholder" TEXT NOT NULL,
    "imageAiHint" TEXT NOT NULL,
    "categoryId" INTEGER NOT NULL,

    CONSTRAINT "Project_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Skill" ADD CONSTRAINT "Skill_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "SkillCategory"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Project" ADD CONSTRAINT "Project_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "ProjectCategory"("id") ON DELETE CASCADE ON UPDATE CASCADE;
