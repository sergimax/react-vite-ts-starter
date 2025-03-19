# Проект Бургерной Stellar Burgers

## Спринт 6 - Этап 1

- [ ] Тестирование бизнес-логики приложения
- [ ] Тестирование с использованием Cypress
- [ ] Деплой приложения

## Спринт 5 - Этап 1

1. [x] Экраны «Лента заказов» и «История заказов»
    1. [x] `/feed` — страница ленты заказов. Доступен всем пользователям.
    2. [x] `/feed/:number` — страница заказа в ленте. Доступен всем пользователям.
    3. [x] `/profile/orders` — страница истории заказов пользователя. Доступен только авторизованным пользователям.
    4. [x] `/profile/orders/:number` — страница заказа в истории заказов. Доступен только авторизованным пользователям.
2. [x] Доработка роутинга в приложении
3. [x] Функциональность экрана «Лента заказов»
4. [x] Функциональность экрана «История заказов»
5. [x] Сокет-соединение с авторизацией
6. [x] Особенности реализации

## Спринт 4 - Этап 1

- [x] Все компоненты и утилитарные функции пора перевести с PropTypes на TypeScript
- [x] Под этим подразумевается типизация всех блоков кода за исключением хранилища
- [x] Все файлы должны перейти в форматы .tsx/.ts, а запуск проекта — происходить без ошибок.

## Спринт 3 - Этап 1

- [x] Страницы авторизации и регистрации
- [x] Страницы восстановления и сброса пароля
- [x] Страница профиля пользователя
- [x] Авторизация и регистрация
- [x] Получение и обновление информации о пользователе
- [x] Защищённые маршруты в приложении
- [x] Доработка роутинга в приложении
- [x] Проверка типизации

## Спринт 2 - Этап 1

- [x] Обновление инфраструктуры приложения
    - Опционально: реализация через Redux Toolkit
- [x] Подготовка хранилища
- [x] Создание первых экшенов и редьюсеров
- [x] Доработка интерфейса навигации по ингредиентам
- [x] Реализация перетаскивания ингредиентов
- [x] Подсчёт итоговой стоимости бургера
- [x] Возможность создавать заказ
- [x] Вложенная сортировка ингредиентов в BurgerConstructor
- [x] Проверка типизации

## Спринт 1 - Этап 2

-   [x] Функциональные компоненты
-   [x] Подключитесь к API
-   [x] Компоненты главной страницы: Modal и ModalOverlay
    - Открытие модального окна:
    -   [x] Модальное окно открывается по клику на соответствующий элемент страницы.
    -   [x] Клик по ингредиенту открывает модальное окно с описанием ингредиента.
    -   [x] Клик по кнопке «Оформить заказ» открывает модальное окно с описанием заказа.
    - Закрытие модального окна:
    -   [x] Клик по иконке крестика закрывает модальное окно.
    -   [x] Клик по ModalOverlay или нажатие на клавишу “Esc” закрывают модальное окно.
-   [x] Компоненты содержимого модальных окон: IngredientDetails и OrderDetails
-   [x] Типизация
