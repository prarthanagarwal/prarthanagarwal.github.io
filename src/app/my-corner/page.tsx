import MainLayout from "@/components/layout/main-layout";
import Image from "next/image";

export default function MyCorner() {
  return (
    <MainLayout showHomeLink hideFooter>
      <div className="flex flex-col items-center justify-center pt-8 pb-12">
        <Image
          src="/404.png"
          alt="Under construction"
          width={400}
          height={400}
          className="w-128 h-128 object-contain"
        />
        <p className="pt-2 text-base text-body text-center max-w-md">
          This page is still under construction. I&apos;m figuring out the design — check back soon!
        </p>
      </div>
    </MainLayout>
  );
}
