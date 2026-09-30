import type { Metadata, Viewport } from "next";
import { Bricolage_Grotesque } from "next/font/google";
import localFont from "next/font/local";
import { Analytics } from "@/components/layout/Analytics";
import { SmoothScroll } from "@/components/layout/SmoothScroll";
import { company } from "@/content/site";
import { introScript } from "@/lib/intro";
import "./globals.css";

const bricolage = Bricolage_Grotesque({
  subsets: ["latin", "latin-ext"],
  axes: ["opsz", "wdth"],
  variable: "--font-bricolage",
});

const cooperBlack = localFont({
  src: "./fonts/cooper-black.woff2",
  variable: "--font-cooper-black",
  display: "block",
});

export const metadata: Metadata = {
  metadataBase: new URL(company.url),
  title: company.title,
  description: company.description,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: "/",
    siteName: company.name,
    title: company.title,
    description: company.description,
  },
  twitter: {
    card: "summary_large_image",
    title: company.title,
    description: company.description,
  },
};

export const viewport: Viewport = {
  themeColor: "#f6f1e9",
};

const organization = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: company.name,
  url: company.url,
  logo: `${company.url}/icon`,
  email: company.email,
  sameAs: [company.linkedInUrl],
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" suppressHydrationWarning className={`${bricolage.variable} ${cooperBlack.variable}`}>
      <head>
        <script dangerouslySetInnerHTML={{ __html: introScript }} />
      </head>
      <body className="font-sans">
        <SmoothScroll />
        {children}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organization).replace(/</g, "\\u003c") }}
        />
        {process.env.NODE_ENV === "production" && <Analytics id={company.gaId} />}
      </body>
    </html>
  );
}
