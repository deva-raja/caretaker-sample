import { Metadata } from 'next';
import logoImg from '@public/caretaker-logo-vector.png';
import { LAYOUT_OPTIONS } from '@/config/enums';
import logoIconImg from '@public/caretaker.png';
import { OpenGraph } from 'next/dist/lib/metadata/types/opengraph-types';

enum MODE {
  DARK = 'dark',
  LIGHT = 'light',
}

export const siteConfig = {
  title: 'CareTaker',
  description: `CareTaker `,
  logo: logoImg,
  icon: logoIconImg,
  mode: MODE.LIGHT,
  layout: LAYOUT_OPTIONS.HYDROGEN,
  // TODO: favicon
};

export const metaObject = (
  title?: string,
  openGraph?: OpenGraph,
  description: string = siteConfig.description
): Metadata => {
  return {
    title: title ? `${title} - CareTaker` : siteConfig.title,
    description,
    openGraph: openGraph ?? {
      title: title ? `${title} - CareTaker` : title,
      description,
      url: 'https://isomorphic-furyroad.vercel.app',
      siteName: 'CareTaker', // https://developers.google.com/search/docs/appearance/site-names
      images: {
        url: 'https://s3.amazonaws.com/redqteam.com/isomorphic-furyroad/itemdep/isobanner.png',
        width: 1200,
        height: 630,
      },
      locale: 'en_US',
      type: 'website',
    },
  };
};
