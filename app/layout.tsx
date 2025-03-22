import { Metadata, Viewport } from "next";
import React from "react";
import GAnalytics from "../src/common/analytics/GAnalyticsProvider";
import colors from "../src/common/colors";
import { DRAWER_ID } from "../src/common/components/Drawer/DrawerConstants";
import { ModelsProvider } from "../src/common/model/MainModelContext";
import "../styles/globals.css";

export const metadata: Metadata = {
  title: "Time tracker",
  description: "App to track my time at work",
  appleWebApp: {
    statusBarStyle: "black-translucent",
  },
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

export const viewport: Viewport = {
  themeColor: colors.black,
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export default function Layout(props: React.PropsWithChildren) {
  return (
    <html lang="en">
      <body>
        <div className="drawer h-full w-full">
          <input type="checkbox" id={DRAWER_ID} className="drawer-toggle" />
          <div className="drawer-content h-full overflow-hidden">
            <ModelsProvider>
              <GAnalytics ga_id="G-68HT974F33" />
              {props.children}
              <dialog id="modal" className="modal"></dialog>
            </ModelsProvider>
          </div>
          <div className="drawer-side">
            <label htmlFor={DRAWER_ID} className="drawer-overlay"></label>
            <div id="drawer-content" className="p-4 w-80 bg-base-100 h-full"></div>
          </div>
        </div>
      </body>
    </html>
  );
}
