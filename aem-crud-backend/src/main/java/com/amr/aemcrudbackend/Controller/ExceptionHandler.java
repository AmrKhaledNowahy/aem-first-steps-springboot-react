package com.amr.aemcrudbackend.Controller;

import com.amr.aemcrudbackend.Exception.ApplicationException;
import lombok.extern.log4j.Log4j2;
import org.springframework.dao.IncorrectResultSizeDataAccessException;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ResponseStatus;

import static org.springframework.http.HttpStatus.BAD_REQUEST;
import static org.springframework.http.HttpStatus.INTERNAL_SERVER_ERROR;


@Log4j2
@ControllerAdvice
public class ExceptionHandler {
    @org.springframework.web.bind.annotation.ExceptionHandler(ApplicationException.class)
    @ResponseStatus(BAD_REQUEST)
    public ResponseEntity<Object> handleApplicationException(ApplicationException e) {
        log.error(e);
        e.printStackTrace();
        return new ResponseEntity<>(e.getStatus(), BAD_REQUEST);
    }

    @org.springframework.web.bind.annotation.ExceptionHandler(IncorrectResultSizeDataAccessException.class)
    @ResponseStatus(INTERNAL_SERVER_ERROR)
    public ResponseEntity<Object> handleIncorrectResultSizeDataAccessException(Exception e) {
        log.error(e);
        e.printStackTrace();
        return new ResponseEntity<>("لقد حدث خطأ, تم العثور على أكثر من نتيجة صحيحة", INTERNAL_SERVER_ERROR);
    }

    @org.springframework.web.bind.annotation.ExceptionHandler(Exception.class)
    @ResponseStatus(INTERNAL_SERVER_ERROR)
    public ResponseEntity<Object> handleException(Exception e) {
        log.error(e);
        e.printStackTrace();
        return new ResponseEntity<>(e.getMessage(), INTERNAL_SERVER_ERROR);
    }

}
