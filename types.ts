// Base Cosmic object interface
export interface CosmicObject {
  id: string;
  slug: string;
  title: string;
  content?: string;
  metadata: Record<string, any>;
  type: string;
  created_at: string;
  modified_at: string;
}

export interface CosmicImage {
  url: string;
  imgix_url: string;
}

export interface Author extends CosmicObject {
  type: 'authors';
  metadata: {
    name?: string;
    bio?: string;
    avatar?: CosmicImage;
    website?: string;
  };
}

export interface Category extends CosmicObject {
  type: 'categories';
  metadata: {
    name?: string;
    description?: string;
  };
}

export interface Post extends CosmicObject {
  type: 'posts';
  metadata: {
    title?: string;
    excerpt?: string;
    content?: string;
    featured_image?: CosmicImage;
    tags?: string[];
    author?: Author;
    category?: Category;
  };
}

export interface CosmicResponse<T> {
  objects: T[];
  total: number;
  limit: number;
  skip: number;
}

// Type guards
export function isPost(obj: CosmicObject): obj is Post {
  return obj.type === 'posts';
}

export function isAuthor(obj: CosmicObject): obj is Author {
  return obj.type === 'authors';
}

export function isCategory(obj: CosmicObject): obj is Category {
  return obj.type === 'categories';
}