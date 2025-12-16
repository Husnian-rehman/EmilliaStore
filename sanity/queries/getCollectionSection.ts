import { sanityClient } from "@/lib/sanity";

export async function getCollectionSection() {
	return sanityClient.fetch(`*[_type == "collectionSection"][0]{title,description,collectionHandle}`);
}
