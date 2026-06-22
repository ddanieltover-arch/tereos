export const allProductsQuery = `
  *[_type == "product"] | order(name.en asc) {
    _id,
    slug,
    category,
    "name": coalesce(name[$locale], name.en),
    "description": coalesce(description[$locale], description.en),
    "image": coalesce(image.asset->url, imageUrl)
  }
`;

export const productBySlugQuery = `
  *[_type == "product" && slug.current == $slug][0] {
    _id,
    slug,
    category,
    "name": coalesce(name[$locale], name.en),
    "description": coalesce(description[$locale], description.en),
    "image": coalesce(image.asset->url, imageUrl)
  }
`;

export const divisionBySlugQuery = `
  *[_type == "businessDivision" && slug.current == $slug][0] {
    _id,
    slug,
    "title": coalesce(title[$locale], title.en),
    "description": coalesce(description[$locale], description.en),
    "tagline": coalesce(tagline[$locale], tagline.en),
    "image": coalesce(heroImage.asset->url, imageUrl)
  }
`;

export const businessDivisionsQuery = `
  *[_type == "businessDivision"] | order(order asc) {
    _id,
    slug,
    icon,
    order,
    "title": coalesce(title[$locale], title.en),
    "description": coalesce(description[$locale], description.en),
    "image": coalesce(heroImage.asset->url, imageUrl)
  }
`;

export const featuredProductsQuery = `
  *[_type == "product" && featured == true] | order(_createdAt desc) [0...8] {
    _id,
    slug,
    category,
    "name": coalesce(name[$locale], name.en),
    "description": coalesce(description[$locale], description.en),
    "image": coalesce(image.asset->url, imageUrl)
  }
`;

export const allNewsArticlesQuery = `
  *[_type == "newsArticle"] | order(publishedAt desc) {
    _id,
    slug,
    category,
    publishedAt,
    author,
    "title": coalesce(title[$locale], title.en),
    "excerpt": coalesce(excerpt[$locale], excerpt.en),
    "body": coalesce(body[$locale], body.en),
    "image": coalesce(heroImage.asset->url, imageUrl),
    "pdfUrl": coalesce(pdfFile.asset->url, pdfUrl)
  }
`;

export const newsArticleBySlugQuery = `
  *[_type == "newsArticle" && slug.current == $slug][0] {
    _id,
    slug,
    category,
    publishedAt,
    author,
    "title": coalesce(title[$locale], title.en),
    "excerpt": coalesce(excerpt[$locale], excerpt.en),
    "body": coalesce(body[$locale], body.en),
    "image": coalesce(heroImage.asset->url, imageUrl),
    "pdfUrl": coalesce(pdfFile.asset->url, pdfUrl)
  }
`;

export const latestNewsQuery = `
  *[_type == "newsArticle"] | order(publishedAt desc) [0...3] {
    _id,
    slug,
    category,
    publishedAt,
    author,
    "title": coalesce(title[$locale], title.en),
    "excerpt": coalesce(excerpt[$locale], excerpt.en),
    "body": coalesce(body[$locale], body.en),
    "image": coalesce(heroImage.asset->url, imageUrl),
    "pdfUrl": coalesce(pdfFile.asset->url, pdfUrl)
  }
`;

export const downloadDocumentsQuery = `
  *[_type == "downloadDocument"] | order(year desc) {
    _id,
    category,
    year,
    language,
    gated,
    documentKey,
    "title": coalesce(title[$locale], title.en),
    "fileUrl": coalesce(file.asset->url, fileUrl),
    "coverImage": coalesce(coverImage.asset->url, imageUrl)
  }
`;

export const siteSettingsQuery = `
  *[_type == "siteSettings"][0] {
    siteName,
    "tagline": coalesce(tagline[$locale], tagline.en),
    contactEmail,
    phone,
    address
  }
`;

export const allProductSlugsQuery = `*[_type == "product"]{ "slug": slug.current }`;
export const allNewsSlugsQuery = `*[_type == "newsArticle"]{ "slug": slug.current, publishedAt }`;
export const allDivisionSlugsQuery = `*[_type == "businessDivision"]{ "slug": slug.current }`;
