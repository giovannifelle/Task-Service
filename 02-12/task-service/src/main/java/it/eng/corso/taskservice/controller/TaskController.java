package it.eng.corso.taskservice.controller;

import it.eng.corso.taskservice.model.Task;
import it.eng.corso.taskservice.service.TaskService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@CrossOrigin
public class TaskController {

    @Autowired
    private TaskService taskService;

    @GetMapping("/api/v1/tasks")
    public List<Task> findAll() {
        return taskService.findAll();
    }

    @GetMapping("/api/v1/taskTitle/{title}")
    public List<Task> findByAuthor(@PathVariable String title) {
        return taskService.findByTitle(title);
    }

    @GetMapping("/api/v1/taskId/{id}")
    public Task findByAuthor(@PathVariable Long id) {
        return taskService.getTaskById(id);
    }

    @DeleteMapping("api/v1/task/{id}")
    public void deleteById(@PathVariable Long id) {
        taskService.deleteById(id);
    }

    @GetMapping("api/v1/taskCompleted")
    public List<Task> findCompleted(@RequestParam Boolean param) {//Cambire param
        return taskService.findCompleted(param);
    }

    @PostMapping("api/v1/task")
    public Task saveTask(@RequestBody Task task) {
        return taskService.save(task);
    }

    @PutMapping("api/v1/tasks/{id}")
    public void updateTask(@PathVariable Long id, @RequestParam(defaultValue = "title") String title, @RequestParam(defaultValue = "false") Boolean completed, @RequestParam(defaultValue = "Descrizione") String description) {
        taskService.updateTask(id, title, completed, description);
    }
}
