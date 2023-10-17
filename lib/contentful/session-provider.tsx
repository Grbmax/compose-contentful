"use client";

import { ContentfulLivePreviewProvider } from "@contentful/live-preview/react";

type ProviderProps = {
  children?: React.ReactNode;
  locale: string;
  enableLiveUpdates: boolean;
};

export const SessionProvider = ({
  children,
  locale,
  enableLiveUpdates,
}: ProviderProps) => {
  return (
    <ContentfulLivePreviewProvider
      locale={locale}
      enableLiveUpdates={enableLiveUpdates}
    >
      {children}
    </ContentfulLivePreviewProvider>
  );
};
