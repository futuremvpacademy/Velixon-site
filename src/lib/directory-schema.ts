import type { DirectoryGroup, SeoLink } from "../data/seo/types";
import { absoluteUrl, normalizePathname, type SchemaNode } from "./schema";

interface DirectorySchemaOptions {
  title: string;
  description: string;
  headline: string;
  path: string;
  groups: DirectoryGroup[];
  siteUrl?: string;
}

interface DirectoryItem extends SeoLink {
  url: string;
}

const collectDirectoryItems = (groups: DirectoryGroup[], siteUrl: string): DirectoryItem[] => {
  const seenUrls = new Set<string>();

  return groups.flatMap((group) => group.items).flatMap((item) => {
    const url = absoluteUrl(item.href, siteUrl);
    if (seenUrls.has(url)) return [];

    seenUrls.add(url);
    return [{ ...item, url }];
  });
};

export const buildDirectorySchema = ({
  title,
  description,
  headline,
  path,
  groups,
  siteUrl = "https://velixon.net"
}: DirectorySchemaOptions): SchemaNode[] => {
  const pageUrl = absoluteUrl(normalizePathname(path), siteUrl);
  const pageId = `${pageUrl}#webpage`;
  const itemListId = `${pageUrl}#directory-list`;
  const items = collectDirectoryItems(groups, siteUrl);
  const itemPages = items.map((item) => ({
    "@type": "WebPage",
    "@id": `${item.url}#webpage`,
    url: item.url,
    name: item.title,
    description: item.description
  }));

  return [
    {
      "@type": "CollectionPage",
      "@id": pageId,
      url: pageUrl,
      name: title,
      headline,
      description,
      mainEntity: { "@id": itemListId },
      hasPart: itemPages.map((item) => ({ "@id": item["@id"] })),
      inLanguage: "en-US"
    },
    {
      "@type": "ItemList",
      "@id": itemListId,
      name: `${headline} directory`,
      numberOfItems: itemPages.length,
      itemListOrder: "https://schema.org/ItemListUnordered",
      itemListElement: itemPages.map((item, index) => ({
        "@type": "ListItem",
        position: index + 1,
        item
      }))
    }
  ];
};
