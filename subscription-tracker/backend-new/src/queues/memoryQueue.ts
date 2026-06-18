// Временная in-memory очередь для работы без Redis

interface Job {
  id: string;
  type: string;
  data: any;
  createdAt: Date;
}

interface JobHandler {
  (job: Job): Promise<void>;
}

class MemoryQueue {
  private jobs: Map<string, Job> = new Map();
  private handlers: Map<string, JobHandler> = new Map();
  private processing = false;

  constructor(private queueName: string) {}

  register(type: string, handler: JobHandler) {
    this.handlers.set(type, handler);
  }

  async add(type: string, data: any, options: any = {}): Promise<void> {
    const job: Job = {
      id: options.jobId || `${this.queueName}-${Date.now()}`,
      type,
      data,
      createdAt: new Date(),
    };

    this.jobs.set(job.id, job);

    // Если есть задержка
    if (options.delay) {
      setTimeout(() => this.processJob(job), options.delay);
    } else {
      this.processJob(job);
    }
  }

  private async processJob(job: Job) {
    if (this.processing) {
      setTimeout(() => this.processJob(job), 1000);
      return;
    }

    this.processing = true;

    try {
      const handler = this.handlers.get(job.type);
      if (handler) {
        await handler(job);
      } else {
        console.warn(`No handler for job type: ${job.type}`);
      }
    } catch (error) {
      console.error(`Error processing job ${job.id}:`, error);
    } finally {
      this.jobs.delete(job.id);
      this.processing = false;
    }
  }

  get size(): number {
    return this.jobs.size;
  }

  async close(): Promise<void> {
    this.jobs.clear();
    this.handlers.clear();
  }
}

export { MemoryQueue };
