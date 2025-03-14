// import "server-only"
import { int, varchar, text, index, singlestoreTableCreator, timestamp, bigint } from 'drizzle-orm/singlestore-core';

export const createTable = singlestoreTableCreator((name) =>
  `drive_tutorial_${name}`,
);

export const file_table = createTable("files_table", {
  id: bigint("id", { mode: "number", unsigned: true }).primaryKey().autoincrement(),
  ownerId: text("owner_id").notNull(),

  name: text("name").notNull(),
  url: varchar("url", { length: 255 }).notNull(),
  parent: bigint("parent", { mode: "number", unsigned: true }).notNull(),
  size: int("size").notNull(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
}, (t) => {
  return [
    index("files_parent_index").on(t.parent), // Changed name & indexed the parent column
    index("files_owner_index").on(t.ownerId)
  ];
});

export type DB_FileType = typeof file_table.$inferSelect;

export const folder_table = createTable("folders_table", {
  id: bigint("id", { mode: "number", unsigned: true }).primaryKey().autoincrement(),
  ownerId: text("owner_id").notNull(),

  name: text("name").notNull(),
  parent: bigint("parent", { mode: "number", unsigned: true }),
  createdAt: timestamp("created_at").notNull().defaultNow(),
}, (t) => {
  return [
    index("folders_parent_index").on(t.parent), // Changed name & indexed the parent column
    index("folders_owner_index").on(t.ownerId)
  ];
});

export type DB_FolderType = typeof file_table.$inferSelect;

