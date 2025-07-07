import { Link } from "wouter";
import type { Article } from "@shared/schema";

interface ArticleCardProps {
  article: Article;
  variant?: "hero" | "sidebar" | "grid" | "opinion";
}

export default function ArticleCard({ article, variant = "grid" }: ArticleCardProps) {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  if (variant === "hero") {
    return (
      <article className="lg:col-span-2">
        <img
          src={article.imageUrl}
          alt={article.title}
          className="w-full h-80 object-cover rounded-lg shadow-lg mb-4"
        />
        <div className="space-y-4">
          <span className="text-time-red text-sm font-semibold uppercase tracking-wide">
            {article.category}
          </span>
          <h1 className="text-4xl lg:text-5xl font-bold text-time-dark leading-tight">
            <Link href={`/article/${article.slug}`}>
              <a className="hover:text-time-red transition-colors">
                {article.title}
              </a>
            </Link>
          </h1>
          <p className="text-xl text-time-gray leading-relaxed">
            {article.excerpt}
          </p>
          <div className="flex items-center text-sm text-time-gray space-x-4">
            <span>
              By <span className="font-medium">{article.author}</span>
            </span>
            <span>•</span>
            <span>{formatDate(article.publishedAt)}</span>
            <span>•</span>
            <span>{article.readTime} min read</span>
          </div>
        </div>
      </article>
    );
  }

  if (variant === "sidebar") {
    return (
      <article className="border-b border-gray-200 pb-6 last:border-b-0">
        <img
          src={article.imageUrl}
          alt={article.title}
          className="w-full h-32 object-cover rounded-lg mb-3"
        />
        <span className="text-time-red text-xs font-semibold uppercase tracking-wide">
          {article.category}
        </span>
        <h3 className="text-lg font-bold text-time-dark mb-2 leading-tight">
          <Link href={`/article/${article.slug}`}>
            <a className="hover:text-time-red transition-colors">
              {article.title}
            </a>
          </Link>
        </h3>
        <p className="text-sm text-time-gray">{article.excerpt}</p>
      </article>
    );
  }

  if (variant === "opinion") {
    return (
      <article className="border-l-4 border-time-red pl-6">
        <span className="text-time-red text-sm font-semibold uppercase tracking-wide">
          {article.category}
        </span>
        <h3 className="text-2xl font-bold text-time-dark mb-3 leading-tight">
          <Link href={`/article/${article.slug}`}>
            <a className="hover:text-time-red transition-colors">
              {article.title}
            </a>
          </Link>
        </h3>
        <p className="text-time-gray mb-4">{article.excerpt}</p>
        <div className="flex items-center text-sm text-time-gray">
          <span>
            By <span className="font-medium">{article.author}</span>
          </span>
          <span className="mx-2">•</span>
          <span>{formatDate(article.publishedAt)}</span>
        </div>
      </article>
    );
  }

  // Default grid variant
  return (
    <article className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow">
      <img
        src={article.imageUrl}
        alt={article.title}
        className="w-full h-40 object-cover"
      />
      <div className="p-4">
        <span className="text-time-red text-xs font-semibold uppercase tracking-wide">
          {article.category}
        </span>
        <h3 className="text-base font-bold text-time-dark mb-2 leading-tight">
          <Link href={`/article/${article.slug}`}>
            <a className="hover:text-time-red transition-colors">
              {article.title}
            </a>
          </Link>
        </h3>
        <p className="text-sm text-time-gray mb-3 line-clamp-2">
          {article.excerpt}
        </p>
        <div className="text-xs text-time-gray">
          {formatDate(article.publishedAt)} • {article.readTime} min read
        </div>
      </div>
    </article>
  );
}
