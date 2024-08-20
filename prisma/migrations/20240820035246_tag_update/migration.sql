/*
  Warnings:

  - The primary key for the `mst_post_tag_mapping` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `tagtId` on the `mst_post_tag_mapping` table. All the data in the column will be lost.
  - Added the required column `tagId` to the `mst_post_tag_mapping` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_mst_post_tag_mapping" (
    "postId" TEXT NOT NULL,
    "tagId" TEXT NOT NULL,

    PRIMARY KEY ("postId", "tagId"),
    CONSTRAINT "mst_post_tag_mapping_postId_fkey" FOREIGN KEY ("postId") REFERENCES "Post" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "mst_post_tag_mapping_tagId_fkey" FOREIGN KEY ("tagId") REFERENCES "Tag" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_mst_post_tag_mapping" ("postId") SELECT "postId" FROM "mst_post_tag_mapping";
DROP TABLE "mst_post_tag_mapping";
ALTER TABLE "new_mst_post_tag_mapping" RENAME TO "mst_post_tag_mapping";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
