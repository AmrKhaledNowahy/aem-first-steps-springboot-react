package com.adobe.aem.guides.wkndspa.react.core.models.impl;

import com.adobe.aem.guides.wkndspa.react.core.models.CrudComponentModel;
import com.adobe.cq.export.json.ComponentExporter;
import com.adobe.cq.export.json.ExporterConstants;
import org.apache.commons.lang3.StringUtils;
import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.models.annotations.*;
import org.apache.sling.models.annotations.injectorspecific.ValueMapValue;


@Model(
        adaptables = SlingHttpServletRequest.class,
        adapters = { CrudComponentModel.class, ComponentExporter.class },
        resourceType = CrudComponentImpl.RESOURCE_TYPE,
        defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL
)
@Exporter( //Exporter annotation that serializes the model as JSON
        name = ExporterConstants.SLING_MODEL_EXPORTER_NAME,
        extensions = ExporterConstants.SLING_MODEL_EXTENSION
)
public class CrudComponentImpl implements CrudComponentModel {

    @ValueMapValue
    private String backend; //maps variable to jcr property named "label" persisted by Dialog

    @ValueMapValue
    private String backendPort; //maps variable to jcr property named "label" persisted by Dialog

    static final String RESOURCE_TYPE = "amr-test-37/components/crud-component";

    // public getter method to expose value of private variable `label`
    // adds additional logic to default the label to "(Default)" if not set.
    @Override
    public String getBackend() {
        return StringUtils.isNotBlank(backend) ? backend : "default-server";
    }

    @Override
    public String getBackendPort() {
        return StringUtils.isNotBlank(backendPort) ? backendPort : "default-port";
    }


    // method required by `ComponentExporter` interface
    // exposes a JSON property named `:type` with a value of `wknd-spa-react/components/open-weather`
    // required to map the JSON export to the SPA component props via the `MapTo`
    @Override
    public String getExportedType() {
        return CrudComponentImpl.RESOURCE_TYPE;
    }
}
