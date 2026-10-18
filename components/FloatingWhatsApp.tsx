"use client";

import { useEffect } from "react";

export default function FloatingWhatsApp() {
  const phoneNumber = "917377788810";
  const whatsappMessage =
    "नमस्ते Kabadi Baba, मुझे गोरखपुर में कबाड़ पिकअप शेड्यूल करना है।";

  const whatsappUrl =
    "https://wa.me/" +
    phoneNumber +
    "?text=" +
    encodeURIComponent(whatsappMessage);

  const callUrl = "tel:+" + phoneNumber;

  const handleShare = async () => {
    const shareData = {
      title: "Kabadi Baba",
      text: "Gorakhpur mein Kabadi Baba se scrap pickup book karein.",
      url: window.location.href,
    };

    try {
      if (navigator.share) {
        await navigator.share(shareData);
      } else if (navigator.clipboard) {
        await navigator.clipboard.writeText(window.location.href);
        alert("Website link copied!");
      }
    } catch {
      // Share menu closed.
    }
  };

  useEffect(() => {
    const style = document.createElement("style");
    style.id = "kabadi-floating-animation";
    style.textContent = `
      @keyframes kb-ripple {
        0% { transform: scale(1); opacity: .45; }
        100% { transform: scale(1.7); opacity: 0; }
      }
      @keyframes kb-phone-ring {
        0%, 100% { transform: rotate(0); }
        10%, 30%, 50%, 70% { transform: rotate(-8deg); }
        20%, 40%, 60%, 80% { transform: rotate(8deg); }
        90% { transform: rotate(0); }
      }
      .kb-ripple {
        position: absolute;
        inset: 0;
        border: 2px solid #08b66a;
        border-radius: 50%;
        pointer-events: none;
        animation: kb-ripple 2.4s ease-out infinite;
      }
      .kb-ripple-delay { animation-delay: 1.2s; }
      .kb-phone-ring {
        animation: kb-phone-ring 2.5s ease-in-out infinite;
        transform-origin: center;
      }
      @media (prefers-reduced-motion: reduce) {
        .kb-ripple, .kb-phone-ring { animation: none; }
      }
    `;

    if (!document.getElementById(style.id)) {
      document.head.appendChild(style);
    }

    return () => {
      style.remove();
    };
  }, []);

  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col items-center gap-3 sm:bottom-6 sm:right-6">
      <button
        type="button"
        onClick={handleShare}
        aria-label="Share Kabadi Baba website"
        className="flex h-14 w-14 items-center justify-center rounded-full bg-[#08b66a] text-white shadow-lg transition-transform duration-200 hover:scale-110 active:scale-95 sm:h-16 sm:w-16"
      >
        <svg viewBox="0 0 24 24" className="h-7 w-7 sm:h-8 sm:w-8" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <circle cx="18" cy="5" r="2.5" />
          <circle cx="6" cy="12" r="2.5" />
          <circle cx="18" cy="19" r="2.5" />
          <path d="m8.2 10.8 7.5-4.2" />
          <path d="m8.2 13.2 7.5 4.2" />
        </svg>
      </button>

      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="WhatsApp Kabadi Baba"
        className="relative flex h-14 w-14 items-center justify-center rounded-full bg-[#08b66a] text-white shadow-lg transition-transform duration-200 hover:scale-110 active:scale-95 sm:h-16 sm:w-16"
      >
        <span className="kb-ripple" aria-hidden="true" />
        <span className="kb-ripple kb-ripple-delay" aria-hidden="true" />
        <svg viewBox="0 0 32 32" className="relative z-10 h-8 w-8 sm:h-9 sm:w-9" fill="currentColor" aria-hidden="true">
          <path d="M16 3C8.82 3 3 8.82 3 16c0 2.3.6 4.54 1.74 6.53L3 29l6.66-1.7A12.94 12.94 0 0 0 16 29c7.18 0 13-5.82 13-13S23.18 3 16 3Zm0 23.7c-2.02 0-4-.54-5.73-1.57l-.41-.24-3.95 1.01 1.05-3.84-.27-.42A10.67 10.67 0 1 1 16 26.7Zm5.86-7.98c-.32-.16-1.9-.94-2.2-1.05-.3-.11-.52-.16-.74.16-.22.32-.84 1.05-1.03 1.27-.19.22-.38.24-.7.08-.32-.16-1.34-.49-2.55-1.57-.94-.84-1.57-1.87-1.75-2.19-.18-.32-.02-.49.14-.65.14-.14.32-.38.49-.57.16-.19.22-.32.32-.54.11-.22.05-.41-.03-.57-.08-.16-.74-1.78-1.01-2.44-.27-.64-.54-.55-.74-.56h-.63c-.22 0-.57.08-.87.41-.3.32-1.14 1.11-1.14 2.71s1.17 3.14 1.33 3.36c.16.22 2.3 3.51 5.57 4.92.78.34 1.39.54 1.87.69.79.25 1.5.21 2.06.13.63-.09 1.9-.78 2.17-1.54.27-.76.27-1.41.19-1.54-.08-.13-.3-.21-.62-.37Z" />
        </svg>
      </a>

      <a
        href={callUrl}
        aria-label="Call Kabadi Baba"
        className="flex h-14 w-14 items-center justify-center rounded-full bg-[#08b66a] text-white shadow-lg transition-transform duration-200 hover:scale-110 active:scale-95 sm:h-16 sm:w-16"
      >
        <svg viewBox="0 0 24 24" className="kb-phone-ring h-7 w-7 sm:h-8 sm:w-8" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M6.5 3.5c.6-.3 1.3-.1 1.7.5l1.5 2.7c.3.6.2 1.3-.3 1.7L8 9.7c-.2.2-.3.5-.1.8 1.1 2.1 2.7 3.8 4.8 4.8.3.2.6.1.8-.1l1.3-1.4c.4-.5 1.1-.6 1.7-.3l2.7 1.5c.6.3.8 1.1.5 1.7l-.7 1.4c-.4.8-1.2 1.3-2.1 1.2-3.2-.3-6.5-2-9.1-4.6C5.2 12.1 3.5 8.8 3.2 5.6c-.1-.9.4-1.7 1.2-2.1l2.1-1Z" />
          <path d="M15.5 4.5c2.2.6 3.4 1.8 4 4" />
          <path d="M15.5 2c3.7.7 5.8 2.8 6.5 6.5" />
        </svg>
      </a>
    </div>
  );
}