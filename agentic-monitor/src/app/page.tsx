import Link from "next/link";

import { sourceCategories } from "@/data/sources";
import { generateDigest } from "@/lib/digest";

export const dynamic = "force-dynamic";
export const revalidate = 0;

function formatDate(iso: string, options?: Intl.DateTimeFormatOptions) {
  return new Intl.DateTimeFormat("fr-FR", {
    dateStyle: "long",
    timeStyle: "short",
    timeZone: "Europe/Paris",
    ...options,
  }).format(new Date(iso));
}

export default async function Home() {
  const digest = await generateDigest().catch((error) => {
    console.error("Failed to generate digest", error);
    return null;
  });

  return (
    <main className="mx-auto flex min-h-screen max-w-6xl flex-col gap-16 px-6 pb-16 pt-12 font-sans sm:px-10 lg:px-12">
      <section className="rounded-3xl bg-white p-10 shadow-sm ring-1 ring-slate-200">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-sky-600">
          Agent de veille
        </p>
        <h1 className="mt-4 text-4xl font-semibold leading-tight text-slate-900 sm:text-5xl">
          Intelligence artificielle générative & éducation
        </h1>
        <p className="mt-6 max-w-3xl text-lg leading-relaxed text-slate-600">
          Sélection quotidienne de sources francophones et internationales pour
          suivre l&apos;impact des IA génératives sur l&apos;enseignement,
          l&apos;apprentissage et les politiques éducatives. Synthèses
          contextualisées, mise à jour automatique et catégorisation par
          besoins.
        </p>
        <div className="mt-8 grid gap-6 text-sm text-slate-600 sm:grid-cols-3">
          <div className="rounded-2xl border border-slate-200 p-6">
            <p className="text-xs font-medium uppercase tracking-[0.3em] text-slate-500">
              Fréquence
            </p>
            <p className="mt-3 text-base font-semibold text-slate-900">
              Chaque jour à 07h30 (GMT+1 / Europe-Paris)
            </p>
            <p className="mt-2 leading-relaxed">
              Analyse des nouvelles publications détectées depuis le dernier
              run, avec filtration automatique des doublons.
            </p>
          </div>
          <div className="rounded-2xl border border-slate-200 p-6">
            <p className="text-xs font-medium uppercase tracking-[0.3em] text-slate-500">
              Axes de veille
            </p>
            <p className="mt-3 text-base font-semibold text-slate-900">
              Actualité, éducation, recherche, outils
            </p>
            <p className="mt-2 leading-relaxed">
              Classement thématique pour équilibrer veille institutionnelle,
              retours de terrain et innovation scientifique.
            </p>
          </div>
          <div className="rounded-2xl border border-slate-200 p-6">
            <p className="text-xs font-medium uppercase tracking-[0.3em] text-slate-500">
              Alertes
            </p>
            <p className="mt-3 text-base font-semibold text-slate-900">
              Résumés automatisés & liens directs
            </p>
            <p className="mt-2 leading-relaxed">
              Chaque article retenu génère un condensé rapide pour faciliter la
              qualification et le partage.
            </p>
          </div>
        </div>
      </section>

      <section className="grid gap-6 lg:grid-cols-[2fr,1fr]">
        <article className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">
                Dernier rapport
              </p>
              <h2 className="mt-2 text-2xl font-semibold text-slate-900">
                Synthèse des nouveaux articles
              </h2>
            </div>
            <span className="rounded-full bg-slate-900 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-white">
              fenêtre 24h
            </span>
          </div>
          {digest && digest.feeds.length > 0 ? (
            <div className="mt-6 space-y-8">
              <p className="text-sm text-slate-500">
                Généré le {formatDate(digest.generatedAt)} — nouvelles parutions
                relevées depuis {formatDate(digest.windowStart, { timeStyle: "short" })}
              </p>
              <div className="space-y-10">
                {digest.feeds.map((feed) => (
                  <div key={feed.source.title} className="space-y-4">
                    <div className="flex flex-wrap items-center gap-3">
                      <Link
                        href={feed.source.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 text-lg font-semibold text-slate-900 hover:text-sky-600"
                      >
                        {feed.source.title}
                        <span aria-hidden className="text-slate-400">
                          ↗
                        </span>
                      </Link>
                      <div className="flex flex-wrap gap-2">
                        {feed.source.tags.map((tag) => (
                          <span
                            key={`${feed.source.title}-${tag}`}
                            className="rounded-full bg-sky-50 px-3 py-1 text-xs font-medium text-sky-600"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                    <ul className="space-y-4">
                      {feed.items.map((item) => (
                        <li
                          key={item.link}
                          className="rounded-2xl border border-slate-200 p-5 transition hover:border-sky-200 hover:shadow-sm"
                        >
                          <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
                            <div>
                              <Link
                                href={item.link}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-base font-semibold text-slate-900 hover:text-sky-600"
                              >
                                {item.title}
                              </Link>
                              <p className="mt-2 text-sm leading-relaxed text-slate-600">
                                {item.summary}
                              </p>
                            </div>
                            {item.publishedAt ? (
                              <span className="shrink-0 rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-500">
                                {formatDate(item.publishedAt, {
                                  dateStyle: "short",
                                  timeStyle: "short",
                                })}
                              </span>
                            ) : null}
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="mt-8 rounded-2xl bg-slate-50 p-8 text-center text-slate-600">
              <p className="text-base font-medium">
                Aucun nouvel article détecté sur la fenêtre courante.
              </p>
              <p className="mt-2 text-sm">
                La prochaine collecte aura lieu automatiquement à 07h30 (GMT+1).
              </p>
            </div>
          )}
        </article>
        <aside className="flex flex-col gap-6">
          <div className="rounded-3xl border border-slate-200 bg-slate-900 p-8 text-white shadow-sm">
            <p className="text-xs font-medium uppercase tracking-[0.3em] text-slate-300">
              Routine quotidienne
            </p>
            <h3 className="mt-3 text-xl font-semibold">
              Déclenchement programmé 07h30 (GMT+1)
            </h3>
            <ul className="mt-4 space-y-3 text-sm leading-relaxed text-slate-200">
              <li>1. Collecte des flux RSS & veille institutionnelle.</li>
              <li>2. Déduplication et filtrage pour ne garder que les nouveautés.</li>
              <li>3. Génération d&apos;un résumé court pour chaque article.</li>
              <li>4. Publication et mise à jour du tableau de bord.</li>
            </ul>
          </div>
          <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
            <p className="text-xs font-medium uppercase tracking-[0.3em] text-slate-500">
              Calibration
            </p>
            <ul className="mt-4 space-y-4 text-sm leading-relaxed text-slate-600">
              <li>
                <span className="font-semibold text-slate-900">
                  Langue prioritaire&nbsp;:
                </span>{" "}
                Français (avec compléments internationaux lorsque pertinent).
              </li>
              <li>
                <span className="font-semibold text-slate-900">
                  Focus pédagogique&nbsp;:
                </span>{" "}
                usages en classe, stratégie des établissements, compétences des
                enseignants.
              </li>
              <li>
                <span className="font-semibold text-slate-900">
                  Attentes recherche&nbsp;:
                </span>{" "}
                études évaluatives, cadres réglementaires et méthodologies
                d&apos;accompagnement.
              </li>
            </ul>
          </div>
        </aside>
      </section>

      <section className="rounded-3xl border border-slate-200 bg-white p-10 shadow-sm">
        <div className="max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">
            Référentiel de sources
          </p>
          <h2 className="mt-2 text-3xl font-semibold text-slate-900">
            Cartographie des ressources surveillées
          </h2>
          <p className="mt-4 text-base leading-relaxed text-slate-600">
            Les catégories ci-dessous combinent médias généralistes, publications
            spécialisées, bases scientifiques et agrégateurs d&apos;outils IA
            pour l&apos;éducation. Chaque sélection privilégie les contenus
            francophones, tout en intégrant des ressources internationales
            incontournables.
          </p>
        </div>
        <div className="mt-10 grid gap-8 lg:grid-cols-2">
          {sourceCategories.map((category) => (
            <article
              key={category.id}
              className="flex flex-col gap-6 rounded-3xl border border-slate-200 p-6 shadow-sm transition hover:border-sky-200 hover:shadow-lg"
            >
              <div>
                <h3 className="text-xl font-semibold text-slate-900">
                  {category.label}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">
                  {category.summary}
                </p>
              </div>
              <ul className="space-y-5 text-sm text-slate-700">
                {category.sources.map((source) => (
                  <li key={source.url} className="space-y-2">
                    <div className="flex flex-wrap items-center gap-2">
                      <Link
                        href={source.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-base font-semibold text-slate-900 hover:text-sky-600"
                      >
                        {source.title}
                      </Link>
                      <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium uppercase tracking-[0.2em] text-slate-500">
                        {source.language === "fr"
                          ? "FR"
                          : source.language === "en"
                          ? "EN"
                          : "FR/EN"}
                      </span>
                    </div>
                    <p className="leading-relaxed text-slate-600">
                      {source.description}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {source.tags.map((tag) => (
                        <span
                          key={`${source.title}-${tag}`}
                          className="rounded-full bg-sky-50 px-2.5 py-1 text-[11px] font-medium uppercase tracking-[0.2em] text-sky-600"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
