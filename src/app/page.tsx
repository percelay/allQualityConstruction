import { AboutSection } from "@/components/about-section";
import { GallerySection } from "@/components/gallery-section";
import { HeroSection } from "@/components/hero-section";
import { ServicesSection } from "@/components/services-section";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { TeamSection } from "@/components/team-section";
import { getSiteContent } from "@/lib/content";

export default async function HomePage() {
  const content = await getSiteContent();
  const navItems = [
    {
      href: "#about",
      label: content.aboutHeading,
    },
    {
      href: "#services",
      label: content.servicesHeading,
    },
    {
      href: "#project-gallery",
      label: content.secondaryCta,
    },
    {
      href: "#team",
      label: content.teamHeading,
    },
    {
      href: "#contact",
      label: content.primaryCta,
    },
  ];

  return (
    <main className="min-h-screen">
      <SiteHeader
        brandName={content.brandName}
        location={content.location}
        navItems={navItems}
        primaryCta={content.primaryCta}
      />
      <HeroSection
        about={content.about}
        brandName={content.brandName}
        heroHeadline={content.heroHeadline}
        heroImage={content.heroImage}
        location={content.location}
        officeHours={content.officeHours}
        officeHoursHeading={content.officeHoursHeading}
        primaryCta={content.primaryCta}
        secondaryCta={content.secondaryCta}
        subheadline={content.subheadline}
      />
      <AboutSection
        about={content.about}
        heading={content.aboutHeading}
        highlights={content.services.slice(0, 2)}
      />
      <ServicesSection heading={content.servicesHeading} services={content.services} />
      <GallerySection heading={content.secondaryCta} images={content.gallery} />
      <TeamSection
        heading={content.teamHeading}
        image={content.teamImage}
        member={content.team}
      />
      <SiteFooter
        address={content.address}
        brandName={content.brandName}
        contactHeading={content.contactHeading}
        fax={content.fax}
        navItems={navItems}
        officeHours={content.officeHours}
        officeHoursHeading={content.officeHoursHeading}
        phone={content.phone}
      />
    </main>
  );
}

