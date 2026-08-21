import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { MENUS_DATA } from '@/data/menus';
import { MenuDetailView } from '@/components/MenuDetailView';

interface PageProps {
  params: Promise<{ id: string }>;
}

export const dynamicParams = false;

export async function generateStaticParams() {
  return MENUS_DATA.map((menu) => ({
    id: menu.id,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id } = await params;
  const menu = MENUS_DATA.find((m) => m.id === id);

  if (!menu) {
    return {
      title: '메뉴를 찾을 수 없습니다',
    };
  }

  const tvPrefix = menu.tvFeature ? `[${menu.tvFeature.showName} 방영] ` : '';
  const title = `${tvPrefix}${menu.name} 황금 레시피 & 로켓프레시 밀키트/재료`;
  const description = `${menu.tvFeature ? `[${menu.tvFeature.showName} 방영] ` : ''}${menu.description} ${menu.cookingTimeMinutes}분 완성 레시피와 로켓프레시 당일/새벽도착 추천 식재료(${menu.ingredients.map((i) => i.name).join(', ')})를 왓잇(Watteat)에서 확인하세요.`;

  return {
    title,
    description,
    keywords: [
      '왓잇',
      'watteat',
      menu.name,
      menu.coupangMealkitKeyword,
      menu.tvFeature ? menu.tvFeature.showName : '',
      '로켓프레시',
      '오늘뭐먹지',
      '간편요리',
      ...menu.tags,
    ].filter(Boolean),
    alternates: {
      canonical: `/menu/${menu.id}`,
    },
    openGraph: {
      type: 'article',
      siteName: '왓잇 (Watteat)',
      title: `${tvPrefix}${menu.name} - 왓잇(Watteat) 레시피 & 상품 주문`,
      description,
      url: `/menu/${menu.id}`,
      images: [
        {
          url: menu.imageUrl,
          width: 800,
          height: 600,
          alt: `${menu.name} - 왓잇(Watteat)`,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [menu.imageUrl],
    },
  };
}

export default async function MenuDetailPage({ params }: PageProps) {
  const { id } = await params;
  const menu = MENUS_DATA.find((m) => m.id === id);

  if (!menu) {
    notFound();
  }

  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://watteat.shop';

  const relatedMenus = MENUS_DATA.filter(
    (m) => m.category === menu.category && m.id !== menu.id
  ).slice(0, 3);

  // Schema.org Recipe JSON-LD 구조화 데이터 (구글/네이버 검색엔진 최적화)
  const recipeJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Recipe',
    name: menu.name,
    image: [menu.imageUrl],
    description: menu.description,
    cookTime: `PT${menu.cookingTimeMinutes}M`,
    recipeCategory: menu.category,
    recipeIngredient: menu.ingredients.map((i) => `${i.name} ${i.amount}`),
    recipeInstructions: menu.simpleRecipe.map((step, idx) => ({
      '@type': 'HowToStep',
      position: idx + 1,
      text: step,
    })),
    keywords: ['왓잇', 'watteat', ...menu.tags].join(','),
  };

  // Schema.org BreadcrumbList (탐색 경로 최적화)
  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: '왓잇 홈',
        item: baseUrl,
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: menu.name,
        item: `${baseUrl}/menu/${menu.id}`,
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(recipeJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <MenuDetailView menu={menu} relatedMenus={relatedMenus} />
    </>
  );
}
