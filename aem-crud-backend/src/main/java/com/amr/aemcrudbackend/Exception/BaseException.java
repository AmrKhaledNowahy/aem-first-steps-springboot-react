package com.amr.aemcrudbackend.Exception;


import com.amr.aemcrudbackend.Response.StatusResponse;

public class BaseException extends RuntimeException {

    /**
     *
     */
    private static final long serialVersionUID = 5904229413391409209L;

    StatusResponse status;

    public StatusResponse getStatus() {
        return status;
    }

    public BaseException(StatusResponse status) {
        super((status != null && !status.equals("")) ? status.getKey() : "");
        this.status = status;
    }

    public BaseException(String code, String message) {
        super(message);
        this.status = new StatusResponse(message);

    }

    public BaseException(String code, String message, Throwable e) {
        super(message, e);
        this.status = new StatusResponse(message);

    }

    public BaseException(Throwable e) {
        super(e);
    }

}
