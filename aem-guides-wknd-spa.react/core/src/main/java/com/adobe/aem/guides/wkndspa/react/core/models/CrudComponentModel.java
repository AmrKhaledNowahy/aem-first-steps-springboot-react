package com.adobe.aem.guides.wkndspa.react.core.models;

import com.adobe.cq.export.json.ComponentExporter;

public interface CrudComponentModel extends ComponentExporter {
    public String getBackend();
    public String getBackendPort();
}
