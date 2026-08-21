import { useEffect, useRef, useState } from "react";

const VALID_SECTIONS = ["flights", "hotels", "visa", "cars", "files", "activities", "accounts", "analysis"];

const sectionFromLocation = () => {
  if (typeof window === "undefined") return "flights";
  const hash = window.location.hash.replace(/^#/, "");
  const candidate = hash.startsWith("section=") ? hash.slice(8) : hash;
  return VALID_SECTIONS.includes(candidate) ? candidate : "flights";
};

export default function useSectionNavigation({ currentUser, storageSet }) {
  const [activeSection, setActiveSection] = useState(sectionFromLocation);
  const sectionHydratedRef = useRef(false);

  const navigateToSection = (section, { replace = false } = {}) => {
    if (!VALID_SECTIONS.includes(section)) return;
    setActiveSection(section);
    if (typeof window === "undefined") return;
    const url = `${window.location.pathname}${window.location.search}#section=${encodeURIComponent(section)}`;
    window.history[replace ? "replaceState" : "pushState"]({ section }, "", url);
  };

  useEffect(() => {
    const handlePopState = (event) => {
      const stateSection = event.state && event.state.section;
      const hash = window.location.hash.replace(/^#/, "");
      const hashSection = hash.startsWith("section=") ? decodeURIComponent(hash.slice(8)) : hash;
      const section = stateSection || hashSection;
      if (VALID_SECTIONS.includes(section)) setActiveSection(section);
    };
    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const hash = window.location.hash.replace(/^#/, "");
    if (!hash) {
      const url = `${window.location.pathname}${window.location.search}#section=${activeSection}`;
      window.history.replaceState({ section: activeSection }, "", url);
    }
  }, []);

  useEffect(() => {
    if (!currentUser) return;
    if (!sectionHydratedRef.current) {
      sectionHydratedRef.current = true;
      return;
    }
    storageSet(`tickets:lastSection:${currentUser.username}`, activeSection, false).catch(() => {});
  }, [activeSection, currentUser, storageSet]);

  return { activeSection, navigateToSection };
}
