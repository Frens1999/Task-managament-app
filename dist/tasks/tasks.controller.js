"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TasksController = void 0;
const get_tasks_filter_dto_1 = require("./dto/get-tasks-filter.dto");
const common_1 = require("@nestjs/common");
const create_task_dto_1 = require("./dto/create-task.dto");
const tasks_service_1 = require("./tasks.service");
const task_status_validation_pipe_1 = require("./pipes/task-status-validation.pipe");
const task_status_enum_1 = require("./task-status.enum");
const passport_1 = require("@nestjs/passport");
const user_entity_1 = require("../auth/user.entity");
const get_user_decorator_1 = require("../auth/get-user.decorator");
const common_2 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
let TasksController = class TasksController {
    constructor(tasksService) {
        this.tasksService = tasksService;
        this.logger = new common_2.Logger('TaskController');
    }
    getTasks(filterDto, user) {
        this.logger.verbose(`User "${user.username} retrieving all tasks.Filters: ${JSON.stringify(filterDto)}"`);
        return this.tasksService.getTasks(filterDto, user);
    }
    getTaskById(id, user) {
        return this.tasksService.getTaskById(id, user);
    }
    createTask(createTaskDto, user) {
        this.logger.verbose(`User "${user.username}" creating a new task.Data :${JSON.stringify(createTaskDto)}`);
        return this.tasksService.createTask(createTaskDto, user);
    }
    updateTaskStatus(id, status, user) {
        return this.tasksService.updateTaskStatus(id, status, user);
    }
    deleteTask(id, user) {
        return this.tasksService.deleteTask(id, user);
    }
};
__decorate([
    common_1.Get(),
    swagger_1.ApiBearerAuth(),
    __param(0, common_1.Query(common_1.ValidationPipe)),
    __param(1, get_user_decorator_1.GetUser()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [get_tasks_filter_dto_1.GetTasksFilterDto,
        user_entity_1.User]),
    __metadata("design:returntype", Promise)
], TasksController.prototype, "getTasks", null);
__decorate([
    common_1.Get('/:id'),
    swagger_1.ApiBearerAuth(),
    __param(0, common_1.Param('id', common_1.ParseIntPipe)),
    __param(1, get_user_decorator_1.GetUser()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, user_entity_1.User]),
    __metadata("design:returntype", Promise)
], TasksController.prototype, "getTaskById", null);
__decorate([
    common_1.Post(),
    swagger_1.ApiBearerAuth(),
    common_1.UsePipes(common_1.ValidationPipe),
    __param(0, common_1.Body()),
    __param(1, get_user_decorator_1.GetUser()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_task_dto_1.CreateTaskDto,
        user_entity_1.User]),
    __metadata("design:returntype", Promise)
], TasksController.prototype, "createTask", null);
__decorate([
    common_1.Patch('/:id/status'),
    swagger_1.ApiResponse({ status: 401, description: 'Not authorised!' }),
    swagger_1.ApiResponse({ status: 403, description: 'Forbidden!' }),
    swagger_1.ApiResponse({ status: 404, description: 'Not found!' }),
    swagger_1.ApiBearerAuth(),
    __param(0, common_1.Param('id', common_1.ParseIntPipe)),
    __param(1, common_1.Body('status', task_status_validation_pipe_1.TaskStatusValidationPipe)),
    __param(2, get_user_decorator_1.GetUser()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, String, user_entity_1.User]),
    __metadata("design:returntype", Promise)
], TasksController.prototype, "updateTaskStatus", null);
__decorate([
    common_1.Delete('/:id'),
    swagger_1.ApiBearerAuth(),
    __param(0, common_1.Param('id', common_1.ParseIntPipe)),
    __param(1, get_user_decorator_1.GetUser()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, user_entity_1.User]),
    __metadata("design:returntype", Promise)
], TasksController.prototype, "deleteTask", null);
TasksController = __decorate([
    common_1.Controller('tasks'),
    common_1.UseGuards(passport_1.AuthGuard()),
    __metadata("design:paramtypes", [tasks_service_1.TasksService])
], TasksController);
exports.TasksController = TasksController;
//# sourceMappingURL=tasks.controller.js.map