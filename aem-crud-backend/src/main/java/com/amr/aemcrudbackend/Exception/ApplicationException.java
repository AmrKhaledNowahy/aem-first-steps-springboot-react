package com.amr.aemcrudbackend.Exception;

import com.amr.aemcrudbackend.Response.StatusResponse;

public class ApplicationException extends BaseException {

    /**
     *
     */
    private static final long serialVersionUID = -741215074424755266L;

    public ApplicationException(String code, String message) {
        super(code, message);
    }

    public ApplicationException(StatusResponse status) {
        super(status);
    }

}
