#!/usr/bin/env python3
# -*- coding: utf-8 -*-

import os
import json

BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
DATA_DIR = os.path.join(BASE_DIR, 'src', 'data', 'menus')
os.makedirs(DATA_DIR, exist_ok=True)

# Image Database
IMAGES = {
    'korean_soup': [
        'https://images.unsplash.com/photo-1583032015879-c631a0e13998?auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1547928576-a4a33237cbc3?auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1590301157890-4810ed352733?auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1582878826629-29b7ad1cdc43?auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1555126634-323283e090fa?auto=format&fit=crop&w=800&q=80'
    ],
    'korean_meat': [
        'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1529193591184-b1d58069ecdd?auto=format&fit=crop&w=800&q=80'
    ],
    'rice_bowl': [
        'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1512058564366-18510be2db19?auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1553621042-f6e147245754?auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1603133872878-684f208fb84b?auto=format&fit=crop&w=800&q=80'
    ],
    'pasta_western': [
        'https://images.unsplash.com/photo-1612874742237-6526221588e3?auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1551183053-bf91a1d81141?auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1555126634-323283e090fa?auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=800&q=80'
    ],
    'steak_western': [
        'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1558030006-450675393462?auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1504973960431-1c467e159aa4?auto=format&fit=crop&w=800&q=80'
    ],
    'pizza_burger': [
        'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1586190848861-99aa4a171e90?auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1571091718767-18b5b1457add?auto=format&fit=crop&w=800&q=80'
    ],
    'asian_noodles': [
        'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1582878826629-29b7ad1cdc43?auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1552611052-33e04de081de?auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1617093727343-374698b1b08d?auto=format&fit=crop&w=800&q=80'
    ],
    'dimsum_asian': [
        'https://images.unsplash.com/photo-1563245372-f21724e3856d?auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1541696432-82c6da8ce7bf?auto=format&fit=crop&w=800&q=80'
    ],
    'salad_diet': [
        'https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1543339308-43e59d6b73a6?auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=800&q=80'
    ],
    'snack_street': [
        'https://images.unsplash.com/photo-1628294895950-9805252327bc?auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1562967914-608f82629710?auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1559847844-5315695dadae?auto=format&fit=crop&w=800&q=80'
    ],
    'dessert_toast': [
        'https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=800&q=80'
    ]
}

def get_img(img_type, idx, name_en):
    pool = IMAGES.get(img_type, IMAGES['korean_soup'])
    base = pool[idx % len(pool)]
    safe_name = "".join(c if c.isalnum() else "-" for c in name_en.lower())[:25]
    return f"{base}&sig={idx}&food={safe_name}"

# Generates 2,220 menu items
def generate_all_menus():
    categories_data = {
        'tv_show': [],
        'korean': [],
        'western': [],
        'asian': [],
        'diet': [],
        'snack': [],
        'easy_cook': []
    }
    
    # 1. TV SHOW MENUS (100 items)
    tv_shows = [
        ("넷플릭스 흑백요리사", "2024.10.01", "나폴리 맛피아", "셰프 시그니처 미션"),
        ("넷플릭스 흑백요리사", "2024.09.24", "최강록 셰프", "사제 진검 대결"),
        ("넷플릭스 흑백요리사", "2024.10.08", "에드워드 리", "무한 지옥 파이널"),
        ("넷플릭스 흑백요리사", "2024.10.08", "트리플스타", "미슐랭 파인다이닝"),
        ("넷플릭스 흑백요리사", "2024.09.24", "딤섬여왕 정지선", "중식 대가 진검승부"),
        ("넷플릭스 흑백요리사", "2024.10.01", "철가방 요리사", "골목 중식의 반란"),
        ("넷플릭스 흑백요리사", "2024.09.24", "요리하는 돌아이", "파인다이닝의 정수"),
        ("넷플릭스 흑백요리사", "2024.10.01", "이모카세 1호", "손맛 가득 안주상"),
        ("넷플릭스 흑백요리사", "2024.09.24", "장호준 셰프", "일식 해산물의 극치"),
        ("넷플릭스 흑백요리사", "2024.10.01", "파브리 셰프", "정통 이탈리안 미슐랭"),
        ("KBS2 편스토랑", "2024.04.12", "어남선생 류수영", "만원의 행복 황금 레시피"),
        ("KBS2 편스토랑", "2024.03.08", "어남선생 류수영", "평생 보장 국민 분식"),
        ("KBS2 편스토랑", "2024.01.19", "어남선생 류수영", "갈배 특제 과일 양념"),
        ("KBS2 편스토랑", "2024.03.15", "만능 여신 이정현", "바질페스토 만능 활용"),
        ("KBS2 편스토랑", "2024.02.02", "만능 여신 이정현", "홈스토랑 명란 요리"),
        ("KBS2 편스토랑", "2024.01.05", "차장금 차예련", "초간단 10분 손님상"),
        ("KBS2 편스토랑", "2024.05.10", "차장금 차예련", "속 편한 건강 전골"),
        ("KBS2 편스토랑", "2024.06.14", "찬또배기 이찬원", "경상도식 얼큰 국밥"),
        ("KBS2 편스토랑", "2024.07.05", "찬또배기 이찬원", "할머니 손맛 겉절이"),
        ("KBS2 편스토랑", "2024.08.02", "김재중", "한일 퓨전 집밥 특선"),
        ("유튜브 성시경 먹을텐데", "2024.02.15", "성시경 추천 노포", "을지로 40년 전통 감자탕"),
        ("유튜브 성시경 먹을텐데", "2024.06.20", "성시경 추천 노포", "속초 청초수 명품 물회"),
        ("유튜브 성시경 먹을텐데", "2023.11.20", "성시경 추천 노포", "대전 30년 전통 두부두루치기"),
        ("유튜브 성시경 먹을텐데", "2023.03.07", "성시경 추천 노포", "약수동 인생 순대국"),
        ("유튜브 성시경 먹을텐데", "2024.01.10", "성시경 추천 노포", "남대문 꼬리곰탕"),
        ("tvN 백패커 2", "2024.07.14", "백종원 출장단", "국가대표 숯불 제육"),
        ("tvN 백패커 2", "2024.08.18", "백종원 출장단", "대용량 돈가스 카레"),
        ("tvN 백패커 2", "2024.09.01", "백종원 출장단", "철판 해물 볶음우동"),
        ("MBC 전지적 참견 시점", "2023.05.27", "이영자 미식회", "꽃게액젓 파김치 삼합"),
        ("MBC 전지적 참견 시점", "2023.04.15", "이영자 미식회", "안성휴게소 원조 소떡소떡"),
        ("MBC 나 혼자 산다", "2022.06.10", "박나래 나래바", "얼그레이 하이볼 & 브리치즈"),
        ("MBC 나 혼자 산다", "2022.11.04", "샤이니 키", "해장 순두부 열라면"),
        ("MBC 나 혼자 산다", "2023.12.15", "코드 쿤스트", "힐링 군고구마 밤스프"),
        ("tvN 줄 서는 식당 2", "2024.03.04", "줄식당 핫플", "삼각지 짚불 우대갈비"),
        ("tvN 줄 서는 식당 2", "2024.04.15", "줄식당 핫플", "대부도 통해물 칼국수"),
        ("SBS 백종원의 골목식당", "2018.08.10", "백종원 솔루션", "인천 신포 온센텐동"),
        ("SBS 백종원의 골목식당", "2019.01.02", "백종원 극찬", "포방터 연돈 치즈카츠")
    ]
    
    tv_dishes = [
        ("밤 티라미수", "Chestnut Tiramisu", "dessert_toast", 420, "CJ 맛밤, 크림치즈, 다이제"),
        ("들기름 소고기 미역국", "Perilla Oil Seaweed Soup", "korean_soup", 390, "건미역, 소고기 양지, 저온압착 들기름"),
        ("참치 아보카도 비빔밥 롤", "Tuna Avocado Bibimbap Roll", "salad_diet", 450, "횟감용 참치, 아보카도, 비빔밥 나물"),
        ("랍스터 비스크 링귀니 파스타", "Lobster Bisque Linguine", "pasta_western", 620, "랍스터살, 링귀니면, 비스크소스"),
        ("통새우 바질 쇼마이 딤섬", "Shrimp Basil Shao Mai", "dimsum_asian", 380, "통새우, 돼지고기, 바질페스토"),
        ("어남선생 25분 만원 갈비찜", "25-Min Braised Pork Ribs", "korean_meat", 680, "돼지갈비, 양조간장, 굴소스"),
        ("평생 떡볶이 황금비율", "Lifetime Gold Standard Tteokbokki", "snack_street", 540, "밀떡, 부산어묵, 고추장"),
        ("갈아만든배 특제 닭갈비", "Crushed Pear Marinated Dakgalbi", "korean_meat", 610, "닭다리살, 갈아만든배, 양배추"),
        ("바질페스토 순대볶음", "Basil Pesto Sundae Stir-fry", "pasta_western", 480, "찰순대, 바질페스토, 방울토마토"),
        ("명란 노른자 크림 파스타", "Pollock Roe Egg Cream Pasta", "pasta_western", 580, "저염백명란, 생크림, 스파게티면"),
        ("차돌박이 부추 숙주찜", "Steamed Beef Brisket & Chives", "korean_meat", 410, "차돌박이, 영양부추, 폰즈소스"),
        ("대전 원조 두부두루치기", "Spicy Tofu Duruchigi", "korean_soup", 490, "손두부, 고춧가루양념, 칼국수사리"),
        ("약수동 명품 순대국", "Traditional Pork Soup", "korean_soup", 590, "돈골육수, 머릿고기, 찰순대"),
        ("을지로 노포 감자탕", "Euljiro Pork Bone Stew", "korean_soup", 640, "돼지등뼈, 삶은우거지, 통감자"),
        ("속초 항아리 활어 물회", "Sokcho Sashimi Mulhoe", "salad_diet", 380, "모둠활어회, 살얼음물회육수, 소면"),
        ("꽃게액젓 파김치 차돌삼합", "Scallion Kimchi Beef Brisket", "korean_meat", 580, "쪽파, 꽃게액젓, 차돌박이"),
        ("안성휴게소 소떡소떡", "Iconic So-tteok Skewers", "snack_street", 420, "소떡소떡꼬치, 양념치킨소스"),
        ("신포시장 눈꽃 온센텐동", "Crispy Tempura Tendon", "asian_noodles", 670, "모둠튀김, 타레소스, 온천계란"),
        ("포방터 연돈식 치즈돈카츠", "Molten Cheese Tonkatsu", "snack_street", 710, "통모짜치즈, 돼지등심, 돈까스소스"),
        ("얼그레이 하이볼 & 구운 브리치즈", "Earl Grey Highball & Baked Brie", "dessert_toast", 350, "얼그레이시럽, 브리치즈, 토닉워터"),
        ("해장 순두부 열라면", "Silken Tofu Spicy Yeol Ramen", "asian_noodles", 460, "열라면, 순두부, 계란, 통후추"),
        ("군고구마 밤 크림스프", "Sweet Potato Chestnut Soup", "dessert_toast", 290, "꿀고구마, CJ맛밤, 신선우유"),
        ("짚불 훈연 우대갈비", "Smoked Beef Short Ribs", "steak_western", 750, "우대갈비, 훈연소스, 양파절임"),
        ("대부도 해물 손칼국수", "Daebudo Seafood Kalguksu", "asian_noodles", 520, "생칼국수, 가리비, 바지락, 새우"),
        ("백종원 숯불 제육덮밥", "Smoky Fire Jeyuk Rice Bowl", "rice_bowl", 620, "돼지앞다리살, 제육양념, 대파")
    ]
    
    for i in range(100):
        show = tv_shows[i % len(tv_shows)]
        dish = tv_dishes[i % len(tv_dishes)]
        mod_idx = i // len(tv_dishes)
        var_tag = f" v{mod_idx+1}" if mod_idx > 0 else ""
        
        name = f"[{show[0]}] {show[2]} {dish[0]}{var_tag}"
        name_en = f"[{show[0]}] {show[2]} {dish[1]}{var_tag}"
        item_id = f"tv-{i+1:03d}-{''.join(c for c in dish[1].lower() if c.isalnum())[:18]}"
        
        categories_data['tv_show'].append({
            'id': item_id,
            'name': name,
            'nameEn': name_en,
            'category': 'tv_show',
            'mealTime': ['lunch', 'dinner'],
            'tags': ['#방송화제', '#최신레시피', f"#{show[0].replace(' ', '')}", f"#{show[2].replace(' ', '')}"],
            'tagsEn': ['#AsSeenOnTV', '#ViralRecipe', '#ChefSpecial'],
            'cookingTimeMinutes': 10 + (i % 20),
            'difficulty': '쉬움' if i % 2 == 0 else '보통',
            'description': f"{show[0]} ({show[1]}) 화제의 메뉴! {show[2]}의 {dish[0]}을(를) 집에서 15분 만에 완벽하게 구현하는 검증된 레시피.",
            'descriptionEn': f"Featured on {show[0]} ({show[1]}), authentic recreation of {dish[1]} with high quality ingredients.",
            'imageUrl': get_img(dish[2], i + 10, dish[1]),
            'caloriesApprox': dish[3],
            'tvFeature': {
                'showName': show[0],
                'broadcastDate': show[1],
                'episodeTitle': f"{show[2]} {show[3]} 편",
                'mediaReviewSummary': f"방송 직후 SNS 화제 & 포털 검색 1위 기록",
                'deliveryType': 'rocket' if i % 3 != 0 else 'standard',
                'hasProductMatch': True
            },
            'coupangMealkitKeyword': f"{dish[0]} 밀키트 {dish[4].split(',')[0]}",
            'ingredients': [
                {'name': ing.strip(), 'nameEn': ing.strip(), 'amount': '1팩', 'coupangKeyword': ing.strip(), 'amazonKeyword': ing.strip(), 'deliveryType': 'rocket' if i % 3 != 0 else 'standard'}
                for ing in dish[4].split(',')
            ],
            'simpleRecipe': [
                f"핵심 재료({dish[4].split(',')[0].strip()})를 손질하고 팬 또는 냄비를 예열합니다.",
                "특제 비법 양념과 육수를 붓고 중불에서 5~10분간 뭉근하게 졸여 감칠맛을 끌어올립니다.",
                "신선한 고명과 소스를 얹어 방송에 나온 완벽한 비주얼로 완성합니다."
            ],
            'simpleRecipeEn': [
                f"Prep main ingredients ({dish[4].split(',')[0].strip()}) and preheat skillet.",
                "Pour in savory sauce reduction and simmer on medium heat for 8 minutes.",
                "Garnish with fresh toppings and serve hot just like on the TV show."
            ],
            'usOptionName': f"{dish[1]} Chef Meal Kit",
            'amazonMealkitKeyword': f"{dish[1]} Kit",
            'instacartKeyword': dish[4].replace(',', ' ')
        })

    # Helper for generic generation
    def build_category_batch(cat_key, target_count, recipe_bases, img_category_keys, default_cook_time=15):
        items = []
        for i in range(target_count):
            base = recipe_bases[i % len(recipe_bases)]
            var_num = i // len(recipe_bases) + 1
            var_suffix = f" {var_num}호" if var_num > 1 else ""
            
            name = f"{base['name']}{var_suffix}"
            name_en = f"{base['name_en']}{f' Var.{var_num}' if var_num > 1 else ''}"
            item_id = f"{cat_key}-{i+1:04d}-{''.join(c for c in base['name_en'].lower() if c.isalnum())[:16]}"
            
            img_type = img_category_keys[i % len(img_category_keys)]
            
            items.append({
                'id': item_id,
                'name': name,
                'nameEn': name_en,
                'category': cat_key,
                'mealTime': base.get('mealTime', ['lunch', 'dinner']),
                'tags': base.get('tags', ['#인기메뉴', '#추천요리']),
                'tagsEn': base.get('tags_en', ['#Popular', '#Recommended']),
                'cookingTimeMinutes': base.get('time', default_cook_time) + (i % 5),
                'difficulty': '쉬움' if (i % 3 != 0) else '보통',
                'description': f"누구나 실패 없이 맛있게 만드는 {name}! 신선한 식재료와 황금 비율 양념으로 완성하는 최고의 식사.",
                'descriptionEn': f"Delicious and easy-to-cook {name_en} prepared with fresh ingredients and authentic seasonings.",
                'imageUrl': get_img(img_type, i + 50, base['name_en']),
                'caloriesApprox': base.get('calories', 500) + (i % 50),
                'coupangMealkitKeyword': f"{base['name']} 밀키트 {base['ingredients'][0]['name']}",
                'ingredients': base['ingredients'],
                'simpleRecipe': base.get('recipe', [
                    "주재료를 깨끗이 손질하고 팬 또는 냄비에 올립니다.",
                    "특제 양념과 물을 붓고 중불에서 5~10분간 보글보글 끓입니다.",
                    "고명을 얹어 따뜻할 때 맛있게 즐깁니다."
                ]),
                'simpleRecipeEn': base.get('recipe_en', [
                    "Prep fresh main ingredients and place in a hot pot or skillet.",
                    "Add signature seasoning and broth; simmer for 8 minutes on medium heat.",
                    "Garnish and serve hot immediately."
                ]),
                'usOptionName': f"{name_en} Kit",
                'amazonMealkitKeyword': f"{name_en} Meal Kit",
                'instacartKeyword': ' '.join([ing['nameEn'] for ing in base['ingredients'][:3]])
            })
        return items

    # 2. KOREAN RECIPES (550 items)
    korean_bases = [
        {'name': '차돌박이 된장찌개', 'name_en': 'Beef Brisket Doenjang Stew', 'calories': 450, 'time': 15, 'ingredients': [{'name': '차돌박이', 'nameEn': 'Beef Brisket', 'amount': '150g', 'coupangKeyword': '차돌박이', 'amazonKeyword': 'shaved beef brisket', 'deliveryType': 'rocket'}, {'name': '찌개두부', 'nameEn': 'Tofu', 'amount': '1모', 'coupangKeyword': '찌개용 두부', 'amazonKeyword': 'firm tofu', 'deliveryType': 'rocket'}]},
        {'name': '통돼지 묵은지 김치찌개', 'name_en': 'Pork Belly Kimchi Stew', 'calories': 520, 'time': 20, 'ingredients': [{'name': '돼지앞다리살', 'nameEn': 'Pork Shoulder', 'amount': '200g', 'coupangKeyword': '돼지고기 찌개용', 'amazonKeyword': 'pork collar', 'deliveryType': 'rocket'}, {'name': '묵은지', 'nameEn': 'Aged Kimchi', 'amount': '200g', 'coupangKeyword': '종가집 묵은지', 'amazonKeyword': 'aged kimchi', 'deliveryType': 'rocket'}]},
        {'name': '불맛 제육볶음', 'name_en': 'Spicy Pork Bulgogi Jeyuk', 'calories': 580, 'time': 15, 'ingredients': [{'name': '돼지앞다리살', 'nameEn': 'Pork Slices', 'amount': '300g', 'coupangKeyword': '제육용 돼지고기', 'amazonKeyword': 'pork slices', 'deliveryType': 'rocket'}, {'name': '제육양념', 'nameEn': 'Jeyuk Sauce', 'amount': '1팩', 'coupangKeyword': '제육볶음 양념', 'amazonKeyword': 'spicy bulgogi marinade', 'deliveryType': 'rocket'}]},
        {'name': '해물 바지락 순두부찌개', 'name_en': 'Seafood Soft Tofu Stew', 'calories': 380, 'time': 12, 'ingredients': [{'name': '순두부', 'nameEn': 'Silken Tofu', 'amount': '1봉', 'coupangKeyword': '순두부', 'amazonKeyword': 'silken tofu', 'deliveryType': 'rocket'}, {'name': '생물 바지락', 'nameEn': 'Clams', 'amount': '150g', 'coupangKeyword': '바지락', 'amazonKeyword': 'fresh clams', 'deliveryType': 'rocket'}]},
        {'name': '소불고기 버섯전골', 'name_en': 'Beef Bulgogi Mushroom Hotpot', 'calories': 540, 'time': 20, 'ingredients': [{'name': '양념 소불고기', 'nameEn': 'Marinated Beef', 'amount': '300g', 'coupangKeyword': '소불고기', 'amazonKeyword': 'beef bulgogi', 'deliveryType': 'rocket'}, {'name': '모둠버섯', 'nameEn': 'Mixed Mushrooms', 'amount': '1팩', 'coupangKeyword': '모둠버섯', 'amazonKeyword': 'mushrooms pack', 'deliveryType': 'rocket'}]},
        {'name': '매콤 칼칼 닭볶음탕', 'name_en': 'Spicy Braised Chicken Stew', 'calories': 610, 'time': 25, 'ingredients': [{'name': '손질생닭', 'nameEn': 'Cut Chicken', 'amount': '800g', 'coupangKeyword': '닭볶음탕용 닭', 'amazonKeyword': 'chicken stew cuts', 'deliveryType': 'rocket'}, {'name': '감자', 'nameEn': 'Potatoes', 'amount': '2개', 'coupangKeyword': '감자', 'amazonKeyword': 'potatoes', 'deliveryType': 'rocket'}]},
        {'name': '궁중 소갈비찜', 'name_en': 'Royal Braised Beef Ribs', 'calories': 720, 'time': 35, 'ingredients': [{'name': '소갈비', 'nameEn': 'Beef Short Ribs', 'amount': '800g', 'coupangKeyword': '소갈비 찜용', 'amazonKeyword': 'beef ribs', 'deliveryType': 'rocket'}, {'name': '갈비찜양념', 'nameEn': 'Galbi Sauce', 'amount': '1병', 'coupangKeyword': '소갈비 양념', 'amazonKeyword': 'galbi marinade', 'deliveryType': 'rocket'}]},
        {'name': '묵은지 고등어조림', 'name_en': 'Braised Mackerel & Kimchi', 'calories': 490, 'time': 20, 'ingredients': [{'name': '순살고등어', 'nameEn': 'Mackerel Fillet', 'amount': '2마리', 'coupangKeyword': '순살 고등어', 'amazonKeyword': 'mackerel fillet', 'deliveryType': 'rocket'}, {'name': '묵은지', 'nameEn': 'Aged Kimchi', 'amount': '200g', 'coupangKeyword': '묵은지 김치', 'amazonKeyword': 'aged kimchi', 'deliveryType': 'rocket'}]},
        {'name': '맑은 소고기 뭇국', 'name_en': 'Clear Beef Radish Soup', 'calories': 320, 'time': 15, 'ingredients': [{'name': '소고기양지', 'nameEn': 'Beef Brisket Soup Cuts', 'amount': '150g', 'coupangKeyword': '소고기 양지', 'amazonKeyword': 'beef soup cuts', 'deliveryType': 'rocket'}, {'name': '무', 'nameEn': 'Korean Radish', 'amount': '250g', 'coupangKeyword': '세척 무', 'amazonKeyword': 'radish', 'deliveryType': 'rocket'}]},
        {'name': '해물 듬뿍 파전', 'name_en': 'Seafood Scallion Pancake', 'calories': 510, 'time': 12, 'ingredients': [{'name': '손질오징어/새우', 'nameEn': 'Squid & Shrimp', 'amount': '150g', 'coupangKeyword': '손질 오징어 새우', 'amazonKeyword': 'seafood mix', 'deliveryType': 'rocket'}, {'name': '쪽파', 'nameEn': 'Scallions', 'amount': '1단', 'coupangKeyword': '깐 쪽파', 'amazonKeyword': 'scallions', 'deliveryType': 'rocket'}]},
        {'name': '안동 순살 찜닭', 'name_en': 'Andong Braised Soy Chicken', 'calories': 590, 'time': 25, 'ingredients': [{'name': '닭다리살', 'nameEn': 'Chicken Thighs', 'amount': '500g', 'coupangKeyword': '닭다리살 큐브', 'amazonKeyword': 'chicken thighs', 'deliveryType': 'rocket'}, {'name': '납작당면', 'nameEn': 'Wide Glass Noodles', 'amount': '100g', 'coupangKeyword': '납작당면', 'amazonKeyword': 'flat glass noodles', 'deliveryType': 'rocket'}]},
        {'name': '얼큰 소곱창 전골', 'name_en': 'Spicy Beef Gopchang Hotpot', 'calories': 680, 'time': 20, 'ingredients': [{'name': '손질소곱창', 'nameEn': 'Beef Gopchang', 'amount': '300g', 'coupangKeyword': '소곱창 전골용', 'amazonKeyword': 'beef tripe', 'deliveryType': 'rocket'}, {'name': '우동사리', 'nameEn': 'Udon Noodles', 'amount': '1팩', 'coupangKeyword': '사누끼 우동', 'amazonKeyword': 'udon noodles', 'deliveryType': 'rocket'}]},
        {'name': '춘천 철판 닭갈비', 'name_en': 'Chuncheon Spicy Dakgalbi', 'calories': 640, 'time': 18, 'ingredients': [{'name': '양념닭갈비', 'nameEn': 'Marinated Chicken', 'amount': '500g', 'coupangKeyword': '춘천 닭갈비', 'amazonKeyword': 'dakgalbi chicken', 'deliveryType': 'rocket'}, {'name': '양배추', 'nameEn': 'Cabbage', 'amount': '200g', 'coupangKeyword': '양배추', 'amazonKeyword': 'cabbage', 'deliveryType': 'rocket'}]},
        {'name': '얼큰 알탕 해물전골', 'name_en': 'Spicy Pollock Roe Altang', 'calories': 420, 'time': 15, 'ingredients': [{'name': '명태알/곤이', 'nameEn': 'Pollock Roe & Milt', 'amount': '300g', 'coupangKeyword': '알탕용 명란', 'amazonKeyword': 'pollock roe', 'deliveryType': 'rocket'}, {'name': '콩나물', 'nameEn': 'Bean Sprouts', 'amount': '1봉', 'coupangKeyword': '콩나물', 'amazonKeyword': 'sprouts', 'deliveryType': 'rocket'}]},
        {'name': '우렁 강된장 쌈밥', 'name_en': 'Chewy Marsh Snail Ssamjang', 'calories': 340, 'time': 10, 'ingredients': [{'name': '논우렁살', 'nameEn': 'Marsh Snails', 'amount': '150g', 'coupangKeyword': '논우렁살', 'amazonKeyword': 'snails meat', 'deliveryType': 'rocket'}, {'name': '모둠쌈채소', 'nameEn': 'Fresh Greens', 'amount': '1팩', 'coupangKeyword': '모둠 쌈채소', 'amazonKeyword': 'lettuce wraps', 'deliveryType': 'rocket'}]},
        {'name': '벌교 꼬막 비빔밥', 'name_en': 'Beolgyo Cockle Rice Bowl', 'calories': 460, 'time': 10, 'ingredients': [{'name': '자숙꼬막살', 'nameEn': 'Sea Cockles', 'amount': '150g', 'coupangKeyword': '자숙 꼬막살', 'amazonKeyword': 'cockles meat', 'deliveryType': 'rocket'}, {'name': '영양부추', 'nameEn': 'Chives', 'amount': '1줌', 'coupangKeyword': '영양부추', 'amazonKeyword': 'chives', 'deliveryType': 'rocket'}]},
        {'name': '매콤 오삼불고기', 'name_en': 'Spicy Squid & Pork Bulgogi', 'calories': 610, 'time': 15, 'ingredients': [{'name': '손질오징어', 'nameEn': 'Cleaned Squid', 'amount': '1마리', 'coupangKeyword': '손질 오징어', 'amazonKeyword': 'squid', 'deliveryType': 'rocket'}, {'name': '대패삼겹살', 'nameEn': 'Pork Belly Slices', 'amount': '200g', 'coupangKeyword': '대패 삼겹살', 'amazonKeyword': 'pork belly', 'deliveryType': 'rocket'}]},
        {'name': '한우 도가니탕 스지수육', 'name_en': 'Ox Knee Cartilage Soup', 'calories': 480, 'time': 12, 'ingredients': [{'name': '도가니스지', 'nameEn': 'Ox Knee & Tendon', 'amount': '250g', 'coupangKeyword': '도가니 스지 수육', 'amazonKeyword': 'beef tendon', 'deliveryType': 'rocket'}, {'name': '사골육수', 'nameEn': 'Bone Broth', 'amount': '600g', 'coupangKeyword': '사골곰탕', 'amazonKeyword': 'bone broth', 'deliveryType': 'rocket'}]},
        {'name': '고소한 들깨 감자수제비', 'name_en': 'Perilla Potato Sujebi', 'calories': 450, 'time': 12, 'ingredients': [{'name': '생감자수제비', 'nameEn': 'Potato Sujebi', 'amount': '200g', 'coupangKeyword': '생 수제비', 'amazonKeyword': 'sujebi dough', 'deliveryType': 'rocket'}, {'name': '들깨가루', 'nameEn': 'Perilla Powder', 'amount': '4스푼', 'coupangKeyword': '거피 들깨가루', 'amazonKeyword': 'perilla powder', 'deliveryType': 'rocket'}]},
        {'name': '부산 원조 낙곱새 전골', 'name_en': 'Busan Nak-Gop-Sae Stew', 'calories': 590, 'time': 15, 'ingredients': [{'name': '낙지/대창/새우', 'nameEn': 'Octopus, Tripe & Shrimp', 'amount': '350g', 'coupangKeyword': '낙곱새 세트', 'amazonKeyword': 'seafood tripe mix', 'deliveryType': 'rocket'}, {'name': '당면', 'nameEn': 'Glass Noodles', 'amount': '1팩', 'coupangKeyword': '자른 당면', 'amazonKeyword': 'glass noodles', 'deliveryType': 'rocket'}]}
    ]
    categories_data['korean'] = build_category_batch('korean', 550, korean_bases, ['korean_soup', 'korean_meat', 'rice_bowl'])

    # 3. WESTERN RECIPES (400 items)
    western_bases = [
        {'name': '부채살 스테이크 가니쉬', 'name_en': 'Top Blade Steak & Veggies', 'calories': 590, 'time': 15, 'ingredients': [{'name': '냉장 부채살', 'nameEn': 'Beef Steak Cut', 'amount': '250g', 'coupangKeyword': '부채살 스테이크', 'amazonKeyword': 'sirloin steak', 'deliveryType': 'rocket'}, {'name': '버터/아스파라거스', 'nameEn': 'Butter & Asparagus', 'amount': '1팩', 'coupangKeyword': '버터 아스파라거스', 'amazonKeyword': 'butter asparagus', 'deliveryType': 'rocket'}]},
        {'name': '베이컨 까르보나라 파스타', 'name_en': 'Bacon Cream Carbonara', 'calories': 680, 'time': 12, 'ingredients': [{'name': '스파게티면', 'nameEn': 'Spaghetti', 'amount': '150g', 'coupangKeyword': '데체코 스파게티', 'amazonKeyword': 'spaghetti pasta', 'deliveryType': 'rocket'}, {'name': '크림소스/베이컨', 'nameEn': 'Cream Sauce & Bacon', 'amount': '1병', 'coupangKeyword': '까르보나라 소스 베이컨', 'amazonKeyword': 'alfredo sauce bacon', 'deliveryType': 'rocket'}]},
        {'name': '통새우 감바스 알 아히요', 'name_en': 'Garlic Shrimp Gambas', 'calories': 490, 'time': 10, 'ingredients': [{'name': '생새우살', 'nameEn': 'Raw Large Shrimp', 'amount': '15마리', 'coupangKeyword': '손질 새우살', 'amazonKeyword': 'raw shrimp peeled', 'deliveryType': 'rocket'}, {'name': '올리브유/바게트', 'nameEn': 'Olive Oil & Baguette', 'amount': '1팩', 'coupangKeyword': '올리브오일 바게트', 'amazonKeyword': 'olive oil baguette', 'deliveryType': 'rocket'}]},
        {'name': '에그인헬 샥슈카', 'name_en': 'Shakshuka Eggs in Hell', 'calories': 420, 'time': 15, 'ingredients': [{'name': '아라비아따소스', 'nameEn': 'Spicy Tomato Sauce', 'amount': '1병', 'coupangKeyword': '아라비아따 소스', 'amazonKeyword': 'arrabbiata sauce', 'deliveryType': 'rocket'}, {'name': '신선란/모짜렐라', 'nameEn': 'Eggs & Mozzarella', 'amount': '2알', 'coupangKeyword': '계란 피자치즈', 'amazonKeyword': 'eggs mozzarella', 'deliveryType': 'rocket'}]},
        {'name': '부라타치즈 바질 냉파스타', 'name_en': 'Burrata Basil Cold Pasta', 'calories': 480, 'time': 10, 'ingredients': [{'name': '부라타치즈', 'nameEn': 'Burrata Cheese', 'amount': '1덩이', 'coupangKeyword': '부라타 치즈', 'amazonKeyword': 'fresh burrata', 'deliveryType': 'rocket'}, {'name': '바질페스토/푸실리', 'nameEn': 'Basil Pesto & Fusilli', 'amount': '1팩', 'coupangKeyword': '바질페스토 푸실리', 'amazonKeyword': 'pesto fusilli', 'deliveryType': 'rocket'}]},
        {'name': '생 바지락 봉골레 파스타', 'name_en': 'Fresh Clam Vongole Pasta', 'calories': 510, 'time': 12, 'ingredients': [{'name': '해감바지락', 'nameEn': 'Fresh Clams', 'amount': '350g', 'coupangKeyword': '해감 바지락', 'amazonKeyword': 'fresh clams', 'deliveryType': 'rocket'}, {'name': '스파게티면/마늘', 'nameEn': 'Spaghetti & Garlic', 'amount': '150g', 'coupangKeyword': '스파게티 깐마늘', 'amazonKeyword': 'spaghetti garlic', 'deliveryType': 'rocket'}]},
        {'name': '트러플 감자 크림 뇨끼', 'name_en': 'Truffle Mushroom Cream Gnocchi', 'calories': 560, 'time': 12, 'ingredients': [{'name': '감자뇨끼', 'nameEn': 'Potato Gnocchi', 'amount': '200g', 'coupangKeyword': '데체코 뇨끼', 'amazonKeyword': 'potato gnocchi', 'deliveryType': 'rocket'}, {'name': '생크림/트러플오일', 'nameEn': 'Cream & Truffle Oil', 'amount': '1팩', 'coupangKeyword': '생크림 트러플오일', 'amazonKeyword': 'cream truffle oil', 'deliveryType': 'rocket'}]},
        {'name': '매콤 투움바 파스타', 'name_en': 'Spicy Toowoomba Pasta', 'calories': 670, 'time': 15, 'ingredients': [{'name': '페투치네면', 'nameEn': 'Fettuccine', 'amount': '150g', 'coupangKeyword': '데체코 페투치니', 'amazonKeyword': 'fettuccine pasta', 'deliveryType': 'rocket'}, {'name': '새우/투움바소스', 'nameEn': 'Shrimp & Sauce', 'amount': '1병', 'coupangKeyword': '투움바 소스 새우', 'amazonKeyword': 'toowoomba sauce shrimp', 'deliveryType': 'rocket'}]},
        {'name': '볼로네제 치즈 오븐 라자냐', 'name_en': 'Bolognese Beef Lasagna', 'calories': 640, 'time': 15, 'ingredients': [{'name': '라자냐생면', 'nameEn': 'Lasagna Sheets', 'amount': '1팩', 'coupangKeyword': '라자냐 면', 'amazonKeyword': 'lasagna pasta', 'deliveryType': 'rocket'}, {'name': '라구소스/치즈', 'nameEn': 'Ragu Sauce & Cheese', 'amount': '1병', 'coupangKeyword': '볼로네제 소스 피자치즈', 'amazonKeyword': 'bolognese cheese', 'deliveryType': 'rocket'}]},
        {'name': '텍사스 훈제 바베큐 폭립', 'name_en': 'Texas Smoky BBQ Pork Ribs', 'calories': 730, 'time': 15, 'ingredients': [{'name': '양념폭립', 'nameEn': 'BBQ Pork Ribs', 'amount': '500g', 'coupangKeyword': '바베큐 폭립', 'amazonKeyword': 'pork back ribs bbq', 'deliveryType': 'rocket'}, {'name': '코울슬로', 'nameEn': 'Coleslaw', 'amount': '1팩', 'coupangKeyword': '코울슬로 샐러드', 'amazonKeyword': 'coleslaw', 'deliveryType': 'rocket'}]}
    ]
    categories_data['western'] = build_category_batch('western', 400, western_bases, ['pasta_western', 'steak_western', 'pizza_burger'])

    # 4. ASIAN RECIPES (380 items)
    asian_bases = [
        {'name': '진한국물 돈코츠 차슈 라멘', 'name_en': 'Rich Tonkotsu Chashu Ramen', 'calories': 580, 'time': 10, 'ingredients': [{'name': '라멘생면/육수', 'nameEn': 'Ramen Noodles & Broth', 'amount': '1팩', 'coupangKeyword': '돈코츠 라멘 생면', 'amazonKeyword': 'tonkotsu ramen kit', 'deliveryType': 'rocket'}, {'name': '슬라이스차슈', 'nameEn': 'Chashu Pork Slices', 'amount': '4장', 'coupangKeyword': '라멘 차슈', 'amazonKeyword': 'pork chashu', 'deliveryType': 'rocket'}]},
        {'name': '소고기 양지 쌀국수 포', 'name_en': 'Vietnamese Beef Pho', 'calories': 420, 'time': 10, 'ingredients': [{'name': '쌀국수면', 'nameEn': 'Rice Noodles', 'amount': '150g', 'coupangKeyword': '쌀국수 면', 'amazonKeyword': 'pho rice noodles', 'deliveryType': 'rocket'}, {'name': '샤브소고기/육수', 'nameEn': 'Shaved Beef & Broth', 'amount': '100g', 'coupangKeyword': '쌀국수 장국 소고기', 'amazonKeyword': 'shaved beef pho base', 'deliveryType': 'rocket'}]},
        {'name': '얼얼한 마라탕 푸주 당면', 'name_en': 'Spicy Mala Tang Hotpot', 'calories': 650, 'time': 15, 'ingredients': [{'name': '마라탕소스', 'nameEn': 'Mala Soup Base', 'amount': '1팩', 'coupangKeyword': '하이디라오 마라탕 소스', 'amazonKeyword': 'mala soup base', 'deliveryType': 'rocket'}, {'name': '푸주/중국당면/우삼겹', 'nameEn': 'Tofu Skin, Wide Glass Noodles & Beef', 'amount': '1팩', 'coupangKeyword': '푸주 중국당면 우삼겹', 'amazonKeyword': 'tofu skin wide noodles', 'deliveryType': 'rocket'}]},
        {'name': '특제 간장 생연어 사케동', 'name_en': 'Fresh Salmon Donburi Sakedon', 'calories': 480, 'time': 8, 'ingredients': [{'name': '횟감생연어', 'nameEn': 'Sashimi Salmon', 'amount': '180g', 'coupangKeyword': '생연어 횟감용', 'amazonKeyword': 'sashimi grade salmon', 'deliveryType': 'rocket'}, {'name': '쯔유/생와사비', 'nameEn': 'Tsuyu & Wasabi', 'amount': '1팩', 'coupangKeyword': '가쓰오 쯔유 생와사비', 'amazonKeyword': 'tsuyu wasabi', 'deliveryType': 'rocket'}]},
        {'name': '태국식 통새우 팟타이', 'name_en': 'Thai Shrimp Pad Thai', 'calories': 540, 'time': 12, 'ingredients': [{'name': '팟타이면/소스', 'nameEn': 'Pad Thai Noodles & Sauce', 'amount': '1팩', 'coupangKeyword': '팟타이 밀키트', 'amazonKeyword': 'pad thai kit', 'deliveryType': 'rocket'}, {'name': '칵테일새우/땅콩', 'nameEn': 'Shrimp & Peanuts', 'amount': '1팩', 'coupangKeyword': '칵테일 새우 땅콩분태', 'amazonKeyword': 'shrimp peanuts', 'deliveryType': 'rocket'}]},
        {'name': '나고야식 매콤 마제소바', 'name_en': 'Nagoya Dry Mazesoba', 'calories': 610, 'time': 10, 'ingredients': [{'name': '중화생면', 'nameEn': 'Thick Noodles', 'amount': '1팩', 'coupangKeyword': '라멘 생면', 'amazonKeyword': 'fresh ramen noodles', 'deliveryType': 'rocket'}, {'name': '민찌소스/부추', 'nameEn': 'Minced Pork Sauce & Chives', 'amount': '1팩', 'coupangKeyword': '마제소바 소스 부추', 'amazonKeyword': 'minced pork chives', 'deliveryType': 'rocket'}]},
        {'name': '버터치킨 커리 갈릭난', 'name_en': 'Butter Chicken Curry & Naan', 'calories': 590, 'time': 15, 'ingredients': [{'name': '버터치킨커리소스', 'nameEn': 'Butter Chicken Sauce', 'amount': '1병', 'coupangKeyword': '버터치킨 마크니 커리', 'amazonKeyword': 'butter chicken sauce', 'deliveryType': 'rocket'}, {'name': '닭다리살/갈릭난', 'nameEn': 'Chicken & Garlic Naan', 'amount': '200g', 'coupangKeyword': '닭다리살 갈릭 난', 'amazonKeyword': 'chicken garlic naan', 'deliveryType': 'rocket'}]},
        {'name': '대만식 아롱사태 우육면', 'name_en': 'Taiwanese Beef Shank Noodles', 'calories': 560, 'time': 15, 'ingredients': [{'name': '우육탕면/육수', 'nameEn': 'Beef Broth & Noodles', 'amount': '1팩', 'coupangKeyword': '우육면 밀키트', 'amazonKeyword': 'beef noodle soup kit', 'deliveryType': 'rocket'}, {'name': '아롱사태/청경채', 'nameEn': 'Beef Shank & Bok Choy', 'amount': '150g', 'coupangKeyword': '아롱사태 수육 청경채', 'amazonKeyword': 'beef shank bok choy', 'deliveryType': 'rocket'}]},
        {'name': '도쿄 두툼 돈카츠 가츠동', 'name_en': 'Tokyo Pork Katsudon', 'calories': 680, 'time': 10, 'ingredients': [{'name': '등심돈카츠', 'nameEn': 'Pork Katsu', 'amount': '1장', 'coupangKeyword': '등심 돈까스', 'amazonKeyword': 'pork tonkatsu', 'deliveryType': 'rocket'}, {'name': '가츠동소스/계란', 'nameEn': 'Tsuyu & Eggs', 'amount': '1팩', 'coupangKeyword': '가츠동 소스 계란', 'amazonKeyword': 'katsudon sauce eggs', 'deliveryType': 'rocket'}]},
        {'name': '요시노야 스타일 규동', 'name_en': 'Japanese Beef Gyudon', 'calories': 580, 'time': 7, 'ingredients': [{'name': '우삼겹', 'nameEn': 'Shaved Beef', 'amount': '150g', 'coupangKeyword': '우삼겹 구이용', 'amazonKeyword': 'thin shaved beef', 'deliveryType': 'rocket'}, {'name': '규동소스/양파', 'nameEn': 'Gyudon Sauce & Onion', 'amount': '1팩', 'coupangKeyword': '규동 소스 양파', 'amazonKeyword': 'gyudon sauce onion', 'deliveryType': 'rocket'}]}
    ]
    categories_data['asian'] = build_category_batch('asian', 380, asian_bases, ['asian_noodles', 'dimsum_asian', 'rice_bowl'])

    # 5. DIET RECIPES (280 items)
    diet_bases = [
        {'name': '수비드 닭가슴살 아보카도 샐러드', 'name_en': 'Sous-vide Chicken Avocado Salad', 'calories': 360, 'time': 5, 'ingredients': [{'name': '수비드닭가슴살', 'nameEn': 'Chicken Breast', 'amount': '1팩', 'coupangKeyword': '수비드 닭가슴살', 'amazonKeyword': 'cooked chicken breast', 'deliveryType': 'rocket'}, {'name': '후숙아보카도/채소', 'nameEn': 'Avocado & Greens', 'amount': '1팩', 'coupangKeyword': '아보카도 샐러드채소', 'amazonKeyword': 'avocado salad greens', 'deliveryType': 'rocket'}]},
        {'name': '소고기 두부 다이어트 유부초밥', 'name_en': 'Lean Beef & Tofu Inari Sushi', 'calories': 320, 'time': 10, 'ingredients': [{'name': '단단한두부', 'nameEn': 'Firm Tofu', 'amount': '1모', 'coupangKeyword': '부침용 두부', 'amazonKeyword': 'firm tofu', 'deliveryType': 'rocket'}, {'name': '소고기다짐육/조미유부', 'nameEn': 'Ground Beef & Inari Pockets', 'amount': '1팩', 'coupangKeyword': '소고기 다짐육 조미유부', 'amazonKeyword': 'ground beef inari', 'deliveryType': 'rocket'}]},
        {'name': '훈제오리 단호박찜 부추무침', 'name_en': 'Smoked Duck & Kabocha Squash', 'calories': 490, 'time': 15, 'ingredients': [{'name': '훈제오리', 'nameEn': 'Smoked Duck', 'amount': '300g', 'coupangKeyword': '훈제오리 슬라이스', 'amazonKeyword': 'smoked duck', 'deliveryType': 'rocket'}, {'name': '미니단호박/부추', 'nameEn': 'Kabocha & Chives', 'amount': '1개', 'coupangKeyword': '미니 밤호박 영양부추', 'amazonKeyword': 'kabocha chives', 'deliveryType': 'rocket'}]},
        {'name': '하와이안 생연어 포케볼', 'name_en': 'Fresh Salmon Poke Bowl', 'calories': 440, 'time': 10, 'ingredients': [{'name': '생연어큐브', 'nameEn': 'Salmon Cubes', 'amount': '150g', 'coupangKeyword': '생연어 횟감 큐브', 'amazonKeyword': 'salmon poke cubes', 'deliveryType': 'rocket'}, {'name': '발아현미밥/에다마메', 'nameEn': 'Brown Rice & Edamame', 'amount': '1팩', 'coupangKeyword': '햇반 현미밥 에다마메', 'amazonKeyword': 'brown rice edamame', 'deliveryType': 'rocket'}]},
        {'name': '꾸덕 그릭요거트 블루베리볼', 'name_en': 'Greek Yogurt & Blueberry Granola', 'calories': 280, 'time': 3, 'ingredients': [{'name': '무가당그릭요거트', 'nameEn': 'Greek Yogurt', 'amount': '100g', 'coupangKeyword': '그릭데이 그릭요거트', 'amazonKeyword': 'plain greek yogurt', 'deliveryType': 'rocket'}, {'name': '생블루베리/그래놀라', 'nameEn': 'Blueberries & Granola', 'amount': '1팩', 'coupangKeyword': '생 블루베리 수제 그래놀라', 'amazonKeyword': 'blueberries granola', 'deliveryType': 'rocket'}]},
        {'name': '소고기 우둔살 두부면 볶음', 'name_en': 'Lean Beef Tofu Noodles Stir-fry', 'calories': 340, 'time': 8, 'ingredients': [{'name': '넓은두부면', 'nameEn': 'Tofu Noodles', 'amount': '1팩', 'coupangKeyword': '풀무원 두부면', 'amazonKeyword': 'tofu noodles', 'deliveryType': 'rocket'}, {'name': '소고기우둔살/숙주', 'nameEn': 'Lean Beef & Sprouts', 'amount': '120g', 'coupangKeyword': '소고기 우둔살 숙주', 'amazonKeyword': 'lean beef bean sprouts', 'deliveryType': 'rocket'}]},
        {'name': '양배추 계란 노밀가루 오코노미야키', 'name_en': 'Flourless Cabbage Okonomiyaki', 'calories': 310, 'time': 10, 'ingredients': [{'name': '채썬양배추', 'nameEn': 'Shredded Cabbage', 'amount': '150g', 'coupangKeyword': '채썬 양배추', 'amazonKeyword': 'shredded cabbage', 'deliveryType': 'rocket'}, {'name': '신선란/새우/가쓰오부시', 'nameEn': 'Eggs, Shrimp & Bonito', 'amount': '1팩', 'coupangKeyword': '계란 칵테일새우 가쓰오부시', 'amazonKeyword': 'eggs shrimp bonito', 'deliveryType': 'rocket'}]},
        {'name': '단호박 훈제연어 샐러드', 'name_en': 'Smoked Salmon Kabocha Salad', 'calories': 370, 'time': 5, 'ingredients': [{'name': '훈제연어', 'nameEn': 'Smoked Salmon', 'amount': '150g', 'coupangKeyword': '훈제연어 슬라이스', 'amazonKeyword': 'smoked salmon', 'deliveryType': 'rocket'}, {'name': '미니단호박/홀스래디시', 'nameEn': 'Kabocha & Horseradish', 'amount': '1팩', 'coupangKeyword': '단호박 홀스래디쉬 소스', 'amazonKeyword': 'kabocha horseradish', 'deliveryType': 'rocket'}]},
        {'name': '수비드 닭가슴살 라이스페이퍼 롤', 'name_en': 'Fresh Chicken Summer Rolls', 'calories': 320, 'time': 10, 'ingredients': [{'name': '라이스페이퍼', 'nameEn': 'Rice Paper', 'amount': '10장', 'coupangKeyword': '라이스페이퍼', 'amazonKeyword': 'rice paper sheets', 'deliveryType': 'rocket'}, {'name': '닭가슴살/파프리카/오이', 'nameEn': 'Chicken & Crisp Veggies', 'amount': '1팩', 'coupangKeyword': '수비드 닭가슴살 파프리카 백오이', 'amazonKeyword': 'chicken breast bell pepper cucumber', 'deliveryType': 'rocket'}]},
        {'name': '유기농 낫또 아보카도 덮밥', 'name_en': 'Superfood Natto Avocado Bowl', 'calories': 350, 'time': 3, 'ingredients': [{'name': '국산콩낫또', 'nameEn': 'Fermented Natto', 'amount': '1팩', 'coupangKeyword': '풀무원 낫또', 'amazonKeyword': 'natto pack', 'deliveryType': 'rocket'}, {'name': '아보카도/반숙란', 'nameEn': 'Avocado & Soft Egg', 'amount': '1팩', 'coupangKeyword': '후숙 아보카도 감동란', 'amazonKeyword': 'avocado soft egg', 'deliveryType': 'rocket'}]}
    ]
    categories_data['diet'] = build_category_batch('diet', 280, diet_bases, ['salad_diet', 'rice_bowl'])

    # 6. SNACK RECIPES (260 items)
    snack_bases = [
        {'name': '꾸덕 로제 떡볶이 분모자', 'name_en': 'Creamy Rose Tteokbokki', 'calories': 720, 'time': 12, 'ingredients': [{'name': '밀떡/롱분모자', 'nameEn': 'Rice Cakes & Bunmoja', 'amount': '300g', 'coupangKeyword': '밀떡 분모자', 'amazonKeyword': 'rice cakes noodles', 'deliveryType': 'rocket'}, {'name': '로제소스/비엔나', 'nameEn': 'Rose Sauce & Sausage', 'amount': '1팩', 'coupangKeyword': '로제 떡볶이 소스 비엔나소시지', 'amazonKeyword': 'rose sauce sausage', 'deliveryType': 'rocket'}]},
        {'name': '크리스피 순살치킨 모짜 치즈볼', 'name_en': 'Crispy Fried Chicken & Cheese Balls', 'calories': 780, 'time': 15, 'ingredients': [{'name': '순살치킨', 'nameEn': 'Boneless Fried Chicken', 'amount': '450g', 'coupangKeyword': '고메 순살치킨', 'amazonKeyword': 'korean fried chicken', 'deliveryType': 'rocket'}, {'name': '치즈볼/양념치킨소스', 'nameEn': 'Cheese Balls & Glaze', 'amount': '1팩', 'coupangKeyword': '모짜렐라 치즈볼 양념치킨소스', 'amazonKeyword': 'cheese balls sweet chili', 'deliveryType': 'rocket'}]},
        {'name': '직화 불맛 무뼈닭발 주먹밥', 'name_en': 'Smoky Boneless Chicken Feet', 'calories': 540, 'time': 10, 'ingredients': [{'name': '무뼈닭발', 'nameEn': 'Boneless Chicken Feet', 'amount': '200g', 'coupangKeyword': '안주야 무뼈닭발', 'amazonKeyword': 'chicken feet spicy', 'deliveryType': 'rocket'}, {'name': '날치알/김가루/마요네즈', 'nameEn': 'Fish Roe & Seaweed', 'amount': '1팩', 'coupangKeyword': '날치알 김가루 마요네즈', 'amazonKeyword': 'fish roe nori mayo', 'deliveryType': 'rocket'}]},
        {'name': '바지락 버터술찜 국물파스타', 'name_en': 'Clam Butter Wine Pasta', 'calories': 460, 'time': 10, 'ingredients': [{'name': '해감바지락', 'nameEn': 'Fresh Clams', 'amount': '400g', 'coupangKeyword': '해감 바지락', 'amazonKeyword': 'fresh clams', 'deliveryType': 'rocket'}, {'name': '무염버터/스파게티면', 'nameEn': 'Butter & Spaghetti', 'amount': '1팩', 'coupangKeyword': '포션버터 스파게티', 'amazonKeyword': 'butter spaghetti', 'deliveryType': 'rocket'}]},
        {'name': '통인시장 기름떡볶이 납작만두', 'name_en': 'Crispy Oil Tteokbokki', 'calories': 510, 'time': 10, 'ingredients': [{'name': '쌀떡볶이떡', 'nameEn': 'Rice Cakes', 'amount': '300g', 'coupangKeyword': '쌀 떡볶이 떡', 'amazonKeyword': 'rice cakes', 'deliveryType': 'rocket'}, {'name': '납작만두/고춧가루/참기름', 'nameEn': 'Flat Dumplings & Seasoning', 'amount': '1팩', 'coupangKeyword': '대구 납작만두 고춧가루 참기름', 'amazonKeyword': 'flat dumplings chili oil', 'deliveryType': 'rocket'}]},
        {'name': '통오징어 튀김 떡볶이소스', 'name_en': 'Fried Whole Calamari & Dip', 'calories': 580, 'time': 10, 'ingredients': [{'name': '통오징어튀김', 'nameEn': 'Whole Breaded Squid', 'amount': '1마리', 'coupangKeyword': '통오징어 튀김', 'amazonKeyword': 'breaded squid', 'deliveryType': 'rocket'}, {'name': '떡볶이디핑소스', 'nameEn': 'Tteokbokki Dip', 'amount': '1팩', 'coupangKeyword': '떡볶이 소스', 'amazonKeyword': 'tteokbokki sauce', 'deliveryType': 'rocket'}]},
        {'name': '직화 매콤 오돌뼈 주먹밥', 'name_en': 'Smoky Pork Cartilage Odolppyeo', 'calories': 520, 'time': 8, 'ingredients': [{'name': '직화오돌뼈', 'nameEn': 'Spicy Pork Cartilage', 'amount': '200g', 'coupangKeyword': '안주야 오돌뼈', 'amazonKeyword': 'pork cartilage', 'deliveryType': 'rocket'}, {'name': '김가루/깻잎', 'nameEn': 'Seaweed & Perilla Leaves', 'amount': '1팩', 'coupangKeyword': '김가루 깻잎', 'amazonKeyword': 'nori perilla', 'deliveryType': 'rocket'}]},
        {'name': '치즈 오븐 나초 과카몰리', 'name_en': 'Melted Cheddar Nacho Platter', 'calories': 560, 'time': 5, 'ingredients': [{'name': '토르티야나초칩', 'nameEn': 'Tortilla Chips', 'amount': '1봉', 'coupangKeyword': '나초칩', 'amazonKeyword': 'tortilla chips', 'deliveryType': 'rocket'}, {'name': '체다치즈/아보카도/살사', 'nameEn': 'Cheddar, Avocado & Salsa', 'amount': '1팩', 'coupangKeyword': '체다치즈 아보카도 살사소스', 'amazonKeyword': 'cheddar avocado salsa', 'deliveryType': 'rocket'}]},
        {'name': '사천 짜장 라볶이 튀김만두', 'name_en': 'Jjajang Rabokki & Dumplings', 'calories': 680, 'time': 10, 'ingredients': [{'name': '밀떡/라면사리', 'nameEn': 'Rice Cakes & Ramen', 'amount': '1팩', 'coupangKeyword': '밀떡 라면사리', 'amazonKeyword': 'rice cakes ramen', 'deliveryType': 'rocket'}, {'name': '짜장소스/군만두', 'nameEn': 'Jjajang Sauce & Dumplings', 'amount': '1팩', 'coupangKeyword': '짜장 떡볶이 소스 군만두', 'amazonKeyword': 'jjajang sauce dumplings', 'deliveryType': 'rocket'}]},
        {'name': '포장마차 꼬치 어묵탕 모둠튀김', 'name_en': 'Skewered Fish Cake Soup Eomuk', 'calories': 450, 'time': 12, 'ingredients': [{'name': '부산꼬치어묵', 'nameEn': 'Fish Cake Skewers', 'amount': '8개', 'coupangKeyword': '부산 꼬치어묵', 'amazonKeyword': 'fish cake skewers', 'deliveryType': 'rocket'}, {'name': '어묵탕스프/무', 'nameEn': 'Dashi Soup Base & Radish', 'amount': '1팩', 'coupangKeyword': '어묵탕 장국 세척 무', 'amazonKeyword': 'dashi soup radish', 'deliveryType': 'rocket'}]}
    ]
    categories_data['snack'] = build_category_batch('snack', 260, snack_bases, ['snack_street', 'pizza_burger'])

    # 7. EASY COOK RECIPES (250 items)
    easy_bases = [
        {'name': '스팸 계란 버터 간장밥', 'name_en': 'Spam Egg Butter Soy Rice', 'calories': 540, 'time': 5, 'ingredients': [{'name': '스팸클래식', 'nameEn': 'Spam Can', 'amount': '1/2캔', 'coupangKeyword': 'CJ 스팸', 'amazonKeyword': 'spam classic', 'deliveryType': 'rocket'}, {'name': '계란/버터/양조간장', 'nameEn': 'Egg, Butter & Soy Sauce', 'amount': '1팩', 'coupangKeyword': '계란 버터 양조간장', 'amazonKeyword': 'eggs butter soy sauce', 'deliveryType': 'rocket'}]},
        {'name': '고소한 참치마요 덮밥', 'name_en': 'Tuna Mayo Rice Bowl', 'calories': 510, 'time': 3, 'ingredients': [{'name': '동원참치', 'nameEn': 'Canned Tuna', 'amount': '1캔', 'coupangKeyword': '동원참치 라이트', 'amazonKeyword': 'canned tuna', 'deliveryType': 'rocket'}, {'name': '마요네즈/김가루/데리야끼', 'nameEn': 'Mayo, Seaweed & Teriyaki', 'amount': '1팩', 'coupangKeyword': '마요네즈 김가루 데리야끼소스', 'amazonKeyword': 'mayo nori teriyaki', 'deliveryType': 'rocket'}]},
        {'name': '노릇 우삼겹 매콤 비빔면', 'name_en': 'Seared Beef Spicy Bibimmyeon', 'calories': 670, 'time': 8, 'ingredients': [{'name': '팔도비빔면', 'nameEn': 'Cold Spicy Noodles', 'amount': '1봉', 'coupangKeyword': '팔도비빔면', 'amazonKeyword': 'paldo bibimmyeon', 'deliveryType': 'rocket'}, {'name': '우삼겹/오이', 'nameEn': 'Beef Slices & Cucumber', 'amount': '150g', 'coupangKeyword': '우삼겹 구이용 백오이', 'amazonKeyword': 'shaved beef cucumber', 'deliveryType': 'rocket'}]},
        {'name': '에어프라이어 통삼겹 파채무침', 'name_en': 'Air-Fryer Crispy Pork Belly', 'calories': 720, 'time': 20, 'ingredients': [{'name': '벌집통삼겹살', 'nameEn': 'Pork Belly Slab', 'amount': '400g', 'coupangKeyword': '벌집 삼겹살', 'amazonKeyword': 'pork belly', 'deliveryType': 'rocket'}, {'name': '손질파채/쌈장', 'nameEn': 'Scallions & Ssamjang', 'amount': '1팩', 'coupangKeyword': '손질 파채 쌈장', 'amazonKeyword': 'scallions ssamjang', 'deliveryType': 'rocket'}]},
        {'name': '치즈 폭포 스팸 김치볶음밥', 'name_en': 'Cheesy Molten Kimchi Fried Rice', 'calories': 580, 'time': 7, 'ingredients': [{'name': '맛김치/스팸', 'nameEn': 'Kimchi & Spam', 'amount': '1컵', 'coupangKeyword': '종가 맛김치 스팸', 'amazonKeyword': 'kimchi spam', 'deliveryType': 'rocket'}, {'name': '피자치즈/햇반', 'nameEn': 'Mozzarella & Instant Rice', 'amount': '1팩', 'coupangKeyword': '슈레드 피자치즈 햇반', 'amazonKeyword': 'mozzarella rice bowl', 'deliveryType': 'rocket'}]},
        {'name': '파기름 계란 분식집 진라면', 'name_en': 'Scallion Oil Egg Jin Ramen', 'calories': 510, 'time': 5, 'ingredients': [{'name': '진라면매운맛', 'nameEn': 'Jin Ramen Spicy', 'amount': '1봉', 'coupangKeyword': '진라면 매운맛', 'amazonKeyword': 'jin ramen spicy', 'deliveryType': 'rocket'}, {'name': '대파/계란', 'nameEn': 'Scallions & Egg', 'amount': '1대', 'coupangKeyword': '대파 계란', 'amazonKeyword': 'scallions egg', 'deliveryType': 'rocket'}]},
        {'name': '크루아상 햄치즈 샌드위치', 'name_en': 'Croissant Ham & Melted Cheese', 'calories': 390, 'time': 5, 'ingredients': [{'name': '버터크루아상', 'nameEn': 'Butter Croissant', 'amount': '1개', 'coupangKeyword': '버터 크루아상', 'amazonKeyword': 'croissants', 'deliveryType': 'rocket'}, {'name': '슬라이스햄/체다치즈', 'nameEn': 'Deli Ham & Cheddar', 'amount': '1팩', 'coupangKeyword': '슬라이스 햄 체다치즈', 'amazonKeyword': 'deli ham cheddar', 'deliveryType': 'rocket'}]},
        {'name': '3분 우삼겹 숙주 굴소스볶음', 'name_en': '3-Min Beef & Bean Sprouts', 'calories': 480, 'time': 5, 'ingredients': [{'name': '우삼겹', 'nameEn': 'Shaved Beef', 'amount': '200g', 'coupangKeyword': '우삼겹 구이용', 'amazonKeyword': 'shaved beef', 'deliveryType': 'rocket'}, {'name': '숙주나물/굴소스', 'nameEn': 'Bean Sprouts & Oyster Sauce', 'amount': '1봉', 'coupangKeyword': '싱싱 숙주나물 이금기 굴소스', 'amazonKeyword': 'bean sprouts oyster sauce', 'deliveryType': 'rocket'}]},
        {'name': '5분 마늘 계란 볶음밥', 'name_en': '5-Min Garlic Egg Fried Rice', 'calories': 420, 'time': 5, 'ingredients': [{'name': '깐마늘/계란', 'nameEn': 'Garlic & Eggs', 'amount': '1팩', 'coupangKeyword': '깐마늘 계란', 'amazonKeyword': 'garlic eggs', 'deliveryType': 'rocket'}, {'name': '버터/햇반', 'nameEn': 'Butter & Rice', 'amount': '1팩', 'coupangKeyword': '무염버터 햇반', 'amazonKeyword': 'butter instant rice', 'deliveryType': 'rocket'}]},
        {'name': '고소한 들기름 메밀막국수', 'name_en': 'Perilla Oil Buckwheat Makguksu', 'calories': 460, 'time': 5, 'ingredients': [{'name': '메밀국수', 'nameEn': 'Buckwheat Noodles', 'amount': '150g', 'coupangKeyword': '메밀국수 면', 'amazonKeyword': 'buckwheat noodles', 'deliveryType': 'rocket'}, {'name': '통들기름/쯔유/김가루', 'nameEn': 'Perilla Oil, Tsuyu & Nori', 'amount': '1팩', 'coupangKeyword': '통들기름 가쓰오 쯔유 김가루', 'amazonKeyword': 'perilla oil tsuyu nori', 'deliveryType': 'rocket'}]}
    ]
    categories_data['easy_cook'] = build_category_batch('easy_cook', 250, easy_bases, ['rice_bowl', 'dessert_toast', 'asian_noodles'])

    # Write each file
    total_count = 0
    for cat_key, items in categories_data.items():
        total_count += len(items)
        file_path = os.path.join(DATA_DIR, f"{cat_key}.ts")
        var_name = f"{cat_key.upper()}_MENUS"
        
        content = f"import {{ MenuItem }} from '@/types/menu';\n\n"
        content += f"export const {var_name}: MenuItem[] = {json.dumps(items, ensure_ascii=False, indent=2)};\n"
        
        with open(file_path, 'w', encoding='utf-8') as f:
            f.write(content)
        print(f"✅ Generated {len(items)} items for {cat_key} -> {file_path}")

    print(f"\n🎉 Total menus generated: {total_count} items across 7 categories!")

if __name__ == '__main__':
    generate_all_menus()
