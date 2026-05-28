type NotionPage = {
  id: string;
  properties?: Record<
    string,
    {
      title?: { plain_text?: string }[];
      rich_text?: { plain_text?: string }[];
      url?: string;
      checkbox?: boolean;
      number?: number;
      files?: {
        file?: { url?: string };
        external?: { url?: string };
      }[];
    }
  >;
};

type NotionListItem = {
  id: string;
  name: string;
  order: number;
  imageUrl: string;
};

type NotionReason = {
  id: string;
  title: string;
  text: string;
  order: number;
  imageUrl: string;
};

type NotionPrice = {
  id: string;
  planName: string;
  price: string;
  description: string;
  order: number;
  imageUrl: string;
};

type NotionCampaign = {
  id: string;
  label: string;
  period: string;
  limitedCount: string;
  title: string;
  text: string;
  admissionOffer: string;
  discountOffer: string;
  planName: string;
  regularPrice: string;
  campaignPrice: string;
  ctaText: string;
  ctaUrl: string;
  order: number;
  imageUrl: string;
};

type NotionReview = {
  id: string;
  name: string;
  comment: string;
  age: string;
  order: number;
  imageUrl: string;
};

type NotionStore = {
  id: string;
  name: string;
  address: string;
  hours: string;
  lineUrl: string;
  order: number;
  imageUrl: string;
};

type NotionFlow = {
  id: string;
  title: string;
  description: string;
  order: number;
  imageUrl: string;
};

type NotionFaq = {
  id: string;
  question: string;
  answer: string;
  order: number;
  imageUrl: string;
};

type NotionFinalCTA = {
  title: string;
  text: string;
  buttonText: string;
  buttonUrl: string;
  isVisible: boolean;
  imageUrl: string;
};

type NotionAbout = {
  title: string;
  text: string;
  points: string[];
  isVisible: boolean;
  imageUrl: string;
};

type NotionNavItem = {
  id: string;
  label: string;
  href: string;
  isHighlighted: boolean;
  order: number;
};

const ctaFallback = {
  text: "体験予約はこちら",
  url: "#",
  isVisible: true,
};

const heroFallback = {
  title: "なりたい姿勢へ。\n私らしく整う場所。",
  subtitle:
    "完全個室マンツーマンのマシンピラティス。\n姿勢・肩こり・ボディラインをあなたに合わせて整えます。",
  topText: "MACHINE PILATES ONCE",
  tag1: "完全個室",
  tag2: "マンツーマン",
  tag3: "1回7,000円〜",
  buttonText: "体験予約はこちら",
  buttonUrl: "#",
  imageUrl: "",
  isVisible: true,
};

function fileUrl(page: NotionPage | undefined, propertyName = "image") {
  const file = page?.properties?.[propertyName]?.files?.[0];

  return file?.file?.url || file?.external?.url || "";
}

const navFallback: NotionNavItem[] = [
  { id: "about", label: "ONCEとは", href: "#about", isHighlighted: false, order: 1 },
  { id: "worries", label: "お悩み", href: "#worries", isHighlighted: false, order: 2 },
  { id: "services", label: "できること", href: "#services", isHighlighted: false, order: 3 },
  { id: "reasons", label: "選ばれる理由", href: "#reasons", isHighlighted: false, order: 4 },
  { id: "price", label: "料金", href: "#price", isHighlighted: false, order: 5 },
  { id: "access", label: "店舗", href: "#access", isHighlighted: false, order: 6 },
  { id: "faq", label: "FAQ", href: "#faq", isHighlighted: false, order: 7 },
  { id: "final-cta", label: "体験予約", href: "#final-cta", isHighlighted: true, order: 8 },
];

export async function getCTA() {
  const databaseId = process.env.NOTION_CTA_DATABASE_ID;
  const token = process.env.NOTION_TOKEN;

  if (!databaseId || !token) {
    return ctaFallback;
  }

  try {
    const response = await fetch(
      `https://api.notion.com/v1/databases/${databaseId}/query`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Notion-Version": "2022-06-28",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({}),
        cache: "no-store",
      }
    );

    if (!response.ok) {
      return ctaFallback;
    }

    const data = await response.json();
    const page = data.results?.[0];

    return {
      text:
        page?.properties?.["ボタン文言"]?.rich_text?.[0]?.plain_text ||
        ctaFallback.text,
      url: page?.properties?.["リンクURL"]?.url || ctaFallback.url,
      isVisible:
        page?.properties?.["表示ON/OFF"]?.checkbox ?? ctaFallback.isVisible,
    };
  } catch {
    return ctaFallback;
  }
}

export async function getHero() {
  const databaseId = process.env.NOTION_HERO_DATABASE_ID;
  const token = process.env.NOTION_TOKEN;

  if (!databaseId || !token) {
    return heroFallback;
  }

  try {
    const response = await fetch(
      `https://api.notion.com/v1/databases/${databaseId}/query`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Notion-Version": "2022-06-28",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({}),
        cache: "no-store",
      }
    );

    if (!response.ok) {
      return heroFallback;
    }

    const data = await response.json();
    const page = data.results?.[0];

    return {
      title:
        page?.properties?.["タイトル"]?.rich_text?.[0]?.plain_text ||
        heroFallback.title,
      subtitle:
        page?.properties?.["サブタイトル"]?.rich_text?.[0]?.plain_text ||
        heroFallback.subtitle,
      topText:
        page?.properties?.["キャッチコピー上"]?.rich_text?.[0]?.plain_text ||
        heroFallback.topText,
      tag1:
        page?.properties?.["タグ1"]?.rich_text?.[0]?.plain_text ||
        heroFallback.tag1,
      tag2:
        page?.properties?.["タグ2"]?.rich_text?.[0]?.plain_text ||
        heroFallback.tag2,
      tag3:
        page?.properties?.["タグ3"]?.rich_text?.[0]?.plain_text ||
        heroFallback.tag3,
      buttonText:
        page?.properties?.["ボタン文言"]?.rich_text?.[0]?.plain_text ||
        heroFallback.buttonText,
      buttonUrl:
        page?.properties?.["ボタンURL"]?.url || heroFallback.buttonUrl,
      imageUrl: fileUrl(page, "image") || heroFallback.imageUrl,
      isVisible:
        page?.properties?.["表示ON/OFF"]?.checkbox ?? heroFallback.isVisible,
    };
  } catch {
    return heroFallback;
  }
}

export async function getWorries(): Promise<NotionListItem[]> {
  const databaseId = process.env.NOTION_WORRIES_DATABASE_ID;
  const token = process.env.NOTION_TOKEN;

  if (!databaseId || !token) {
    return [];
  }

  try {
    const response = await fetch(
      `https://api.notion.com/v1/databases/${databaseId}/query`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Notion-Version": "2022-06-28",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          filter: {
            property: "表示ON/OFF",
            checkbox: {
              equals: true,
            },
          },
          sorts: [
            {
              property: "表示順",
              direction: "ascending",
            },
          ],
        }),
        cache: "no-store",
      }
    );

    const data = await response.json();
    return (
      data.results?.map((page: NotionPage) => ({
        id: page.id,
        name:
          page?.properties?.["悩み名"]?.title?.[0]?.plain_text ||
          "",
        order:
          page?.properties?.["表示順"]?.number || 0,
        imageUrl: fileUrl(page),
      })) || []
    );
  } catch {
    return [];
  }
}

export async function getRisks(): Promise<NotionListItem[]> {
  const databaseId = process.env.NOTION_RISKS_DATABASE_ID;
  const token = process.env.NOTION_TOKEN;

  if (!databaseId || !token) {
    return [];
  }

  try {
    const response = await fetch(
      `https://api.notion.com/v1/databases/${databaseId}/query`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Notion-Version": "2022-06-28",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          filter: {
            property: "表示ON/OFF",
            checkbox: {
              equals: true,
            },
          },
          sorts: [
            {
              property: "表示順",
              direction: "ascending",
            },
          ],
        }),
        cache: "no-store",
      }
    );

    const data = await response.json();

    return (
      data.results?.map((page: NotionPage) => ({
        id: page.id,
        name:
          page?.properties?.["リスク名"]?.title?.[0]?.plain_text ||
          "",
        order:
          page?.properties?.["表示順"]?.number || 0,
        imageUrl: fileUrl(page),
      })) || []
    );
  } catch {
    return [];
  }
}

export async function getServices(): Promise<NotionListItem[]> {
  const databaseId = process.env.NOTION_SERVICES_DATABASE_ID;
  const token = process.env.NOTION_TOKEN;

  if (!databaseId || !token) {
    return [];
  }

  try {
    const response = await fetch(
      `https://api.notion.com/v1/databases/${databaseId}/query`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Notion-Version": "2022-06-28",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          filter: {
            property: "表示ON/OFF",
            checkbox: {
              equals: true,
            },
          },
          sorts: [
            {
              property: "表示順",
              direction: "ascending",
            },
          ],
        }),
        cache: "no-store",
      }
    );

    const data = await response.json();

    return (
      data.results?.map((page: NotionPage) => ({
        id: page.id,
        name:
          page?.properties?.["項目名"]?.title?.[0]?.plain_text ||
          "",
        order:
          page?.properties?.["表示順"]?.number || 0,
        imageUrl: fileUrl(page),
      })) || []
    );
  } catch {
    return [];
  }
}

export async function getReasons(): Promise<NotionReason[]> {
  const databaseId = process.env.NOTION_REASONS_DATABASE_ID;
  const token = process.env.NOTION_TOKEN;

  if (!databaseId || !token) {
    return [];
  }

  try {
    const response = await fetch(
      `https://api.notion.com/v1/databases/${databaseId}/query`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Notion-Version": "2022-06-28",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          filter: {
            property: "表示ON/OFF",
            checkbox: {
              equals: true,
            },
          },
          sorts: [
            {
              property: "表示順",
              direction: "ascending",
            },
          ],
        }),
        cache: "no-store",
      }
    );

    const data = await response.json();

    return (
      data.results?.map((page: NotionPage) => ({
        id: page.id,
        label:
          page?.properties?.["ラベル"]?.rich_text?.[0]?.plain_text ||
          "今月限定",
        period:
          page?.properties?.["期間"]?.rich_text?.[0]?.plain_text ||
          "○月〜○月限定",
        limitedCount:
          page?.properties?.["人数限定"]?.rich_text?.[0]?.plain_text ||
          "先着○名様限定",
        title:
          page?.properties?.["タイトル"]?.title?.[0]?.plain_text ||
          "",
        text:
          page?.properties?.["説明文"]?.rich_text?.[0]?.plain_text ||
          "",
        admissionOffer:
          page?.properties?.["入会金訴求"]?.rich_text?.[0]?.plain_text ||
          "入会金＋体験料",
        discountOffer:
          page?.properties?.["永久割引訴求"]?.rich_text?.[0]?.plain_text ||
          "月会費永久割引",
        planName:
          page?.properties?.["プラン名"]?.rich_text?.[0]?.plain_text ||
          "月4回プラン",
        regularPrice:
          page?.properties?.["通常価格"]?.rich_text?.[0]?.plain_text ||
          "29,700円",
        campaignPrice:
          page?.properties?.["キャンペーン価格"]?.rich_text?.[0]?.plain_text ||
          "28,000円",
        ctaText:
          page?.properties?.["CTA文言"]?.rich_text?.[0]?.plain_text ||
          "",
        ctaUrl:
          page?.properties?.["CTAリンク"]?.url ||
          "",
        order:
          page?.properties?.["表示順"]?.number || 0,
        imageUrl: fileUrl(page),
      })) || []
    );
  } catch {
    return [];
  }
}

export async function getLessons(): Promise<NotionListItem[]> {
  const databaseId = process.env.NOTION_LESSONS_DATABASE_ID;
  const token = process.env.NOTION_TOKEN;

  if (!databaseId || !token) {
    return [];
  }

  try {
    const response = await fetch(
      `https://api.notion.com/v1/databases/${databaseId}/query`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Notion-Version": "2022-06-28",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          filter: {
            property: "表示ON/OFF",
            checkbox: {
              equals: true,
            },
          },
          sorts: [
            {
              property: "表示順",
              direction: "ascending",
            },
          ],
        }),
        cache: "no-store",
      }
    );

    const data = await response.json();

    return (
      data.results?.map((page: NotionPage) => ({
        id: page.id,
        name:
          page?.properties?.["項目名"]?.title?.[0]?.plain_text ||
          "",
        order:
          page?.properties?.["表示順"]?.number || 0,
        imageUrl: fileUrl(page),
      })) || []
    );
  } catch {
    return [];
  }
}

export async function getPrices(): Promise<NotionPrice[]> {
  const databaseId = process.env.NOTION_PRICES_DATABASE_ID;
  const token = process.env.NOTION_TOKEN;

  if (!databaseId || !token) {
    return [];
  }

  try {
    const response = await fetch(
      `https://api.notion.com/v1/databases/${databaseId}/query`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Notion-Version": "2022-06-28",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          filter: {
            property: "表示ON/OFF",
            checkbox: {
              equals: true,
            },
          },
          sorts: [
            {
              property: "表示順",
              direction: "ascending",
            },
          ],
        }),
        cache: "no-store",
      }
    );

    const data = await response.json();

    return (
      data.results?.map((page: NotionPage) => ({
        id: page.id,
        planName:
          page?.properties?.["プラン名"]?.title?.[0]?.plain_text ||
          "",
        price:
          page?.properties?.["料金"]?.rich_text?.[0]?.plain_text ||
          "",
        description:
          page?.properties?.["説明"]?.rich_text?.[0]?.plain_text ||
          "",
        order:
          page?.properties?.["表示順"]?.number || 0,
        imageUrl: fileUrl(page),
      })) || []
    );
  } catch {
    return [];
  }
}

export async function getCampaigns(): Promise<NotionCampaign[]> {
  const databaseId = process.env.NOTION_CAMPAIGNS_DATABASE_ID;
  const token = process.env.NOTION_TOKEN;

  if (!databaseId || !token) {
    return [];
  }

  try {
    const response = await fetch(
      `https://api.notion.com/v1/databases/${databaseId}/query`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Notion-Version": "2022-06-28",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          filter: {
            property: "表示ON/OFF",
            checkbox: {
              equals: true,
            },
          },
          sorts: [
            {
              property: "表示順",
              direction: "ascending",
            },
          ],
        }),
        cache: "no-store",
      }
    );

    const data = await response.json();

    return (
      data.results?.map((page: NotionPage) => ({
        id: page.id,
        title:
          page?.properties?.["タイトル"]?.title?.[0]?.plain_text ||
          "",
        text:
          page?.properties?.["説明文"]?.rich_text?.[0]?.plain_text ||
          "",
        order:
          page?.properties?.["表示順"]?.number || 0,
        imageUrl: fileUrl(page),
      })) || []
    );
  } catch {
    return [];
  }
}

export async function getReviews(): Promise<NotionReview[]> {
  const databaseId = process.env.NOTION_REVIEWS_DATABASE_ID;
  const token = process.env.NOTION_TOKEN;

  if (!databaseId || !token) {
    return [];
  }

  try {
    const response = await fetch(
      `https://api.notion.com/v1/databases/${databaseId}/query`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Notion-Version": "2022-06-28",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          filter: {
            property: "表示ON/OFF",
            checkbox: {
              equals: true,
            },
          },
          sorts: [
            {
              property: "表示順",
              direction: "ascending",
            },
          ],
        }),
        cache: "no-store",
      }
    );

    const data = await response.json();

    return (
      data.results?.map((page: NotionPage) => ({
        id: page.id,
        name:
          page?.properties?.["名前"]?.title?.[0]?.plain_text ||
          "",
        comment:
          page?.properties?.["コメント"]?.rich_text?.[0]?.plain_text ||
          "",
        age:
          page?.properties?.["年代"]?.rich_text?.[0]?.plain_text ||
          "",
        order:
          page?.properties?.["表示順"]?.number || 0,
        imageUrl: fileUrl(page),
      })) || []
    );
  } catch {
    return [];
  }
}

export async function getStores(): Promise<NotionStore[]> {
  const databaseId = process.env.NOTION_STORES_DATABASE_ID;
  const token = process.env.NOTION_TOKEN;

  if (!databaseId || !token) {
    return [];
  }

  try {
    const response = await fetch(
      `https://api.notion.com/v1/databases/${databaseId}/query`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Notion-Version": "2022-06-28",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          filter: {
            property: "表示ON/OFF",
            checkbox: {
              equals: true,
            },
          },
          sorts: [
            {
              property: "表示順",
              direction: "ascending",
            },
          ],
        }),
        cache: "no-store",
      }
    );

    const data = await response.json();

    return (
      data.results?.map((page: NotionPage) => ({
        id: page.id,
        name:
          page?.properties?.["店舗名"]?.title?.[0]?.plain_text ||
          "",
        address:
          page?.properties?.["住所"]?.rich_text?.[0]?.plain_text ||
          "",
        hours:
          page?.properties?.["営業時間"]?.rich_text?.[0]?.plain_text ||
          "",
        lineUrl:
          page?.properties?.["LINE_URL"]?.url ||
          "",
        order:
          page?.properties?.["表示順"]?.number || 0,
        imageUrl: fileUrl(page),
      })) || []
    );
  } catch {
    return [];
  }
}

export async function getFlow(): Promise<NotionFlow[]> {
  const databaseId = process.env.NOTION_FLOW_DATABASE_ID;
  const token = process.env.NOTION_TOKEN;

  if (!databaseId || !token) {
    return [];
  }

  try {
    const response = await fetch(
      `https://api.notion.com/v1/databases/${databaseId}/query`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Notion-Version": "2022-06-28",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          filter: {
            property: "表示ON/OFF",
            checkbox: {
              equals: true,
            },
          },
          sorts: [
            {
              property: "表示順",
              direction: "ascending",
            },
          ],
        }),
        cache: "no-store",
      }
    );

    const data = await response.json();

    return (
      data.results?.map((page: NotionPage) => ({
        id: page.id,
        title:
          page?.properties?.["タイトル"]?.title?.[0]?.plain_text ||
          "",
        description:
          page?.properties?.["説明"]?.rich_text?.[0]?.plain_text ||
          "",
        order:
          page?.properties?.["表示順"]?.number || 0,
        imageUrl: fileUrl(page),
      })) || []
    );
  } catch {
    return [];
  }
}

export async function getFaqs(): Promise<NotionFaq[]> {
  const databaseId = process.env.NOTION_FAQ_DATABASE_ID;
  const token = process.env.NOTION_TOKEN;

  if (!databaseId || !token) {
    return [];
  }

  try {
    const response = await fetch(
      `https://api.notion.com/v1/databases/${databaseId}/query`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Notion-Version": "2022-06-28",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          filter: {
            property: "表示ON/OFF",
            checkbox: {
              equals: true,
            },
          },
          sorts: [
            {
              property: "表示順",
              direction: "ascending",
            },
          ],
        }),
        cache: "no-store",
      }
    );

    const data = await response.json();

    return (
      data.results?.map((page: NotionPage) => ({
        id: page.id,
        question:
          page?.properties?.["質問"]?.title?.[0]?.plain_text ||
          "",
        answer:
          page?.properties?.["回答"]?.rich_text?.[0]?.plain_text ||
          "",
        order:
          page?.properties?.["表示順"]?.number || 0,
        imageUrl: fileUrl(page),
      })) || []
    );
  } catch {
    return [];
  }
}

export async function getFinalCTA(): Promise<NotionFinalCTA | null> {
  const databaseId = process.env.NOTION_FINALCTA_DATABASE_ID;
  const token = process.env.NOTION_TOKEN;

  if (!databaseId || !token) {
    return null;
  }

  try {
    const response = await fetch(
      `https://api.notion.com/v1/databases/${databaseId}/query`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Notion-Version": "2022-06-28",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          filter: {
            property: "表示ON/OFF",
            checkbox: {
              equals: true,
            },
          },
        }),
        cache: "no-store",
      }
    );

    const data = await response.json();
    const page: NotionPage | undefined = data.results?.[0];

    if (!page) {
      return null;
    }

    return {
      title:
        page?.properties?.["タイトル"]?.title?.[0]?.plain_text ||
        "まずは体験予約から",
      text:
        page?.properties?.["説明文"]?.rich_text?.[0]?.plain_text ||
        "完全個室マンツーマンで\nあなたに合わせたレッスンをご提供します。",
      buttonText:
        page?.properties?.["ボタン文言"]?.rich_text?.[0]?.plain_text ||
        "体験予約はこちら",
      buttonUrl:
        page?.properties?.["ボタンURL"]?.url ||
        "#",
      isVisible:
        page?.properties?.["表示ON/OFF"]?.checkbox ?? true,
      imageUrl: fileUrl(page),
    };
  } catch {
    return null;
  }
}

export async function getAbout(): Promise<NotionAbout | null> {
  const databaseId = process.env.NOTION_ABOUT_DATABASE_ID;
  const token = process.env.NOTION_TOKEN;

  if (!databaseId || !token) {
    return null;
  }

  try {
    const response = await fetch(
      `https://api.notion.com/v1/databases/${databaseId}/query`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Notion-Version": "2022-06-28",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({}),
        cache: "no-store",
      }
    );

    const data = await response.json();
    const page: NotionPage | undefined = data.results?.[0];

    if (!page) {
      return null;
    }

    return {
      title:
        page?.properties?.["タイトル"]?.title?.[0]?.plain_text ||
        "スタジオONCEとは？",
      text:
        page?.properties?.["本文"]?.rich_text?.[0]?.plain_text ||
        "スタジオONCEは、完全個室マンツーマンのマシンピラティススタジオです。\n一人ひとりの姿勢や身体の悩みに合わせて、無理なく続けられるレッスンをご提案します。",
      points: [
        page?.properties?.["ポイント1"]?.rich_text?.[0]?.plain_text ||
          "完全個室",
        page?.properties?.["ポイント2"]?.rich_text?.[0]?.plain_text ||
          "マンツーマン",
        page?.properties?.["ポイント3"]?.rich_text?.[0]?.plain_text ||
          "初心者でも安心",
      ].filter(Boolean),
      isVisible:
        page?.properties?.["表示ON/OFF"]?.checkbox ?? true,
      imageUrl: fileUrl(page),
    };
  } catch {
    return null;
  }
}

export async function getNavItems(): Promise<NotionNavItem[]> {
  const databaseId = process.env.NOTION_NAV_DATABASE_ID;
  const token = process.env.NOTION_TOKEN;

  if (!databaseId || !token) {
    return navFallback;
  }

  try {
    const response = await fetch(
      `https://api.notion.com/v1/databases/${databaseId}/query`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Notion-Version": "2022-06-28",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          filter: {
            property: "表示ON/OFF",
            checkbox: {
              equals: true,
            },
          },
          sorts: [
            {
              property: "表示順",
              direction: "ascending",
            },
          ],
        }),
        cache: "no-store",
      }
    );

    if (!response.ok) {
      return navFallback;
    }

    const data = await response.json();
    const navItems =
      data.results?.map((page: NotionPage) => {
        const linkId =
          page?.properties?.["リンク先ID"]?.rich_text?.[0]?.plain_text ||
          "";

        return {
          id: page.id,
          label:
            page?.properties?.["メニュー名"]?.title?.[0]?.plain_text ||
            "",
          href: linkId.startsWith("#") ? linkId : `#${linkId}`,
          isHighlighted:
            page?.properties?.["強調表示"]?.checkbox ?? false,
          order:
            page?.properties?.["表示順"]?.number || 0,
        };
      }) || [];

    return navItems.length > 0 ? navItems : navFallback;
  } catch {
    return navFallback;
  }
}
