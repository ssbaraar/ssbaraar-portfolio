import { AdminPanel } from "@/components/portfolio/admin-panel";
import { PageViewTracker } from "@/components/portfolio/page-view-tracker";
import { Fieldnotes } from "@/components/portfolio/fieldnotes";
import "./fieldnotes.css";

export function HomePage() {
  return <>
    <PageViewTracker />
    <Fieldnotes />
    <AdminPanel />
  </>;
}
