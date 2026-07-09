import { existsSync } from "fs";
import { Leaf, Lock, User } from "lucide-react";
import Image from "next/image";
import { join } from "path";
import { getAbout, getCTA, getCampaigns, getFaqs, getFinalCTA, getFlow, getHero, getLessons, getNavItems, getPrices, getReasons, getReviews, getRisks, getServices, getSessionImages, getStores, getWorries } from "@/app/lib/notion";

export const dynamic = "force-dynamic";
export const revalidate = 0;

const localImageExists = (image: string) => {
  if (!image.startsWith("/")) {
    return true;
  }

  return existsSync(join(process.cwd(), "public", image));
};

const ImageBox = ({
  label,
  image,
}: {
  label: string;
  image?: string;
}) => {
  if (!image || !localImageExists(image)) return null;

  return (
    <div
      aria-label={label}
      className="mx-auto mb-10 h-56 max-w-4xl rounded-3xl bg-cover bg-center shadow-sm md:h-80"
      role="img"
      style={{ backgroundImage: `url(${image})` }}
    />
  );
};

const reasonTitleKeywords = [
  "豊富なマシーン",
  "マンツーマン",
  "通いやすい価格",
  "手ぶら",
  "キッズサークル",
];

const highlightReasonTitle = (title: string) => {
  const pattern = new RegExp(`(${reasonTitleKeywords.join("|")})`, "g");

  return title.split(pattern).map((part, index) =>
    reasonTitleKeywords.includes(part) ? (
      <span key={`${part}-${index}`} className="text-[#E89A3D]">
        {part}
      </span>
    ) : (
      part
    )
  );
};

const aboutTextKeywords = [
  "江戸川橋",
  "護国寺駅",
  "完全個室マンツーマン",
];

const highlightAboutText = (text: string) => {
  const pattern = new RegExp(`(${aboutTextKeywords.join("|")})`, "g");

  return text.split(pattern).map((part, index) =>
    aboutTextKeywords.includes(part) ? (
      <span key={`${part}-${index}`} className="font-bold text-[#E89A3D]">
        {part}
      </span>
    ) : (
      part
    )
  );
};

export default async function Home() {

const cta = await getCTA();
const hero = await getHero();
console.log("HERO DATA", hero);
const heroTitle = hero.title
  .replace(
    "週1〜始める。キレイとしなやかを作る習慣。",
    "週1〜始める。\nキレイとしなやか\nを作る習慣。"
  )
  .replace(
    "週１〜始める。キレイとしなやかを作る習慣。",
    "週１〜始める。\nキレイとしなやか\nを作る習慣。"
  );
const about = await getAbout();
const navItems = await getNavItems();
const worries = await getWorries();
const risks = await getRisks();
const services = await getServices();
const reasons = await getReasons();
const lessons = await getLessons();
const prices = await getPrices();
const campaigns = await getCampaigns();
const heroCampaign = campaigns[0] ?? {
  title: "GRAND OPENキャンペーン",
  description: "",
  label: "今月限定",
  period: "7月30日まで",
  limitedText: "50名様限定",
  joiningOffer: "入会金＋体験料0円",
  discountText: "月会費永久割引",
  normalPrice: "通常29,700円",
  campaignPrice: "28,000円",
  planName: "月4回",
  reservationText: "6月20日〜 先行予約開始",
  ctaText: hero.buttonText,
  ctaUrl: hero.buttonUrl,
  imageUrl: "",
};
const reviews = await getReviews();
const sessionImages = await getSessionImages();
const stores = await getStores();
const flow = await getFlow();
const faqs = await getFaqs();
const finalCTA = await getFinalCTA();
const finalCTAData = finalCTA ?? {
  title: "まずは体験予約から",
  text: "完全個室マンツーマンで\nあなたに合わせたレッスンをご提供します。",
  buttonText: cta.text,
  buttonUrl: cta.url,
  isVisible: cta.isVisible,
  imageUrl: "/images/cta.jpg",
};
const aboutData = about ?? {
  title: "スタジオONCEとは？",
  text: "スタジオONCEは、完全個室マンツーマンのマシンピラティススタジオです。\n一人ひとりの姿勢や身体の悩みに合わせて、無理なく続けられるレッスンをご提案します。",
  points: [
    "完全個室",
    "マンツーマン",
    "初心者でも安心",
  ],
  isVisible: true,
  imageUrl: "",
};
const aboutPointIcons = [Lock, User, Leaf];
const primaryCtaLead = "オープンキャンペーン実施中！";
const primaryCtaLabel = "０円体験予約はこちら";
const heroConcernLabels = ["姿勢改善", "肩こり・腰痛", "ボディメイク"];
    
  return (
    <main className="bg-[#fffdf8] text-[#545454]">
      <nav className="sticky top-0 z-50 border-b border-[#D8EAC7] bg-[#fffdf8]/95 px-4 py-2 backdrop-blur md:py-3">
        <div className="mx-auto hidden max-w-6xl items-center gap-2 overflow-x-auto whitespace-nowrap text-sm font-bold text-[#545454] md:flex">
          {navItems.map((item) => (
            <a
              key={item.id}
              href={item.href}
              className={
                item.isHighlighted
                  ? "ml-auto rounded-full bg-[#E89A3D] px-4 py-2 text-white shadow-sm"
                  : "rounded-full px-3 py-2 transition-colors hover:bg-[#D8EAC7]"
              }
            >
              {item.label}
            </a>
          ))}
        </div>

        <div className="mx-auto max-w-6xl md:hidden">
          <input
            aria-hidden="true"
            className="peer hidden"
            id="nav-toggle"
            type="checkbox"
          />

          <div className="flex items-center justify-between">
            <a
              href="#about"
              className="text-xs font-bold leading-tight text-[#E89A3D]"
            >
              {hero.storeName}
            </a>

            <label
              aria-label="メニューを開閉"
              className="flex h-10 w-10 cursor-pointer flex-col items-center justify-center gap-1.5 rounded-full bg-[#D8EAC7] shadow-sm"
              htmlFor="nav-toggle"
            >
              <span className="h-0.5 w-5 rounded-full bg-gray-700" />
              <span className="h-0.5 w-5 rounded-full bg-gray-700" />
              <span className="h-0.5 w-5 rounded-full bg-gray-700" />
            </label>
          </div>

          <div className="hidden pt-3 peer-checked:grid">
            <div className="grid gap-2 rounded-3xl bg-white p-3 shadow-md">
              {navItems.map((item) => (
                <label
                  key={item.id}
                  className="block cursor-pointer"
                  htmlFor="nav-toggle"
                >
                  <a
                    href={item.href}
                    className={
                      item.isHighlighted
                        ? "block rounded-full bg-[#E89A3D] px-4 py-3 text-center text-sm font-bold text-white shadow-sm"
                        : "block rounded-full px-4 py-3 text-sm font-bold text-[#545454] hover:bg-[#D8EAC7]"
                    }
                  >
                    {item.label}
                  </a>
                </label>
              ))}
            </div>
          </div>
        </div>
      </nav>

      {/* 1 Hero */}
<section className="relative overflow-hidden bg-[#fffdf8] px-6 py-10 md:py-20">
  <div className="mx-auto max-w-6xl">
    <div className="mx-auto mb-8 max-w-md rounded-[28px] border border-[#D8EAC7] bg-white px-5 py-9 text-center shadow-[0_16px_45px_rgba(23,35,59,0.08)] md:mb-12 md:max-w-2xl md:px-10 md:py-12">
      <p className="whitespace-nowrap text-[25px] font-extrabold leading-none tracking-normal text-[#E89A3D] md:text-[44px]">
        7月4日 GRAND OPEN ✨
      </p>

      <p className="mt-5 whitespace-nowrap text-[12px] font-bold leading-relaxed text-[#545454] md:text-base">
        江戸川橋駅 徒歩5分 ｜ 護国寺駅 徒歩7分
      </p>
    </div>

    <div className="grid items-center gap-8 md:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] md:gap-12">

    {/* 左側テキスト */}
    <div className="order-1 w-full min-w-0 text-center md:order-1 md:max-w-[680px] md:text-left">
      <div className="mx-auto mb-4 flex w-full max-w-[360px] items-center justify-center gap-2 md:mx-0 md:mb-5 md:max-w-none md:justify-start md:gap-3">
        {heroConcernLabels.map((item) => (
          <span
            key={item}
            className="flex min-h-9 flex-1 items-center justify-center rounded-full bg-gradient-to-r from-[#E89A3D] to-[#F6C58A] px-2.5 py-2 text-center text-[11px] font-extrabold leading-tight text-white shadow-[0_10px_24px_rgba(232,154,61,0.22)] md:flex-none md:px-5 md:text-sm"
          >
            {item}
          </span>
        ))}
      </div>

      <h1 className="mx-auto mb-7 max-w-full break-words whitespace-pre-line text-balance text-[37px] font-semibold leading-[1.26] tracking-normal text-[#545454] [overflow-wrap:anywhere] md:mx-0 md:mb-8 md:max-w-[620px] md:text-[clamp(2.45rem,3.7vw,4.2rem)] md:leading-[1.2] md:tracking-[-0.025em]">
  {heroTitle}
</h1>

<div className="relative mb-8 w-full min-w-0 overflow-hidden md:hidden">
      <div className="absolute -right-6 -top-6 h-40 w-40 rounded-full bg-[#D8EAC7] opacity-70" />
      <div className="absolute -bottom-6 -left-6 h-32 w-32 rounded-full bg-[#F6C58A] opacity-70" />

      <ImageBox
        label="Hero"
        image={hero.imageUrl || "/images/hero.jpg"}
      />
    </div>

<div className="mx-auto mb-8 grid max-w-sm grid-cols-3 gap-3 md:mx-0 md:max-w-md md:gap-4">
      {[hero.tag1, hero.tag2, hero.tag3].map((item, index) => (
        <div
          key={item}
          className="relative flex aspect-square items-center justify-center overflow-hidden rounded-full border border-[#E8C27A]/45 bg-[radial-gradient(circle_at_30%_22%,#FFFFFF_0%,#EEF7E7_42%,#D8EAC7_100%)] p-3 text-center text-[12px] font-extrabold leading-snug text-[#3F4A3F] shadow-[0_16px_36px_rgba(84,84,84,0.14)] ring-1 ring-white/80 md:text-sm"
        >
          <span className="absolute top-3 rounded-full bg-white/80 px-2 py-0.5 text-[8px] font-black tracking-[0.12em] text-[#E89A3D] shadow-sm md:text-[9px]">
            POINT {String(index + 1).padStart(2, "0")}
          </span>
          <span className="relative mt-4 max-w-[86%]">{item}</span>
          <span className="absolute bottom-3 h-1.5 w-9 rounded-full bg-[#E89A3D]/65 md:w-11" />
        </div>
      ))}
      </div>

      {hero.isVisible && (
  <div>
    <p className="mb-3 text-sm font-bold text-[#E89A3D]">
      {primaryCtaLead}
    </p>
    <a
      href={heroCampaign.ctaUrl || hero.buttonUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-block whitespace-nowrap rounded-full bg-[#E89A3D] px-8 py-4 font-bold text-white shadow-md md:px-10"
    >
      {primaryCtaLabel}
    </a>
  </div>
)}
    </div>

    {/* 右側画像 */}
    <div className="relative order-2 hidden w-full min-w-0 overflow-hidden md:order-2 md:block">
      <div className="absolute -right-6 -top-6 h-40 w-40 rounded-full bg-[#D8EAC7] opacity-70" />
      <div className="absolute -bottom-6 -left-6 h-32 w-32 rounded-full bg-[#F6C58A] opacity-70" />

      <ImageBox
        label="Hero"
        image={hero.imageUrl || "/images/hero.jpg"}
      />
    </div>

  </div>
  </div>
</section>

      {/* GRAND OPEN campaign */}
      <section className="bg-[#FFFDF8] px-6 pb-16">
        <div className="mx-auto max-w-6xl rounded-[32px] border border-[#DDE8CC] bg-white p-6 text-[#545454] shadow-[0_24px_70px_rgba(23,35,59,0.10)] md:p-10">
          <div className="grid gap-8 md:grid-cols-[1fr_1fr] md:items-center">
            <div className="relative overflow-hidden rounded-[28px] bg-[#FFFDF8] p-6 md:p-8">
              <div className="absolute right-6 top-6 h-16 w-16 rounded-full bg-[#DDE8CC]" />
              <div className="absolute -bottom-8 -left-8 h-28 w-28 rounded-full bg-[#E89B3A]/15" />

              <p className="relative rounded-2xl bg-white/80 px-4 py-3 text-sm leading-relaxed text-[#545454] shadow-sm md:text-base">
                ※近隣の江戸川橋・神楽坂店と相互利用可能です✨
              </p>
            </div>

            <div className="rounded-[28px] bg-[#DDE8CC]/45 p-6 text-center md:p-8">
              <p className="mb-3 text-xs font-bold tracking-[0.28em] text-[#C9A45C]">
                OPEN CAMPAIGN
              </p>

              <p className="mx-auto mb-5 inline-flex rounded-full bg-white px-5 py-2 text-sm font-bold text-[#545454] shadow-sm">
                <span>7月30日まで先着</span>
                <span className="!text-[#E89B3A]">50名様</span>
                <span>限定</span>
              </p>

              <div className="mb-6 rounded-[24px] border border-[#C9A45C]/20 bg-white p-6 shadow-sm">
                <p className="mb-2 text-sm font-bold tracking-[0.18em] text-[#E89B3A]">
                  月4回
                </p>

                <p className="text-5xl font-extrabold leading-none tracking-tight text-[#545454] md:text-6xl">
                  28,000円
                </p>

                <p className="mx-auto mt-4 inline-flex rounded-full bg-[#E89B3A] px-4 py-2 text-sm font-bold text-white">
                  ✨永久割引✨
                </p>
              </div>

              <p className="mb-3 text-base font-bold leading-relaxed text-[#E89B3A] md:text-lg">
                {primaryCtaLead}
              </p>

              {cta.isVisible && (
                <a
                  href={cta.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="gtm-cta-click inline-flex w-full items-center justify-center whitespace-nowrap rounded-full bg-[#E89B3A] px-6 py-4 text-base font-bold text-white shadow-md transition hover:opacity-90 md:w-auto md:px-10"
                >
                  {primaryCtaLabel}
                </a>
              )}
            </div>
          </div>
        </div>
      </section>

      {sessionImages.length > 0 && (
        <section className="bg-[#FFFDF8] px-6 py-16">
          <div className="mx-auto max-w-6xl overflow-hidden">
            <div className="mb-8 text-center">
              <p className="mb-3 text-xs font-bold tracking-[0.35em] text-[#E89A3D]">
                STUDIO ONCE
              </p>

              <h2 className="text-2xl font-bold leading-snug text-[#545454] md:text-3xl">
                初めての方でも安心。
                <br />
                マンツーマンレッスンの様子
              </h2>
            </div>

            <div className="relative -mx-6 overflow-hidden py-2">
              <div className="session-slider-track flex gap-5 px-6 md:gap-6">
                {[...sessionImages, ...sessionImages].map(
                  (item, index) => (
                    <Image
                      key={`campaign-session-${item.id}-${index}`}
                      src={item.imageUrl}
                      alt={item.title || "セッション風景"}
                      width={360}
                      height={288}
                      sizes="(min-width: 768px) 360px, 260px"
                      unoptimized
                      className="h-64 w-[260px] shrink-0 rounded-[28px] object-cover shadow-md md:h-72 md:w-[360px]"
                    />
                  )
                )}
              </div>
            </div>
          </div>
        </section>
      )}

      {aboutData.imageUrl && (
        <section className="bg-[#FFFDF8] px-6 py-[60px]">
          <div className="mx-auto max-w-6xl">
            <Image
              src={aboutData.imageUrl}
              alt="スタジオONCE"
              width={1200}
              height={640}
              className="h-[250px] w-full rounded-[24px] object-cover shadow-md md:h-[350px]"
            />
          </div>
        </section>
      )}

      {/* 2 スタジオONCEとは */}
      {aboutData.isVisible && (
      <section id="about" className="scroll-mt-24 bg-[#f3f8ed] px-6 py-20">
        <div className="mx-auto max-w-5xl rounded-3xl bg-white p-8 shadow-sm md:p-12">
          <div className="grid gap-8 md:grid-cols-[1.2fr_0.8fr] md:items-center">
            <div>
              <p className="mb-4 text-sm font-bold tracking-[0.25em] text-[#E89A3D]">
                ABOUT ONCE
              </p>

              <h2 className="mx-auto mb-6 max-w-3xl text-2xl font-bold leading-snug text-[#545454] md:text-4xl">
                {aboutData.title}
              </h2>

              <p className="whitespace-pre-line leading-relaxed text-[#545454] md:leading-8">
                {highlightAboutText(aboutData.text)}
              </p>
            </div>

            <div className="grid grid-cols-3 justify-items-center gap-3 md:gap-4">
              {aboutData.points.map((item, index) => {
                const Icon = aboutPointIcons[index] ?? Leaf;

                return (
                <div
                  key={item}
                  className="flex aspect-square w-[110px] flex-col items-center justify-center rounded-full bg-[#D8EAC7] p-4 text-center font-bold text-[#545454] shadow-md md:w-[126px]"
                >
                  <Icon className="mb-2 h-6 w-6 text-[#545454] md:h-7 md:w-7" strokeWidth={1.8} />
                  <span className="text-xs leading-snug md:text-sm">
                    {item}
                  </span>
                </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>
      )}

      {/* 3 悩み共感 */}
      <section id="worries" className="scroll-mt-24 px-6 py-20">

        <h2 className="mx-auto mb-8 max-w-3xl text-center text-2xl font-bold leading-snug md:text-3xl">
          こんなお悩みありませんか？
        </h2>

        <ImageBox
          label="悩み共感"
          image={worries[0]?.imageUrl || "/images/worry.jpg"}
        />

        <div className="mx-auto max-w-3xl space-y-4">
          {(worries.length > 0
  ? worries.map((worry) => worry.name)
  : [
      "肩こり・腰痛を改善したい",
      "猫背や反り腰が気になる",
      "運動が苦手で続くか不安",
      "女性専用空間で安心して通いたい",
    ]
).map((item) => (
  <div
    key={item}
    className="rounded-3xl bg-white p-6 shadow-sm"
  >
    ✓ {item}
  </div>
))}
        </div>
      </section>

      {/* 4 放置するとどうなるか */}
      <section className="scroll-mt-24 bg-[#f8f5ef] px-6 py-20 text-center">

        <h2 className="mx-auto mb-8 max-w-3xl text-2xl font-bold leading-snug md:text-3xl">
          そのまま放置すると…
        </h2>

        <ImageBox
          label="放置リスク"
          image={risks[0]?.imageUrl || "/images/risk.jpg"}
        />

        <div className="mx-auto grid max-w-5xl gap-4 text-left md:grid-cols-2 md:gap-5">
          {(risks.length > 0
            ? risks.map((risk) => risk.name)
            : [
                "肩こり・腰痛が慢性化",
                "反り腰、猫背で体型が崩れる",
                "姿勢が崩れ実際より太って見える",
                "身体を動かすのが億劫になる",
              ]
          ).map((item) => (
            <div
              key={item}
              className="flex gap-4 rounded-[24px] bg-white p-6 text-[#545454] shadow-[0_16px_40px_rgba(23,35,59,0.08)]"
            >
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#E89B3A]/10 text-lg text-[#E89B3A]">
                ⚠
              </span>

              <p className="pt-1 text-base font-bold leading-relaxed md:text-lg">
                {item}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* 5 ONCEでできること */}
      <section id="services" className="scroll-mt-24 px-6 py-20">

        <h2 className="mx-auto mb-8 max-w-3xl text-center text-2xl font-bold leading-snug md:text-3xl">
          ONCEでできること
        </h2>

        <ImageBox
          label="できること"
          image={services[0]?.imageUrl || "/images/service.jpg"}
        />

        <div className="mx-auto grid max-w-5xl gap-3 sm:grid-cols-2 md:grid-cols-3">
          {(services.length > 0
            ? services.map((service) => service.name)
            : [
                "姿勢改善",
                "肩こり改善",
                "ダイエット",
                "腰痛ケア",
                "ボディメイク",
                "運動習慣づくり",
              ]
          ).map((item, index) => (
            <div
              key={item}
              className="group rounded-[24px] border border-[#D8EAC7] bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
            >
              <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-full bg-[#D8EAC7]/70 text-sm font-bold text-[#545454]">
                {String(index + 1).padStart(2, "0")}
              </div>

              <p className="text-base font-bold leading-snug text-[#545454] md:text-lg">
                {item}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* 6 選ばれる理由 */}
      <section id="reasons" className="scroll-mt-24 bg-white px-6 py-20">

        <h2 className="mx-auto mb-8 max-w-3xl text-center text-2xl font-bold leading-snug md:text-3xl">
          選ばれる理由
        </h2>

        <ImageBox
          label="選ばれる理由"
          image={reasons[0]?.imageUrl || "/images/reason.jpg"}
        />

        <div className="mx-auto grid max-w-5xl items-stretch gap-5 md:grid-cols-2 md:gap-7">

          {(reasons.length > 0
            ? reasons
            : [
                {
                  title: "完全個室",
                  text: "周りを気にせず集中できる空間",
                },
                {
                  title: "マンツーマン",
                  text: "身体に合わせた完全オーダーメイド",
                },
                {
                  title: "女性インストラクター",
                  text: "初心者でも安心して通える",
                },
              ]
          ).map((item, index) => (
            <div
              key={`${item.title}-${index}`}
              className="flex h-full flex-col rounded-[2rem] border border-[#D8EAC7]/70 bg-[#fffdf8] p-6 shadow-[0_18px_45px_rgba(108,143,93,0.12)] md:p-8"
            >
              <div className="mb-5 flex items-center justify-between gap-4">
                <span className="rounded-full bg-[#D8EAC7] px-3 py-1 text-xs font-bold tracking-[0.16em] text-[#6C8F5D]">
                  REASON {String(index + 1).padStart(2, "0")}
                </span>

                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#D8EAC7]/70">
                  <span className="h-3 w-3 rounded-full bg-[#E89A3D]" />
                </span>
              </div>

              <h3 className="mb-4 text-[22px] font-bold leading-snug text-[#545454] md:text-2xl">
                {highlightReasonTitle(item.title)}
              </h3>

              <p className="whitespace-pre-line text-base leading-relaxed text-[#545454] md:leading-8">
                {item.text}
              </p>

              <div className="mt-6 h-1 w-20 rounded-full bg-[#D8EAC7]" />
            </div>
          ))}
        </div>
      </section>

      {/* 7 レッスン内容 */}
      <section className="scroll-mt-24 px-6 py-20">

        <h2 className="mx-auto mb-8 max-w-3xl text-center text-2xl font-bold leading-snug md:text-3xl">
          レッスン内容
        </h2>

        <ImageBox
          label="レッスン内容"
          image={lessons[0]?.imageUrl || "/images/lesson.jpg"}
        />

        <div className="mx-auto max-w-3xl">
          {(lessons.length > 0
            ? lessons.map((lesson) => lesson.name)
            : [
                "姿勢分析",
                "身体評価",
                "オーダーメイドマシンピラティス",
              ]
          ).map((item, index) => (
            <div
              key={item}
              className="relative grid gap-4 pb-8 pl-14 last:pb-0"
            >
              {index < (lessons.length > 0 ? lessons.length : 3) - 1 && (
                <div className="absolute left-5 top-11 h-full w-px bg-[#D8EAC7]" />
              )}
              <div className="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-full border border-[#D8EAC7] bg-white text-sm font-bold text-[#E89A3D] shadow-sm">
                {String(index + 1).padStart(2, "0")}
              </div>

              <div className="rounded-[24px] border border-[#D8EAC7] bg-white p-6 shadow-sm">
                <p className="mb-2 text-xs font-bold tracking-[0.2em] text-[#6C8F5D]">
                  STEP{String(index + 1).padStart(2, "0")}
                </p>

                <p className="text-xl font-bold leading-snug text-[#545454]">
                  {item}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 8 キャンペーン */}
      <section id="campaign" className="scroll-mt-24 px-6 py-20 text-center">

        <ImageBox
          label="キャンペーン"
          image={campaigns[0]?.imageUrl || "/images/campaign.jpg"}
        />

        <div className="mx-auto max-w-3xl space-y-6">
          {(campaigns.length > 0
            ? campaigns
            : [
                {
                  label: "今月限定",
                  period: "7月1日〜7月30日まで",
                  limit: "先着50名様限定",
                  title: "キャンペーン",
                  text: "まずはお気軽に体験予約ください",
                  admissionOffer: "入会金＋体験料0円",
                  discountOffer: "月会費永久割引",
                  planName: "月4回プラン",
                  normalPrice: "通常29,700円",
                  campaignPrice: "28,000円",
                  ctaText: "",
                  ctaUrl: "",
                },
              ]
          ).map((item) => (
            <div
              key={item.title || item.admissionOffer}
              className="relative overflow-hidden rounded-[2rem] bg-[#D8EAC7] p-3 shadow-xl md:p-6"
            >
              <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-[#E89A3D] opacity-20" />
              <div className="absolute -bottom-12 -left-12 h-40 w-40 rounded-full bg-white opacity-50" />

              <div className="relative rounded-[1.5rem] bg-white px-4 py-6 shadow-sm md:px-12 md:py-12">
                <p className="mx-auto mb-4 inline-block rounded-full bg-[#E89A3D] px-4 py-2 text-xs font-bold tracking-[0.08em] text-white shadow-sm md:mb-5 md:px-5 md:text-sm md:tracking-[0.18em]">
                  {item.label}
                </p>

                <div className="mb-6 space-y-3 md:mb-8">
                  {item.period && (
                    <p className="text-sm font-bold leading-relaxed tracking-[0.08em] text-[#6C8F5D] md:tracking-[0.2em]">
                      {item.period}
                    </p>
                  )}

                  <div className="mx-auto inline-flex rounded-[28px] bg-[#f8f5ef] px-8 py-5 shadow-sm">
                    <div className="limited-wrapper flex flex-col items-center gap-0 text-center font-bold leading-[0.92]">
                      <span className="block text-4xl text-[#545454]">先着</span>
                      <span className="highlight block text-7xl font-bold text-[#E89A3D]">
                        50名様
                      </span>
                      <span className="block text-4xl text-[#545454]">限定</span>
                    </div>
                  </div>
                </div>

                <div className="mb-6 md:mb-8">
                  <h2 className="mx-auto max-w-xs whitespace-normal break-keep text-balance text-3xl font-bold leading-tight tracking-wide text-[#E89A3D] md:max-w-none md:text-6xl">
                    {item.admissionOffer}
                  </h2>
                </div>

                <p className="mb-5 text-base font-bold text-[#545454]">
                  さらに
                </p>

                <p className="mx-auto mb-6 inline-block rounded-full bg-[#D8EAC7] px-5 py-2 text-sm font-bold text-[#545454] shadow-sm md:mb-8">
                  {item.discountOffer}
                </p>

                <div className="mx-auto mb-6 max-w-sm rounded-3xl border border-[#D8EAC7] bg-[#fffdf8] p-4 md:mb-8 md:p-6">
                  <p className="mb-4 text-base font-bold text-[#545454] md:text-lg">
                    {item.planName}
                  </p>

                  <div className="grid grid-cols-1 items-stretch justify-center gap-3 md:grid-cols-[1fr_auto_1fr] md:items-end md:gap-4">
                    <div className="rounded-2xl bg-white px-4 py-3 shadow-sm md:bg-transparent md:px-0 md:py-0 md:shadow-none">
                      <p className="mb-1 text-sm font-bold text-[#545454] md:text-xs md:text-[#545454]">
                        通常
                      </p>
                      <p className="text-xl font-bold text-[#545454] line-through">
                        {item.normalPrice}
                      </p>
                    </div>

                    <p className="text-xl font-bold text-[#E89A3D] md:pb-1 md:text-2xl">
                      ↓
                    </p>

                    <div className="rounded-2xl bg-white px-4 py-4 shadow-sm md:bg-transparent md:px-0 md:py-0 md:shadow-none">
                      <p className="mb-1 text-sm font-bold text-[#E89A3D] md:text-xs">
                        キャンペーン
                      </p>
                      <p className="whitespace-nowrap text-4xl font-bold leading-tight text-[#E89A3D] md:text-5xl">
                        {item.campaignPrice}
                      </p>
                    </div>
                  </div>
                </div>

                {item.text && (
                  <p className="mx-auto max-w-xl whitespace-pre-line text-sm leading-relaxed text-[#545454] md:text-base md:leading-8">
                    {item.text}
                  </p>
                )}

                {cta.isVisible && (
                  <a
                    href={item.ctaUrl || cta.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="gtm-cta-click mt-8 inline-block w-[90%] max-w-sm whitespace-nowrap rounded-full bg-[#E89A3D] px-6 py-4 text-center font-bold text-white shadow-md md:w-auto md:px-10"
                  >
                    {item.ctaText || cta.text}
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 9 料金 */}
      <section id="price" className="scroll-mt-24 bg-[#f8f5ef] px-6 py-20 text-center">

        <h2 className="mx-auto mb-8 max-w-3xl text-2xl font-bold leading-snug md:text-3xl">
          料金
        </h2>

        <ImageBox
          label="料金"
          image={prices[0]?.imageUrl || "/images/price.jpg"}
        />

        <div className="mx-auto grid max-w-5xl items-center gap-5 md:grid-cols-3">
          {(prices.length > 0
            ? prices
            : [
                {
                  planName: "月2回プラン",
                  price: "15,000円",
                  description: "まずは無理なく始めたい方へ",
                },
                {
                  planName: "月4回プラン",
                  price: "28,000円",
                  description: "1回あたり7,000円",
                },
                {
                  planName: "月8回プラン",
                  price: "52,000円",
                  description: "しっかり身体を整えたい方へ",
                },
              ]
          ).map((item) => {
            const isPopular = item.planName.includes("月4");

            return (
            <div
              key={item.planName}
              className={
                isPopular
                  ? "relative order-first rounded-[28px] border border-[#E89A3D]/40 bg-white p-8 shadow-[0_24px_60px_rgba(23,35,59,0.12)] md:order-none md:scale-105 md:p-10"
                  : "rounded-[28px] border border-[#D8EAC7] bg-white/80 p-7 shadow-sm md:p-8"
              }
            >
              {isPopular && (
                <p className="mx-auto mb-4 inline-flex rounded-full bg-[#E89A3D] px-4 py-2 text-xs font-bold tracking-[0.14em] text-white">
                  人気No.1
                </p>
              )}

              <p className="mb-3 font-bold text-[#545454]">
                {item.planName}
              </p>

              <p
                className={
                  isPopular
                    ? "mb-4 text-5xl font-extrabold leading-tight text-[#545454] md:text-6xl"
                    : "mb-4 text-3xl font-bold leading-tight text-[#545454]"
                }
              >
                {item.price}
              </p>

              <p className="text-sm leading-relaxed text-[#545454] md:text-base">
                {item.description}
              </p>
            </div>
          );
          })}
        </div>
      </section>

      {/* 10 お客様の声 */}
      <section className="bg-white px-6 py-20">
        {sessionImages.length > 0 && (
          <div className="mx-auto mb-14 max-w-6xl overflow-hidden">
            <div className="mb-8 text-center">
              <p className="mb-3 text-xs font-bold tracking-[0.35em] text-[#E89A3D]">
                STUDIO ONCE
              </p>

              <h2 className="text-2xl font-bold leading-snug text-[#545454] md:text-3xl">
                初めての方でも安心。
                <br />
                マンツーマンレッスンの様子
              </h2>
            </div>

            <div className="relative -mx-6 overflow-hidden py-2">
              <div className="session-slider-track flex gap-5 px-6 md:gap-6">
                {[...sessionImages, ...sessionImages].map(
                  (item, index) => (
                    <Image
                      key={`${item.id}-${index}`}
                      src={item.imageUrl}
                      alt={item.title || "セッション風景"}
                      width={360}
                      height={288}
                      sizes="(min-width: 768px) 360px, 260px"
                      unoptimized
                      className="h-64 w-[260px] shrink-0 rounded-[28px] object-cover shadow-md md:h-72 md:w-[360px]"
                    />
                  )
                )}
              </div>
            </div>
          </div>
        )}

        <h2 className="mx-auto mb-8 max-w-3xl text-center text-2xl font-bold leading-snug md:text-3xl">
          お客様の声
        </h2>

        <ImageBox
          label="お客様の声"
          image={reviews[0]?.imageUrl || "/images/review.jpg"}
        />

        <div className="-mx-6 flex snap-x gap-4 overflow-x-auto px-6 pb-4 md:mx-auto md:grid md:max-w-5xl md:grid-cols-3 md:overflow-visible md:px-0 md:pb-0">

          {(reviews.length > 0
            ? reviews
            : [
                {
                  name: "",
                  comment: "肩こりがかなり楽になりました",
                  age: "",
                },
                {
                  name: "",
                  comment: "姿勢が綺麗になったと言われます",
                  age: "",
                },
                {
                  name: "",
                  comment: "運動初心者でも安心でした",
                  age: "",
                },
              ]
          ).map((item, index) => (
            <div
              key={`${item.comment}-${index}`}
              className="flex h-72 w-[280px] shrink-0 snap-center flex-col rounded-[28px] border border-[#D8EAC7] bg-[#fffdf8] p-6 shadow-sm md:w-auto"
            >
              <p className="mb-4 tracking-[0.12em] text-[#E89A3D]">
                ★★★★★
              </p>

              {(item.name || item.age) && (
                <p className="mb-4 text-sm font-bold text-[#545454]">
                  {item.name}
                  {item.name && item.age ? " / " : ""}
                  {item.age}
                </p>
              )}

              <p className="line-clamp-5 leading-8 text-[#545454]">
                “{item.comment}”
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* 11 店舗住所 */}
      <section id="access" className="scroll-mt-24 px-6 py-20">

        <h2 className="mx-auto mb-8 max-w-3xl text-center text-2xl font-bold leading-snug md:text-3xl">
          店舗アクセス
        </h2>

        <ImageBox
          label="店舗住所"
          image={stores[0]?.imageUrl || "/images/access.jpg"}
        />

        <div className="mx-auto max-w-4xl space-y-6">

          {(stores.length > 0
            ? stores
            : [
                {
                  name: "江戸川橋・神楽坂店",
                  address: "東京都新宿区〇〇〇〇",
                  hours: "江戸川橋駅 徒歩3分",
                  lineUrl: "",
                },
                {
                  name: "川崎店",
                  address: "神奈川県川崎市〇〇〇〇",
                  hours: "川崎駅 徒歩5分",
                  lineUrl: "",
                },
              ]
          ).map((item) => (
            <div
              key={item.name}
              className="rounded-3xl border border-gray-200 p-6"
            >
              <h3 className="mb-2 text-2xl font-bold">
                {item.name}
              </h3>

              <p className="mb-2 text-[#545454]">
                {item.address}
              </p>

              <p className="text-sm text-[#545454]">
                {item.hours}
              </p>

              {item.lineUrl && (
                <a
                  href={item.lineUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="gtm-line-click mt-4 inline-block text-sm font-bold text-[#6C8F5D]"
                >
                  LINEで予約する
                </a>
              )}
            </div>
          ))}

        </div>
      </section>

      {/* 12 体験の流れ */}
      <section className="bg-[#f8f5ef] px-6 py-20">

        <h2 className="mx-auto mb-8 max-w-3xl text-center text-2xl font-bold leading-snug md:text-3xl">
          体験の流れ
        </h2>

        <ImageBox
          label="体験の流れ"
          image={flow[0]?.imageUrl || "/images/flow.jpg"}
        />

        <div className="mx-auto max-w-3xl space-y-4">

          {(flow.length > 0
            ? flow
            : [
                {
                  title: "LINEから体験予約",
                  description: "",
                },
                {
                  title: "ご来店・カウンセリング",
                  description: "",
                },
                {
                  title: "マシンピラティス体験",
                  description: "",
                },
                {
                  title: "最適な通い方をご提案",
                  description: "",
                },
              ]
          ).map((item, index) => (
            <div
              key={`${item.title}-${index}`}
              className="rounded-3xl bg-white p-6 shadow-sm"
            >
              <span className="mr-3 font-bold text-[#6C8F5D]">
                STEP {index + 1}
              </span>

              {item.title}

              {item.description && (
                <p className="mt-3 leading-8 text-[#545454]">
                  {item.description}
                </p>
              )}
            </div>
          ))}

        </div>
      </section>

      {/* 13 FAQ */}
      <section id="faq" className="scroll-mt-24 bg-white px-6 py-20">

        <h2 className="mx-auto mb-8 max-w-3xl text-center text-2xl font-bold leading-snug md:text-3xl">
          よくある質問
        </h2>

        <ImageBox
          label="FAQ"
          image={faqs[0]?.imageUrl || "/images/faq.jpg"}
        />

        <div className="mx-auto max-w-4xl space-y-4">

          {(faqs.length > 0
            ? faqs
            : [
                {
                  question: "運動初心者でも大丈夫ですか？",
                  answer: "はい。初心者の方でも安心して通えるようサポートします。",
                },
                {
                  question: "持ち物は必要ですか？",
                  answer: "動きやすい服装でお越しください。",
                },
                {
                  question: "体験だけでも可能ですか？",
                  answer: "もちろん可能です。お気軽にご予約ください。",
                },
              ]
          ).map((item) => (
            <div
              key={item.question}
              className="rounded-3xl bg-[#fffdf8] p-6"
            >
              <p className="mb-3 text-lg font-bold">
                Q. {item.question}
              </p>

              <p className="leading-8 text-[#545454]">
                A. {item.answer}
              </p>
            </div>
          ))}

        </div>
      </section>

      {/* 14 最終CTA */}
      <section id="final-cta" className="scroll-mt-24 bg-[#D7EAC6] px-6 py-24 text-center">

        <ImageBox
          label="最終CTA"
          image={finalCTAData.imageUrl}
        />

        <h2 className="mx-auto mb-6 max-w-3xl text-3xl font-bold leading-snug md:text-4xl">
          {finalCTAData.title}
        </h2>

        <p className="mb-10 whitespace-pre-line text-base leading-relaxed text-[#545454] md:text-lg md:leading-8">
          {finalCTAData.text}
        </p>

        {finalCTAData.isVisible && (
  <div className="relative inline-block">
    <p className="mb-3 text-sm font-bold text-[#E89A3D] md:text-base">
      {primaryCtaLead}
    </p>
    <a
      href={finalCTAData.buttonUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="gtm-cta-click inline-block whitespace-nowrap rounded-full bg-[#E89A3D] px-8 py-5 text-base font-bold text-white shadow-md md:px-10 md:text-lg"
    >
      {primaryCtaLabel}
    </a>

    <div className="absolute -bottom-9 -right-5 rounded-full bg-white px-3 py-1 text-sm font-bold text-[#E89A3D] shadow-sm animate-bounce">
      👆 タップ
    </div>
  </div>
)}
      </section>

      <a
        href={heroCampaign.ctaUrl || hero.buttonUrl || cta.url}
        target="_blank"
        rel="noopener noreferrer"
        className="line-click fixed bottom-6 right-4 z-50 flex h-[60px] w-[160px] items-center justify-center rounded-full border-2 border-white bg-[#E89A3D] text-center text-sm font-bold text-white shadow-xl transition active:scale-95 hover:scale-95 md:text-base"
      >
        <span className="rounded-full bg-[#06C755] px-4 py-2 text-white shadow-sm">
          LINEで予約 →
        </span>
      </a>

    </main>
  );
}
