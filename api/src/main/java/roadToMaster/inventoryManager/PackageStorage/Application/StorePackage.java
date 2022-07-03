package roadToMaster.inventoryManager.PackageStorage.Application;

import lombok.var;
import org.flowable.engine.RuntimeService;
import org.flowable.engine.TaskService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import roadToMaster.inventoryManager.PackageStorage.Domain.CellarPackage;

import java.util.HashMap;
import java.util.Map;

@Service
public class StorePackage {

  private final TaskService taskService;

  private final RuntimeService runtimeService;

  @Autowired
  public StorePackage(TaskService taskService, RuntimeService runtimeService) {
    this.taskService = taskService;
    this.runtimeService = runtimeService;
  }

  public String storePackage(String userId, CellarPackage cellarPackage){
    // Start a process to store package
    var processVariables = new HashMap<String, Object>();
    processVariables.put("amount", cellarPackage);
    var process = runtimeService.startProcessInstanceByKey("store-package-model", processVariables);

    // Claim store package task
    var task = taskService.createTaskQuery().taskName("Store package").list().get(0);
    taskService.claim(task.getId(), userId);

    // Inject variables for service task - investigate

    // Complete store package task
    taskService.complete(task.getId());

    //return process Id - to check process status in other request
    return process.getTenantId();
  }
}
