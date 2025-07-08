import { Suspense } from "react";

import { Loading } from "@/components";
import { Settings } from "@/features";

/**
 * `SettingPage` is the page-level component that renders the `Settings` UI.
 * It imports and uses the `Settings` component from the `features` module.
 *
 * This page is likely part of the application settings route, e.g., `/settings`.
 *
 * @returns JSX.Element representing the settings page.
 */
export default function SettingPage() {
  return (
    <Suspense fallback={<Loading />}>
      <Settings />
    </Suspense>
  );
}
