import Logo from "@/components/Logo";
import "@/app/_styles/globals.css";

export const metadata = {
  title: "The Wild Oasis",
  description: "Explore the wild oasis of nature cabins.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-primary-900 text-primary-100 min-h-screen">
        <header>
          <Logo />
        </header>
        <main>{children}</main>
      </body>
    </html>
  );
}
