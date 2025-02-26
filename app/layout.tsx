import { Metadata } from "next";
import React from "react";
import GAnalytics from "../src/common/analytics/GAnalyticsProvider";
import colors from "../src/common/colors";
import { ModelsProvider } from "../src/common/model/MainModelContext";

export const metadata: Metadata = {
  title: "Time tracker",
  description: "App to track my time at work",
  appleWebApp: {
    statusBarStyle: 'black-translucent',
  }, 
  themeColor: colors.black,
  openGraph: {
    title: "My Portfolio",
    description: "This is my portfolio.",
    siteName: "My Portfolio",
    locale: "en_US",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};


export default function Layout(props: React.PropsWithChildren) {
  return (
    <html lang="en">
      <body>
        <ModelsProvider>
          <GAnalytics ga_id="G-68HT974F33" />
          {props.children}
        </ModelsProvider>
      </body>
    </html>
  );
}
