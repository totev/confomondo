package de.endofco.confomondo;

import io.vertx.core.Vertx;
import io.vertx.rxjava.ext.web.handler.sockjs.SockJSHandler;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class CounterMain {

    static final Logger LOG = LoggerFactory.getLogger(CounterMain.class);


    public static void main(String[] args) {


        Vertx.vertx()
                .deployVerticle(CounterVerticle.class.getName());
    }


}
