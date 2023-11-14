import { registerAs } from '@nestjs/config';

export interface OpenApiConfig {
  title: string;
  description: string;
  version: string;
}

export default registerAs(
  'open-api',
  (): OpenApiConfig => ({
    title: 'NestJS Admin service',
    description: 'La description de l\'application NestJS',
    version: '1.0.0',
  }),
);