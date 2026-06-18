const { initDatabase, closeDatabase } = require('../utils/database');

// Setup для тестов
beforeAll(async () => {
  // Инициализируем тестовую базу данных
  await initDatabase();
});

// Cleanup после тестов
afterAll(async () => {
  // Закрываем соединение с базой данных
  await closeDatabase();
});

// Очистка данных перед каждым тестом
beforeEach(async () => {
  // Здесь можно добавить очистку данных
  // await clearTestData();
});
