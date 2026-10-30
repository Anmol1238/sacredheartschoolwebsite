import { WhatsAppIcon } from "@/components/icons/BrandIcons";
import type { SiteContent } from "@/lib/types";

export function WhatsAppFloat({ school }: { school: SiteContent["school"] }) {
  const href = `https://web.whatsapp.com/send?phone=${school.whatsapp}`;
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className="fixed bottom-5 right-5 z-50 inline-flex items-center gap-2 rounded-full bg-green px-4 py-3 text-sm font-semibold text-white shadow-lg transition hover:bg-green-dark"
      aria-label="Chat on WhatsApp"
    >
      <WhatsAppIcon className="h-5 w-5" />
      WhatsApp
    </a>
  );
}
