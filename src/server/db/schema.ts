import "server-only"

import { int, varchar, text, index, singlestoreTableCreator } from 'drizzle-orm/singlestore-core';

export const createTable = singlestoreTableCreator((name) =>
  `drive-tutorial_${name}`,
);

export const files = createTable("files_table", {
  id: int("id").primaryKey().autoincrement(),
  name: text("name").notNull(),
  url: varchar("url", { length: 255 }).notNull(),
  parent: int("parent").notNull(),
  size: int("size").notNull()
}, (t) => {
  return [
    index("files_parent_index").on(t.parent) // Changed name & indexed the parent column
  ];
});

export const folders = createTable("folders_table", {
  id: int("id").primaryKey().autoincrement(),
  name: text("name").notNull(),
  parent: int("parent"),
}, (t) => {
  return [
    index("folders_parent_index").on(t.parent) // Changed name & indexed the parent column
  ];
});
