# Эйра — миграция HTML-прототипа в Vite/React

Проект переносит пошаговый RPG-прототип в структуру Vite + React без TypeScript. Главный принцип: UI только отображает состояние и вызывает actions, а расчёты живут в `src/engine`.

## Запуск

```bash
npm install
npm run dev
```

Для production-сборки:

```bash
npm run build
```

## Где лежат изображения

Кладите ассеты в `public/assets`:

- глобальная карта: `public/assets/maps/world_map.png`;
- изображения локаций: `public/assets/locations/`;
- изображения городов: `public/assets/cities/`;
- персонажи: `public/assets/characters/`;
- будущие иллюстрации лора: `public/assets/lore/`.

Если изображение отсутствует, карта или портрет не ломают игру: интерфейс показывает fallback-сообщение или безопасный placeholder-путь.

## Где редактировать данные

- Точки глобальной карты: `src/data/worldNodes.js`.
- Внутренние точки городов: `src/data/cityNodes.js`.
- Будущие внутренние карты руин, храмов, пещер и подземелий: `src/data/locationMaps.js`.
- События и выборы: `src/data/events.js`.
- Изображения локаций: `src/data/locationImages.js`.
- Предметы: `src/data/items.js`.
- Оружие: `src/data/weapons.js`.
- Ранения: `src/data/injuries.js`.
- Спутники: `src/data/companions.js`.
- Фрагменты лора: `src/data/loreFragments.js`.
- Коллекции лора: `src/data/loreCollections.js`.
- Базовые персонажи и портреты: `src/data/characters.js`.
- Фракции/регионы репутации: `src/data/reputation.js`.

## Где редактировать игровую логику

- Базовое состояние: `src/engine/gameState.js`.
- Единая точка actions для UI: `src/engine/actions.js`.
- Перемещение, видимость и туман войны: `src/engine/movementEngine.js`.
- События, d20-проверки и эффекты: `src/engine/eventEngine.js`.
- Городской режим и городские действия: `src/engine/cityEngine.js`.
- Следующий день и скрытые ходы NPC: `src/engine/worldTurnEngine.js`.
- Морские переходы через капитана: `src/engine/seaTravelEngine.js`.
- Будущая боёвка: `src/engine/combatEngine.js`.
- Ранения и влияние частей тела: `src/engine/injuryEngine.js`.
- Инвентарь: `src/engine/inventoryEngine.js`.
- Спутники: `src/engine/partyEngine.js`.
- Постепенное открытие лора: `src/engine/loreEngine.js`.
- Будущий режим интересных мест: `src/engine/locationEngine.js`.

## Где редактировать UI

- Корневой компонент: `src/ui/App.jsx`.
- Глобальная карта: `src/ui/WorldMap.jsx`.
- Карта города: `src/ui/CityMap.jsx`.
- Заглушка интересных мест: `src/ui/LocationMap.jsx`.
- HUD: `src/ui/Hud.jsx`.
- Сворачиваемая панель событий: `src/ui/EventPanel.jsx`.
- Модальные окна: `src/ui/Modal.jsx`.
- Журнал: `src/ui/Journal.jsx`.
- Инвентарь: `src/ui/Inventory.jsx`.
- Репутация: `src/ui/Reputation.jsx`.
- Книга лора и фрагменты: `src/ui/LoreBook.jsx`, `src/ui/LoreFragment.jsx`.
- Панель боёвки: `src/ui/CombatPanel.jsx`.
- Портрет персонажа: `src/ui/CharacterPortrait.jsx`.
- Общие стили: `src/styles/main.css`.

## Что перенесено

- Глобальная карта с точками, связями и туманом войны.
- Перемещение кликом по точкам с тратой 1 действия в день.
- Кнопка следующего дня и скрытые ходы NPC без показа маршрутов.
- Структурированные события по биомам, d20-проверки и эффекты HP/усталости/следа/репутации/лора/боёвки.
- Слухи: точка появляется на карте, но путь к ней не открывается автоматически.
- Морские переходы через событие капитана, а не прямой телепорт по клику.
- Городской режим Сильверглейда с кликабельными внутренними точками и выходом обратно на мировую карту.
- Инвентарь, журнал, репутация и книга лора спрятаны в модальные окна.
- Архитектура будущих систем: location maps, combat, injuries, weapons, companions, portraits, lore collections.

## TODO

- Подставить реальные изображения вместо fallback-пустышек.
- Перенести полный набор точек и событий из старого HTML-прототипа, если он будет добавлен в репозиторий как источник.
- Расширить боёвку: дистанция, оружие, броня, руки/ноги/голова/корпус, спутники, травмы и история боя.
- Добавить полноценные действия рынков, кузницы, храма, архивов и Лунного Трона.
- Развернуть режим `location` для руин, храмов, пещер, лесных зон, островов и подземелий.
- Нарезать реальный лор проекта на фрагменты и коллекции.
