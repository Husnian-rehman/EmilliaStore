import { sanityClient } from '@/lib/sanity';
import { ServicesData } from '@/types';

export const getServices = async (): Promise<ServicesData> => {
  const query = `
    *[_type == "services"][0]{
      title,
      description,
      categories[]{
        title,
        slug,
        services[]{
          title,
          description,
          "icon": icon.asset->url,
          link,
          btnText
        }
      }
    }
  `;
  const data = await sanityClient.fetch(query);
  return data;
};
