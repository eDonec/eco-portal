"use client";

import dynamic from "next/dynamic";

const ClientEcoPortalForm = dynamic(() => import("./ClientEcoPortalForm"), {
  ssr: false,
});

export default ClientEcoPortalForm;
