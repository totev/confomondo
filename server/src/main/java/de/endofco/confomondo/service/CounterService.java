package de.endofco.confomondo.service;

import java.util.concurrent.atomic.AtomicInteger;

public class CounterService {

    public static final String INCREMENT = "[Counter] Increment";
    public static final String DECREMENT = "[Counter] Decrement";
    public static final String RESET = "[Counter] Reset";
    public static final String TOTAL = "[Counter] Total";

    private volatile Integer total = new Integer(0);

    public int handleEvent(String eventType) {
        int result;
        switch (eventType) {
            case INCREMENT:
                result = ++this.total;
                break;
            case DECREMENT:
                result = --this.total;
                break;
            case RESET:
                this.total = 0;
                result = 0;
                break;
            case TOTAL:
                result = this.total.intValue();
                break;
            default:
                result = 0;
        }

        return result;
    }


}
