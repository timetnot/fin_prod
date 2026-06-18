import { MemoryQueue } from './memoryQueue';

// Создаем in-memory очередь для обработки подписок
export const subscriptionQueue = new MemoryQueue('subscription-processing');

// Типы задач
export interface SubscriptionJobData {
  type: 'billing-reminder' | 'calculate-next-date' | 'generate-report' | 'cleanup-inactive';
  userId?: string;
  subscriptionId?: string;
  subscriptionData?: any;
  reportData?: any;
}

// Регистрация обработчиков задач
subscriptionQueue.register('billing-reminder', async (job) => {
  await handleBillingReminder(job.data);
});

subscriptionQueue.register('calculate-next-date', async (job) => {
  await handleCalculateNextDate(job.data);
});

subscriptionQueue.register('generate-report', async (job) => {
  await handleGenerateReport(job.data);
});

subscriptionQueue.register('cleanup-inactive', async (job) => {
  await handleCleanupInactive(job.data);
});

// Обработчики задач
async function handleBillingReminder(data: any) {
  // Отправка уведомления о предстоящем списании
  console.log(`Sending billing reminder for subscription ${data.subscriptionId}`);
  // Здесь будет логика отправки email/push уведомлений
}

async function handleCalculateNextDate(data: any) {
  // Умный расчет следующей даты списания
  console.log(`Calculating next billing date for subscription ${data.subscriptionId}`);
  // Здесь будет умная логика расчета даты
}

async function handleGenerateReport(data: any) {
  // Генерация PDF отчета
  console.log(`Generating PDF report for user ${data.userId}`);
  // Здесь будет логика генерации PDF
}

async function handleCleanupInactive(data: any) {
  // Очистка неактивных подписок
  console.log('Cleaning up inactive subscriptions');
  // Здесь будет логика очистки
}

// Добавление задач в очередь
export const addBillingReminderJob = async (subscriptionId: string, userId: string, reminderDate: Date) => {
  await subscriptionQueue.add('billing-reminder', { subscriptionId, userId }, {
    delay: reminderDate.getTime() - Date.now(),
    jobId: `reminder-${subscriptionId}-${reminderDate.getTime()}`,
  });
};

export const addCalculateNextDateJob = async (subscriptionId: string) => {
  await subscriptionQueue.add('calculate-next-date', { subscriptionId }, {
    jobId: `calc-date-${subscriptionId}`,
  });
};

export const addGenerateReportJob = async (userId: string, reportType: string) => {
  await subscriptionQueue.add('generate-report', { userId, reportType }, {
    jobId: `report-${userId}-${Date.now()}`,
  });
};

export const addCleanupJob = async () => {
  await subscriptionQueue.add('cleanup-inactive', {}, {
    jobId: 'daily-cleanup',
  });
};

// Graceful shutdown
process.on('SIGINT', async () => {
  await subscriptionQueue.close();
  process.exit(0);
});
