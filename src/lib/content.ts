import { promises as fs } from "fs";
import path from "path";
import { cache } from "react";

export interface Service {
  id: number;
  title: string;
  description: string;
}

export interface TeamMember {
  name: string;
  bio: string;
}

export interface OfficeHour {
  label: string;
  value: string;
}

export interface GalleryAsset {
  src: string;
}

export interface SiteContent {
  about: string;
  aboutHeading: string;
  address: string;
  brandName: string;
  contactHeading: string;
  fax: string;
  gallery: GalleryAsset[];
  heroHeadline: string;
  heroImage: string | null;
  location: string;
  officeHours: OfficeHour[];
  officeHoursHeading: string;
  phone: string;
  primaryCta: string;
  secondaryCta: string;
  services: Service[];
  servicesHeading: string;
  subheadline: string;
  team: TeamMember;
  teamHeading: string;
  teamImage: string | null;
}

const SOURCE_FILE_PATH = path.join(process.cwd(), "sourcematerial.txt");
const PUBLIC_DIRECTORY_PATH = path.join(process.cwd(), "public");
const IMAGE_FILE_PATTERN = /\.(avif|gif|jpe?g|png|webp)$/i;

function compactWhitespace(value: string): string {
  return value.replace(/\s+/g, " ").trim();
}

function extract(source: string, pattern: RegExp, label: string): string {
  const match = source.match(pattern);
  const value = match?.[1];

  if (!value) {
    throw new Error(`Unable to parse ${label} from sourcematerial.txt`);
  }

  return compactWhitespace(value);
}

function splitLeadAndBody(block: string): TeamMember {
  const match = block.match(
    /^(.*?)(?=[A-Z][a-z]+(?: [A-Z][a-z]+)* is\b)([\s\S]+)$/s,
  );

  if (!match?.[1] || !match[2]) {
    throw new Error("Unable to parse the team section from sourcematerial.txt");
  }

  return {
    name: compactWhitespace(match[1]),
    bio: compactWhitespace(match[2]),
  };
}

async function getGalleryAssets(): Promise<{
  gallery: GalleryAsset[];
  heroImage: string | null;
  teamImage: string | null;
}> {
  const fileNames = await fs.readdir(PUBLIC_DIRECTORY_PATH);
  const imageNames = fileNames.filter((fileName) => IMAGE_FILE_PATTERN.test(fileName));
  const collator = new Intl.Collator(undefined, {
    numeric: true,
    sensitivity: "base",
  });

  imageNames.sort(collator.compare);

  const teamImageName =
    imageNames.find((fileName) => fileName.toLowerCase().includes("ceo")) ?? null;
  const showcaseNames = imageNames.filter((fileName) => fileName !== teamImageName);

  return {
    gallery: showcaseNames.map((fileName) => ({
      src: encodeURI(`/${fileName}`),
    })),
    heroImage: showcaseNames[0] ? encodeURI(`/${showcaseNames[0]}`) : null,
    teamImage: teamImageName ? encodeURI(`/${teamImageName}`) : null,
  };
}

export const getSiteContent = cache(async (): Promise<SiteContent> => {
  const rawSource = await fs.readFile(SOURCE_FILE_PATH, "utf8");
  const source = compactWhitespace(rawSource);
  const about = extract(
    source,
    /Project Gallery\s+About\s+(.*?)\s*Meet The Team/s,
    "about section",
  );
  const teamBlock = extract(
    source,
    /government\.\s*Meet The Team\s*(.*?)\s*Services Service 1 Title:/s,
    "team section",
  );
  const servicesBlock = extract(
    source,
    /customers expectations, but his as well\.\s*Services\s*(.*?)\s*Contact All Quality, LLC/s,
    "services section",
  );
  const { gallery, heroImage, teamImage } = await getGalleryAssets();

  const aboutHeading = extract(
    source,
    /Primary CTA:\s*Contact Us\s+Secondary CTA:\s*Project Gallery\s+(About)\s+/s,
    "about heading",
  );
  const brandName = extract(source, /Brand Name\s*(.*?)\s*Hero Headline:/s, "brand name");
  const contactHeading = extract(
    source,
    /((?:Contact All Quality, LLC))\s*PO Box/s,
    "contact heading",
  );
  const heroHeadline = extract(
    source,
    /Hero Headline:\s*(.*?)\s*Subheadline:/s,
    "hero headline",
  );
  const subheadline = extract(
    source,
    /Subheadline:\s*(.*?)\s*Primary CTA:/s,
    "subheadline",
  );
  const primaryCta = extract(
    source,
    /Primary CTA:\s*(.*?)\s*Secondary CTA:/s,
    "primary call to action",
  );
  const secondaryCta = extract(
    source,
    /Secondary CTA:\s*(.*?)\s*About/s,
    "secondary call to action",
  );
  const location = compactWhitespace(
    about.match(/based in ([^.]+)\./)?.[1] ?? "",
  );
  const teamHeading = extract(
    source,
    /(Meet The Team)(?=[A-Z][a-z]+\s+[A-Z][a-z]+\s*-\s*[A-Z])/,
    "team heading",
  );
  const servicesHeading = extract(
    source,
    /customers expectations, but his as well\.(Services)\s+Service 1 Title:/s,
    "services heading",
  );
  const address = extract(
    source,
    /Contact All Quality, LLC\s*(PO Box .*?)\s*phone -/s,
    "address",
  );
  const phone = extract(source, /phone -\s*(.*?)\s*fax -/s, "phone");
  const fax = extract(source, /fax -\s*(.*?)\s*Office Hours:/s, "fax");
  const officeHoursHeading = extract(
    source,
    /(Office Hours:)\s*Mon - Fri:/s,
    "office hours heading",
  );
  const weekdayHours = extract(
    source,
    /Mon - Fri:\s*(.*?)\s*Sat - Sun:/s,
    "weekday hours",
  );
  const weekendHours = extract(source, /Sat - Sun:\s*(.*?)$/s, "weekend hours");
  const team = splitLeadAndBody(teamBlock);
  const services = Array.from(
    servicesBlock.matchAll(
      /Service\s*(\d+)\s*Title:\s*(.*?)\s*Description:\s*(.*?)(?=Service\s*\d+\s*Title:|$)/gs,
    ),
  ).map((match) => ({
    id: Number(match[1]),
    title: compactWhitespace(match[2]),
    description: compactWhitespace(match[3]),
  }));

  if (services.length === 0) {
    throw new Error("Unable to parse services from sourcematerial.txt");
  }

  return {
    about,
    aboutHeading,
    address,
    brandName,
    contactHeading,
    fax,
    gallery,
    heroHeadline,
    heroImage,
    location,
    officeHours: [
      {
        label: "Mon - Fri:",
        value: weekdayHours,
      },
      {
        label: "Sat - Sun:",
        value: weekendHours,
      },
    ],
    officeHoursHeading,
    phone,
    primaryCta,
    secondaryCta,
    services,
    servicesHeading,
    subheadline,
    team,
    teamHeading,
    teamImage,
  };
});
