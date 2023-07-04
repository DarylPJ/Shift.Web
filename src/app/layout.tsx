import styles from "./layout.module.css";

import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Shift app",
  description: "App to for the shift pattens",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} ${styles.body}`}>{children}</body>
    </html>
  );
}
