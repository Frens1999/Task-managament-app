import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { Controller, Get, Post, Body, Param, Delete, Patch, Query, UsePipes, ValidationPipe, ParseIntPipe, UseGuards } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';

import { TasksService } from './tasks.service';
import { TaskStatusValidationPipe } from './pipes/task-status-validation.pipe';
import { Task } from './task.entity';
import { TaskStatus } from './task-status.enum';
import { AuthGuard } from '@nestjs/passport';
import { User } from 'src/auth/user.entity';
import { GetUser } from 'src/auth/get-user.decorator';
import { Logger } from '@nestjs/common';
import { stringify } from 'querystring';
import { ApiBearerAuth, ApiResponse } from '@nestjs/swagger';

@Controller('tasks')
@UseGuards(AuthGuard())
export class TasksController {
  private logger = new Logger('TaskController');
  constructor(private tasksService: TasksService) { }

  @Get()
  @ApiBearerAuth()
  getTasks(@Query(ValidationPipe) filterDto: GetTasksFilterDto,
    @GetUser() user: User): Promise<Task[]> {
    this.logger.verbose(`User "${user.username} retrieving all tasks.Filters: ${JSON.stringify(filterDto)}"`)
    return this.tasksService.getTasks(filterDto, user);
  }

  @Get('/:id')
  @ApiBearerAuth()
  getTaskById(@Param('id', ParseIntPipe) id: number,
    @GetUser() user: User): Promise<Task> {
    return this.tasksService.getTaskById(id, user);

  }

  @Post()
  @ApiBearerAuth()
  @UsePipes(ValidationPipe)
  createTask(@Body() createTaskDto: CreateTaskDto,
    @GetUser() user: User,
  ): Promise<Task> {
    this.logger.verbose(`User "${user.username}" creating a new task.Data :${JSON.stringify(createTaskDto)}`)
    return this.tasksService.createTask(createTaskDto, user)
  }

  @Patch('/:id/status')
  @ApiResponse({ status: 401, description: 'Not authorised!' })
  @ApiResponse({ status: 403, description: 'Forbidden!' })
  @ApiResponse({ status: 404, description: 'Not found!' })
  @ApiBearerAuth()
  updateTaskStatus(
    @Param('id', ParseIntPipe) id: number,
    @Body('status', TaskStatusValidationPipe) status: TaskStatus,
    @GetUser() user: User,
  ): Promise<Task> {
    return this.tasksService.updateTaskStatus(id, status, user);
  }
  @Delete('/:id')
  @ApiBearerAuth()
  deleteTask(@Param('id', ParseIntPipe) id: number,
    @GetUser() user: User
  ): Promise<void> {
    return this.tasksService.deleteTask(id, user);
  }


}
