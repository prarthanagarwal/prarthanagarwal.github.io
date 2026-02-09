import MainLayout from "@/components/layout/main-layout";

export default function MyCorner() {
  return (
    <MainLayout showHomeLink hideFooter>
      <div className="flex flex-col items-center justify-center pt-8 pb-12">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/404.webp"
          srcSet="/404-200w.webp 200w, /404.webp 400w"
          sizes="(max-width: 480px) 200px, 400px"
          alt="Under construction"
          width={400}
          height={400}
          loading="lazy"
          decoding="async"
          className="w-128 h-128 object-contain"
        />
        <p className="pt-2 text-base text-body text-center max-w-md">
          This page is still under construction. I&apos;m figuring out the design — check back soon!
        </p>
      </div>
    </MainLayout>
  );
}
