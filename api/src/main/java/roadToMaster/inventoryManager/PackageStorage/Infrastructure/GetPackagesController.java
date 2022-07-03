package roadToMaster.inventoryManager.PackageStorage.Infrastructure;

import com.nimbusds.jose.proc.SecurityContext;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;
import roadToMaster.inventoryManager.PackageStorage.Domain.CellarPackage;

@RestController
@RequestMapping("packages")
public class GetPackagesController {

    @Autowired
    public GetPackagesController() {}

    @GetMapping(produces = MediaType.APPLICATION_JSON_VALUE)
    public Object storePackage(){
        return SecurityContextHolder.getContext().getAuthentication().getPrincipal();
    }
}
