import * as mammoth from "mammoth";

export const sessions = mammoth.defineTable({
  userId: mammoth.bigint().primaryKey().notNull(),
  sessionId: mammoth.text().primaryKey().notNull(),
  exp: mammoth.bigint().notNull(),
});

export const users = mammoth.defineTable({
  id: mammoth.bigint().primaryKey().notNull(),
  email: mammoth.text().unique().notNull(),
  password: mammoth.text(),
  permissions: mammoth.bigint().notNull().default("2"),
});

export const geraete = mammoth.defineTable({
  id: mammoth.text().primaryKey().notNull(),
  name: mammoth.text().notNull(),
  vorname: mammoth.text().notNull(),
  username: mammoth.text().notNull(),
  password: mammoth.text().notNull(),
  computername: mammoth.text().notNull(),
  workgroup: mammoth.text().notNull(),
  system: mammoth.text().notNull(),
  ip_adress: mammoth.text().notNull(),
  mac_adress: mammoth.text().notNull(),
  datum: mammoth.text().notNull(),
});

export const software = mammoth.defineTable({
  id: mammoth.text().notNull(),
  bezeichnung: mammoth.text().notNull(),
});

export const license = mammoth.defineTable({
  id: mammoth.text().primaryKey().notNull(),
  key: mammoth.text().notNull(),
  software_id: mammoth.text().notNull(),
  geraete_id: mammoth.text().notNull(),
  cors: mammoth.text(),
  quantity: mammoth.text(),
});
