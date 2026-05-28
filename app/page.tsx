import { existsSync } from "fs";
import { join } from "path";
import { getAbout, getCTA, getCampaigns, getFaqs, getFinalCTA, getFlow, getHero, getLessons, getNavItems, getPrices, getReasons, getReviews, getRisks, getServices, getStores, getWorries } from "@/app/lib/notion";

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

export default async function Home() {

const cta = await getCTA();
const hero = await getHero();
const about = await getAbout();
const navItems = await getNavItems();
const worries = await getWorries();
const risks = await getRisks();
const services = await getServices();
const reasons = await getReasons();
const lessons = await getLessons();
const prices = await getPrices();
const campaigns = await getCampaigns();
const reviews = await getReviews();
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
};
    
  return (
    <main className="bg-[#fffdf8] text-gray-900">
      <nav className="sticky top-0 z-50 border-b border-[#D8EAC7] bg-[#fffdf8]/95 px-4 py-2 backdrop-blur md:py-3">
        <div className="mx-auto hidden max-w-6xl items-center gap-2 overflow-x-auto whitespace-nowrap text-sm font-bold text-gray-700 md:flex">
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
              className="text-sm font-bold tracking-[0.18em] text-[#E89A3D]"
            >
              ONCE
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
                        : "block rounded-full px-4 py-3 text-sm font-bold text-gray-700 hover:bg-[#D8EAC7]"
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
<section className="relative overflow-hidden bg-[#fffdf8] px-6 py-20 md:py-28">
  <div className="mx-auto grid max-w-6xl items-center gap-12 md:grid-cols-2">

    {/* 左側テキスト */}
    <div className="text-center md:text-left">
      <p className="mb-5 text-sm font-bold tracking-[0.3em] text-[#E89A3D]">
  {hero.topText}
</p>

      <h1 className="mb-6 text-4xl font-bold leading-tight tracking-wide text-gray-800 md:text-6xl whitespace-pre-line">
  {hero.title}
</h1>

     <p className="mb-8 text-base leading-8 text-gray-600 md:text-lg whitespace-pre-line">
  {hero.subtitle}
</p>
<div className="mb-8 flex flex-wrap justify-center gap-3 md:justify-start">
      <span className="rounded-full bg-[#D8EAC7] px-4 py-2 text-sm font-bold text-gray-700">
  {hero.tag1}
</span>
        <span className="rounded-full bg-[#D8EAC7] px-4 py-2 text-sm font-bold text-gray-700">
          {hero.tag2}
        </span>
        <span className="rounded-full bg-[#D8EAC7] px-4 py-2 text-sm font-bold text-gray-700">
          {hero.tag3}
        </span>
      </div>

      {cta.isVisible && (
  <a
    href={cta.url}
    target="_blank"
    rel="noopener noreferrer"
    className="inline-block rounded-full bg-[#E89A3D] px-10 py-4 font-bold text-white shadow-md"
  >
    {hero.buttonText}
  </a>
)}
    </div>

    {/* 右側画像 */}
    <div className="relative">
      <div className="absolute -right-6 -top-6 h-40 w-40 rounded-full bg-[#D8EAC7] opacity-70" />
      <div className="absolute -bottom-6 -left-6 h-32 w-32 rounded-full bg-[#F6C58A] opacity-70" />

      <ImageBox
        label="Hero"
        image="/images/hero.jpg"
      />
    </div>

  </div>
</section>

      {/* 2 スタジオONCEとは */}
      {aboutData.isVisible && (
      <section id="about" className="scroll-mt-24 bg-[#f3f8ed] px-6 py-20">
        <div className="mx-auto max-w-5xl rounded-3xl bg-white p-8 shadow-sm md:p-12">
          <div className="grid gap-8 md:grid-cols-[1.2fr_0.8fr] md:items-center">
            <div>
              <p className="mb-4 text-sm font-bold tracking-[0.25em] text-[#E89A3D]">
                ABOUT ONCE
              </p>

              <h2 className="mb-6 text-3xl font-bold text-gray-800 md:text-4xl">
                {aboutData.title}
              </h2>

              <p className="whitespace-pre-line leading-8 text-gray-600">
                {aboutData.text}
              </p>
            </div>

            <div className="grid gap-3">
              {aboutData.points.map((item) => (
                <div
                  key={item}
                  className="rounded-2xl bg-[#D8EAC7] px-5 py-4 text-center font-bold text-gray-700 shadow-sm"
                >
                  {item}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
      )}

      {/* 3 悩み共感 */}
      <section id="worries" className="scroll-mt-24 px-6 py-20">

        <h2 className="mb-8 text-center text-3xl font-bold">
          こんなお悩みありませんか？
        </h2>

        <ImageBox
          label="悩み共感"
          image="/images/worry.jpg"
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

        <h2 className="mb-8 text-3xl font-bold">
          そのまま放置すると…
        </h2>

        <ImageBox
          label="放置リスク"
          image="/images/risk.jpg"
        />

        <div className="mx-auto max-w-3xl space-y-6 text-lg leading-8 text-gray-700">
          {(risks.length > 0
            ? risks.map((risk) => risk.name)
            : [
                "肩こり・腰痛が慢性化する",
                "姿勢が崩れ疲れやすくなる",
                "代謝が落ち痩せづらくなる",
                "身体を動かすのがさらに億劫になる",
              ]
          ).map((item) => (
            <p key={item}>{item}</p>
          ))}
        </div>
      </section>

      {/* 5 ONCEでできること */}
      <section id="services" className="scroll-mt-24 px-6 py-20">

        <h2 className="mb-8 text-center text-3xl font-bold">
          ONCEでできること
        </h2>

        <ImageBox
          label="できること"
          image="/images/service.jpg"
        />

        <div className="mx-auto grid max-w-5xl gap-6 md:grid-cols-3">
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
          ).map((item) => (
            <div
              key={item}
              className="rounded-3xl bg-white p-8 text-center shadow-sm"
            >
              <p className="text-xl font-bold">
                {item}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* 6 選ばれる理由 */}
      <section id="reasons" className="scroll-mt-24 bg-white px-6 py-20">

        <h2 className="mb-8 text-center text-3xl font-bold">
          選ばれる理由
        </h2>

        <ImageBox
          label="選ばれる理由"
          image="/images/reason.jpg"
        />

        <div className="mx-auto grid max-w-5xl gap-6 md:grid-cols-3">

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
          ).map((item) => (
            <div
              key={item.title}
              className="rounded-3xl bg-[#fffdf8] p-8 shadow-sm"
            >
              <h3 className="mb-4 text-2xl font-bold">
                {item.title}
              </h3>

              <p className="leading-8 text-gray-600">
                {item.text}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* 7 レッスン内容 */}
      <section className="scroll-mt-24 px-6 py-20">

        <h2 className="mb-8 text-center text-3xl font-bold">
          レッスン内容
        </h2>

        <ImageBox
          label="レッスン内容"
          image="/images/lesson.jpg"
        />

        <div className="mx-auto max-w-4xl space-y-6">
          {(lessons.length > 0
            ? lessons.map((lesson) => lesson.name)
            : [
                "姿勢分析",
                "身体評価",
                "マシンピラティス",
                "ストレッチ",
                "セルフケア指導",
              ]
          ).map((item) => (
            <div
              key={item}
              className="rounded-3xl bg-white p-6 shadow-sm"
            >
              {item}
            </div>
          ))}
        </div>
      </section>

      {/* 8 キャンペーン */}
      <section id="campaign" className="scroll-mt-24 px-6 py-20 text-center">

        <ImageBox
          label="キャンペーン"
          image="/images/campaign.jpg"
        />

        <div className="mx-auto max-w-3xl space-y-6">
          {(campaigns.length > 0
            ? campaigns
            : [
                {
                  title: "入会金0円",
                  text: "まずはお気軽に体験予約ください",
                },
              ]
          ).map((item) => (
            <div
              key={item.title}
              className="relative overflow-hidden rounded-3xl bg-[#D8EAC7] p-8 shadow-lg md:p-12"
            >
              <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-[#E89A3D] opacity-20" />
              <div className="absolute -bottom-12 -left-12 h-36 w-36 rounded-full bg-white opacity-40" />

              <p className="relative mx-auto mb-5 inline-block rounded-full bg-[#E89A3D] px-5 py-2 text-sm font-bold tracking-[0.18em] text-white shadow-sm">
                今月限定
              </p>

              <h2 className="relative mb-6 text-4xl font-bold text-gray-800">
                {item.title}
              </h2>

              <p className="relative text-lg leading-8 text-gray-700">
                {item.text}
              </p>

              {cta.isVisible && (
                <a
                  href={cta.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="relative mt-8 inline-block rounded-full bg-[#E89A3D] px-10 py-4 font-bold text-white shadow-md"
                >
                  {cta.text}
                </a>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* 9 料金 */}
      <section id="price" className="scroll-mt-24 bg-[#f8f5ef] px-6 py-20 text-center">

        <h2 className="mb-8 text-3xl font-bold">
          料金
        </h2>

        <ImageBox
          label="料金"
          image="/images/price.jpg"
        />

        <div className="mx-auto max-w-md space-y-6">
          {(prices.length > 0
            ? prices
            : [
                {
                  planName: "月4回プラン",
                  price: "28,000円",
                  description: "1回あたり7,000円",
                },
              ]
          ).map((item) => (
            <div
              key={item.planName}
              className="rounded-3xl bg-white p-10 shadow-md"
            >
              <p className="mb-3 text-gray-500">
                {item.planName}
              </p>

              <p className="mb-4 text-5xl font-bold">
                {item.price}
              </p>

              <p className="text-gray-600">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* 10 お客様の声 */}
      <section className="bg-white px-6 py-20">

        <h2 className="mb-8 text-center text-3xl font-bold">
          お客様の声
        </h2>

        <ImageBox
          label="お客様の声"
          image="/images/review.jpg"
        />

        <div className="mx-auto grid max-w-5xl gap-6 md:grid-cols-3">

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
          ).map((item) => (
            <div
              key={item.comment}
              className="rounded-3xl bg-[#fffdf8] p-8 shadow-sm"
            >
              <p className="leading-8 text-gray-700">
                “{item.comment}”
              </p>

              {(item.name || item.age) && (
                <p className="mt-4 text-sm text-gray-500">
                  {item.name}
                  {item.name && item.age ? " / " : ""}
                  {item.age}
                </p>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* 11 店舗住所 */}
      <section id="access" className="scroll-mt-24 px-6 py-20">

        <h2 className="mb-8 text-center text-3xl font-bold">
          店舗アクセス
        </h2>

        <ImageBox
          label="店舗住所"
          image="/images/access.jpg"
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

              <p className="mb-2 text-gray-600">
                {item.address}
              </p>

              <p className="text-sm text-gray-500">
                {item.hours}
              </p>

              {item.lineUrl && (
                <a
                  href={item.lineUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 inline-block text-sm font-bold text-[#6C8F5D]"
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

        <h2 className="mb-8 text-center text-3xl font-bold">
          体験の流れ
        </h2>

        <ImageBox
          label="体験の流れ"
          image="/images/flow.jpg"
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
              key={item.title}
              className="rounded-3xl bg-white p-6 shadow-sm"
            >
              <span className="mr-3 font-bold text-[#6C8F5D]">
                STEP {index + 1}
              </span>

              {item.title}

              {item.description && (
                <p className="mt-3 leading-8 text-gray-600">
                  {item.description}
                </p>
              )}
            </div>
          ))}

        </div>
      </section>

      {/* 13 FAQ */}
      <section id="faq" className="scroll-mt-24 bg-white px-6 py-20">

        <h2 className="mb-8 text-center text-3xl font-bold">
          よくある質問
        </h2>

        <ImageBox
          label="FAQ"
          image="/images/faq.jpg"
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

              <p className="leading-8 text-gray-600">
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
          image="/images/cta.jpg"
        />

        <h2 className="mb-6 text-4xl font-bold">
          {finalCTAData.title}
        </h2>

        <p className="mb-10 whitespace-pre-line text-lg leading-8 text-gray-700">
          {finalCTAData.text}
        </p>

        {finalCTAData.isVisible && (
  <div className="relative inline-block">
    <a
      href={finalCTAData.buttonUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-block rounded-full bg-[#E89A3D] px-10 py-5 text-lg font-bold text-white shadow-md"
    >
      {finalCTAData.buttonText}
    </a>

    <div className="absolute -bottom-9 -right-5 rounded-full bg-white px-3 py-1 text-sm font-bold text-[#E89A3D] shadow-sm animate-bounce">
      👆 タップ
    </div>
  </div>
)}
      </section>

    </main>
  );
}
