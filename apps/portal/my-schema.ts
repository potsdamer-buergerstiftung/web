export interface AiPrompt {
	/** @primaryKey */
	id: string;
	sort?: number | null;
	date_created?: string | null;
	user_created?: DirectusUser | string | null;
	date_updated?: string | null;
	user_updated?: DirectusUser | string | null;
	/** @required */
	name: string;
	status?: 'published' | 'draft' | 'archived' | null;
	description?: string | null;
	system_prompt?: string | null;
	messages?: Array<{ role: 'user' | 'assistant'; text: string }> | null;
}

export interface Article {
	/** @description Category of the article */
	category?: Category | string | null;
	/** @description The main content of the article @required */
	content: string;
	date_created?: string | null;
	date_updated?: string | null;
	/** @description Short description or summary of the article */
	excerpt?: string | null;
	/** @description Main image displayed with the article */
	featured_image?: DirectusFile | string | null;
	/** @primaryKey */
	id: number;
	/** @description When the article was published */
	published_at?: string | null;
	/** @description URL-friendly version of the title @required */
	slug: string;
	/** @description Publication status of the article @required */
	status: 'draft' | 'published' | 'archived';
	/** @description The main title of the article @required */
	title: string;
	user_created?: DirectusUser | string | null;
	user_updated?: DirectusUser | string | null;
	/** @description Tags associated with the article */
	tags?: string;
}

export interface ArticlesTag {
	/** @required */
	articles_id: Article | string;
	/** @primaryKey */
	id: number;
	/** @required */
	tags_id: Tag | string;
}

export interface BlockRichtext {
	/** @primaryKey */
	id: string;
	content?: string | null;
}

export interface Category {
	/** @description Color for category display */
	color?: string | null;
	date_created?: string | null;
	date_updated?: string | null;
	/** @description Category description */
	description?: string | null;
	/** @primaryKey */
	id: string;
	/** @description Category name @required */
	name: string;
	/** @description URL-friendly version of the name @required */
	slug: string;
	user_created?: DirectusUser | string | null;
	user_updated?: DirectusUser | string | null;
}

export interface DirectusSyncIdMap {
	/** @primaryKey */
	id: number;
	table?: string;
	sync_id?: string;
	local_id?: string;
	created_at?: string | null;
}

export interface FormFieldText {
	/** @primaryKey */
	id: string;
	label?: string;
}

export interface Form {
	/** @primaryKey */
	id: string;
	status?: 'published' | 'draft' | 'archived';
	user_created?: DirectusUser | string | null;
	date_created?: string | null;
	user_updated?: DirectusUser | string | null;
	date_updated?: string | null;
	/** @required */
	title: string;
	fields?: FormsField[] | string[];
}

export interface FormsField {
	/** @primaryKey */
	id: number;
	forms_id?: Form | string | null;
	item?: FormFieldText | string | null;
	collection?: string | null;
	sort?: number | null;
}

export interface Page {
	/** @primaryKey */
	id: string;
	status?: 'published' | 'draft' | 'archived';
	sort?: number | null;
	user_created?: DirectusUser | string | null;
	date_created?: string | null;
	user_updated?: DirectusUser | string | null;
	date_updated?: string | null;
	parent?: Page | string | null;
	/** @required */
	title: string;
	blocks?: PagesBlock[] | string[];
}

export interface PagesBlock {
	/** @primaryKey */
	id: number;
	pages_id?: Page | string | null;
	item?: BlockRichtext | string | null;
	collection?: string | null;
	sort?: number | null;
}

export interface Tag {
	/** @description Color for tag display */
	color?: string | null;
	date_created?: string | null;
	date_updated?: string | null;
	/** @primaryKey */
	id: string;
	/** @description Tag name @required */
	name: string;
	/** @description URL-friendly version of the name @required */
	slug: string;
	user_created?: DirectusUser | string | null;
	user_updated?: DirectusUser | string | null;
}

export interface DirectusAccess {
	/** @primaryKey */
	id: string;
	role?: DirectusRole | string | null;
	user?: DirectusUser | string | null;
	policy?: DirectusPolicy | string;
	sort?: number | null;
}

export interface DirectusActivity {
	/** @primaryKey */
	id: number;
	action?: string;
	user?: DirectusUser | string | null;
	timestamp?: string;
	ip?: string | null;
	user_agent?: string | null;
	collection?: string;
	item?: string;
	origin?: string | null;
	revisions?: DirectusRevision[] | string[];
}

export interface DirectusCollection {
	/** @primaryKey */
	collection: string;
	icon?: string | null;
	note?: string | null;
	display_template?: string | null;
	hidden?: boolean;
	singleton?: boolean;
	translations?: Array<{ language: string; translation: string; singular: string; plural: string }> | null;
	archive_field?: string | null;
	archive_app_filter?: boolean;
	archive_value?: string | null;
	unarchive_value?: string | null;
	sort_field?: string | null;
	accountability?: 'all' | 'activity' | null | null;
	color?: string | null;
	item_duplication_fields?: 'json' | null;
	sort?: number | null;
	group?: DirectusCollection | string | null;
	collapse?: string;
	preview_url?: string | null;
	versioning?: boolean;
}

export interface DirectusComment {
	/** @primaryKey */
	id: string;
	collection?: DirectusCollection | string;
	item?: string;
	comment?: string;
	date_created?: string | null;
	date_updated?: string | null;
	user_created?: DirectusUser | string | null;
	user_updated?: DirectusUser | string | null;
}

export interface DirectusField {
	/** @primaryKey */
	id: number;
	collection?: DirectusCollection | string;
	field?: string;
	special?: string[] | null;
	interface?: string | null;
	options?: 'json' | null;
	display?: string | null;
	display_options?: 'json' | null;
	readonly?: boolean;
	hidden?: boolean;
	sort?: number | null;
	width?: string | null;
	translations?: 'json' | null;
	note?: string | null;
	conditions?: 'json' | null;
	required?: boolean | null;
	group?: DirectusField | string | null;
	validation?: 'json' | null;
	validation_message?: string | null;
}

export interface DirectusFile {
	/** @primaryKey */
	id: string;
	storage?: string;
	filename_disk?: string | null;
	filename_download?: string;
	title?: string | null;
	type?: string | null;
	folder?: DirectusFolder | string | null;
	uploaded_by?: DirectusUser | string | null;
	created_on?: string;
	modified_by?: DirectusUser | string | null;
	modified_on?: string;
	charset?: string | null;
	filesize?: number | null;
	width?: number | null;
	height?: number | null;
	duration?: number | null;
	embed?: string | null;
	description?: string | null;
	location?: string | null;
	tags?: string[] | null;
	metadata?: 'json' | null;
	focal_point_x?: number | null;
	focal_point_y?: number | null;
	tus_id?: string | null;
	tus_data?: 'json' | null;
	uploaded_on?: string | null;
}

export interface DirectusFolder {
	/** @primaryKey */
	id: string;
	name?: string;
	parent?: DirectusFolder | string | null;
}

export interface DirectusMigration {
	/** @primaryKey */
	version: string;
	name?: string;
	timestamp?: string | null;
}

export interface DirectusPermission {
	/** @primaryKey */
	id: number;
	collection?: string;
	action?: string;
	permissions?: 'json' | null;
	validation?: 'json' | null;
	presets?: 'json' | null;
	fields?: string[] | null;
	policy?: DirectusPolicy | string;
}

export interface DirectusPolicy {
	/** @primaryKey */
	id: string;
	/** @required */
	name: string;
	icon?: string;
	description?: string | null;
	ip_access?: string[] | null;
	enforce_tfa?: boolean;
	admin_access?: boolean;
	app_access?: boolean;
	permissions?: DirectusPermission[] | string[];
	users?: DirectusAccess[] | string[];
	roles?: DirectusAccess[] | string[];
}

export interface DirectusPreset {
	/** @primaryKey */
	id: number;
	bookmark?: string | null;
	user?: DirectusUser | string | null;
	role?: DirectusRole | string | null;
	collection?: string | null;
	search?: string | null;
	layout?: string | null;
	layout_query?: 'json' | null;
	layout_options?: 'json' | null;
	refresh_interval?: number | null;
	filter?: 'json' | null;
	icon?: string | null;
	color?: string | null;
}

export interface DirectusRelation {
	/** @primaryKey */
	id: number;
	many_collection?: string;
	many_field?: string;
	one_collection?: string | null;
	one_field?: string | null;
	one_collection_field?: string | null;
	one_allowed_collections?: string[] | null;
	junction_field?: string | null;
	sort_field?: string | null;
	one_deselect_action?: string;
}

export interface DirectusRevision {
	/** @primaryKey */
	id: number;
	activity?: DirectusActivity | string;
	collection?: string;
	item?: string;
	data?: 'json' | null;
	delta?: 'json' | null;
	parent?: DirectusRevision | string | null;
	version?: DirectusVersion | string | null;
}

export interface DirectusRole {
	/** @primaryKey */
	id: string;
	/** @required */
	name: string;
	icon?: string;
	description?: string | null;
	parent?: DirectusRole | string | null;
	children?: DirectusRole[] | string[];
	policies?: DirectusAccess[] | string[];
	users?: DirectusUser[] | string[];
}

export interface DirectusSession {
	/** @primaryKey */
	token: string;
	user?: DirectusUser | string | null;
	expires?: string;
	ip?: string | null;
	user_agent?: string | null;
	share?: DirectusShare | string | null;
	origin?: string | null;
	next_token?: string | null;
}

export interface DirectusSettings {
	/** @primaryKey */
	id: number;
	project_name?: string;
	project_url?: string | null;
	project_color?: string;
	project_logo?: DirectusFile | string | null;
	public_foreground?: DirectusFile | string | null;
	public_background?: DirectusFile | string | null;
	public_note?: string | null;
	auth_login_attempts?: number | null;
	auth_password_policy?: null | `/^.{8,}$/` | `/(?=^.{8,}$)(?=.*\\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()_+}{';'?>.<,])(?!.*\\s).*$/` | null;
	storage_asset_transform?: 'all' | 'none' | 'presets' | null;
	storage_asset_presets?: Array<{ key: string; fit: 'contain' | 'cover' | 'inside' | 'outside'; width: number; height: number; quality: number; withoutEnlargement: boolean; format: 'auto' | 'jpeg' | 'png' | 'webp' | 'tiff' | 'avif'; transforms: 'json' }> | null;
	custom_css?: string | null;
	storage_default_folder?: DirectusFolder | string | null;
	basemaps?: Array<{ name: string; type: 'raster' | 'tile' | 'style'; url: string; tileSize: number; attribution: string }> | null;
	mapbox_key?: string | null;
	module_bar?: 'json' | null;
	project_descriptor?: string | null;
	default_language?: string;
	custom_aspect_ratios?: Array<{ text: string; value: number }> | null;
	public_favicon?: DirectusFile | string | null;
	default_appearance?: 'auto' | 'light' | 'dark';
	default_theme_light?: string | null;
	theme_light_overrides?: 'json' | null;
	default_theme_dark?: string | null;
	theme_dark_overrides?: 'json' | null;
	report_error_url?: string | null;
	report_bug_url?: string | null;
	report_feature_url?: string | null;
	public_registration?: boolean;
	public_registration_verify_email?: boolean;
	public_registration_role?: DirectusRole | string | null;
	public_registration_email_filter?: 'json' | null;
	visual_editor_urls?: Array<{ url: string }> | null;
	accepted_terms?: boolean | null;
	project_id?: string | null;
	mcp_enabled?: boolean;
	mcp_allow_deletes?: boolean;
	mcp_prompts_collection?: string | null;
	mcp_system_prompt_enabled?: boolean;
	mcp_system_prompt?: string | null;
}

export interface DirectusUser {
	/** @primaryKey */
	id: string;
	first_name?: string | null;
	last_name?: string | null;
	email?: string | null;
	password?: string | null;
	location?: string | null;
	title?: string | null;
	description?: string | null;
	tags?: string[] | null;
	avatar?: DirectusFile | string | null;
	language?: string | null;
	tfa_secret?: string | null;
	status?: 'draft' | 'invited' | 'unverified' | 'active' | 'suspended' | 'archived';
	role?: DirectusRole | string | null;
	token?: string | null;
	last_access?: string | null;
	last_page?: string | null;
	provider?: string;
	external_identifier?: string | null;
	auth_data?: 'json' | null;
	email_notifications?: boolean | null;
	appearance?: null | 'auto' | 'light' | 'dark' | null;
	theme_dark?: string | null;
	theme_light?: string | null;
	theme_light_overrides?: 'json' | null;
	theme_dark_overrides?: 'json' | null;
	text_direction?: 'auto' | 'ltr' | 'rtl';
	policies?: DirectusAccess[] | string[];
}

export interface DirectusWebhook {
	/** @primaryKey */
	id: number;
	name?: string;
	method?: null;
	url?: string;
	status?: 'active' | 'inactive';
	data?: boolean;
	actions?: 'create' | 'update' | 'delete';
	collections?: string[];
	headers?: Array<{ header: string; value: string }> | null;
	was_active_before_deprecation?: boolean;
	migrated_flow?: DirectusFlow | string | null;
}

export interface DirectusDashboard {
	/** @primaryKey */
	id: string;
	name?: string;
	icon?: string;
	note?: string | null;
	date_created?: string | null;
	user_created?: DirectusUser | string | null;
	color?: string | null;
	panels?: DirectusPanel[] | string[];
}

export interface DirectusPanel {
	/** @primaryKey */
	id: string;
	dashboard?: DirectusDashboard | string;
	name?: string | null;
	icon?: string | null;
	color?: string | null;
	show_header?: boolean;
	note?: string | null;
	type?: string;
	position_x?: number;
	position_y?: number;
	width?: number;
	height?: number;
	options?: 'json' | null;
	date_created?: string | null;
	user_created?: DirectusUser | string | null;
}

export interface DirectusNotification {
	/** @primaryKey */
	id: number;
	timestamp?: string | null;
	status?: string | null;
	recipient?: DirectusUser | string;
	sender?: DirectusUser | string | null;
	subject?: string;
	message?: string | null;
	collection?: string | null;
	item?: string | null;
}

export interface DirectusShare {
	/** @primaryKey */
	id: string;
	name?: string | null;
	collection?: DirectusCollection | string;
	item?: string;
	role?: DirectusRole | string | null;
	password?: string | null;
	user_created?: DirectusUser | string | null;
	date_created?: string | null;
	date_start?: string | null;
	date_end?: string | null;
	times_used?: number | null;
	max_uses?: number | null;
}

export interface DirectusFlow {
	/** @primaryKey */
	id: string;
	name?: string;
	icon?: string | null;
	color?: string | null;
	description?: string | null;
	status?: string;
	trigger?: string | null;
	accountability?: string | null;
	options?: 'json' | null;
	operation?: DirectusOperation | string | null;
	date_created?: string | null;
	user_created?: DirectusUser | string | null;
	operations?: DirectusOperation[] | string[];
}

export interface DirectusOperation {
	/** @primaryKey */
	id: string;
	name?: string | null;
	key?: string;
	type?: string;
	position_x?: number;
	position_y?: number;
	options?: 'json' | null;
	resolve?: DirectusOperation | string | null;
	reject?: DirectusOperation | string | null;
	flow?: DirectusFlow | string;
	date_created?: string | null;
	user_created?: DirectusUser | string | null;
}

export interface DirectusTranslation {
	/** @primaryKey */
	id: string;
	/** @required */
	language: string;
	/** @required */
	key: string;
	/** @required */
	value: string;
}

export interface DirectusVersion {
	/** @primaryKey */
	id: string;
	key?: string;
	name?: string | null;
	collection?: DirectusCollection | string;
	item?: string;
	hash?: string | null;
	date_created?: string | null;
	date_updated?: string | null;
	user_created?: DirectusUser | string | null;
	user_updated?: DirectusUser | string | null;
	delta?: 'json' | null;
}

export interface DirectusExtension {
	enabled?: boolean;
	/** @primaryKey */
	id: string;
	folder?: string;
	source?: string;
	bundle?: string | null;
}

export interface Schema {
	ai_prompts: AiPrompt[];
	articles: Article[];
	articles_tags: ArticlesTag[];
	block_richtext: BlockRichtext[];
	categories: Category[];
	directus_sync_id_map: DirectusSyncIdMap[];
	form_field_text: FormFieldText[];
	forms: Form[];
	forms_fields: FormsField[];
	pages: Page[];
	pages_blocks: PagesBlock[];
	tags: Tag[];
	directus_access: DirectusAccess[];
	directus_activity: DirectusActivity[];
	directus_collections: DirectusCollection[];
	directus_comments: DirectusComment[];
	directus_fields: DirectusField[];
	directus_files: DirectusFile[];
	directus_folders: DirectusFolder[];
	directus_migrations: DirectusMigration[];
	directus_permissions: DirectusPermission[];
	directus_policies: DirectusPolicy[];
	directus_presets: DirectusPreset[];
	directus_relations: DirectusRelation[];
	directus_revisions: DirectusRevision[];
	directus_roles: DirectusRole[];
	directus_sessions: DirectusSession[];
	directus_settings: DirectusSettings;
	directus_users: DirectusUser[];
	directus_webhooks: DirectusWebhook[];
	directus_dashboards: DirectusDashboard[];
	directus_panels: DirectusPanel[];
	directus_notifications: DirectusNotification[];
	directus_shares: DirectusShare[];
	directus_flows: DirectusFlow[];
	directus_operations: DirectusOperation[];
	directus_translations: DirectusTranslation[];
	directus_versions: DirectusVersion[];
	directus_extensions: DirectusExtension[];
}

export enum CollectionNames {
	ai_prompts = 'ai_prompts',
	articles = 'articles',
	articles_tags = 'articles_tags',
	block_richtext = 'block_richtext',
	categories = 'categories',
	directus_sync_id_map = 'directus_sync_id_map',
	form_field_text = 'form_field_text',
	forms = 'forms',
	forms_fields = 'forms_fields',
	pages = 'pages',
	pages_blocks = 'pages_blocks',
	tags = 'tags',
	directus_access = 'directus_access',
	directus_activity = 'directus_activity',
	directus_collections = 'directus_collections',
	directus_comments = 'directus_comments',
	directus_fields = 'directus_fields',
	directus_files = 'directus_files',
	directus_folders = 'directus_folders',
	directus_migrations = 'directus_migrations',
	directus_permissions = 'directus_permissions',
	directus_policies = 'directus_policies',
	directus_presets = 'directus_presets',
	directus_relations = 'directus_relations',
	directus_revisions = 'directus_revisions',
	directus_roles = 'directus_roles',
	directus_sessions = 'directus_sessions',
	directus_settings = 'directus_settings',
	directus_users = 'directus_users',
	directus_webhooks = 'directus_webhooks',
	directus_dashboards = 'directus_dashboards',
	directus_panels = 'directus_panels',
	directus_notifications = 'directus_notifications',
	directus_shares = 'directus_shares',
	directus_flows = 'directus_flows',
	directus_operations = 'directus_operations',
	directus_translations = 'directus_translations',
	directus_versions = 'directus_versions',
	directus_extensions = 'directus_extensions'
}