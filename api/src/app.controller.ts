import { Controller, Get } from '@nestjs/common'
import { AppService } from './app.service'
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger'

@ApiTags('Health Check')
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @ApiOperation({
    summary: 'API Health Check',
    description: 'Endpoint to verify if the API is up and running.',
  })
  @ApiResponse({
    status: 200,
    description: 'API is healthy and operational',
    schema: {
      type: 'string',
      example: 'API is running',
    },
  })
  healthCheck(): string {
    return this.appService.healthCheck()
  }
}
