import { cn } from "@/lib/cn";

type IconProps = {
  className?: string;
  title?: string;
};

export function FacebookIcon({ className, title = "Facebook" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={cn("h-4 w-4", className)} aria-hidden={!title} role="img">
      {title ? <title>{title}</title> : null}
      <path
        fill="currentColor"
        d="M14 8.2h2.1V5h-2.1C11.9 5 10 6.9 10 9.2V11H8v3.2h2V19h3.2v-4.8h2.2l.6-3.2h-2.8V9.2c0-.6.4-1 1-1Z"
      />
    </svg>
  );
}

export function InstagramIcon({ className, title = "Instagram" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={cn("h-4 w-4", className)} aria-hidden={!title} role="img">
      {title ? <title>{title}</title> : null}
      <path
        fill="currentColor"
        d="M7.5 3h9A4.5 4.5 0 0 1 21 7.5v9A4.5 4.5 0 0 1 16.5 21h-9A4.5 4.5 0 0 1 3 16.5v-9A4.5 4.5 0 0 1 7.5 3Zm0 1.8A2.7 2.7 0 0 0 4.8 7.5v9a2.7 2.7 0 0 0 2.7 2.7h9a2.7 2.7 0 0 0 2.7-2.7v-9a2.7 2.7 0 0 0-2.7-2.7h-9Zm9.35 1.35a1.05 1.05 0 1 1 0 2.1 1.05 1.05 0 0 1 0-2.1ZM12 8.1A3.9 3.9 0 1 1 12 15.9 3.9 3.9 0 0 1 12 8.1Zm0 1.8a2.1 2.1 0 1 0 0 4.2 2.1 2.1 0 0 0 0-4.2Z"
      />
    </svg>
  );
}

export function YoutubeIcon({ className, title = "YouTube" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={cn("h-4 w-4", className)} aria-hidden={!title} role="img">
      {title ? <title>{title}</title> : null}
      <path
        fill="currentColor"
        d="M21.6 8.1a2.6 2.6 0 0 0-1.8-1.8C18.2 5.9 12 5.9 12 5.9s-6.2 0-7.8.4A2.6 2.6 0 0 0 2.4 8.1 27.4 27.4 0 0 0 2 12a27.4 27.4 0 0 0 .4 3.9 2.6 2.6 0 0 0 1.8 1.8c1.6.4 7.8.4 7.8.4s6.2 0 7.8-.4a2.6 2.6 0 0 0 1.8-1.8A27.4 27.4 0 0 0 22 12a27.4 27.4 0 0 0-.4-3.9ZM10.2 14.8V9.2L14.9 12l-4.7 2.8Z"
      />
    </svg>
  );
}

export function WhatsAppIcon({ className, title = "WhatsApp" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={cn("h-5 w-5", className)} aria-hidden={!title} role="img">
      {title ? <title>{title}</title> : null}
      <path
        fill="currentColor"
        d="M12.04 2C6.58 2 2.15 6.4 2.15 11.83c0 1.96.53 3.8 1.46 5.4L2 22l4.95-1.55a9.9 9.9 0 0 0 5.09 1.38h.01c5.46 0 9.89-4.4 9.89-9.83C21.94 6.4 17.5 2 12.04 2Zm5.53 13.94c-.23.65-1.35 1.2-1.88 1.28-.49.07-1.1.1-1.78-.11-.41-.13-.94-.3-1.62-.59-2.85-1.23-4.7-4.1-4.84-4.29-.14-.19-1.15-1.53-1.15-2.92 0-1.39.73-2.07.99-2.35.26-.28.57-.35.76-.35h.55c.18 0 .41-.07.64.49.23.58.79 2 .86 2.14.07.14.12.31.02.5-.1.19-.14.31-.28.48-.14.17-.3.37-.42.5-.14.14-.28.29-.12.56.16.28.71 1.17 1.53 1.9 1.05.93 1.93 1.22 2.21 1.36.28.14.44.12.6-.07.17-.19.7-.81.88-1.09.19-.28.37-.23.64-.14.26.09 1.67.79 1.96.93.28.14.47.21.54.33.07.12.07.7-.16 1.35Z"
      />
    </svg>
  );
}
