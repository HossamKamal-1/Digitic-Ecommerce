export type TAuthor = {
  id: number;
  firstName: string;
  lastName: string;
  fullName: string;
  avatar: string;
};
// TODO: refactor those types maybe move them into separate folder types

export type TComment = {
  blogId: number;
  id: number;
  user: TAuthor;
  body: string;
  createdAt: Date;
};
export type TBlog = {
  id: number;
  title: string;
  slug: string;
  img: string;
  description: string;
  createdAt: Date;
  author: TAuthor;
};

// TODO:
// FIXME:

// REFACTOR:
