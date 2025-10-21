-- CreateTable
CREATE TABLE "users" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "role" TEXT NOT NULL DEFAULT 'DELEGATE',
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "electoral_circles" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "region" TEXT NOT NULL,
    "deputies" INTEGER NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "voting_assemblies" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "circleId" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "voting_assemblies_circleId_fkey" FOREIGN KEY ("circleId") REFERENCES "electoral_circles" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "parties" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "acronym" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "candidates" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "partyId" TEXT NOT NULL,
    "circleId" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "candidates_partyId_fkey" FOREIGN KEY ("partyId") REFERENCES "parties" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "candidates_circleId_fkey" FOREIGN KEY ("circleId") REFERENCES "electoral_circles" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "delegate_assignments" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT NOT NULL,
    "circleId" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "delegate_assignments_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "delegate_assignments_circleId_fkey" FOREIGN KEY ("circleId") REFERENCES "electoral_circles" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "data_submissions" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT NOT NULL,
    "votingAssemblyId" TEXT NOT NULL,
    "registeredVoters" INTEGER NOT NULL,
    "actualVoters" INTEGER NOT NULL,
    "unusedBallots" INTEGER NOT NULL,
    "nullVotes" INTEGER NOT NULL,
    "blankVotes" INTEGER NOT NULL,
    "minutesPhotoUrl" TEXT,
    "status" TEXT NOT NULL DEFAULT 'PENDING',
    "submittedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "data_submissions_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "data_submissions_votingAssemblyId_fkey" FOREIGN KEY ("votingAssemblyId") REFERENCES "voting_assemblies" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "votes" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "dataSubmissionId" TEXT NOT NULL,
    "partyId" TEXT NOT NULL,
    "voteCount" INTEGER NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "votes_dataSubmissionId_fkey" FOREIGN KEY ("dataSubmissionId") REFERENCES "data_submissions" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "votes_partyId_fkey" FOREIGN KEY ("partyId") REFERENCES "parties" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "circle_results" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "circleId" TEXT NOT NULL,
    "partyId" TEXT NOT NULL,
    "totalVotes" INTEGER NOT NULL,
    "projectedSeats" INTEGER,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "circle_results_circleId_fkey" FOREIGN KEY ("circleId") REFERENCES "electoral_circles" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "national_results" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "partyId" TEXT NOT NULL,
    "totalVotes" INTEGER NOT NULL,
    "projectedSeats" INTEGER,
    "updatedAt" DATETIME NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "electoral_circles_name_key" ON "electoral_circles"("name");

-- CreateIndex
CREATE UNIQUE INDEX "voting_assemblies_name_circleId_key" ON "voting_assemblies"("name", "circleId");

-- CreateIndex
CREATE UNIQUE INDEX "parties_name_key" ON "parties"("name");

-- CreateIndex
CREATE UNIQUE INDEX "parties_acronym_key" ON "parties"("acronym");

-- CreateIndex
CREATE UNIQUE INDEX "candidates_name_partyId_key" ON "candidates"("name", "partyId");

-- CreateIndex
CREATE UNIQUE INDEX "delegate_assignments_userId_circleId_key" ON "delegate_assignments"("userId", "circleId");

-- CreateIndex
CREATE UNIQUE INDEX "data_submissions_votingAssemblyId_key" ON "data_submissions"("votingAssemblyId");

-- CreateIndex
CREATE UNIQUE INDEX "votes_dataSubmissionId_partyId_key" ON "votes"("dataSubmissionId", "partyId");

-- CreateIndex
CREATE UNIQUE INDEX "circle_results_circleId_partyId_key" ON "circle_results"("circleId", "partyId");

-- CreateIndex
CREATE UNIQUE INDEX "national_results_partyId_key" ON "national_results"("partyId");
