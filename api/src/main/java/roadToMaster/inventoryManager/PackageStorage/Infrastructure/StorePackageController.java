package roadToMaster.inventoryManager.PackageStorage.Infrastructure;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import roadToMaster.inventoryManager.PackageStorage.Application.StorePackage;
import roadToMaster.inventoryManager.PackageStorage.Domain.CellarPackage;

import java.util.UUID;

@RestController
@RequestMapping("package")
public class StorePackageController {

  private final StorePackage storePackage;

  @Autowired
  public StorePackageController(StorePackage storePackage) {
    this.storePackage = storePackage;
  }

  @PostMapping(produces = MediaType.APPLICATION_JSON_VALUE)
  public void storePackage(@RequestBody CellarPackage cellarPackage){
    storePackage.storePackage(UUID.randomUUID().toString(), cellarPackage);
  }
}
