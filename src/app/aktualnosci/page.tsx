import Link from "next/link";
import { NEWS_POSTS } from "@/lib/constants";

export const metadata = { title: "Aktualności — Future Minds" };

function formatDate(iso: string) {
  const d = new Date(iso);
  const date = d.toLocaleDateString("pl-PL", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
  const time = d.toLocaleTimeString("pl-PL", {
    hour: "2-digit",
    minute: "2-digit",
  });
  return { date, time };
}

export default function AktualnosciPage() {
  return (
    <section className="min-h-screen pt-40 pb-20">
      <div className="mx-auto max-w-[900px] px-6">
        <h1 className="mb-16 text-[42px] font-normal text-fm-text">
          Aktualności
        </h1>

        <div className="flex flex-col">
          {NEWS_POSTS.map((post) => {
            const { date, time } = formatDate(post.date);
            return (
              <article
                key={post.date + post.title}
                className="group border-b border-white/10 py-8 transition-colors hover:bg-white/[0.02]"
              >
                <div className="flex items-baseline gap-6">
                  <div className="shrink-0 w-[180px] text-[14px] font-extralight tracking-wide text-white/40">
                    <span>{date}</span>
                    <span className="ml-3 text-white/25">{time}</span>
                  </div>
                  <div className="min-w-0 flex-1">
                    <span className="mb-1 inline-block rounded-sm bg-fm-green/10 px-2 py-0.5 text-[11px] font-light uppercase tracking-[1.5px] text-fm-green">
                      {post.category}
                    </span>
                    <h2 className="text-[20px] font-extralight leading-relaxed text-[#E8E8E8] transition-colors group-hover:text-fm-green">
                      {post.title}
                    </h2>
                  </div>
                </div>
              </article>
            );
          })}
        </div>

        <div className="mt-16">
          <Link
            href="/"
            className="text-[14px] font-extralight tracking-[1px] text-white/40 transition-colors hover:text-fm-green"
          >
            &larr; Powrót na stronę główną
          </Link>
        </div>
      </div>
    </section>
  );
}
