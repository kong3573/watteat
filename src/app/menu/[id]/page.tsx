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
      title: '메뉴를 찾을 수 없습니다 - 오늘 뭐먹지, 내일 뭐먹지',
    };
  }

  const tvPrefix = menu.tvFeature ? `[${menu.tvFeature.showName} 방영] ` : '';
  const title = `${tvPrefix}${menu.name} 레시피 & 쿠팡 밀키트/식재료 - 오늘 뭐먹지`;
  const description = `${menu.tvFeature ? `[${menu.tvFeature.showName} ${menu.tvFeature.broadcastDate} 방영] ` : ''}${menu.description} 필요한 핵심 식재료(${menu.ingredients.map((i) => i.name).join(', ')})와 쿠팡 상품을 즉시 확인하세요. (${menu.cookingTimeMinutes}분 완성)`;

  return {
    title,
    description,
    keywords: `${menu.name}, ${menu.coupangMealkitKeyword}, ${menu.tvFeature ? menu.tvFeature.showName : ''}, 로켓프레시, 오늘뭐먹지, 간편요리, ${menu.tags.join(', ')}`,
    openGraph: {
      title: `${tvPrefix}${menu.name} - 레시피 & 상품 주문`,
      description: menu.description,
      images: [
        {
          url: menu.imageUrl,
          width: 800,
          height: 600,
          alt: menu.name,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description: menu.description,
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

  const relatedMenus = MENUS_DATA.filter(
    (m) => m.category === menu.category && m.id !== menu.id
  ).slice(0, 3);

  // Schema.org Recipe JSON-LD 구조화 데이터 (구글 검색엔진 최적화)
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
    keywords: menu.tags.join(','),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(recipeJsonLd) }}
      />
      <MenuDetailView menu={menu} relatedMenus={relatedMenus} />
    </>
  );
}
