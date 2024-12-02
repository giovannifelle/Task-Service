package it.eng.corso.taskservice.service;

import it.eng.corso.taskservice.model.Task;
import it.eng.corso.taskservice.repository.TaskRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class TaskServiceImpl implements TaskService {

    @Autowired
    private TaskRepository taskRepository;

    @Override
    public Task save(Task task) {
        return taskRepository.save(task);
    }

    @Override
    public List<Task> findAll() {
        return taskRepository.findAll();
    }

    @Override
    public List<Task> findByTitle(String title) {
        return taskRepository.findByTitle(title);
    }

    @Override
    public Task getTaskById(Long id) {
        Optional<Task> task = taskRepository.findById(id);
        if (task.isPresent()) {
            return task.get();
        } else {
            throw new RuntimeException();
        }
    }

    @Override
    public List<Task> findCompleted(Boolean param) {
        return taskRepository.findCompleted(param);
    }

    @Override
    public void deleteById(Long id) {
        taskRepository.deleteById(id);
    }

    @Override
    public void updateTask(Long id, String title, Boolean completed, String description) {
        Task t = new Task();
        t.setId(id);
        t.setCompleted(completed);
        t.setTitle(title);
        t.setDescription(description);
        taskRepository.save(t);
    }
}
