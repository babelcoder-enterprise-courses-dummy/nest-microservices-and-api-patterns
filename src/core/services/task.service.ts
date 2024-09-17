import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression, Interval, Timeout } from '@nestjs/schedule';

@Injectable()
export class TasksService {
  constructor(private readonly logger: Logger) {}

  @Cron(CronExpression.EVERY_30_SECONDS)
  handleCron() {
    this.logger.debug('hello CronExpression');
  }

  @Interval(10000)
  handleInterval() {
    this.logger.debug('hello interval');
  }

  @Timeout(2_000)
  handleTimeout() {
    this.logger.debug('hello timeout');
  }
}
