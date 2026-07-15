export type SchemaNode = Record<string, unknown>;
export type SchemaInput = SchemaNode | SchemaInput[] | null | undefined | false;

interface BreadcrumbOptions {
  canonicalUrl: string;
  labels?: Record<string, string>;
}

interface OrganizationOptions {
  siteUrl: string;
  name: string;
  description: string;
  logoUrl: string;
  imageUrl: string;
  email: string;
  telephone: string;
  sameAs?: string[];
  knowsAbout?: string[];
}

interface WebsiteOptions {
  siteUrl: string;
  name: string;
  alternateName: string;
  description: string;
  organizationId: string;
}

interface WebPageOptions {
  canonicalUrl: string;
  title: string;
  description: string;
  websiteId: string;
  organizationId: string;
  imageId: string;
  breadcrumbId?: string;
}

interface ImageOptions {
  id: string;
  url: string;
  caption: string;
  width: number;
  height: number;
}

const titleCase = (value: string) =>
  value
    .replace(/[-_]+/g, " ")
    .replace(/\b\w/g, (character) => character.toUpperCase());

export const normalizePathname = (pathname: string) => {
  const normalized = pathname.split(/[?#]/, 1)[0] || "/";
  if (normalized === "/") return normalized;
  return `/${normalized.replace(/^\/+|\/+$/g, "")}/`;
};

export const absoluteUrl = (path: string, siteUrl: string) =>
  new URL(path, siteUrl.endsWith("/") ? siteUrl : `${siteUrl}/`).toString();

export const normalizeSameAs = (links: string[]) =>
  links.flatMap((link) => {
    try {
      const url = new URL(link);
      url.search = "";
      url.hash = "";
      return [url.toString()];
    } catch {
      return [];
    }
  });

export const buildOrganizationSchema = ({
  siteUrl,
  name,
  description,
  logoUrl,
  imageUrl,
  email,
  telephone,
  sameAs = [],
  knowsAbout = []
}: OrganizationOptions): SchemaNode => {
  const organizationId = `${siteUrl.replace(/\/+$/, "")}/#organization`;
  const contactPoint: SchemaNode = {
    "@type": "ContactPoint",
    telephone,
    email,
    contactType: "sales",
    areaServed: "US",
    availableLanguage: "English"
  };

  return {
    "@type": "Organization",
    "@id": organizationId,
    name,
    url: absoluteUrl("/", siteUrl),
    logo: {
      "@type": "ImageObject",
      "@id": `${organizationId}-logo`,
      url: logoUrl,
      contentUrl: logoUrl,
      width: 612,
      height: 408,
      caption: `${name} logo`
    },
    image: imageUrl,
    description,
    email,
    telephone,
    contactPoint,
    ...(sameAs.length > 0 ? { sameAs: normalizeSameAs(sameAs) } : {}),
    ...(knowsAbout.length > 0 ? { knowsAbout } : {})
  };
};

export const buildWebsiteSchema = ({
  siteUrl,
  name,
  alternateName,
  description,
  organizationId
}: WebsiteOptions): SchemaNode => ({
  "@type": "WebSite",
  "@id": `${siteUrl.replace(/\/+$/, "")}/#website`,
  url: absoluteUrl("/", siteUrl),
  name,
  alternateName,
  description,
  publisher: { "@id": organizationId },
  inLanguage: "en-US"
});

export const buildImageSchema = ({ id, url, caption, width, height }: ImageOptions): SchemaNode => ({
  "@type": "ImageObject",
  "@id": id,
  url,
  contentUrl: url,
  width,
  height,
  caption
});

export const buildBreadcrumbSchema = ({ canonicalUrl, labels = {} }: BreadcrumbOptions): SchemaNode | null => {
  const url = new URL(canonicalUrl);
  const pathSegments = url.pathname.split("/").filter(Boolean);
  if (pathSegments.length === 0) return null;

  return {
    "@type": "BreadcrumbList",
    "@id": `${canonicalUrl}#breadcrumb`,
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: new URL("/", url.origin).toString()
      },
      ...pathSegments.map((segment, index) => {
        const decodedSegment = decodeURIComponent(segment);
        const path = `/${pathSegments.slice(0, index + 1).join("/")}/`;
        return {
          "@type": "ListItem",
          position: index + 2,
          name: labels[decodedSegment] ?? titleCase(decodedSegment),
          item: new URL(path, url.origin).toString()
        };
      })
    ]
  };
};

export const buildWebPageSchema = ({
  canonicalUrl,
  title,
  description,
  websiteId,
  organizationId,
  imageId,
  breadcrumbId
}: WebPageOptions): SchemaNode => ({
  "@type": "WebPage",
  "@id": `${canonicalUrl}#webpage`,
  url: canonicalUrl,
  name: title,
  description,
  isPartOf: { "@id": websiteId },
  about: { "@id": organizationId },
  primaryImageOfPage: { "@id": imageId },
  ...(breadcrumbId ? { breadcrumb: { "@id": breadcrumbId } } : {}),
  inLanguage: "en-US"
});

const flattenSchema = (input: SchemaInput): SchemaNode[] => {
  if (!input) return [];
  if (Array.isArray(input)) return input.flatMap((item) => flattenSchema(item));
  return [input];
};

export const buildSchemaGraph = (...inputs: SchemaInput[]) => {
  const graph: SchemaNode[] = [];
  const nodeIndexById = new Map<string, number>();

  for (const node of flattenSchema(inputs)) {
    const contextFreeNode = { ...node };
    delete contextFreeNode["@context"];
    const id = typeof contextFreeNode["@id"] === "string" ? contextFreeNode["@id"] : null;

    if (id && nodeIndexById.has(id)) {
      const index = nodeIndexById.get(id)!;
      graph[index] = { ...graph[index], ...contextFreeNode };
      continue;
    }

    if (id) nodeIndexById.set(id, graph.length);
    graph.push(contextFreeNode);
  }

  return { "@context": "https://schema.org", "@graph": graph };
};

export const serializeJsonLd = (value: unknown) =>
  JSON.stringify(value)
    .replace(/&/g, "\\u0026")
    .replace(/</g, "\\u003c")
    .replace(/>/g, "\\u003e")
    .replace(/\u2028/g, "\\u2028")
    .replace(/\u2029/g, "\\u2029");
