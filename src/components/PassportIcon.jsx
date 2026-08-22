import React from "react";

export const PassportIcon = ({ size = 22, className = "" }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={2}
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <rect x="5" y="2" width="14" height="20" rx="2" />
    <circle cx="12" cy="10" r="3.2" />
    <path d="M12 6.8v6.4M8.8 10h6.4" />
    <path d="M9 17.5h6" />
  </svg>
);

export default PassportIcon;
