import { businessDivision } from './businessDivision';
import { downloadDocument } from './downloadDocument';
import { newsArticle } from './newsArticle';
import { localizedString, localizedText } from './objects/localized';
import { product } from './product';
import { siteSettings } from './siteSettings';

export const schemaTypes = [
  localizedString,
  localizedText,
  siteSettings,
  businessDivision,
  product,
  newsArticle,
  downloadDocument,
];
