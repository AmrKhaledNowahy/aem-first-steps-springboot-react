package com.adobe.aem.guides.wkndspa.react.core.models.impl;

import com.adobe.aem.guides.wkndspa.react.core.models.GenericTableModel;
import com.adobe.aem.guides.wkndspa.react.core.models.UserListModel;
import com.adobe.cq.export.json.ComponentExporter;
import com.adobe.cq.export.json.ExporterConstants;
import org.apache.commons.lang3.StringUtils;
import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Exporter;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.injectorspecific.ValueMapValue;

@Model(
        adaptables = SlingHttpServletRequest.class,
        adapters = { GenericTableModel.class, ComponentExporter.class },
        resourceType = GenericTableModelImpl.RESOURCE_TYPE,
        defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL
)
@Exporter( //Exporter annotation that serializes the model as JSON
        name = ExporterConstants.SLING_MODEL_EXPORTER_NAME,
        extensions = ExporterConstants.SLING_MODEL_EXTENSION
)
public class GenericTableModelImpl implements GenericTableModel {
    @ValueMapValue
    private String apiUrl; //maps variable to jcr property named "label" persisted by Dialog

    @ValueMapValue
    private String mapping; //maps variable to jcr property named "label" persisted by Dialog

    static final String RESOURCE_TYPE = "amr-test-37/components/generic-table";

    // public getter method to expose value of private variable `label`
    // adds additional logic to default the label to "(Default)" if not set.
    @Override
    public String getApiUrl() {
        return StringUtils.isNotBlank(apiUrl) ? apiUrl : "default-server";
    }

    @Override
    public String getMapping() {
        return StringUtils.isNotBlank(mapping) ? mapping : "empty-mapping";
    }


    // method required by `ComponentExporter` interface
    // exposes a JSON property named `:type` with a value of `wknd-spa-react/components/open-weather`
    // required to map the JSON export to the SPA component props via the `MapTo`
    @Override
    public String getExportedType() {
        return GenericTableModelImpl.RESOURCE_TYPE;
    }
}
