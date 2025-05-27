import { createClient, EntrySkeletonType } from "contentful";

const client = createClient({
  space: process.env.CONTENTFUL_SPACE_ID!,
  accessToken: process.env.CONTENTFUL_ACCESS_TOKEN!,
});

export default client;

export async function getEntries<T extends EntrySkeletonType>(
  contentType: string
) {
  try {
    const res = await client.getEntries<T>({
      content_type: contentType,
      include: 2,
    });
    return res.items.map((item) => item.fields);
  } catch (error) {
    console.error(`Error fetching content type "${contentType}":`, error);
    return [];
  }
}

export async function getAssets() {
  try {
    const res = await client.getAssets();
    return res.items.map((item) => item.fields);
  } catch (error) {
    console.error("Error fetching assets:", error);
    return [];
  }
}

export async function getEntry<T extends EntrySkeletonType>(entryId: string) {
  try {
    const res = await client.getEntry<T>(entryId);
    return res.fields;
  } catch (error) {
    console.error(`Error fetching entry ${entryId}`, error);
  }
}

export async function getEntryWithSlug(contentType: string, slug: string) {
  try {
    const res = await client.getEntries({
      content_type: contentType,
      "fields.slug": slug,
      include: 2,
    });
    const fields = res.items.map((item) => item.fields);
    return fields[0] ?? [];
  } catch (error) {
    console.error(`Error fetching entry with slug ${slug}`, error);
  }
}
