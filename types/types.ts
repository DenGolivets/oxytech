export type Release = {
  id: number;
  name: string;
  artists: Artist[];
  image: Image;
  publish_date: string;
  track_count: number;
  price: Price;
  url: string;
};

export interface Price {
  code: string;
  symbol: string;
  value: number;
  display: string;
}

export interface Artist {
  id: number;
  name: string;
  biography?: string;
  image?: Image;
  slug?: string;
  url?: string;
}

export interface Image {
  id: number;
  uri: string;
  dynamic_uri: string;
}

export interface ReleaseDetail {
  id: number;
  name: string;
  slug: string;
  url: string;
  track_count: number;
  price: Price;
  tracks: Track[];
  exclusive: boolean;
  desc: string;
  publish_date: string;
}

export interface Price {
  code: string;
  symbol: string;
  value: number;
  display: string;
}

export interface Track {
  id: number;
  sample_url: string;
  sample_end_ms: number;
  publish_status: string;
}


