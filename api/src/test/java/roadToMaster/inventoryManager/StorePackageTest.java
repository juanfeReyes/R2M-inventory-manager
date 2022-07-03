package roadToMaster.inventoryManager;

import lombok.var;
import org.flowable.engine.HistoryService;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpMethod;
import roadToMaster.inventoryManager.PackageStorage.Domain.CellarPackage;

import static org.assertj.core.api.Assertions.assertThat;

public class StorePackageTest extends TestBase {

  @Autowired
  private HistoryService historyService;

  @Test
  public void storePackageTest(){
    //Build package
    var packageCellar = new CellarPackage("test", 5.0, 5.0);

    //Create package through API
    restTemplate.exchange("/package", HttpMethod.POST, new HttpEntity<>(packageCellar), Void.class);

    //Verify process is completed
    var storePackageHistory = historyService.createHistoricProcessInstanceQuery()
        .finished()
        .processDefinitionKey("store-package-model")
        .list();

    assertThat(storePackageHistory).hasSize(1);
  }
}
