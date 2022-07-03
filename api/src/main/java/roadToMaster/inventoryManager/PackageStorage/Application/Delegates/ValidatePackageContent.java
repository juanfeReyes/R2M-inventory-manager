package roadToMaster.inventoryManager.PackageStorage.Application.Delegates;

import lombok.var;
import org.flowable.engine.delegate.DelegateExecution;
import org.flowable.engine.delegate.JavaDelegate;
import roadToMaster.inventoryManager.PackageStorage.Domain.CellarPackage;

public class ValidatePackageContent implements JavaDelegate {
  @Override
  public void execute(DelegateExecution delegateExecution) {
    var cellarPackage = (CellarPackage) delegateExecution.getVariable("amount");
    if(cellarPackage.getAmount() < 0){
      delegateExecution.setVariable("isPackageValid", false);
      return;
    }

    delegateExecution.setVariable("isPackageValid", true);
  }
}
