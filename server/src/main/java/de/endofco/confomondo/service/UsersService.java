package de.endofco.confomondo.service;

import com.google.common.base.Strings;

import java.util.HashSet;
import java.util.Set;

public class UsersService {

    public static final String SYNC = "[Users] Synchronization";
    public static final String JOIN = "[Users] Join";
    public static final String EXIT = "[Users] Exit";


    private Set<String> users;

    public UsersService() {
        this.users = new HashSet<>();
    }


    public Set<String> addUser(String userName) {
        if (Strings.isNullOrEmpty(userName) == false) {
            this.users.add(userName);
        }
        return this.users;
    }

    public Set<String> removeUser(String userName) {
        if (Strings.isNullOrEmpty(userName) == false) {
            this.users.remove(userName);
        }
        return this.users;
    }


    public Set<String> getUsers() {
        return this.users;
    }


    public Set<String> handleEvent(String eventType, String currentUser) {
        Set<String> result;
        switch (eventType) {
            case SYNC:
                result = this.getUsers();
                break;
            case JOIN:
                result = this.addUser(currentUser);
                break;
            case EXIT:
                result = this.removeUser(currentUser);
                break;
            default:
                result = getUsers();
        }

        return result;
    }


}
