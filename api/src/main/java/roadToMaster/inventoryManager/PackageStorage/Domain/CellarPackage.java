package roadToMaster.inventoryManager.PackageStorage.Domain;

import lombok.AllArgsConstructor;
import lombok.Getter;

import java.io.Serializable;

@Getter
@AllArgsConstructor
public class CellarPackage implements Serializable {

  private String name;

  private Double amount;

  private Double weight;
}
