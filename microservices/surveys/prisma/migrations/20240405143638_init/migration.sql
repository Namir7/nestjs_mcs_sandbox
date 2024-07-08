-- CreateTable
CREATE TABLE "survey" (
    "id" UUID NOT NULL,
    "vulnerable_data" VARCHAR(10) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "survey_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "recipient" (
    "id" UUID NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "recipient_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_RecipientToSurvey" (
    "A" UUID NOT NULL,
    "B" UUID NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_RecipientToSurvey_AB_unique" ON "_RecipientToSurvey"("A", "B");

-- CreateIndex
CREATE INDEX "_RecipientToSurvey_B_index" ON "_RecipientToSurvey"("B");

-- AddForeignKey
ALTER TABLE "_RecipientToSurvey" ADD CONSTRAINT "_RecipientToSurvey_A_fkey" FOREIGN KEY ("A") REFERENCES "recipient"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_RecipientToSurvey" ADD CONSTRAINT "_RecipientToSurvey_B_fkey" FOREIGN KEY ("B") REFERENCES "survey"("id") ON DELETE CASCADE ON UPDATE CASCADE;
