export interface License {
  editorial: boolean;
  commercial: boolean;
  expiration: Date;
  type:
    | "Creative Commons"
    | "Royalty Free"
    | "Copyright Free"
    | "Public Domain";
  url: string;
  info: string;
}
