package com.amr.aemcrudbackend.Response;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.io.Serializable;


@Getter
@Setter
@NoArgsConstructor
public class StatusResponse implements Serializable {
    private static final long serialVersionUID = -7725423465837002562L;

    private String code;
    private String key;
    private String message;
    private String locale;

    public StatusResponse( String message) {
        super();

        this.message = message;
    }
    public StatusResponse(String code, String key, String message) {
        super();
        this.code = code;
        this.key = key;
        this.message = message;

    }

    public StatusResponse(String code, String key, String message, String locale) {
        super();
        this.code = code;
        this.key = key;
        this.message = message;
        this.locale = locale;
    }


}
