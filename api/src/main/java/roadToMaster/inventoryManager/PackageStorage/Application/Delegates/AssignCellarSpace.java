package roadToMaster.inventoryManager.PackageStorage.Application.Delegates;

import lombok.extern.slf4j.Slf4j;
import lombok.var;
import org.flowable.engine.delegate.DelegateExecution;
import org.flowable.engine.delegate.JavaDelegate;

@Slf4j
public class AssignCellarSpace implements JavaDelegate {

  @Override
  public void execute(DelegateExecution delegateExecution) {
    var isCellarValid = delegateExecution.getVariable("isPackageValid");
    log.info("Cellar is valid {}", isCellarValid);
  }
}
