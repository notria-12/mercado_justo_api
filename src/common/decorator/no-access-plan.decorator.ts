import { SetMetadata } from '@nestjs/common';

export const NO_ACCESS_PLAN = 'noAccessPlan';
export const NoAccessPlan = () => SetMetadata(NO_ACCESS_PLAN, true);