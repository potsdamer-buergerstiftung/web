export interface Account {
  /** @primaryKey */
  id: number;
  status?: "published" | "draft" | "archived";
  sort?: number | null;
  user_created?: DirectusUser | string | null;
  date_created?: string | null;
  user_updated?: DirectusUser | string | null;
  date_updated?: string | null;
  /** @required */
  name: string;
}

export interface BlockHero {
  /** @primaryKey */
  id: string;
  /** @required */
  headline: string;
  /** @required */
  content: string;
  actions?: Array<{ label: string; href: string }> | null;
}

export interface Campaign {
  /** @primaryKey */
  id: number;
  status?: "published" | "draft" | "archived";
  sort?: number | null;
  user_created?: DirectusUser | string | null;
  date_created?: string | null;
  user_updated?: DirectusUser | string | null;
  date_updated?: string | null;
  /** @required */
  name: string;
  project?: Project | string | null;
}

export interface Charter {
  /** @primaryKey */
  id: number;
  user_updated?: DirectusUser | string | null;
  date_updated?: string | null;
  content?: "json" | null;
}

export interface Company {
  /** @primaryKey */
  id: string;
  status?: "active" | "archived" | null;
  user_created?: DirectusUser | string | null;
  date_created?: string | null;
  user_updated?: DirectusUser | string | null;
  date_updated?: string | null;
  /** @required */
  name: string;
  phone?: string | null;
}

export interface ContactGroup {
  /** @primaryKey */
  id: number;
  status?: "published" | "draft" | "archived";
  user_created?: DirectusUser | string | null;
  date_created?: string | null;
  user_updated?: DirectusUser | string | null;
  date_updated?: string | null;
  /** @required */
  name: string;
  description?: string | null;
  contacts?: ContactsContactGroup[] | string[];
}

export interface ContactRequest {
  /** @primaryKey */
  id: number;
  date_created?: string | null;
  message?: string | null;
  project?: Project | string | null;
  first_name?: string | null;
  last_name?: string | null;
  organisation?: string | null;
  phone?: string | null;
  email?: string | null;
  subject?: string | null;
}

export interface Contact {
  /** @primaryKey */
  id: string;
  status?: "published" | "draft" | "archived";
  user_created?: DirectusUser | string | null;
  date_created?: string | null;
  user_updated?: DirectusUser | string | null;
  date_updated?: string | null;
  first_name?: string | null;
  last_name?: string | null;
  company?: Company | string | null;
  email?: string | null;
  phone?: string | null;
  groups?: ContactsContactGroup[] | string[];
}

export interface ContactsContactGroup {
  /** @primaryKey */
  id: number;
  contacts_id?: Contact | string | null;
  contact_groups_id?: ContactGroup | string | null;
}

export interface ContactsContact {
  /** @primaryKey */
  id: number;
  contacts_id?: Contact | string | null;
  related_contacts_id?: Contact | string | null;
}

export interface CostCenter {
  /** @primaryKey */
  id: string;
  user_created?: DirectusUser | string | null;
  date_created?: string | null;
  user_updated?: DirectusUser | string | null;
  date_updated?: string | null;
  /** @required */
  name: string;
  description?: string | null;
  project?: Project | string | null;
  /** @description Benutzer, die als autorisierte Personen angegeben sind, verfügen über die Berechtigung alle Rechnungen, die an diese Kostenstelle gebunden werden zu bearbeiten, zu löschen und zu erstellen. Alternativ kann der Zugriff auf Rechnungen auch durch die Zuweisung eines Projektes erteilt werden. Ist die Person dieses Projektes als Projektleiter angegeben, verfügt er über die gleichen Berechtigungen. */
  users_authorized?: CostCentersDirectusUser[] | string[];
}

export interface CostCentersDirectusUser {
  /** @primaryKey */
  id: number;
  cost_centers_id?: CostCenter | string | null;
  directus_users_id?: DirectusUser | string | null;
}

export interface DocumentationArticle {
  /** @primaryKey */
  id: number;
  status?: "published" | "draft" | "archived";
  sort?: number | null;
  user_created?: DirectusUser | string | null;
  date_created?: string | null;
  user_updated?: DirectusUser | string | null;
  date_updated?: string | null;
  /** @required */
  title: string;
  content?: string | null;
}

export interface Event {
  /** @primaryKey */
  id: number;
  status?: "live" | "draft" | "canceled" | "archived" | null;
  user_created?: DirectusUser | string | null;
  date_created?: string | null;
  user_updated?: DirectusUser | string | null;
  date_updated?: string | null;
  /** @required */
  name: string;
  /** @required */
  summary: string;
  description?: string | null;
  /** @required */
  start: string;
  /** @required */
  end: string;
  image?: DirectusFile | string | null;
  /** @description Aktivieren, wenn für die Veranstaltung eine Registrierung (Tickets) notwendig ist. @required */
  registration_needed: boolean;
  external_ticket_url?: string | null;
  /** @description Aktivieren, wenn für den Ticketvertrieb eine externe Plattform genutzt wird. @required */
  use_external_ticket_provider: boolean;
  /** @description Wird verwendet, um die Veranstaltung auf den projekt-spezifischen Web-Services anzuzeigen. */
  project?: Project | string | null;
  location?: Location | string | null;
  is_online_event?: boolean | null;
  tickets?: Ticket[] | string[];
}

export interface Imprint {
  /** @primaryKey */
  id: number;
  content?: "json" | null;
}

export interface InvoiceDocumentItem {
  /** @primaryKey */
  id: number;
  sort?: number | null;
  /** @required */
  name: string;
  description?: string | null;
  amount?: number | null;
  include_tax?: boolean | null;
  tax?: Taxe | string | null;
}

export interface InvoiceDocument {
  /** @primaryKey */
  id: number;
  status?: "draft" | "issued";
  user_created?: DirectusUser | string | null;
  date_created?: string | null;
  user_updated?: DirectusUser | string | null;
  date_updated?: string | null;
  /** @required */
  customer: Company | string;
  /** @required */
  date_due: string;
  notes?: string | null;
  conditions?: string | null;
  items?: InvoiceDocumentsItem[] | string[];
}

export interface InvoiceDocumentsItem {
  /** @primaryKey */
  id: number;
  invoice_documents_id?: InvoiceDocument | string | null;
  item?: Product | InvoiceDocumentItem | string | null;
  collection?: string | null;
}

export interface Invoice {
  /** @primaryKey */
  id: string;
  /** @required */
  status:
    | "draft"
    | "unprocessed"
    | "open"
    | "in_progress"
    | "approved"
    | "settled";
  user_created?: DirectusUser | string | null;
  date_created?: string | null;
  user_updated?: DirectusUser | string | null;
  date_updated?: string | null;
  date_issued?: string | null;
  /** @required */
  date_due: string;
  /** @required */
  amount: number;
  notes?: string | null;
  type?: "incoming" | "outgoing" | null;
  attachment?: DirectusFile | string | null;
  invoice_number?: string | null;
  /** @required */
  contact: Company | string;
  date_settled?: string | null;
  booked?: boolean | null;
  ksk_mandatory?: boolean | null;
  cost_centers?: InvoicesCostCenter[] | string[];
}

export interface InvoicesCostCenter {
  /** @primaryKey */
  id: number;
  invoices_id?: Invoice | string | null;
  cost_centers_id?: CostCenter | string | null;
}

export interface Location {
  /** @primaryKey */
  id: number;
  status?: "open" | "closed" | null;
  user_created?: DirectusUser | string | null;
  date_created?: string | null;
  user_updated?: DirectusUser | string | null;
  date_updated?: string | null;
  /** @required */
  name: string;
  /** @required */
  coordinates: string;
  products?: ProductsLocation[] | string[];
}

export interface MailingSegment {
  /** @primaryKey */
  id: number;
  user_created?: DirectusUser | string | null;
  date_created?: string | null;
  user_updated?: DirectusUser | string | null;
  date_updated?: string | null;
}

export interface Mailing {
  /** @primaryKey */
  id: number;
  status?: "sent" | "draft" | "archived";
  user_created?: DirectusUser | string | null;
  date_created?: string | null;
  user_updated?: DirectusUser | string | null;
  date_updated?: string | null;
  content?: "json" | null;
  subject?: string | null;
}

export interface MediaReport {
  /** @primaryKey */
  id: number;
  user_created?: DirectusUser | string | null;
  date_created?: string | null;
  user_updated?: DirectusUser | string | null;
  date_updated?: string | null;
  /** @required */
  title: string;
  /** @required */
  url: string;
  /** @description Die Plattform der Veröffentlichung @required */
  publisher: `Märkische Allgemeine` | `Potsdamer Neuste Nachrichten`;
  /** @required */
  date: string;
  project?: Project | string | null;
}

export interface Order {
  /** @primaryKey */
  id: number;
  status?: "published" | "draft" | "archived";
  user_created?: DirectusUser | string | null;
  date_created?: string | null;
  user_updated?: DirectusUser | string | null;
  date_updated?: string | null;
}

export interface PasswordTier {
  /** @primaryKey */
  id: number;
  name?: string;
  users?: PasswordTiersDirectusUser[] | string[];
}

export interface PasswordTiersDirectusUser {
  /** @primaryKey */
  id: number;
  password_tiers_id?: PasswordTier | string | null;
  directus_users_id?: DirectusUser | string | null;
}

export interface Password {
  /** @primaryKey */
  id: string;
  user_created?: DirectusUser | string | null;
  date_created?: string | null;
  user_updated?: DirectusUser | string | null;
  date_updated?: string | null;
  email?: string | null;
  login?: string | null;
  service?: string | null;
  /** @required */
  password: string;
  /** @required */
  name: string;
}

export interface Post {
  /** @primaryKey */
  id: number;
  status?: "published" | "draft" | "archived";
  user_created?: DirectusUser | string | null;
  date_created?: string | null;
  user_updated?: DirectusUser | string | null;
  date_updated?: string | null;
  /** @required */
  title: string;
  image?: DirectusFile | string | null;
  date?: string | null;
  excerpt?: string | null;
  project?: Project | string | null;
  tags?: string[] | null;
  /** @required */
  slug: string;
  content?: "json" | null;
}

export interface PrivacyPolicy {
  /** @primaryKey */
  id: number;
  content?: "json" | null;
}

export interface ProductCategory {
  /** @primaryKey */
  id: number;
  sort?: number | null;
  user_created?: DirectusUser | string | null;
  date_created?: string | null;
  user_updated?: DirectusUser | string | null;
  date_updated?: string | null;
  /** @required */
  name: string;
}

export interface ProductVariant {
  /** @primaryKey */
  id: number;
  user_created?: DirectusUser | string | null;
  date_created?: string | null;
  user_updated?: DirectusUser | string | null;
  date_updated?: string | null;
  /** @required */
  name: string;
  /** @required */
  product: Product | string;
}

export interface Product {
  /** @primaryKey */
  id: number;
  status?: "published" | "draft" | "archived" | null;
  user_created?: DirectusUser | string | null;
  date_created?: string | null;
  user_updated?: DirectusUser | string | null;
  date_updated?: string | null;
  /** @required */
  name: string;
  /** @required */
  category: ProductCategory | string;
  available_online?: boolean;
  locations?: ProductsLocation[] | string[];
  product_variants?: ProductVariant[] | string[];
}

export interface ProductsLocation {
  /** @primaryKey */
  id: number;
  products_id?: Product | string | null;
  locations_id?: Location | string | null;
}

export interface ProjectCategory {
  /** @primaryKey */
  id: number;
  sort?: number | null;
  user_created?: DirectusUser | string | null;
  date_created?: string | null;
  user_updated?: DirectusUser | string | null;
  date_updated?: string | null;
  /** @required */
  name: string;
  description?: string | null;
  /** @description Projekte, die dieser Kategorie zugeordnet wurden. */
  projects?: ProjectsProjectCategory[] | string[];
}

export interface Project {
  /** @description Der Slug wird für Web-Services genutzt und sollte daher mit Bedacht gewählt werden. @primaryKey @required */
  id: string;
  status?:
    | "draft"
    | "archived"
    | "planning"
    | "inprogress"
    | "finalized"
    | "recurring"
    | null;
  sort?: number | null;
  user_created?: DirectusUser | string | null;
  date_created?: string | null;
  user_updated?: DirectusUser | string | null;
  date_updated?: string | null;
  /** @required */
  title: string;
  /** @required */
  sub_title: string;
  /** @required */
  image: DirectusFile | string;
  launch_date?: string | null;
  summary?: string | null;
  content?: "json" | null;
  allow_donations?: boolean | null;
  categories?: ProjectsProjectCategory[] | string[];
  campaigns?: Campaign[] | string[];
  users_authorized?: ProjectsDirectusUser[] | string[];
  images?: ProjectsFile[] | string[];
}

export interface ProjectsDirectusUser {
  /** @primaryKey */
  id: number;
  projects_id?: Project | string | null;
  directus_users_id?: DirectusUser | string | null;
}

export interface ProjectsFile {
  /** @primaryKey */
  id: number;
  projects_id?: Project | string | null;
  directus_files_id?: DirectusFile | string | null;
}

export interface ProjectsProjectCategory {
  /** @primaryKey */
  id: number;
  projects_id?: Project | string | null;
  project_categories_id?: ProjectCategory | string | null;
}

export interface PublicLink {
  /** @description Diese ID muss eindeutig sein und darf nicht mehr geändert werden. Nach der Vergabe einer ID kann der ein Link unter https://links.potsdamer-buergerstiftung.org/ID aufgerufen werden. Das Link-Ziel kann im Nachhinein immer noch geändert werden, sodass der ID-Link für die Erstellung von QR-Codes genutzt werden sollte. @primaryKey */
  id: string;
  user_created?: DirectusUser | string | null;
  date_created?: string | null;
  user_updated?: DirectusUser | string | null;
  date_updated?: string | null;
  /** @required */
  description: string;
  /** @required */
  destination: string;
}

export interface PublicationCategory {
  /** @primaryKey */
  id: number;
  sort?: number | null;
  user_created?: DirectusUser | string | null;
  date_created?: string | null;
  user_updated?: DirectusUser | string | null;
  date_updated?: string | null;
  title?: string;
  description?: string;
  publications?: Publication[] | string[];
}

export interface Publication {
  /** @primaryKey */
  id: number;
  sort?: number | null;
  user_created?: DirectusUser | string | null;
  date_created?: string | null;
  user_updated?: DirectusUser | string | null;
  date_updated?: string | null;
  title?: string | null;
  file?: DirectusFile | string | null;
  category?: PublicationCategory | string | null;
}

export interface StadtbandeFormSubmission {
  /** @primaryKey */
  id: number;
  sort?: number | null;
  user_created?: DirectusUser | string | null;
  date_created?: string | null;
  user_updated?: DirectusUser | string | null;
  date_updated?: string | null;
  /** @required */
  surname: string;
  /** @required */
  first_name: string;
  /** @required */
  email: string;
  phone?: string | null;
  /** @required */
  street: string;
  /** @required */
  house_number: string;
  /** @required */
  zipcode: string;
  /** @required */
  city: string;
  origin_of_awareness_mentorship_project?: string | null;
  origin_of_awareness_foundation?: string | null;
  professional_background?: string | null;
  current_professional_situation?: string | null;
  own_offspring?: string | null;
  regular_contact_with_children?: string | null;
  past_mentorship_experience?: string | null;
  past_engagenement_experience?: string | null;
  personal_interests?: string | null;
  motivation_for_engagement?: string | null;
  readiness_weekend_duties?: string | null;
  readiness_training_participation?: string | null;
  readiness_feedback_sessions?: string | null;
  readiness_clearance_certificate?: string | null;
  readiness_public_appearance?:
    | "single_person"
    | "group_with_name_mention"
    | "group_without_name_mention"
    | "no"
    | null;
  important_personal_aspects?: string | null;
}

export interface SupportTicket {
  /** @primaryKey */
  id: number;
  status?: "open" | "closed" | null;
  user_created?: DirectusUser | string | null;
  date_created?: string | null;
  user_updated?: DirectusUser | string | null;
  date_updated?: string | null;
  subject?: string;
  tags?: string[] | null;
  /** @description Bitte beschreibe das Problem so ausführlich wie Möglich. Du kannst gerne auch Dateien anhängen. */
  description?: string | null;
}

export interface Taxe {
  /** @primaryKey */
  id: number;
  user_created?: DirectusUser | string | null;
  date_created?: string | null;
  user_updated?: DirectusUser | string | null;
  date_updated?: string | null;
  /** @required */
  name: string;
  /** @required */
  rate: number;
}

export interface Ticket {
  /** @primaryKey */
  id: number;
  /** @required */
  status: "visible" | "hidden";
  user_created?: DirectusUser | string | null;
  date_created?: string | null;
  user_updated?: DirectusUser | string | null;
  date_updated?: string | null;
  /** @required */
  name: string;
  /** @required */
  event: Event | string;
  pricing?: "free" | "donation" | "paid";
  /** @required */
  available_quantity: number;
  price?: number | null;
  minimum_quantity?: number;
  /** @required */
  maximum_quantity: number;
}

export interface Transaction {
  /** @primaryKey */
  id: string;
  user_created?: DirectusUser | string | null;
  date_created?: string | null;
  user_updated?: DirectusUser | string | null;
  date_updated?: string | null;
  type?: "income" | "Ausgabe" | null;
  category?: "donation" | "sale" | null;
  projects?: Project | string | null;
}

export interface WebsiteBanner {
  /** @primaryKey */
  id: number;
  status?: "visible" | "hidden";
  /** @required */
  title: string;
  link?: string | null;
  /** @required */
  color: string;
  text?: string | null;
  /** @required */
  link_label: string;
}

export interface WebsitePage {
  /** @primaryKey */
  id: string;
  status?: "published" | "draft" | "archived";
  sort?: number | null;
  user_created?: DirectusUser | string | null;
  date_created?: string | null;
  user_updated?: DirectusUser | string | null;
  date_updated?: string | null;
  /** @required */
  title: string;
  slug?: string | null;
  parent_page?: WebsitePage | string | null;
  blocks?: WebsitePagesBlock[] | string[];
  website_pages?: WebsitePage[] | string[];
}

export interface WebsitePagesBlock {
  /** @primaryKey */
  id: number;
  website_pages_id?: WebsitePage | string | null;
  item?: BlockHero | string | null;
  sort?: number | null;
  collection?: string | null;
}

export interface WebsiteTeamCategory {
  /** @primaryKey */
  id: number;
  sort?: number | null;
  user_created?: DirectusUser | string | null;
  date_created?: string | null;
  user_updated?: DirectusUser | string | null;
  date_updated?: string | null;
  /** @required */
  title: string;
  description?: string | null;
  website_team_members?: WebsiteTeamMember[] | string[];
}

export interface WebsiteTeamMember {
  /** @primaryKey */
  id: number;
  sort?: number | null;
  user_created?: DirectusUser | string | null;
  date_created?: string | null;
  user_updated?: DirectusUser | string | null;
  date_updated?: string | null;
  /** @required */
  category: WebsiteTeamCategory | string;
  /** @required */
  name: string;
  responsibilities?: string | null;
  image?: DirectusFile | string | null;
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
  translations?: Array<{
    language: string;
    translation: string;
    singular: string;
    plural: string;
  }> | null;
  archive_field?: string | null;
  archive_app_filter?: boolean;
  archive_value?: string | null;
  unarchive_value?: string | null;
  sort_field?: string | null;
  accountability?: "all" | "activity" | null | null;
  color?: string | null;
  item_duplication_fields?: "json" | null;
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
  options?: "json" | null;
  display?: string | null;
  display_options?: "json" | null;
  readonly?: boolean;
  hidden?: boolean;
  sort?: number | null;
  width?: string | null;
  translations?: "json" | null;
  note?: string | null;
  conditions?: "json" | null;
  required?: boolean | null;
  group?: DirectusField | string | null;
  validation?: "json" | null;
  validation_message?: string | null;
  searchable?: boolean;
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
  metadata?: "json" | null;
  copyright?: string | null;
  project?: Project | string | null;
  focal_point_x?: number | null;
  focal_point_y?: number | null;
  tus_id?: string | null;
  tus_data?: "json" | null;
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
  permissions?: "json" | null;
  validation?: "json" | null;
  presets?: "json" | null;
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
  layout_query?: "json" | null;
  layout_options?: "json" | null;
  refresh_interval?: number | null;
  filter?: "json" | null;
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
  data?: "json" | null;
  delta?: "json" | null;
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
  auth_password_policy?:
    | null
    | `/^.{8,}$/`
    | `/(?=^.{8,}$)(?=.*\\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()_+}{';'?>.<,])(?!.*\\s).*$/`
    | null;
  storage_asset_transform?: "all" | "none" | "presets" | null;
  storage_asset_presets?: Array<{
    key: string;
    fit: "contain" | "cover" | "inside" | "outside";
    width: number;
    height: number;
    quality: number;
    withoutEnlargement: boolean;
    format: "auto" | "jpeg" | "png" | "webp" | "tiff" | "avif";
    transforms: "json";
  }> | null;
  custom_css?: string | null;
  storage_default_folder?: DirectusFolder | string | null;
  basemaps?: Array<{
    name: string;
    type: "raster" | "tile" | "style";
    url: string;
    tileSize: number;
    attribution: string;
  }> | null;
  mapbox_key?: string | null;
  module_bar?: "json" | null;
  project_descriptor?: string | null;
  default_language?: string;
  custom_aspect_ratios?: Array<{ text: string; value: number }> | null;
  public_favicon?: DirectusFile | string | null;
  default_appearance?: "auto" | "light" | "dark";
  default_theme_light?: string | null;
  theme_light_overrides?: "json" | null;
  default_theme_dark?: string | null;
  theme_dark_overrides?: "json" | null;
  report_error_url?: string | null;
  report_bug_url?: string | null;
  report_feature_url?: string | null;
  public_registration?: boolean;
  public_registration_verify_email?: boolean;
  public_registration_role?: DirectusRole | string | null;
  public_registration_email_filter?: "json" | null;
  visual_editor_urls?: Array<{ url: string }> | null;
  project_id?: string | null;
  mcp_enabled?: boolean;
  mcp_allow_deletes?: boolean;
  mcp_prompts_collection?: string | null;
  mcp_system_prompt_enabled?: boolean;
  mcp_system_prompt?: string | null;
  project_owner?: string | null;
  project_usage?: string | null;
  org_name?: string | null;
  product_updates?: boolean | null;
  project_status?: string | null;
  ai_openai_api_key?: string | null;
  ai_anthropic_api_key?: string | null;
  ai_system_prompt?: string | null;
  ai_google_api_key?: string | null;
  ai_openai_compatible_api_key?: string | null;
  ai_openai_compatible_base_url?: string | null;
  ai_openai_compatible_name?: string | null;
  ai_openai_compatible_models?: Array<{
    id: string;
    name: string;
    context: number;
    output: number;
    attachment: boolean;
    reasoning: boolean;
    providerOptions: Record<string, any>;
  }> | null;
  ai_openai_compatible_headers?: Array<{
    header: string;
    value: string;
  }> | null;
  ai_openai_allowed_models?: Array<
    | `gpt-4o-mini`
    | `gpt-4.1-nano`
    | `gpt-4.1-mini`
    | `gpt-4.1`
    | `gpt-5-nano`
    | `gpt-5-mini`
    | `gpt-5`
    | `gpt-5.2`
    | `gpt-5.2-chat-latest`
    | `gpt-5.2-pro`
    | `gpt-5.4`
    | `gpt-5.4-pro`
  > | null;
  ai_anthropic_allowed_models?: Array<
    | `claude-haiku-4-5`
    | `claude-sonnet-4-5`
    | `claude-opus-4-5`
    | `claude-sonnet-4-6`
    | `claude-opus-4-6`
  > | null;
  ai_google_allowed_models?: Array<
    | `gemini-3-pro-preview`
    | `gemini-3-flash-preview`
    | `gemini-2.5-pro`
    | `gemini-2.5-flash`
    | `gemini-3.1-pro-preview`
    | `gemini-3.1-flash-lite-preview`
    | `gemini-2.5-flash-lite`
  > | null;
  collaborative_editing_enabled?: boolean;
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
  status?:
    | "draft"
    | "invited"
    | "unverified"
    | "active"
    | "suspended"
    | "archived";
  role?: DirectusRole | string | null;
  token?: string | null;
  last_access?: string | null;
  last_page?: string | null;
  provider?: "microsoft";
  external_identifier?: string | null;
  auth_data?: "json" | null;
  email_notifications?: boolean | null;
  appearance?: null | "auto" | "light" | "dark" | null;
  theme_dark?: string | null;
  theme_light?: string | null;
  theme_light_overrides?: "json" | null;
  theme_dark_overrides?: "json" | null;
  text_direction?: "auto" | "ltr" | "rtl";
  policies?: DirectusAccess[] | string[];
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
  options?: "json" | null;
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
  options?: "json" | null;
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
  options?: "json" | null;
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
  delta?: "json" | null;
}

export interface DirectusExtension {
  enabled?: boolean;
  /** @primaryKey */
  id: string;
  folder?: string;
  source?: string;
  bundle?: string | null;
}

export interface DirectusDeployment {
  /** @primaryKey */
  id: string;
  provider?: string;
  credentials?: string | null;
  options?: "json" | null;
  date_created?: string | null;
  user_created?: DirectusUser | string | null;
  webhook_ids?: "json" | null;
  webhook_secret?: string | null;
  last_synced_at?: string | null;
  projects?: DirectusDeploymentProject[] | string[];
}

export interface DirectusDeploymentProject {
  /** @primaryKey */
  id: string;
  deployment?: DirectusDeployment | string;
  external_id?: string;
  name?: string;
  date_created?: string | null;
  user_created?: DirectusUser | string | null;
  url?: string | null;
  framework?: string | null;
  deployable?: boolean;
  runs?: DirectusDeploymentRun[] | string[];
}

export interface DirectusDeploymentRun {
  /** @primaryKey */
  id: string;
  project?: DirectusDeploymentProject | string;
  external_id?: string;
  target?: string;
  date_created?: string | null;
  user_created?: DirectusUser | string | null;
  status?: string | null;
  url?: string | null;
  started_at?: string | null;
  completed_at?: string | null;
}

export interface DirectusSyncIdMap {
  /** @primaryKey */
  id: number;
  table?: string;
  sync_id?: string;
  local_id?: string;
  created_at?: string | null;
}

export interface Schema {
  accounts: Account[];
  block_hero: BlockHero[];
  campaigns: Campaign[];
  charter: Charter;
  companies: Company[];
  contact_groups: ContactGroup[];
  contact_requests: ContactRequest[];
  contacts: Contact[];
  contacts_contact_groups: ContactsContactGroup[];
  contacts_contacts: ContactsContact[];
  cost_centers: CostCenter[];
  cost_centers_directus_users: CostCentersDirectusUser[];
  documentation_articles: DocumentationArticle[];
  events: Event[];
  imprint: Imprint;
  invoice_document_items: InvoiceDocumentItem[];
  invoice_documents: InvoiceDocument[];
  invoice_documents_items: InvoiceDocumentsItem[];
  invoices: Invoice[];
  invoices_cost_centers: InvoicesCostCenter[];
  locations: Location[];
  mailing_segments: MailingSegment[];
  mailings: Mailing[];
  media_reports: MediaReport[];
  orders: Order[];
  password_tiers: PasswordTier[];
  password_tiers_directus_users: PasswordTiersDirectusUser[];
  passwords: Password[];
  posts: Post[];
  privacy_policy: PrivacyPolicy;
  product_categories: ProductCategory[];
  product_variants: ProductVariant[];
  products: Product[];
  products_locations: ProductsLocation[];
  project_categories: ProjectCategory[];
  projects: Project[];
  projects_directus_users: ProjectsDirectusUser[];
  projects_files: ProjectsFile[];
  projects_project_categories: ProjectsProjectCategory[];
  public_links: PublicLink[];
  publication_categories: PublicationCategory[];
  publications: Publication[];
  stadtbande_form_submissions: StadtbandeFormSubmission[];
  support_tickets: SupportTicket[];
  taxes: Taxe[];
  tickets: Ticket[];
  transactions: Transaction[];
  website_banner: WebsiteBanner;
  website_pages: WebsitePage[];
  website_pages_blocks: WebsitePagesBlock[];
  website_team_categories: WebsiteTeamCategory[];
  website_team_members: WebsiteTeamMember[];
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
  directus_dashboards: DirectusDashboard[];
  directus_panels: DirectusPanel[];
  directus_notifications: DirectusNotification[];
  directus_shares: DirectusShare[];
  directus_flows: DirectusFlow[];
  directus_operations: DirectusOperation[];
  directus_translations: DirectusTranslation[];
  directus_versions: DirectusVersion[];
  directus_extensions: DirectusExtension[];
  directus_deployments: DirectusDeployment[];
  directus_deployment_projects: DirectusDeploymentProject[];
  directus_deployment_runs: DirectusDeploymentRun[];
  directus_sync_id_map: DirectusSyncIdMap[];
}

export enum CollectionNames {
  accounts = "accounts",
  block_hero = "block_hero",
  campaigns = "campaigns",
  charter = "charter",
  companies = "companies",
  contact_groups = "contact_groups",
  contact_requests = "contact_requests",
  contacts = "contacts",
  contacts_contact_groups = "contacts_contact_groups",
  contacts_contacts = "contacts_contacts",
  cost_centers = "cost_centers",
  cost_centers_directus_users = "cost_centers_directus_users",
  documentation_articles = "documentation_articles",
  events = "events",
  imprint = "imprint",
  invoice_document_items = "invoice_document_items",
  invoice_documents = "invoice_documents",
  invoice_documents_items = "invoice_documents_items",
  invoices = "invoices",
  invoices_cost_centers = "invoices_cost_centers",
  locations = "locations",
  mailing_segments = "mailing_segments",
  mailings = "mailings",
  media_reports = "media_reports",
  orders = "orders",
  password_tiers = "password_tiers",
  password_tiers_directus_users = "password_tiers_directus_users",
  passwords = "passwords",
  posts = "posts",
  privacy_policy = "privacy_policy",
  product_categories = "product_categories",
  product_variants = "product_variants",
  products = "products",
  products_locations = "products_locations",
  project_categories = "project_categories",
  projects = "projects",
  projects_directus_users = "projects_directus_users",
  projects_files = "projects_files",
  projects_project_categories = "projects_project_categories",
  public_links = "public_links",
  publication_categories = "publication_categories",
  publications = "publications",
  stadtbande_form_submissions = "stadtbande_form_submissions",
  support_tickets = "support_tickets",
  taxes = "taxes",
  tickets = "tickets",
  transactions = "transactions",
  website_banner = "website_banner",
  website_pages = "website_pages",
  website_pages_blocks = "website_pages_blocks",
  website_team_categories = "website_team_categories",
  website_team_members = "website_team_members",
  directus_access = "directus_access",
  directus_activity = "directus_activity",
  directus_collections = "directus_collections",
  directus_comments = "directus_comments",
  directus_fields = "directus_fields",
  directus_files = "directus_files",
  directus_folders = "directus_folders",
  directus_migrations = "directus_migrations",
  directus_permissions = "directus_permissions",
  directus_policies = "directus_policies",
  directus_presets = "directus_presets",
  directus_relations = "directus_relations",
  directus_revisions = "directus_revisions",
  directus_roles = "directus_roles",
  directus_sessions = "directus_sessions",
  directus_settings = "directus_settings",
  directus_users = "directus_users",
  directus_dashboards = "directus_dashboards",
  directus_panels = "directus_panels",
  directus_notifications = "directus_notifications",
  directus_shares = "directus_shares",
  directus_flows = "directus_flows",
  directus_operations = "directus_operations",
  directus_translations = "directus_translations",
  directus_versions = "directus_versions",
  directus_extensions = "directus_extensions",
  directus_deployments = "directus_deployments",
  directus_deployment_projects = "directus_deployment_projects",
  directus_deployment_runs = "directus_deployment_runs",
  directus_sync_id_map = "directus_sync_id_map",
}
