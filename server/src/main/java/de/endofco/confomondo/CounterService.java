package de.endofco.confomondo;

import java.util.concurrent.atomic.AtomicInteger;

public class CounterService {

    static final String INCREMENT = "[Counter] Increment";
    static final String DECREMENT = "[Counter] Decrement";
    static final String RESET = "[Counter] Reset";
    static final String TOTAL = "[Counter] Total";

    private AtomicInteger total = new AtomicInteger(0);

    public int handleEvent(String eventType) {
        int result;
        switch (eventType) {
            case INCREMENT:
                result = this.total.incrementAndGet();
                break;
            case DECREMENT:
                result = this.total.decrementAndGet();
                break;
            case RESET:
                this.total.set(0);
                result = 0;
                break;
            case TOTAL:
                result = this.total.get();
                break;
            default:
                result = 0;
        }

        return result;
    }


}
