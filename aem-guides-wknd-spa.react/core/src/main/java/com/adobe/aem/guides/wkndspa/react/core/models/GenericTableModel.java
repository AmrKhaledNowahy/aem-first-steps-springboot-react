package com.adobe.aem.guides.wkndspa.react.core.models;

import com.adobe.cq.export.json.ComponentExporter;

public interface GenericTableModel extends ComponentExporter {
    public String getApiUrl();
    public String getMapping();
    public String getTitle();
}