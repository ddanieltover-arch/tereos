
import { revalidatePath, revalidateTag } from 'next/cache';
import { NextRequest, NextResponse } from 'next/server';

const TYPE_PATHS: Record<string, string[]> = {
  businessDivision: ['/', '/our-businesses'],
  product: ['/', '/products'],
  newsArticle: ['/', '/news-media'],
  downloadDocument: [
    '/download-center',
    '/investor-relations',
    '/investor-relations/annual-results',
    '/investor-relations/presentations',
    '/investor-relations/regulated-information',
  ],
  siteSettings: ['/'],
};

export async function POST(request: NextRequest) {
  try {
    const payload = await request.json();
    const { secret, path, _type: docType } = payload;

    if (secret !== process.env.REVALIDATE_SECRET && secret !== process.env.SANITY_WEBHOOK_SECRET) {
      return NextResponse.json({ success: false, message: 'Invalid secret' }, { status: 401 });
    }

    revalidateTag('sanity');

    if (path) {
      revalidatePath(path);
      return NextResponse.json({ success: true, revalidated: [path] });
    }

    const paths = docType ? TYPE_PATHS[docType] || ['/'] : ['/'];
    const locales = ['en', 'th', 'pt-br'];

    for (const locale of locales) {
      for (const route of paths) {
        revalidatePath(`/${locale}${route}`);
      }
    }

    return NextResponse.json({
      success: true,
      revalidated: paths.flatMap((p) => locales.map((l) => `/${l}${p}`)),
      type: docType,
    });
  } catch (error) {
    console.error('[Revalidate]', error);
    return NextResponse.json({ success: false, message: 'Error revalidating' }, { status: 500 });
  }
}
