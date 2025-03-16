export type CookieAttributes = {
  sameSite?: 'strict' | 'none' | 'lax';
  httpOnly?: boolean;
  secure?: boolean;
  domain?: string;
  maxAge?: number;
  expires?: Date;
  path?: string;
};

export type Cookie = {
  attributes: CookieAttributes;
  value: string;
  name: string;
};
