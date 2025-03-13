CREATE TABLE `files_table` (
	`id` int AUTO_INCREMENT NOT NULL,
	`name` text NOT NULL,
	`url` varchar(255) NOT NULL,
	`parent` int NOT NULL,
	`size` int NOT NULL,
	CONSTRAINT `files_table_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE INDEX `parent_index` ON `files_table` (`id`);--> statement-breakpoint
CREATE TABLE `folders_table` (
	`id` int AUTO_INCREMENT NOT NULL,
	`name` text NOT NULL,
	`parent` int,
	CONSTRAINT `folders_table_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE INDEX `parent_index` ON `folders_table` (`id`);