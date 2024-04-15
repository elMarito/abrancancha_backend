import { Test, TestingModule } from '@nestjs/testing';
import { StatusOfUserController } from './status-of-user.controller';
import { StatusOfUserService } from './status-of-user.service';

describe('StatusOfUserController', () => {
  let controller: StatusOfUserController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [StatusOfUserController],
      providers: [StatusOfUserService],
    }).compile();

    controller = module.get<StatusOfUserController>(StatusOfUserController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
