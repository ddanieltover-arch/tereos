import { createClient } from '@sanity/client';
import { sanityApiVersion, sanityDataset, sanityProjectId } from './config';

export const sanityClient = createClient({
  projectId: sanityProjectId || 'placeholder',
  dataset: sanityDataset,
  apiVersion: sanityApiVersion,
  useCdn: process.env.NODE_ENV === 'production',
  token: process.env.SANITY_API_READ_TOKEN,
});

export function getWriteClient() {
  return createClient({
    projectId: sanityProjectId,
    dataset: sanityDataset,
    apiVersion: sanityApiVersion,
    useCdn: false,
    token: process.env.SANITY_API_TOKEN,
  });
}
