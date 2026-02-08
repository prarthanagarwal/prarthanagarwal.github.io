import MainLayout from "@/components/layout/main-layout";
import { bucketList } from "@/lib/bucket-list-data";

export default function BucketList() {
  return (
    <MainLayout showHomeLink>
      <div className="max-w-2xl mx-auto flex flex-col items-center text-center">
        <h1 className="text-[2.5rem] font-serif tracking-tight text-primary">
          Bucket List
        </h1>
        <p className="pt-2 text-base text-body">
          inspired by <a href="https://www.ratnakar.xyz/bucketlist" target="_blank" rel="noopener noreferrer" className="text-primary no-underline underline-offset-4 transition-all duration-200 ease-in-out hover:text-title">Priyanshu Ratnakar</a> 
          - these are the things I want to do for the plot.
        </p>

        <ol className="pt-6 list-decimal list-inside space-y-2 text-left w-full">
        {bucketList.map((item) => (
          <li
            key={item.id}
            className={`text-base ${item.done ? "text-emerald-600 font-medium" : "text-title"}`}
          >
            {item.text}
          </li>
        ))}
        </ol>
      </div>
    </MainLayout>
  );
}
