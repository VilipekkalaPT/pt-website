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
    const res = await client.getEntries<T>({ content_type: contentType });
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
