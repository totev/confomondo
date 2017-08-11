package de.endofco.confomondo.model;

import java.util.Collection;

public class UsersAction {
    private String type;
    private Collection<String> payload;

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public Collection<String> getPayload() {
        return payload;
    }

    public void setPayload(Collection<String> payload) {
        this.payload = payload;
    }
}
